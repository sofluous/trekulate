(() => {
  function create(config) {
    const {
      state,
      ui,
      constants,
      deps
    } = config;
    const {
      TOPO_QUALITY_PRESETS,
      topographyCachePrefix
    } = constants;
    const {
      resolveTopographyQuality,
      normalizeCountryKey,
      resetTopographyContourGeometry,
      resetTopographyWireGeometry,
      markStaticDirty,
      updateTopographyScaleUI,
      updateRawView,
      updateDebugView,
      requestRender,
      syncActionAvailability,
      getTopographyBounds,
      ensureNetworkContext,
      setButtonBusy,
      clamp,
      makeGridAxis,
      idbGet,
      idbSet,
      setTopoStatus,
      toast
    } = deps;

    function syncTopographyQualityFromControls() {
      if (!ui.topoQuality || !ui.topoResolution || !ui.topoContours) return;
      const quality = resolveTopographyQuality(ui.topoResolution.value, ui.topoContours.value);
      ui.topoQuality.value = quality;
      state.topography.quality = quality;
      updateRawView();
      updateDebugView();
    }

    function applyTopographyQualityPreset(quality) {
      const key = String(quality || '').toLowerCase();
      if (!ui.topoResolution || !ui.topoContours) return;
      const preset = TOPO_QUALITY_PRESETS[key];
      if (!preset) {
        syncTopographyQualityFromControls();
        return;
      }
      ui.topoResolution.value = String(preset.resolution);
      ui.topoContours.value = String(preset.contours);
      state.topography.contourCount = preset.contours;
      state.topography.quality = key;
      markStaticDirty();
      updateRawView();
      updateDebugView();
      requestRender();
    }

    function normalizeTopographyCacheCountryKey() {
      return state.currentCountryKey || normalizeCountryKey(ui.countryName?.value || '') || 'unscoped';
    }

    function buildTopographyCacheKey(bbox, rows, cols) {
      const country = normalizeTopographyCacheCountryKey();
      const fmt = (v) => Number(v).toFixed(3);
      return [
        topographyCachePrefix,
        country,
        String(rows),
        String(cols),
        fmt(bbox.minLat),
        fmt(bbox.maxLat),
        fmt(bbox.minLng),
        fmt(bbox.maxLng)
      ].join('|');
    }

    function isValidTopographyPayload(payload) {
      if (!payload || !Array.isArray(payload.values)) return false;
      if (!Number.isFinite(payload.rows) || !Number.isFinite(payload.cols)) return false;
      if (payload.rows < 2 || payload.cols < 2) return false;
      if (!Array.isArray(payload.latList) || !Array.isArray(payload.lngList)) return false;
      return true;
    }

    function applyTopographyPayload(payload, options = {}) {
      const {
        mode,
        contourCount,
        quality = '',
        cacheKey = '',
        cacheState = 'none',
        sourceOverride = ''
      } = options;
      if (!isValidTopographyPayload(payload)) return false;
      const resolvedQuality = quality || resolveTopographyQuality(payload.rows, contourCount);
      const nextContourCount = Number.isFinite(contourCount) ? contourCount : state.topography.contourCount;
      state.topography = {
        ...state.topography,
        loaded: true,
        values: payload.values,
        rows: Number(payload.rows),
        cols: Number(payload.cols),
        latList: payload.latList,
        lngList: payload.lngList,
        min: Number(payload.min),
        max: Number(payload.max),
        quality: resolvedQuality,
        mode: mode || state.topography.mode,
        contourCount: nextContourCount,
        source: sourceOverride || String(payload.source || state.topography.source),
        cacheKey: cacheKey || String(payload.cacheKey || ''),
        cacheState
      };
      resetTopographyContourGeometry();
      resetTopographyWireGeometry();
      markStaticDirty();
      if (ui.topoQuality) ui.topoQuality.value = resolvedQuality;
      updateTopographyScaleUI();
      updateRawView();
      updateDebugView();
      requestRender();
      syncActionAvailability();
      return true;
    }

    async function fetchWithTimeout(url, options = {}, timeoutMs = 18000) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      try {
        const res = await fetch(url, { ...options, signal: ctrl.signal });
        return res;
      } finally {
        clearTimeout(timer);
      }
    }

    function isLocalDevelopmentHost() {
      const host = String(location.hostname || '').toLowerCase();
      return host === '127.0.0.1' || host === 'localhost';
    }

    function buildLocalTopographyProxyUrls(locations, dataset) {
      const encodedLocations = encodeURIComponent(locations.join('|'));
      const encodedDataset = encodeURIComponent(dataset);
      const primaryHost = String(location.hostname || '127.0.0.1').toLowerCase() === 'localhost'
        ? 'localhost'
        : '127.0.0.1';
      const alternateHost = primaryHost === 'localhost' ? '127.0.0.1' : 'localhost';
      return [
        `http://${primaryHost}:8080/topography?dataset=${encodedDataset}&locations=${encodedLocations}`,
        `http://${alternateHost}:8080/topography?dataset=${encodedDataset}&locations=${encodedLocations}`
      ];
    }

    function parseElevationResults(data, providerLabel) {
      if (!Array.isArray(data?.results)) throw new Error(`${providerLabel} invalid elevation response.`);
      return data.results.map((r) => {
        const v = Number(r.elevation);
        return Number.isFinite(v) ? v : 0;
      });
    }

    async function fetchElevationBatch(locations, dataset = 'aster30m', retries = 2) {
      const encoded = encodeURIComponent(locations.join('|'));
      const topodataUrl = `https://api.opentopodata.org/v1/${dataset}?locations=${encoded}`;
      const openElevationUrl = `https://api.open-elevation.com/api/v1/lookup?locations=${encoded}`;
      let lastErr = null;

      if (isLocalDevelopmentHost()) {
        const proxyUrls = buildLocalTopographyProxyUrls(locations, dataset);
        for (const proxyUrl of proxyUrls) {
          try {
            const res = await fetchWithTimeout(proxyUrl, {}, 18000);
            if (!res.ok) throw new Error(`Local proxy HTTP ${res.status}`);
            const data = await res.json();
            return {
              values: parseElevationResults(data, 'Local proxy'),
              provider: 'local-proxy/opentopodata'
            };
          } catch (err) {
            lastErr = err;
          }
        }
        const reason = lastErr?.message ? String(lastErr.message) : 'unknown error';
        throw new Error(`Local topography proxy unavailable. Start _TREKULATE/_tools/topography_proxy.py, then retry. Last error: ${reason}.`);
      }

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const res = await fetchWithTimeout(topodataUrl, {}, 18000);
          if (!res.ok) throw new Error(`OpenTopoData HTTP ${res.status}`);
          const data = await res.json();
          return {
            values: parseElevationResults(data, 'OpenTopoData'),
            provider: 'opentopodata'
          };
        } catch (err) {
          lastErr = err;
          if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
        }
      }

      try {
        const res = await fetchWithTimeout(openElevationUrl, {}, 18000);
        if (!res.ok) throw new Error(`Open-Elevation HTTP ${res.status}`);
        const data = await res.json();
        return {
          values: parseElevationResults(data, 'Open-Elevation'),
          provider: 'open-elevation'
        };
      } catch (err) {
        const primary = lastErr?.message ? String(lastErr.message) : 'unknown error';
        const fallback = err?.message ? String(err.message) : 'unknown error';
        throw new Error(`Elevation providers failed. OpenTopoData: ${primary}. Open-Elevation: ${fallback}.`);
      }
    }

    async function loadTopographyFromOpenData(options = {}) {
      const { forceRefresh = false } = options;
      if (!ensureNetworkContext('topography import')) return;
      const busyBtn = forceRefresh ? ui.refreshTopography : ui.loadTopography;
      setButtonBusy(busyBtn, true, forceRefresh ? 'Refreshing...' : 'Loading...');
      const bbox = getTopographyBounds();
      if (!bbox) {
        setTopoStatus('Load a country outline or pins first.', 'warn');
        toast('Need country or pins for topography bounds', 'warn');
        setButtonBusy(busyBtn, false);
        return;
      }
      const quality = ui.topoQuality?.value || 'custom';
      let res = Number(ui.topoResolution?.value || 24);
      let contourCount = Number(ui.topoContours?.value || 10);
      const preset = TOPO_QUALITY_PRESETS[quality];
      if (preset) {
        res = preset.resolution;
        contourCount = preset.contours;
        if (ui.topoResolution) ui.topoResolution.value = String(res);
        if (ui.topoContours) ui.topoContours.value = String(contourCount);
      }
      const mode = ui.topoMode?.value || 'contour2d';
      const maxPoints = 3600;
      const targetRes = clamp(Number.isFinite(res) ? res : 24, 8, 84);
      let rows = Math.max(8, Math.round(targetRes));
      let cols = Math.max(8, Math.round(targetRes));
      if (rows * cols > maxPoints) {
        const scale = Math.sqrt(maxPoints / (rows * cols));
        rows = Math.max(8, Math.floor(rows * scale));
        cols = Math.max(8, Math.floor(cols * scale));
      }
      const cacheKey = buildTopographyCacheKey(bbox, rows, cols);

      if (!forceRefresh) {
        try {
          const cached = await idbGet(cacheKey);
          if (isValidTopographyPayload(cached)) {
            applyTopographyPayload(cached, {
              mode,
              contourCount,
              quality: preset ? quality : resolveTopographyQuality(rows, contourCount),
              cacheKey,
              cacheState: 'hit',
              sourceOverride: `${cached.source || 'cache'}/cached`
            });
            setTopoStatus(`Topography loaded from cache (${state.topography.quality}). ${rows}x${cols}, ${Number(cached.min).toFixed(0)}m to ${Number(cached.max).toFixed(0)}m.`, 'success');
            toast('Topography cache hit', 'ok', 1200);
            setButtonBusy(busyBtn, false);
            return;
          }
        } catch (err) {
          console.warn('Topography cache read failed:', err);
        }
      }

      const latList = makeGridAxis(bbox.minLat, bbox.maxLat, rows, true);
      const lngList = makeGridAxis(bbox.minLng, bbox.maxLng, cols, false);
      const queries = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          queries.push(`${latList[r].toFixed(6)},${lngList[c].toFixed(6)}`);
        }
      }

      try {
        const datasets = ['aster30m', 'srtm90m'];
        const batchSize = 65;
        let valuesFlat = null;
        let sourceDataset = '';
        let sourceProvider = '';
        let lastErr = null;

        for (const dataset of datasets) {
          try {
            const out = [];
            setTopoStatus(`Fetching topography ${rows}x${cols} (${dataset})...`, 'info');
            for (let i = 0; i < queries.length; i += batchSize) {
              const batch = queries.slice(i, i + batchSize);
              const result = await fetchElevationBatch(batch, dataset, 2);
              out.push(...result.values);
              sourceProvider = result.provider || sourceProvider;
              const pct = (Math.min(i + batchSize, queries.length) / queries.length) * 100;
              setTopoStatus(`Topography ${dataset}/${sourceProvider || 'provider'} ${pct.toFixed(0)}%`, 'info');
            }
            valuesFlat = out;
            sourceDataset = dataset;
            break;
          } catch (err) {
            lastErr = err;
          }
        }

        if (!valuesFlat || valuesFlat.length < rows * cols) {
          throw lastErr || new Error('Topography dataset fallback exhausted.');
        }

        const values = [];
        let k = 0;
        let min = Infinity;
        let max = -Infinity;
        for (let r = 0; r < rows; r++) {
          const row = [];
          for (let c = 0; c < cols; c++) {
            const v = valuesFlat[k++] ?? 0;
            row.push(v);
            if (v < min) min = v;
            if (v > max) max = v;
          }
          values.push(row);
        }
        if (!Number.isFinite(min) || !Number.isFinite(max)) throw new Error('No elevation values returned.');

        state.topography = {
          ...state.topography,
          loaded: true,
          values,
          rows,
          cols,
          latList,
          lngList,
          min,
          max,
          quality: preset ? quality : resolveTopographyQuality(rows, contourCount),
          mode,
          contourCount,
          source: `${sourceProvider || 'opentopodata'}/${sourceDataset}`,
          cacheKey,
          cacheState: forceRefresh ? 'refresh' : 'miss'
        };
        try {
          await idbSet(cacheKey, {
            rows,
            cols,
            latList,
            lngList,
            values,
            min,
            max,
            source: `${sourceProvider || 'opentopodata'}/${sourceDataset}`,
            cacheKey,
            savedAt: Date.now()
          });
        } catch (err) {
          console.warn('Topography cache write failed:', err);
        }
        resetTopographyContourGeometry();
        resetTopographyWireGeometry();
        markStaticDirty();
        updateRawView();
        updateDebugView();
        requestRender();
        if (ui.topoQuality) ui.topoQuality.value = state.topography.quality;
        updateTopographyScaleUI();
        setTopoStatus(`Topography loaded (${sourceProvider || 'opentopodata'}/${sourceDataset}, ${state.topography.quality}). ${rows}x${cols}, ${min.toFixed(0)}m to ${max.toFixed(0)}m.`, 'success');
        toast('Topography loaded', 'ok');
        syncActionAvailability();
      } catch (err) {
        console.error(err);
        const raw = err?.message ? String(err.message) : '';
        const netHint = /failed to fetch|network|cors|typeerror/i.test(raw)
          ? ' Check internet connection, run via http://localhost (not file://), and retry Refresh Topography.'
          : '';
        const msg = raw ? `Topography fetch failed: ${raw}.${netHint}` : `Topography fetch failed.${netHint}`;
        setTopoStatus(msg, 'error');
        toast('Topography fetch failed', 'err');
      } finally {
        setButtonBusy(busyBtn, false);
      }
    }

    function clearTopography() {
      state.topography = {
        ...state.topography,
        loaded: false,
        values: [],
        rows: 0,
        cols: 0,
        latList: [],
        lngList: [],
        cacheKey: '',
        cacheState: 'cleared'
      };
      resetTopographyContourGeometry();
      resetTopographyWireGeometry();
      markStaticDirty();
      updateTopographyScaleUI();
      updateRawView();
      updateDebugView();
      requestRender();
      setTopoStatus('Topography cleared.', 'warn');
      syncActionAvailability();
    }

    return {
      syncTopographyQualityFromControls,
      applyTopographyQualityPreset,
      buildTopographyCacheKey,
      isValidTopographyPayload,
      applyTopographyPayload,
      loadTopographyFromOpenData,
      clearTopography
    };
  }

  window.TrekulateTopography = {
    create
  };
})();
