(() => {
  function hexToRgba(hex, a) {
    const clean = hex.replace('#', '');
    const x = parseInt(clean, 16);
    return `rgba(${(x >> 16) & 255},${(x >> 8) & 255},${x & 255},${a})`;
  }

  function create(config) {
    const { state, ui, ctx, deps } = config;
    const {
      cssVar,
      cssColorToHex,
      clamp,
      project,
      projectWithDepth,
      geoToCameraWorld,
      mapToWorld,
      getMapProjectionMode,
      isInteractionLodActive,
      isValidGeoPoint,
      isProjectedPointRenderable,
      isProjectedSegmentRenderable,
      getDepthOfFieldForZ,
      getContextOutlineEntries,
      getEntryRenderPath,
      WORLD_CONTEXT_FALLBACK,
      buildTopographyContourGeometry,
      buildTopographyWireframeGeometry,
      projectTopographyPoint,
      getRouteProgressFromTimeline
    } = deps;

    function drawTerrain(targetCtx, cam) {
      if (!state.layerVisible.seaLevel) return;
      const interactionLod = isInteractionLodActive();
      const pattern = ui.terrainPattern?.value || 'grid';
      const color = ui.terrainColor?.value || '#3cd7ff';
      const opacity = Number(ui.wireOpacity?.value || 0.3);
      const glow = interactionLod ? 0 : Number(ui.terrainGlow?.value || 0) * 6;
      const density = Math.max(0.5, Number(ui.terrainDensity?.value || 6));
      const y = Number(ui.terrainHeight?.value || 0);
      const half = Math.max(state.geoWindow.spanDeg * 0.5, 1e-6);
      const b = {
        minLat: state.geoWindow.centerLat - half,
        maxLat: state.geoWindow.centerLat + half,
        minLng: state.geoWindow.centerLng - half,
        maxLng: state.geoWindow.centerLng + half
      };
      const step = clamp(state.geoWindow.spanDeg / (density * (interactionLod ? 2.6 : 4)), 0.05, 45);
      const latStart = Math.ceil(b.minLat / step) * step;
      const lngStart = Math.ceil(b.minLng / step) * step;

      targetCtx.save();
      targetCtx.strokeStyle = hexToRgba(color, opacity);
      targetCtx.fillStyle = hexToRgba(color, opacity);
      targetCtx.lineWidth = 1;
      targetCtx.shadowColor = color;
      targetCtx.shadowBlur = glow;

      if (getMapProjectionMode() === 'globe') {
        const latStep = clamp(step * 1.15, 2, 30);
        const lngStep = clamp(step * 1.15, 2, 30);
        const lonDrawStep = Math.max(3, Math.min(8, Math.round(lngStep * 0.4)));

        if (pattern === 'dots') {
          for (let lat = -85; lat <= 85 + 1e-6; lat += latStep) {
            for (let lng = -180; lng <= 180 + 1e-6; lng += lngStep) {
              const w = geoToCameraWorld(lat, lng, y);
              const p = project(w.x, w.y, w.z, cam);
              targetCtx.beginPath();
              targetCtx.arc(p.x, p.y, 1.05, 0, Math.PI * 2);
              targetCtx.fill();
            }
          }
          targetCtx.restore();
          return;
        }

        for (let lat = -85; lat <= 85 + 1e-6; lat += latStep) {
          let started = false;
          targetCtx.beginPath();
          for (let lng = -180; lng <= 180 + 1e-6; lng += lonDrawStep) {
            const w = geoToCameraWorld(lat, lng, y);
            const p = project(w.x, w.y, w.z, cam);
            if (!started) {
              targetCtx.moveTo(p.x, p.y);
              started = true;
            } else {
              targetCtx.lineTo(p.x, p.y);
            }
          }
          if (started) targetCtx.stroke();
        }
        for (let lng = -180; lng <= 180 + 1e-6; lng += lngStep) {
          let started = false;
          targetCtx.beginPath();
          for (let lat = -85; lat <= 85 + 1e-6; lat += 3) {
            const w = geoToCameraWorld(lat, lng, y);
            const p = project(w.x, w.y, w.z, cam);
            if (!started) {
              targetCtx.moveTo(p.x, p.y);
              started = true;
            } else {
              targetCtx.lineTo(p.x, p.y);
            }
          }
          if (started) targetCtx.stroke();
        }
        if (pattern === 'hatch') {
          for (let d = -160; d <= 160; d += lngStep * 1.4) {
            let started = false;
            targetCtx.beginPath();
            for (let lat = -80; lat <= 80 + 1e-6; lat += 3) {
              const lng = d + lat;
              const w = geoToCameraWorld(lat, lng, y);
              const p = project(w.x, w.y, w.z, cam);
              if (!started) {
                targetCtx.moveTo(p.x, p.y);
                started = true;
              } else {
                targetCtx.lineTo(p.x, p.y);
              }
            }
            if (started) targetCtx.stroke();
          }
        }
        targetCtx.restore();
        return;
      }

      if (pattern === 'grid' || pattern === 'hatch') {
        let count = 0;
        for (let lng = lngStart; lng <= b.maxLng + 1e-6; lng += step) {
          const a = geoToCameraWorld(b.minLat, lng, y);
          const z = geoToCameraWorld(b.maxLat, lng, y);
          const p0 = project(a.x, a.y, a.z, cam);
          const p1 = project(z.x, z.y, z.z, cam);
          targetCtx.beginPath();
          targetCtx.moveTo(p0.x, p0.y);
          targetCtx.lineTo(p1.x, p1.y);
          targetCtx.stroke();
          if (++count > 180) break;
        }
        count = 0;
        for (let lat = latStart; lat <= b.maxLat + 1e-6; lat += step) {
          const a = geoToCameraWorld(lat, b.minLng, y);
          const z = geoToCameraWorld(lat, b.maxLng, y);
          const p0 = project(a.x, a.y, a.z, cam);
          const p1 = project(z.x, z.y, z.z, cam);
          targetCtx.beginPath();
          targetCtx.moveTo(p0.x, p0.y);
          targetCtx.lineTo(p1.x, p1.y);
          targetCtx.stroke();
          if (++count > 180) break;
        }
      }

      if (pattern === 'dots') {
        let rows = 0;
        for (let lat = latStart; lat <= b.maxLat + 1e-6; lat += step) {
          let cols = 0;
          for (let lng = lngStart; lng <= b.maxLng + 1e-6; lng += step) {
            const w = geoToCameraWorld(lat, lng, y);
            const p = project(w.x, w.y, w.z, cam);
            targetCtx.beginPath();
            targetCtx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
            targetCtx.fill();
            if (++cols > 140) break;
          }
          if (++rows > 140) break;
        }
      }

      if (pattern === 'hatch') {
        const hatchStep = step * 1.35;
        let n = 0;
        for (let s = b.minLng - (b.maxLat - b.minLat); s <= b.maxLng + (b.maxLat - b.minLat); s += hatchStep) {
          const pA = { lat: b.minLat, lng: s };
          const pB = { lat: b.maxLat, lng: s + (b.maxLat - b.minLat) };
          const w0 = geoToCameraWorld(pA.lat, pA.lng, y);
          const w1 = geoToCameraWorld(pB.lat, pB.lng, y);
          const a = project(w0.x, w0.y, w0.z, cam);
          const b1 = project(w1.x, w1.y, w1.z, cam);
          targetCtx.beginPath();
          targetCtx.moveTo(a.x, a.y);
          targetCtx.lineTo(b1.x, b1.y);
          targetCtx.stroke();
          if (++n > 160) break;
        }
      }

      targetCtx.restore();
    }

    function drawCountryOutline(targetCtx, cam) {
      if (!state.layerVisible.outline || !state.countryOutline.length) return;
      const interactionLod = isInteractionLodActive();
      const outlineColor = ui.outlineColor?.value || cssVar('--tk-country-outline', '#8dffcf');
      const outlineOpacity = Number(ui.outlineOpacity?.value || 0.32);
      const outlineWidth = Number(ui.outlineWidth?.value || 1.2);
      targetCtx.save();
      targetCtx.strokeStyle = hexToRgba(outlineColor, outlineOpacity);
      targetCtx.lineWidth = outlineWidth;
      targetCtx.shadowColor = outlineColor;
      targetCtx.shadowBlur = interactionLod ? 2 : 8;
      let previous = null;
      for (const pt of state.countryOutline) {
        if (!isValidGeoPoint(pt)) {
          previous = null;
          continue;
        }
        const w = geoToCameraWorld(pt.lat, pt.lng, 0);
        const p = project(w.x, w.y, w.z, cam);
        if (previous && isProjectedSegmentRenderable(previous, p, 28)) {
          targetCtx.beginPath();
          targetCtx.moveTo(previous.x, previous.y);
          targetCtx.lineTo(p.x, p.y);
          targetCtx.stroke();
        }
        previous = p;
      }
      targetCtx.restore();
    }

    function drawWorldContextOutline(targetCtx, cam) {
      if (!state.layerVisible.worldContext || state.performanceMode) return;
      const topoMode = state.topography.mode || 'contour2d';
      const topoHeavy = state.topography.loaded && (topoMode === 'contour3d' || topoMode === 'wireframe3d' || topoMode === 'hybrid3d');
      const entries = getContextOutlineEntries();
      const useFallback = entries.length < 2 && !(state.globalBaseline.entries?.length);
      const isGlobe = getMapProjectionMode() === 'globe';
      const interactionLod = isInteractionLodActive();
      if (interactionLod && topoHeavy) return;
      const renderBudget = interactionLod ? (isGlobe ? 320 : 420) : (isGlobe ? 760 : 980);
      const color = ui.worldContextColor?.value || cssVar('--ds-text-muted', '#6ecae3');
      const opacity = Number(ui.worldContextOpacity?.value || 0.22);
      const width = Number(ui.worldContextWidth?.value || 0.9);
      targetCtx.save();
      targetCtx.strokeStyle = hexToRgba(color, opacity);
      targetCtx.lineWidth = width;
      targetCtx.shadowColor = color;
      targetCtx.shadowBlur = interactionLod ? 0 : 2;
      if (useFallback) {
        targetCtx.strokeStyle = hexToRgba(color, opacity * 0.7);
        for (const segment of WORLD_CONTEXT_FALLBACK) {
          if (!Array.isArray(segment) || segment.length < 2) continue;
          let previous = null;
          for (const pt of segment) {
            if (!isValidGeoPoint(pt)) {
              previous = null;
              continue;
            }
            const w = geoToCameraWorld(pt.lat, pt.lng, 0);
            const p = project(w.x, w.y, w.z, cam);
            if (previous && isProjectedSegmentRenderable(previous, p, 28)) {
              targetCtx.beginPath();
              targetCtx.moveTo(previous.x, previous.y);
              targetCtx.lineTo(p.x, p.y);
              targetCtx.stroke();
            }
            previous = p;
          }
        }
      }
      for (const entry of entries) {
        const path = getEntryRenderPath(entry, renderBudget);
        if (path.filter(isValidGeoPoint).length < 2) continue;
        let previous = null;
        for (const pt of path) {
          if (!isValidGeoPoint(pt)) {
            previous = null;
            continue;
          }
          const w = geoToCameraWorld(pt.lat, pt.lng, 0);
          const p = isGlobe ? projectWithDepth(w.x, w.y, w.z, cam) : project(w.x, w.y, w.z, cam);
          if (isGlobe && p.depth > 0) {
            previous = null;
            continue;
          }
          if (previous && isProjectedSegmentRenderable(previous, p, 28)) {
            targetCtx.beginPath();
            targetCtx.moveTo(previous.x, previous.y);
            targetCtx.lineTo(p.x, p.y);
            targetCtx.stroke();
          }
          previous = p;
        }
      }
      targetCtx.restore();
    }

    function niceStep(span, targetLines = 6) {
      const raw = Math.max(span / Math.max(2, targetLines), 1e-6);
      const p = Math.pow(10, Math.floor(Math.log10(raw)));
      const m = raw / p;
      const base = m <= 1 ? 1 : (m <= 2 ? 2 : (m <= 5 ? 5 : 10));
      return base * p;
    }

    function drawGeoGrid(targetCtx, cam) {
      if (!state.layerVisible.geoGrid || !state.showGeoGrid) return;
      const interactionLod = isInteractionLodActive();
      const latStep = clamp(Number(ui.geoLatStep?.value || niceStep(state.geoWindow.spanDeg, 6)), 0.05, 60);
      const lngStep = clamp(Number(ui.geoLngStep?.value || niceStep(state.geoWindow.spanDeg, 6)), 0.05, 60);
      const latDigits = latStep < 1 ? 2 : 0;
      const lngDigits = lngStep < 1 ? 2 : 0;
      const color = ui.geoGridColor?.value || '#7dcbff';
      const opacity = Number(ui.geoGridOpacity?.value || 0.22);
      const width = Number(ui.geoGridWidth?.value || 1);
      const labelOpacity = interactionLod ? 0 : Number(ui.geoLabelOpacity?.value || 0.68);

      targetCtx.save();
      targetCtx.lineWidth = width;
      targetCtx.strokeStyle = hexToRgba(color, opacity);
      targetCtx.fillStyle = hexToRgba(color, labelOpacity);
      targetCtx.font = '10px monospace';
      targetCtx.shadowBlur = 0;

      if (getMapProjectionMode() === 'globe') {
        const lonDrawStep = Math.max(2, Math.min(8, Math.round(lngStep * 0.4)));
        for (let lng = -180; lng <= 180 + 1e-6; lng += lngStep) {
          let started = false;
          targetCtx.beginPath();
          for (let lat = -85; lat <= 85 + 1e-6; lat += 2.5) {
            const w = geoToCameraWorld(lat, lng, 0);
            const p = projectWithDepth(w.x, w.y, w.z, cam);
            const frontFacing = p.depth <= 0;
            if (!frontFacing) {
              if (started) {
                targetCtx.stroke();
                targetCtx.beginPath();
                started = false;
              }
              continue;
            }
            if (!started) {
              targetCtx.moveTo(p.x, p.y);
              started = true;
            } else {
              targetCtx.lineTo(p.x, p.y);
            }
          }
          if (started) targetCtx.stroke();
        }
        for (let lat = -85; lat <= 85 + 1e-6; lat += latStep) {
          let started = false;
          targetCtx.beginPath();
          for (let lng = -180; lng <= 180 + 1e-6; lng += Math.max(2, Math.min(8, Math.round(lngStep * 0.4)))) {
            const w = geoToCameraWorld(lat, lng, 0);
            const p = projectWithDepth(w.x, w.y, w.z, cam);
            const frontFacing = p.depth <= 0;
            if (!frontFacing) {
              if (started) {
                targetCtx.stroke();
                targetCtx.beginPath();
                started = false;
              }
              continue;
            }
            if (!started) {
              targetCtx.moveTo(p.x, p.y);
              started = true;
            } else {
              targetCtx.lineTo(p.x, p.y);
            }
          }
          if (started) targetCtx.stroke();
        }
        targetCtx.restore();
        return;
      }

      const half = Math.max(state.geoWindow.spanDeg * 0.5, 1e-6);
      const b = {
        minLat: state.geoWindow.centerLat - half,
        maxLat: state.geoWindow.centerLat + half,
        minLng: state.geoWindow.centerLng - half,
        maxLng: state.geoWindow.centerLng + half
      };
      const lngStart = Math.ceil(b.minLng / lngStep) * lngStep;
      for (let lng = lngStart; lng <= b.maxLng; lng += lngStep) {
        const a = geoToCameraWorld(b.minLat, lng, 0);
        const z = geoToCameraWorld(b.maxLat, lng, 0);
        const p0 = project(a.x, a.y, a.z, cam);
        const p1 = project(z.x, z.y, z.z, cam);
        targetCtx.beginPath();
        targetCtx.moveTo(p0.x, p0.y);
        targetCtx.lineTo(p1.x, p1.y);
        targetCtx.stroke();
        if (!interactionLod) targetCtx.fillText(`${lng.toFixed(lngDigits)}`, p0.x + 3, p0.y - 2);
      }
      const latStart = Math.ceil(b.minLat / latStep) * latStep;
      for (let lat = latStart; lat <= b.maxLat; lat += latStep) {
        const a = geoToCameraWorld(lat, b.minLng, 0);
        const z = geoToCameraWorld(lat, b.maxLng, 0);
        const p0 = project(a.x, a.y, a.z, cam);
        const p1 = project(z.x, z.y, z.z, cam);
        targetCtx.beginPath();
        targetCtx.moveTo(p0.x, p0.y);
        targetCtx.lineTo(p1.x, p1.y);
        targetCtx.stroke();
        if (!interactionLod) targetCtx.fillText(`${lat.toFixed(latDigits)}`, p1.x + 3, p1.y - 2);
      }
      targetCtx.restore();
    }

    function drawTopographyContours(targetCtx, cam) {
      if (!state.layerVisible.topography) return;
      const topo = state.topography;
      if (!topo.loaded || topo.rows < 2 || topo.cols < 2) return;
      const mode = topo.mode || 'contour2d';
      const mode3d = mode === 'contour3d' || mode === 'hybrid3d';
      if (mode !== 'contour2d' && mode !== 'contour3d' && mode !== 'hybrid3d') return;
      const topoColor = ui.topoColor?.value || '#8dffcf';
      const topoOpacity = Number(ui.topoOpacity?.value || 0.68);
      const topoLineWidth = Number(ui.topoLineWidth?.value || 1.1);
      const topoHeightScale = Number(ui.topoHeightScale?.value || 0.26);
      const interactionLod = isInteractionLodActive();
      const globeMode = getMapProjectionMode() === 'globe';
      const geometry = buildTopographyContourGeometry();
      if (!geometry.segmentCount) return;
      const levelStride = interactionLod && geometry.levels.length > 8 ? 2 : 1;
      let segmentStride = 1;
      if (interactionLod) {
        if (geometry.segmentCount > 24000) segmentStride = 7;
        else if (geometry.segmentCount > 12000) segmentStride = 5;
        else if (geometry.segmentCount > 6000) segmentStride = 4;
        else if (geometry.segmentCount > 2500) segmentStride = 3;
      } else if (geometry.segmentCount > 32000) {
        segmentStride = 2;
      }
      if (globeMode) {
        if (geometry.segmentCount > 24000) segmentStride = Math.max(segmentStride, interactionLod ? 10 : 4);
        else if (geometry.segmentCount > 12000) segmentStride = Math.max(segmentStride, interactionLod ? 8 : 3);
        else if (geometry.segmentCount > 6000) segmentStride = Math.max(segmentStride, interactionLod ? 5 : 2);
      }

      targetCtx.save();
      targetCtx.strokeStyle = hexToRgba(topoColor, topoOpacity);
      targetCtx.lineWidth = topoLineWidth;
      targetCtx.shadowColor = topoColor;
      targetCtx.shadowBlur = interactionLod ? 0 : (mode3d ? 6 : 3);
      targetCtx.globalAlpha = mode === 'hybrid3d' ? 0.62 : (mode3d ? 0.9 : 0.72);
      for (let i = 0; i < geometry.segments.length; i += segmentStride) {
        const segment = geometry.segments[i];
        if (segment.levelIndex % levelStride !== 0) continue;
        const pa = projectTopographyPoint(segment.a, cam, topoHeightScale, mode);
        const pb = projectTopographyPoint(segment.b, cam, topoHeightScale, mode);
        if (!isProjectedSegmentRenderable(pa, pb, 28)) continue;
        targetCtx.beginPath();
        targetCtx.moveTo(pa.x, pa.y);
        targetCtx.lineTo(pb.x, pb.y);
        targetCtx.stroke();
      }
      targetCtx.restore();
    }

    function drawTopographyWireframe(targetCtx, cam) {
      if (!state.layerVisible.topography) return;
      const topo = state.topography;
      if (!topo.loaded || topo.rows < 2 || topo.cols < 2) return;
      if (topo.mode !== 'wireframe3d' && topo.mode !== 'hybrid3d') return;
      const topoColor = ui.topoColor?.value || '#8dffcf';
      const topoOpacity = Number(ui.topoOpacity?.value || 0.68);
      const topoLineWidth = Number(ui.topoLineWidth?.value || 1.1);
      const topoHeightScale = Number(ui.topoHeightScale?.value || 0.26);
      const interactionLod = isInteractionLodActive();
      const globeMode = getMapProjectionMode() === 'globe';
      const geometry = buildTopographyWireframeGeometry();
      if (!geometry.segmentCount) return;
      let segmentStride = 1;
      if (interactionLod) {
        if (geometry.segmentCount > 22000) segmentStride = 8;
        else if (geometry.segmentCount > 12000) segmentStride = 6;
        else if (geometry.segmentCount > 6000) segmentStride = 4;
        else if (geometry.segmentCount > 2500) segmentStride = 3;
      } else if (geometry.segmentCount > 32000) {
        segmentStride = 2;
      }
      if (globeMode) {
        if (geometry.segmentCount > 24000) segmentStride = Math.max(segmentStride, interactionLod ? 10 : 4);
        else if (geometry.segmentCount > 12000) segmentStride = Math.max(segmentStride, interactionLod ? 8 : 3);
        else if (geometry.segmentCount > 6000) segmentStride = Math.max(segmentStride, interactionLod ? 5 : 2);
      }

      targetCtx.save();
      targetCtx.strokeStyle = hexToRgba(topoColor, topoOpacity);
      targetCtx.lineWidth = topoLineWidth;
      targetCtx.shadowColor = topoColor;
      targetCtx.shadowBlur = interactionLod ? 0 : 6;
      targetCtx.globalAlpha = 0.88;
      for (let i = 0; i < geometry.segments.length; i += segmentStride) {
        const segment = geometry.segments[i];
        const pa = projectTopographyPoint(segment.a, cam, topoHeightScale, topo.mode);
        const pb = projectTopographyPoint(segment.b, cam, topoHeightScale, topo.mode);
        if (!isProjectedSegmentRenderable(pa, pb, 28)) continue;
        targetCtx.beginPath();
        targetCtx.moveTo(pa.x, pa.y);
        targetCtx.lineTo(pb.x, pb.y);
        targetCtx.stroke();
      }
      targetCtx.restore();
    }

    function buildAnimatedPath() {
      const n = state.path.length;
      if (n < 2) return [];
      const routeProgress = getRouteProgressFromTimeline();
      const maxSeg = (n - 1) * routeProgress;
      const out = [];
      for (let i = 0; i < n - 1; i++) {
        const a = state.path[i];
        const b = state.path[i + 1];
        if (i + 1 <= maxSeg) {
          out.push(a);
          continue;
        }
        if (i <= maxSeg && i + 1 > maxSeg) {
          const k = maxSeg - i;
          out.push(a, { lat: a.lat + (b.lat - a.lat) * k, lng: a.lng + (b.lng - a.lng) * k, label: 'interp' });
        }
        break;
      }
      if (routeProgress >= 1) out.push(state.path[n - 1]);
      return out;
    }

    function drawPath(cam) {
      if (!state.layerVisible.path) return;
      const interactionLod = isInteractionLodActive();
      const pts = buildAnimatedPath();
      if (!pts.length) return;
      const c = ui.pathColor.value;
      const projected = pts.map(pt => {
        const w = geoToCameraWorld(pt.lat, pt.lng, getMapProjectionMode() === 'globe' ? 0.008 : 0.01);
        return project(w.x, w.y, w.z, cam);
      });

      ctx.save();
      ctx.strokeStyle = c;
      const pathOpacity = clamp(Number(ui.pathOpacity?.value || 0.82), 0.05, 1);
      ctx.lineWidth = Number(ui.pathWidth.value);
      ctx.shadowColor = c;
      for (let i = 0; i < projected.length - 1; i++) {
        const a = projected[i];
        const b = projected[i + 1];
        if (!isProjectedSegmentRenderable(a, b, 28)) continue;
        const z = (a.z + b.z) * 0.5;
        const dof = getDepthOfFieldForZ(z);
        ctx.globalAlpha = dof.alpha * pathOpacity;
        ctx.shadowBlur = interactionLod ? 0 : 8 + dof.blur;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawPins(cam) {
      if (!state.layerVisible.pins || !state.pins.length) return;
      const interactionLod = isInteractionLodActive();
      const c = ui.pinColor.value;
      const labelColor = ui.pinLabelColor?.value || c;
      const size = Number(ui.pinSize.value);
      const routeProgress = getRouteProgressFromTimeline();
      const showLabels = !interactionLod && state.pins.length <= 180;
      state.lastProjectedPins = [];

      ctx.save();
      ctx.font = "12px 'Orbitron', sans-serif";
      ctx.fillStyle = c;
      ctx.strokeStyle = c;
      ctx.shadowColor = c;
      ctx.shadowBlur = interactionLod ? 0 : 10;
      ctx.lineWidth = 1.2;

      const routeAnchors = state.timelineAnchors.length
        ? state.timelineAnchors.map(a => a.r)
        : state.pins.map((_, i) => (state.pins.length === 1 ? 0 : i / (state.pins.length - 1)));

      state.pins.forEach((pin, i) => {
        if (routeAnchors[i] > routeProgress + 1e-6) return;
        const globeMode = getMapProjectionMode() === 'globe';
        const baseW = geoToCameraWorld(pin.lat, pin.lng, 0);
        const tipW = geoToCameraWorld(pin.lat, pin.lng, globeMode ? 0.05 : -0.06);
        const base = project(baseW.x, baseW.y, baseW.z, cam);
        const top = project(tipW.x, tipW.y, tipW.z, cam);
        if (!isProjectedPointRenderable(top, 40) && !isProjectedSegmentRenderable(base, top, 40)) return;
        const dof = getDepthOfFieldForZ(top.z);
        ctx.globalAlpha = dof.alpha;
        ctx.shadowBlur = interactionLod ? 0 : 10 + dof.blur;
        state.lastProjectedPins.push({ id: pin.id, x: top.x, y: top.y });

        ctx.beginPath();
        ctx.moveTo(base.x, base.y);
        ctx.lineTo(top.x, top.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(top.x, top.y, size, 0, Math.PI * 2);
        ctx.stroke();

        if (pin.id === state.selectedPinId) {
          ctx.beginPath();
          ctx.arc(top.x, top.y, size + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (showLabels || pin.id === state.selectedPinId) {
          ctx.fillStyle = labelColor;
          if (pin.id === state.selectedPinId || isProjectedPointRenderable(top, 72)) {
            ctx.fillText(pin.label, top.x + size + 5, top.y - 3);
          }
          ctx.fillStyle = c;
        }
      });
      ctx.restore();
    }

    function drawHUD() {
      const interactionLod = isInteractionLodActive();
      ui.hudPins.textContent = `Pins: ${state.pins.length}`;
      ui.hudPath.textContent = `Path nodes: ${state.path.length}`;
      ui.hudTime.textContent = `Timeline: ${(state.progress * 100).toFixed(1)}%`;
      ui.hudCam.textContent = `Cam: y ${state.camera.yaw.toFixed(2)} p ${state.camera.pitch.toFixed(2)} z ${state.camera.zoom.toFixed(1)} fx ${state.camera.focusX.toFixed(2)} fz ${state.camera.focusZ.toFixed(2)}`;
      ui.hudFps.textContent = state.playing || interactionLod
        ? `FPS: ${state.perf.fps.toFixed(0)}${state.performanceMode ? ' PERF' : (interactionLod ? ' LOD' : '')}`
        : (state.performanceMode ? 'FPS: perf mode' : 'FPS: idle');
    }

    function drawCornerOrientationGlobe() {
      const interactionLod = isInteractionLodActive();
      const marginX = 66;
      const cy = 72;
      const cx = state.uiLayout.globeCorner === 'top-left' ? marginX : Math.max(66, state.dims.w - marginX);
      const r = 34;
      const camYaw = state.camera.yaw;
      const camPitch = state.camera.pitch;
      const accent = cssColorToHex(cssVar('--accent', '#7ddfff'), '#7ddfff');
      const accent2 = cssColorToHex(cssVar('--accent-2', '#8dffcf'), '#8dffcf');
      const muted = cssColorToHex(cssVar('--ds-text-muted', '#bdefff'), '#bdefff');
      const panelBg = cssColorToHex(cssVar('--ds-bg-elevated', '#0a141a'), '#0a141a');
      const panelLine = cssColorToHex(cssVar('--line', '#3a5a66'), '#3a5a66');
      const warn = cssColorToHex(cssVar('--ds-warning', '#ffe48c'), '#ffe48c');

      const projectSphere = (x, y, z) => {
        const cyw = Math.cos(camYaw);
        const syw = Math.sin(camYaw);
        const ctp = Math.cos(camPitch);
        const stp = Math.sin(camPitch);
        const x1 = x * cyw + z * syw;
        const z1 = -x * syw + z * cyw;
        const y2 = y * ctp - z1 * stp;
        const z2 = y * stp + z1 * ctp;
        return { x: cx + x1 * r, y: cy + y2 * r, z: z2 };
      };

      const drawCurve = (pointAt) => {
        let started = false;
        let prevFront = false;
        ctx.beginPath();
        const steps = interactionLod ? 48 : 120;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          const p = pointAt(t);
          const q = projectSphere(p.x, p.y, p.z);
          const front = q.z >= 0;
          if (!started || front !== prevFront) {
            if (started) ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(q.x, q.y);
            started = true;
          } else {
            ctx.lineTo(q.x, q.y);
          }
          prevFront = front;
          ctx.strokeStyle = front ? hexToRgba(accent, 0.58) : hexToRgba(accent, 0.18);
        }
        if (started) ctx.stroke();
      };

      ctx.save();
      ctx.fillStyle = hexToRgba(panelBg, 0.62);
      ctx.strokeStyle = hexToRgba(panelLine, 0.72);
      ctx.lineWidth = 1;
      ctx.shadowColor = hexToRgba(accent2, 0.45);
      ctx.shadowBlur = interactionLod ? 0 : 6;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (const latDeg of [-60, -30, 0, 30, 60]) {
        const lat = latDeg * Math.PI / 180;
        const y = Math.sin(lat);
        const s = Math.cos(lat);
        drawCurve((t) => ({ x: Math.cos(t) * s, y, z: Math.sin(t) * s }));
      }
      for (let lonDeg = 0; lonDeg < 180; lonDeg += 30) {
        const lon = lonDeg * Math.PI / 180;
        drawCurve((t) => ({ x: Math.cos(t) * Math.cos(lon), y: Math.sin(t), z: Math.cos(t) * Math.sin(lon) }));
      }

      const anchors = [
        { label: 'N', v: { x: 0, y: -1, z: 0 }, color: warn },
        { label: 'E', v: { x: 1, y: 0, z: 0 }, color: muted },
        { label: 'S', v: { x: 0, y: 1, z: 0 }, color: muted },
        { label: 'W', v: { x: -1, y: 0, z: 0 }, color: muted }
      ].map(a => ({ ...a, p: projectSphere(a.v.x, a.v.y, a.v.z) }));

      const north = anchors[0].p;
      const vx = north.x - cx;
      const vy = north.y - cy;
      const vlen = Math.max(Math.hypot(vx, vy), 1e-6);
      const nx = vx / vlen;
      const ny = vy / vlen;
      const ax = cx + nx * (r - 7);
      const ay = cy + ny * (r - 7);
      ctx.strokeStyle = hexToRgba(warn, 0.95);
      ctx.fillStyle = hexToRgba(warn, 0.95);
      ctx.shadowColor = hexToRgba(warn, 0.68);
      ctx.shadowBlur = interactionLod ? 0 : 5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ax, ay);
      ctx.stroke();
      const lx = -ny;
      const ly = nx;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - nx * 8 + lx * 4, ay - ny * 8 + ly * 4);
      ctx.lineTo(ax - nx * 8 - lx * 4, ay - ny * 8 - ly * 4);
      ctx.closePath();
      ctx.fill();

      const south = anchors[2].p;
      ctx.shadowBlur = 0;
      ctx.fillStyle = hexToRgba(warn, 0.9);
      ctx.beginPath();
      ctx.arc(north.x, north.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hexToRgba(accent2, 0.85);
      ctx.beginPath();
      ctx.arc(south.x, south.y, 1.9, 0, Math.PI * 2);
      ctx.fill();

      if (!interactionLod) {
        ctx.font = '10px monospace';
        for (const a of anchors) {
          const dx = a.p.x - cx;
          const dy = a.p.y - cy;
          const len = Math.max(Math.hypot(dx, dy), 1e-6);
          const tx = a.p.x + (dx / len) * 9 - 3;
          const ty = a.p.y + (dy / len) * 9 + 3;
          ctx.fillStyle = hexToRgba(a.color, a.label === 'N' ? 0.98 : 0.88);
          ctx.fillText(a.label, tx, ty);
        }
      }
      ctx.restore();
    }

    function drawCameraFocusMarker(cam) {
      const interactionLod = isInteractionLodActive();
      const p = project(0, 0, 0, cam);
      const size = 8;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 210, 120, 0.9)';
      ctx.lineWidth = 1.2;
      ctx.shadowColor = 'rgba(255, 210, 120, 0.7)';
      ctx.shadowBlur = interactionLod ? 0 : 6;
      ctx.beginPath();
      ctx.moveTo(p.x - size, p.y);
      ctx.lineTo(p.x + size, p.y);
      ctx.moveTo(p.x, p.y - size);
      ctx.lineTo(p.x, p.y + size);
      ctx.stroke();
      if (!interactionLod) {
        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(255, 230, 170, 0.95)';
        ctx.fillText('FOCUS', p.x + size + 4, p.y - size - 2);
      }
      ctx.restore();
    }

    return {
      drawTerrain,
      drawCountryOutline,
      drawWorldContextOutline,
      drawGeoGrid,
      drawTopographyContours,
      drawTopographyWireframe,
      drawPath,
      drawPins,
      drawHUD,
      drawCornerOrientationGlobe,
      drawCameraFocusMarker
    };
  }

  window.TrekulateRenderLayers = { create };
})();
