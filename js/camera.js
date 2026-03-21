(() => {
  function create(config) {
    const {
      state,
      ui,
      constants,
      deps
    } = config;
    const {
      layoutStorageKey,
      CAMERA_DEFAULT
    } = constants;
    const {
      clamp,
      requestRender,
      markStaticDirty,
      resize,
      updateDebugView,
      refreshDebugIfVisible,
      toast,
      setGeoWindow,
      mapToScene,
      getCameraCache,
      project
    } = deps;

    function saveViewerLayoutPrefs() {
      try {
        localStorage.setItem(layoutStorageKey, JSON.stringify(state.uiLayout));
      } catch (err) {
        // Ignore storage failures for layout prefs.
      }
    }

    function applyViewerLayoutPrefs() {
      if (!ui.viewerPanel) return;
      ui.viewerPanel.dataset.toolbarPos = state.uiLayout.toolbarPos;
      ui.viewerPanel.dataset.hudSide = state.uiLayout.hudSide;
      ui.viewerPanel.dataset.cameraSide = state.uiLayout.cameraSide;
      ui.viewerPanel.dataset.globeCorner = state.uiLayout.globeCorner;
      if (ui.layoutToolbarPos) ui.layoutToolbarPos.value = state.uiLayout.toolbarPos;
      if (ui.layoutHudSide) ui.layoutHudSide.value = state.uiLayout.hudSide;
      if (ui.layoutCameraSide) ui.layoutCameraSide.value = state.uiLayout.cameraSide;
      if (ui.layoutGlobeCorner) ui.layoutGlobeCorner.value = state.uiLayout.globeCorner;
      requestRender();
    }

    function loadViewerLayoutPrefs() {
      try {
        const raw = localStorage.getItem(layoutStorageKey);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return;
        state.uiLayout = {
          toolbarPos: parsed.toolbarPos === 'top-left' || parsed.toolbarPos === 'top-right' ? parsed.toolbarPos : 'top-center',
          hudSide: parsed.hudSide === 'right' ? 'right' : 'left',
          cameraSide: parsed.cameraSide === 'left' ? 'left' : 'right',
          globeCorner: parsed.globeCorner === 'top-left' ? 'top-left' : 'top-right'
        };
      } catch (err) {
        // Ignore invalid saved layout state.
      }
    }

    function setViewerLayoutPrefs(patch = {}) {
      state.uiLayout = {
        ...state.uiLayout,
        ...patch
      };
      saveViewerLayoutPrefs();
      applyViewerLayoutPrefs();
    }

    function syncPerformanceModeButton() {
      if (!ui.quickPerfMode) return;
      ui.quickPerfMode.classList.toggle('is-on', !!state.performanceMode);
      ui.quickPerfMode.classList.toggle('is-off', !state.performanceMode);
      ui.quickPerfMode.setAttribute('aria-pressed', String(!!state.performanceMode));
      ui.quickPerfMode.title = state.performanceMode
        ? 'Performance Mode on. Click to restore full rendering.'
        : 'Performance Mode off. Click for faster working view.';
    }

    function setPerformanceMode(on) {
      const next = !!on;
      if (state.performanceMode === next) return;
      state.performanceMode = next;
      syncPerformanceModeButton();
      resize();
      markStaticDirty();
      updateDebugView();
      requestRender();
      toast(next ? 'Performance Mode enabled' : 'Performance Mode disabled', 'ok', 1200);
    }

    function getMapProjectionMode() {
      return state.mapProjection === 'globe' ? 'globe' : 'flat';
    }

    function syncProjectionButtons() {
      if (!ui.mapProjectionFlat || !ui.mapProjectionGlobe) return;
      const isGlobe = getMapProjectionMode() === 'globe';
      ui.mapProjectionFlat.classList.toggle('is-active', !isGlobe);
      ui.mapProjectionGlobe.classList.toggle('is-active', isGlobe);
      ui.mapProjectionFlat.setAttribute('aria-pressed', String(!isGlobe));
      ui.mapProjectionGlobe.setAttribute('aria-pressed', String(isGlobe));
    }

    function syncCameraToUI() {
      if (ui.cameraYaw) ui.cameraYaw.value = String(state.camera.yaw);
      if (ui.cameraPitch) ui.cameraPitch.value = String(state.camera.pitch);
      if (ui.cameraZoom) ui.cameraZoom.value = String(state.camera.zoom);
      if (ui.cameraPanX) ui.cameraPanX.value = String(state.camera.focusX);
      if (ui.cameraPanZ) ui.cameraPanZ.value = String(state.camera.focusZ);
      if (ui.cameraPedestal) ui.cameraPedestal.value = String(state.camera.focusY);
      if (ui.cameraRoll) ui.cameraRoll.value = String(state.camera.roll);
      if (ui.cameraFocal) ui.cameraFocal.value = String(state.camera.focalLength);
      if (ui.cameraLens) ui.cameraLens.value = String(state.camera.lensAngle);
      if (ui.cameraFocusDepth) ui.cameraFocusDepth.value = String(state.camera.focusDepth);
      if (ui.cameraDof) ui.cameraDof.value = String(state.camera.dofStrength);
    }

    function setCameraState(patch = {}, options = {}) {
      const { skipRender = false, syncUI = true } = options;
      const yaw = patch.yaw ?? state.camera.yaw;
      state.camera.yaw = Number.isFinite(yaw) ? yaw : state.camera.yaw;
      const pitch = patch.pitch ?? state.camera.pitch;
      state.camera.pitch = Number.isFinite(pitch) ? pitch : state.camera.pitch;
      state.camera.zoom = clamp(patch.zoom ?? state.camera.zoom, 0.14, 24);
      state.camera.focusX = clamp(patch.focusX ?? patch.panX ?? state.camera.focusX, -8, 8);
      state.camera.focusZ = clamp(patch.focusZ ?? patch.panZ ?? state.camera.focusZ, -8, 8);
      state.camera.focusY = clamp(patch.focusY ?? patch.pedestal ?? state.camera.focusY, -1.2, 1.2);
      state.camera.roll = clamp(patch.roll ?? state.camera.roll, -3.14, 3.14);
      state.camera.focalLength = clamp(patch.focalLength ?? state.camera.focalLength, 18, 120);
      state.camera.lensAngle = clamp(patch.lensAngle ?? state.camera.lensAngle, 22, 95);
      state.camera.focusDepth = clamp(patch.focusDepth ?? state.camera.focusDepth, 0.14, 24);
      state.camera.dofStrength = clamp(patch.dofStrength ?? state.camera.dofStrength, 0, 1.4);
      if (syncUI) syncCameraToUI();
      markStaticDirty();
      refreshDebugIfVisible();
      if (!skipRender) requestRender();
    }

    function setCamera(yaw, pitch, zoom, options = {}) {
      setCameraState({ yaw, pitch, zoom }, options);
    }

    function setCameraPreset(name) {
      const presets = {
        iso: { yaw: -Math.PI / 4, pitch: 0.62, roll: 0, zoom: 3.8 },
        top: { yaw: 0, pitch: Math.PI / 2, roll: 0, zoom: 3.6 },
        bottom: { yaw: 0, pitch: -Math.PI / 2, roll: 0, zoom: 3.6 },
        left: { yaw: -Math.PI / 2, pitch: 0.93, roll: 0, zoom: 3.4 },
        right: { yaw: Math.PI / 2, pitch: 0.93, roll: 0, zoom: 3.4 },
        front: { yaw: 0, pitch: 0.93, roll: 0, zoom: 3.4 },
        back: { yaw: Math.PI, pitch: 0.93, roll: 0, zoom: 3.4 },
        home: { ...CAMERA_DEFAULT }
      };
      const next = presets[name];
      if (!next) return;
      setCameraState(next);
    }

    function collectFrameWorldPoints(limit = 220) {
      const source = [...state.pins, ...state.path, ...state.countryOutline].filter(deps.isValidGeoPoint);
      if (!source.length) {
        return [
          { x: -1, y: 0, z: -1 },
          { x: 1, y: 0, z: -1 },
          { x: -1, y: 0, z: 1 },
          { x: 1, y: 0, z: 1 }
        ];
      }
      const step = Math.max(1, Math.ceil(source.length / limit));
      const points = [];
      for (let i = 0; i < source.length; i += step) {
        points.push(mapToScene(source[i].lat, source[i].lng, 0));
      }
      return points;
    }

    function fitMapToFrame() {
      const points = collectFrameWorldPoints();
      const test = (zoom) => {
        const cam = getCameraCache({ ...state.camera, zoom, focusX: 0, focusZ: 0 });
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        for (const w of points) {
          const p = project(w.x, w.y ?? 0, w.z, cam);
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        }
        return { width: maxX - minX, height: maxY - minY };
      };

      let lo = 0.35;
      let hi = 16;
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) * 0.5;
        const frame = test(mid);
        const fits = frame.width <= state.dims.w * 0.82 && frame.height <= state.dims.h * 0.74;
        if (fits) hi = mid;
        else lo = mid;
      }
      setCameraState({ focusX: 0, focusZ: 0, zoom: hi });
    }

    function homeView() {
      fitMapToFrame();
      const pitch = getMapProjectionMode() === 'globe' ? -0.28 : 0.48;
      setCameraState({
        yaw: -0.52,
        pitch,
        roll: 0,
        focusX: 0,
        focusZ: 0
      });
    }

    function nudgeGeoWindow(dLat, dLng) {
      const step = Math.max(0.01, state.geoWindow.spanDeg * 0.08);
      setGeoWindow({
        centerLat: state.geoWindow.centerLat + dLat * step,
        centerLng: state.geoWindow.centerLng + dLng * step
      }, { manual: true });
    }

    return {
      saveViewerLayoutPrefs,
      applyViewerLayoutPrefs,
      loadViewerLayoutPrefs,
      setViewerLayoutPrefs,
      syncPerformanceModeButton,
      setPerformanceMode,
      getMapProjectionMode,
      syncProjectionButtons,
      syncCameraToUI,
      setCameraState,
      setCamera,
      setCameraPreset,
      homeView,
      fitMapToFrame,
      nudgeGeoWindow
    };
  }

  window.TrekulateCamera = {
    create
  };
})();
