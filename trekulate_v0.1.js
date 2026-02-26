const canvas = document.getElementById('view');
const ctx = canvas.getContext('2d');

const ui = {
  themeSelectApp: document.getElementById('themeSelectApp'),
  tabMapping: document.getElementById('tabMapping'),
  tabRendering: document.getElementById('tabRendering'),
  tabCamera: document.getElementById('tabCamera'),
  tabData: document.getElementById('tabData'),
  tabRaw: document.getElementById('tabRaw'),
  tabDebug: document.getElementById('tabDebug'),
  tabExport: document.getElementById('tabExport'),
  tabSettings: document.getElementById('tabSettings'),
  pinData: document.getElementById('pinData'),
  loadPins: document.getElementById('loadPins'),
  sampleRoute: document.getElementById('sampleRoute'),
  clearRoute: document.getElementById('clearRoute'),
  playPause: document.getElementById('playPause'),
  reset: document.getElementById('reset'),
  timelineModeBtn: document.getElementById('timelineModeBtn'),
  timelineMarkers: document.getElementById('timelineMarkers'),
  timelinePlayhead: document.getElementById('timelinePlayhead'),
  timeline: document.getElementById('timeline'),
  speed: document.getElementById('speed'),
  terrainColor: document.getElementById('terrainColor'),
  terrainGlow: document.getElementById('terrainGlow'),
  terrainPattern: document.getElementById('terrainPattern'),
  terrainDensity: document.getElementById('terrainDensity'),
  pathColor: document.getElementById('pathColor'),
  pathWidth: document.getElementById('pathWidth'),
  pinColor: document.getElementById('pinColor'),
  pinSize: document.getElementById('pinSize'),
  geoGridColor: document.getElementById('geoGridColor'),
  geoGridOpacity: document.getElementById('geoGridOpacity'),
  geoGridWidth: document.getElementById('geoGridWidth'),
  geoLatStep: document.getElementById('geoLatStep'),
  geoLngStep: document.getElementById('geoLngStep'),
  geoLabelOpacity: document.getElementById('geoLabelOpacity'),
  geoStepLink: document.getElementById('geoStepLink'),
  visPins: document.getElementById('visPins'),
  visPath: document.getElementById('visPath'),
  visOutline: document.getElementById('visOutline'),
  visGeoGrid: document.getElementById('visGeoGrid'),
  visTopography: document.getElementById('visTopography'),
  visSeaLevel: document.getElementById('visSeaLevel'),
  outlineColor: document.getElementById('outlineColor'),
  outlineOpacity: document.getElementById('outlineOpacity'),
  outlineWidth: document.getElementById('outlineWidth'),
  topoColor: document.getElementById('topoColor'),
  topoOpacity: document.getElementById('topoOpacity'),
  topoLineWidth: document.getElementById('topoLineWidth'),
  topoHeightScale: document.getElementById('topoHeightScale'),
  wireOpacity: document.getElementById('wireOpacity'),
  terrainHeight: document.getElementById('terrainHeight'),
  cameraYaw: document.getElementById('cameraYaw'),
  cameraPitch: document.getElementById('cameraPitch'),
  cameraZoom: document.getElementById('cameraZoom'),
  cameraPanX: document.getElementById('cameraPanX'),
  cameraPanZ: document.getElementById('cameraPanZ'),
  cameraPedestal: document.getElementById('cameraPedestal'),
  cameraRoll: document.getElementById('cameraRoll'),
  cameraFocal: document.getElementById('cameraFocal'),
  cameraLens: document.getElementById('cameraLens'),
  cameraFocusDepth: document.getElementById('cameraFocusDepth'),
  cameraDof: document.getElementById('cameraDof'),
  resetCamera: document.getElementById('resetCamera'),
  viewHome: document.getElementById('viewHome'),
  viewFit: document.getElementById('viewFit'),
  viewIso: document.getElementById('viewIso'),
  viewTop: document.getElementById('viewTop'),
  viewBottom: document.getElementById('viewBottom'),
  viewLeft: document.getElementById('viewLeft'),
  viewRight: document.getElementById('viewRight'),
  viewFront: document.getElementById('viewFront'),
  viewBack: document.getElementById('viewBack'),
  pinList: document.getElementById('pinList'),
  pinTableBody: document.getElementById('pinTableBody'),
  pinLabel: document.getElementById('pinLabel'),
  pinTimestamp: document.getElementById('pinTimestamp'),
  pinNote: document.getElementById('pinNote'),
  pinSource: document.getElementById('pinSource'),
  savePinMeta: document.getElementById('savePinMeta'),
  cancelPinMeta: document.getElementById('cancelPinMeta'),
  deletePin: document.getElementById('deletePin'),
  clearInput: document.getElementById('clearInput'),
  parsePreview: document.getElementById('parsePreview'),
  rawJsonView: document.getElementById('rawJsonView'),
  debugView: document.getElementById('debugView'),
  refreshDebug: document.getElementById('refreshDebug'),
  refreshRaw: document.getElementById('refreshRaw'),
  toastWrap: document.getElementById('toastWrap'),
  confirmDeleteDialog: document.getElementById('confirmDeleteDialog'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  helpDialog: document.getElementById('helpDialog'),
  helpDialogTitle: document.getElementById('helpDialogTitle'),
  helpDialogBody: document.getElementById('helpDialogBody'),
  closeHelpDialogBtn: document.getElementById('closeHelpDialogBtn'),
  panelHelpButtons: Array.from(document.querySelectorAll('.panel-help')),
  pinParseStatus: document.getElementById('pinParseStatus'),
  countryName: document.getElementById('countryName'),
  outlineMainlandOnly: document.getElementById('outlineMainlandOnly'),
  outlineSegmentSelect: document.getElementById('outlineSegmentSelect'),
  centerOutlineSegment: document.getElementById('centerOutlineSegment'),
  showGeoGrid: document.getElementById('showGeoGrid'),
  geoCenterLat: document.getElementById('geoCenterLat'),
  geoCenterLng: document.getElementById('geoCenterLng'),
  geoSpanDeg: document.getElementById('geoSpanDeg'),
  geoFineScale: document.getElementById('geoFineScale'),
  mapProjection: document.getElementById('mapProjection'),
  mapSettingsHint: document.getElementById('mapSettingsHint'),
  geoNudgeN: document.getElementById('geoNudgeN'),
  geoNudgeS: document.getElementById('geoNudgeS'),
  geoNudgeE: document.getElementById('geoNudgeE'),
  geoNudgeW: document.getElementById('geoNudgeW'),
  fitGeoWindow: document.getElementById('fitGeoWindow'),
  loadCountry: document.getElementById('loadCountry'),
  topoResolution: document.getElementById('topoResolution'),
  topoContours: document.getElementById('topoContours'),
  topoMode: document.getElementById('topoMode'),
  loadTopography: document.getElementById('loadTopography'),
  clearTopography: document.getElementById('clearTopography'),
  topoStatus: document.getElementById('topoStatus'),
  exportPng: document.getElementById('exportPng'),
  exportStatus: document.getElementById('exportStatus'),
  hudPins: document.getElementById('hudPins'),
  hudPath: document.getElementById('hudPath'),
  hudTime: document.getElementById('hudTime'),
  hudCam: document.getElementById('hudCam'),
  hudFps: document.getElementById('hudFps')
};
ui.tabButtons = [ui.tabMapping, ui.tabRendering, ui.tabCamera, ui.tabData, ui.tabRaw, ui.tabDebug, ui.tabExport, ui.tabSettings].filter(Boolean);
ui.tabPanels = Array.from(document.querySelectorAll('[data-tab-panel]'));

const themeStorageKey = 'trekulate.theme';
const CAMERA_DEFAULT = {
  yaw: -0.76,
  pitch: 0.93,
  zoom: 3.4,
  focusX: 0,
  focusZ: 0,
  focusY: 0,
  roll: 0,
  focalLength: 50,
  lensAngle: 58,
  focusDepth: 3.6,
  dofStrength: 0
};

const state = {
  pins: [],
  path: [],
  countryOutline: [],
  countryOutlineRaw: [],
  outlineFilterMode: 'mainland',
  outlineSegmentsMeta: [],
  selectedOutlineSegmentIndex: 0,
  showGeoGrid: true,
  geoStepLinked: true,
  layerVisible: {
    pins: true,
    path: true,
    outline: true,
    geoGrid: true,
    topography: true,
    seaLevel: true
  },
  geoWindow: {
    centerLat: 0,
    centerLng: 0,
    spanDeg: 60,
    fineScale: 1,
    manual: false
  },
  mapProjection: 'flat',
  playing: false,
  progress: 0,
  lastFrame: 0,
  dims: { w: 0, h: 0, ratio: 1 },
  bounds: { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 },
  camera: { ...CAMERA_DEFAULT },
  interaction: { dragging: false, moved: false, x: 0, y: 0, mode: '', button: -1 },
  renderQueued: false,
  staticDirty: true,
  staticLayer: { canvas: document.createElement('canvas'), ctx: null, key: '' },
  scanlinePattern: null,
  terrainGrid: { size: 32, points: [] },
  topography: {
    loaded: false,
    values: [],
    rows: 0,
    cols: 0,
    latList: [],
    lngList: [],
    min: 0,
    max: 0,
    mode: 'contour2d',
    contourCount: 10,
    source: 'opentopodata/aster30m'
  },
  selectedPinId: null,
  routeDirty: false,
  timelineMode: 'uniform',
  timelineAnchors: [],
  metadataDirty: false,
  metadataSnapshot: null,
  nextPinId: 1,
  lastProjectedPins: [],
  perf: { fps: 0, frames: 0, sampleStart: 0 },
  geoCache: {
    key: '',
    map: new Map()
  }
};
state.staticLayer.ctx = state.staticLayer.canvas.getContext('2d');
let wheelSyncTimer = null;

function cssVar(name, fallback = '') {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function cssColorToHex(color, fallback = '#ffffff') {
  const probe = document.createElement('span');
  probe.style.color = color;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const m = resolved.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return fallback;
  return '#' + [m[1], m[2], m[3]].map(n => Number(n).toString(16).padStart(2, '0')).join('');
}

function initRenderControlDefaultsFromTheme() {
  ui.terrainColor.value = cssColorToHex(cssVar('--accent', '#3cd7ff'), '#3cd7ff');
  ui.pathColor.value = cssColorToHex(cssVar('--accent-2', '#8dffcf'), '#8dffcf');
  ui.pinColor.value = cssColorToHex(cssVar('--text', '#f2fdff'), '#f2fdff');
}

function applyTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem(themeStorageKey, name);
  ui.themeSelectApp.value = name;
  initRenderControlDefaultsFromTheme();
  markStaticDirty();
  requestRender();
}

function setStatus(text) {
  ui.pinParseStatus.textContent = text;
}

function setTopoStatus(text) {
  if (ui.topoStatus) ui.topoStatus.textContent = text;
}

function setExportStatus(text) {
  if (ui.exportStatus) ui.exportStatus.textContent = text;
}

function ensureNetworkContext(taskName = 'network request') {
  const blocked = location.protocol === 'file:';
  if (!blocked) return true;
  const msg = `Cannot run ${taskName} from file://. Start a local server (python -m http.server 8080), then open http://localhost:8080/.`;
  setStatus(msg);
  setTopoStatus(msg);
  toast(msg, 'warn', 3500);
  return false;
}

function isValidGeoPoint(p) {
  return !!p && Number.isFinite(p.lat) && Number.isFinite(p.lng);
}

function splitOutlineSegments(path) {
  const segments = [];
  let current = [];
  for (const pt of path || []) {
    if (!isValidGeoPoint(pt)) {
      if (current.length) segments.push(current);
      current = [];
      continue;
    }
    current.push(pt);
  }
  if (current.length) segments.push(current);
  return segments;
}

function normalizeLongitudeToReference(lng, refLng) {
  if (!Number.isFinite(lng) || !Number.isFinite(refLng)) return lng;
  let out = lng;
  while (out - refLng > 180) out -= 360;
  while (out - refLng < -180) out += 360;
  return out;
}

function normalizeSegmentLongitudes(points) {
  if (!Array.isArray(points) || !points.length) return [];
  const out = [];
  let prev = Number(points[0].lng);
  for (let i = 0; i < points.length; i++) {
    const lat = Number(points[i].lat);
    const lngRaw = Number(points[i].lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lngRaw)) continue;
    const lng = i === 0 ? lngRaw : normalizeLongitudeToReference(lngRaw, prev);
    out.push({ lat, lng });
    prev = lng;
  }
  return out;
}

function downsampleOutlinePath(path, maxPoints = 1700) {
  const segments = splitOutlineSegments(path);
  if (!segments.length) return [];
  const total = segments.reduce((a, s) => a + s.length, 0);
  if (total <= maxPoints) {
    const out = [];
    segments.forEach((seg, i) => {
      out.push(...seg);
      if (i < segments.length - 1) out.push(null);
    });
    return out;
  }
  const stride = Math.max(1, Math.ceil(total / maxPoints));
  const out = [];
  segments.forEach((seg, i) => {
    for (let k = 0; k < seg.length; k += stride) out.push(seg[k]);
    if (out[out.length - 1] !== seg[seg.length - 1]) out.push(seg[seg.length - 1]);
    if (i < segments.length - 1) out.push(null);
  });
  return out;
}

function polygonArea2D(points) {
  if (!Array.isArray(points) || points.length < 3) return 0;
  let s = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    s += a.lng * b.lat - b.lng * a.lat;
  }
  return Math.abs(s) * 0.5;
}

function segmentCentroid(points) {
  if (!Array.isArray(points) || !points.length) return { lat: 0, lng: 0 };
  let lat = 0;
  let lng = 0;
  for (const p of points) {
    lat += p.lat;
    lng += p.lng;
  }
  return { lat: lat / points.length, lng: lng / points.length };
}

function populateOutlineSegmentSelect() {
  if (!ui.outlineSegmentSelect) return;
  const sel = ui.outlineSegmentSelect;
  sel.innerHTML = '';
  if (!state.outlineSegmentsMeta.length) {
    const opt = document.createElement('option');
    opt.value = '0';
    opt.textContent = 'No landmasses loaded';
    sel.appendChild(opt);
    sel.disabled = true;
    if (ui.centerOutlineSegment) ui.centerOutlineSegment.disabled = true;
    return;
  }
  state.outlineSegmentsMeta.forEach((meta, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `#${idx + 1} (${meta.points} pts, ${meta.area.toFixed(2)} area)`;
    sel.appendChild(opt);
  });
  state.selectedOutlineSegmentIndex = clamp(state.selectedOutlineSegmentIndex, 0, state.outlineSegmentsMeta.length - 1);
  sel.value = String(state.selectedOutlineSegmentIndex);
  sel.disabled = false;
  if (ui.centerOutlineSegment) ui.centerOutlineSegment.disabled = false;
}

function centerOnSelectedOutlineSegment() {
  const idx = clamp(state.selectedOutlineSegmentIndex, 0, Math.max(0, state.outlineSegmentsMeta.length - 1));
  const meta = state.outlineSegmentsMeta[idx];
  if (!meta) {
    setStatus('No landmass selected.');
    return;
  }
  setGeoWindow({ centerLat: meta.centroid.lat, centerLng: meta.centroid.lng }, { manual: true });
  setCameraState({ focusX: 0, focusZ: 0 });
  setStatus(`Centered landmass #${idx + 1}.`);
}

function applyCountryOutlineFilter() {
  const segments = splitOutlineSegments(state.countryOutlineRaw);
  state.outlineSegmentsMeta = [];
  if (!segments.length) {
    state.countryOutline = [];
    populateOutlineSegmentSelect();
    updateBounds();
    updateRawView();
    updateDebugView();
    requestRender();
    return;
  }

  let chosen = segments;
  if (state.outlineFilterMode === 'mainland' && segments.length > 1) {
    let best = segments[0];
    let bestArea = polygonArea2D(best);
    for (let i = 1; i < segments.length; i++) {
      const area = polygonArea2D(segments[i]);
      if (area > bestArea) {
        best = segments[i];
        bestArea = area;
      }
    }
    chosen = [best];
  }

  state.outlineSegmentsMeta = segments.map((seg, idx) => ({
    index: idx,
    area: polygonArea2D(seg),
    points: seg.length,
    centroid: segmentCentroid(seg)
  })).sort((a, b) => b.area - a.area);
  if (state.selectedOutlineSegmentIndex >= state.outlineSegmentsMeta.length) state.selectedOutlineSegmentIndex = 0;
  populateOutlineSegmentSelect();

  const merged = [];
  chosen.forEach((seg, i) => {
    merged.push(...seg);
    if (i < chosen.length - 1) merged.push(null);
  });
  state.countryOutline = downsampleOutlinePath(merged, 1700);
  updateBounds();
  updateRawView();
  updateDebugView();
  requestRender();
}

function buildOutlinePathFromGeoJSON(geojson) {
  const out = [];
  if (!geojson || !Array.isArray(geojson.coordinates)) return out;
  const addRing = (ring) => {
    if (!Array.isArray(ring)) return;
    const points = [];
    for (const pair of ring) {
      const lng = Number(pair?.[0]);
      const lat = Number(pair?.[1]);
      if (Number.isFinite(lat) && Number.isFinite(lng)) points.push({ lat, lng });
    }
    const normalized = normalizeSegmentLongitudes(points);
    if (!normalized.length) return;
    out.push(...normalized);
    if (out.length && out[out.length - 1] !== null) out.push(null);
  };
  if (geojson.type === 'Polygon') {
    for (const ring of geojson.coordinates) addRing(ring);
  } else if (geojson.type === 'MultiPolygon') {
    for (const poly of geojson.coordinates) {
      for (const ring of poly) addRing(ring);
    }
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

function toast(message, type = 'ok', timeout = 1800) {
  if (!ui.toastWrap) return;
  const node = document.createElement('div');
  node.className = `toast ${type}`;
  node.textContent = message;
  ui.toastWrap.appendChild(node);
  setTimeout(() => {
    node.remove();
  }, timeout);
}

function setButtonBusy(btn, busy, busyText = 'Working...') {
  if (!btn) return;
  if (busy) {
    if (!btn.dataset.idleLabel) btn.dataset.idleLabel = btn.textContent || '';
    btn.classList.add('is-busy');
    btn.disabled = true;
    btn.textContent = busyText;
  } else {
    btn.classList.remove('is-busy');
    btn.disabled = false;
    if (btn.dataset.idleLabel) btn.textContent = btn.dataset.idleLabel;
  }
}

function setLayerToggleButton(btn, isOn) {
  if (!btn) return;
  btn.classList.toggle('is-on', !!isOn);
  if (btn === ui.geoStepLink) {
    btn.innerHTML = '<i class="iconoir-link" aria-hidden="true"></i>';
    return;
  }
  btn.innerHTML = isOn
    ? '<i class="iconoir-eye" aria-hidden="true"></i>'
    : '<i class="iconoir-eye-closed" aria-hidden="true"></i>';
}

function syncLayerToggleButtons() {
  setLayerToggleButton(ui.visPins, state.layerVisible.pins);
  setLayerToggleButton(ui.visPath, state.layerVisible.path);
  setLayerToggleButton(ui.visOutline, state.layerVisible.outline);
  setLayerToggleButton(ui.visGeoGrid, state.layerVisible.geoGrid);
  setLayerToggleButton(ui.visTopography, state.layerVisible.topography);
  setLayerToggleButton(ui.visSeaLevel, state.layerVisible.seaLevel);
  setLayerToggleButton(ui.geoStepLink, state.geoStepLinked);
}

function setLayerVisibility(layerKey, on) {
  if (!(layerKey in state.layerVisible)) return;
  state.layerVisible[layerKey] = !!on;
  if (layerKey === 'geoGrid') state.showGeoGrid = !!on;
  syncLayerToggleButtons();
  markStaticDirty();
  updateDebugView();
  requestRender();
}

function setupCollapsibleGroups() {
  const groups = Array.from(document.querySelectorAll('.group'));
  for (const group of groups) {
    let head = group.querySelector(':scope > .group-head');
    if (!head) {
      const title = group.querySelector(':scope > h3');
      if (!title) continue;
      head = document.createElement('div');
      head.className = 'group-head';
      group.insertBefore(head, title);
      head.appendChild(title);
    }
    if (head.querySelector('.group-toggle')) continue;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ds-btn group-toggle';
    toggle.title = 'Collapse/expand section';
    toggle.innerHTML = '<i class="iconoir-nav-arrow-down" aria-hidden="true"></i>';
    toggle.addEventListener('click', () => {
      const collapsed = group.classList.toggle('is-collapsed');
      toggle.innerHTML = collapsed
        ? '<i class="iconoir-nav-arrow-right" aria-hidden="true"></i>'
        : '<i class="iconoir-nav-arrow-down" aria-hidden="true"></i>';
    });
    head.appendChild(toggle);
  }
}

function updateRawView() {
  if (!ui.rawJsonView) return;
  const payload = {
    pins: state.pins,
    path: state.path,
    countryOutline: state.countryOutline,
    countryOutlineRaw: state.countryOutlineRaw,
    outlineFilterMode: state.outlineFilterMode,
    selectedOutlineSegmentIndex: state.selectedOutlineSegmentIndex,
    outlineSegmentsMeta: state.outlineSegmentsMeta,
    showGeoGrid: state.showGeoGrid,
    geoStepLinked: state.geoStepLinked,
    layerVisible: state.layerVisible,
    geoWindow: state.geoWindow,
    mapProjection: state.mapProjection,
    topography: {
      loaded: state.topography.loaded,
      rows: state.topography.rows,
      cols: state.topography.cols,
      min: state.topography.min,
      max: state.topography.max,
      mode: state.topography.mode,
      contourCount: state.topography.contourCount,
      source: state.topography.source
    },
    routeDirty: state.routeDirty,
    timelineMode: state.timelineMode,
    timelineAnchors: state.timelineAnchors
  };
  ui.rawJsonView.value = JSON.stringify(payload, null, 2);
}

function updateDebugView() {
  if (!ui.debugView) return;
  const b = state.bounds;
  const latSpan = Math.max(b.maxLat - b.minLat, 1e-6);
  const lngSpan = Math.max(b.maxLng - b.minLng, 1e-6);
  const maxSpan = Math.max(latSpan, lngSpan);
  const segments = splitOutlineSegments(state.countryOutline);
  const outlinePts = segments.reduce((a, s) => a + s.length, 0);
  let rawMinLng = Infinity;
  let rawMaxLng = -Infinity;
  for (const seg of segments) {
    for (const pt of seg) {
      if (pt.lng < rawMinLng) rawMinLng = pt.lng;
      if (pt.lng > rawMaxLng) rawMaxLng = pt.lng;
    }
  }
  const lngDomain = Number.isFinite(rawMinLng) && Number.isFinite(rawMaxLng)
    ? `${rawMinLng.toFixed(6)} to ${rawMaxLng.toFixed(6)}`
    : 'n/a';
  const worldScale = 2 / Math.max(maxSpan, 1e-6);
  const topo = state.topography;
  const lines = [
    `Origin: ${location.origin || 'null'}`,
    `Protocol: ${location.protocol}`,
    `Canvas: ${state.dims.w.toFixed(0)} x ${state.dims.h.toFixed(0)} @${state.dims.ratio.toFixed(2)}`,
    '',
    `Country outline loaded: ${segments.length ? 'yes' : 'no'}`,
    `Outline filter: ${state.outlineFilterMode}`,
    `Outline segments: ${segments.length}`,
    `Outline vertices: ${outlinePts}`,
    `Selected landmass index: ${state.selectedOutlineSegmentIndex}`,
    `Coordinate markers: ${state.showGeoGrid ? 'on' : 'off'}`,
    `Layer visibility: pins=${state.layerVisible.pins ? '1' : '0'} path=${state.layerVisible.path ? '1' : '0'} outline=${state.layerVisible.outline ? '1' : '0'} grid=${state.layerVisible.geoGrid ? '1' : '0'} topo=${state.layerVisible.topography ? '1' : '0'} sea=${state.layerVisible.seaLevel ? '1' : '0'}`,
    `Outline lng domain: ${lngDomain}`,
    '',
    `Bounds minLat/maxLat: ${b.minLat.toFixed(6)} / ${b.maxLat.toFixed(6)}`,
    `Bounds minLng/maxLng: ${b.minLng.toFixed(6)} / ${b.maxLng.toFixed(6)}`,
    `Lat span: ${latSpan.toFixed(6)}`,
    `Lng span: ${lngSpan.toFixed(6)}`,
    `World scale (units/deg): ${worldScale.toFixed(6)}`,
    `Span ratio lng/lat: ${(lngSpan / latSpan).toFixed(4)}`,
    `Geo window center lat/lng: ${state.geoWindow.centerLat.toFixed(4)} / ${state.geoWindow.centerLng.toFixed(4)}`,
    `Geo window span/fineScale: ${state.geoWindow.spanDeg.toFixed(4)} / ${state.geoWindow.fineScale.toFixed(3)}`,
    `Map projection: ${getMapProjectionMode()}`,
    `Geo grid lat/lng step: ${(Number(ui.geoLatStep?.value || 0)).toFixed(2)} / ${(Number(ui.geoLngStep?.value || 0)).toFixed(2)}`,
    `Geo increments linked: ${state.geoStepLinked ? 'yes' : 'no'}`,
    '',
    `Topography loaded: ${topo.loaded ? 'yes' : 'no'}`,
    `Topography source: ${topo.source}`,
    `Topography grid: ${topo.rows} x ${topo.cols}`,
    `Topography elevation min/max: ${Number(topo.min).toFixed(2)} / ${Number(topo.max).toFixed(2)}`,
    `Topography mode: ${topo.mode}`,
    `Topography contours: ${topo.contourCount}`,
    '',
    `Pins: ${state.pins.length}`,
    `Path nodes: ${state.path.length}`,
    `Route dirty: ${state.routeDirty ? 'yes' : 'no'}`,
    '',
    `Camera yaw/pitch/roll: ${state.camera.yaw.toFixed(3)} / ${state.camera.pitch.toFixed(3)} / ${state.camera.roll.toFixed(3)}`,
    `Camera zoom: ${state.camera.zoom.toFixed(3)}`,
    `Camera focusX/focusZ/focusY: ${state.camera.focusX.toFixed(3)} / ${state.camera.focusZ.toFixed(3)} / ${state.camera.focusY.toFixed(3)}`,
    `Camera focal/lens: ${state.camera.focalLength.toFixed(1)} / ${state.camera.lensAngle.toFixed(1)}`,
    '',
    `Static dirty: ${state.staticDirty ? 'yes' : 'no'}`,
    `Playing: ${state.playing ? 'yes' : 'no'}`,
    `Render queued: ${state.renderQueued ? 'yes' : 'no'}`,
    `FPS sample: ${state.perf.fps.toFixed(1)}`
  ];
  ui.debugView.value = lines.join('\n');
}

function setActiveTab(tabName) {
  ui.tabButtons.forEach(btn => {
    const active = btn.dataset.tab === tabName;
    btn.setAttribute('aria-selected', String(active));
    btn.classList.toggle('is-active', active);
  });
  ui.tabPanels.forEach(panel => {
    panel.hidden = panel.dataset.tabPanel !== tabName;
  });
  if (tabName === 'raw') updateRawView();
  if (tabName === 'debug') updateDebugView();
}

function refreshDebugIfVisible() {
  if (ui.tabDebug?.classList.contains('is-active')) updateDebugView();
}

function setupTabs() {
  ui.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
  });
  setActiveTab('mapping');
}

function updatePlayPauseLabel() {
  ui.playPause.innerHTML = state.playing
    ? '<i class="iconoir-pause-solid" aria-hidden="true"></i>'
    : '<i class="iconoir-play-solid" aria-hidden="true"></i>';
  ui.playPause.title = state.playing ? 'Pause' : 'Play';
}

function parsePinTimestamp(pin) {
  const ms = pin?.timestamp ? Date.parse(pin.timestamp) : NaN;
  return Number.isFinite(ms) ? ms : null;
}

function computePinRouteProgresses() {
  const count = state.pins.length;
  if (!count) return [];
  if (count === 1) return [0];
  if (state.path.length < 2) return state.pins.map((_, i) => i / (count - 1));

  const route = state.path;
  const denom = Math.max(route.length - 1, 1);
  return state.pins.map(pin => {
    let bestI = 0;
    let bestD = Infinity;
    for (let i = 0; i < route.length; i++) {
      const dLat = route[i].lat - pin.lat;
      const dLng = route[i].lng - pin.lng;
      const d2 = dLat * dLat + dLng * dLng;
      if (d2 < bestD) {
        bestD = d2;
        bestI = i;
      }
    }
    return bestI / denom;
  });
}

function isStrictlyIncreasing(values) {
  for (let i = 1; i < values.length; i++) {
    if (!(values[i] > values[i - 1])) return false;
  }
  return true;
}

function rebuildTimelineAnchors(options = {}) {
  const { silent = true } = options;
  const count = state.pins.length;
  if (!count) {
    state.timelineAnchors = [];
    renderTimelineMarkers();
    return;
  }

  const routeProgresses = computePinRouteProgresses();
  let timelineProgresses = [];
  let usedTimestampMode = false;

  if (state.timelineMode === 'timestamp') {
    const values = state.pins.map(parsePinTimestamp);
    const valid = values.filter(v => v !== null);
    if (valid.length === count) {
      const min = Math.min(...valid);
      const max = Math.max(...valid);
      if (max > min) {
        timelineProgresses = values.map(v => (v - min) / (max - min));
        if (isStrictlyIncreasing(timelineProgresses)) {
          usedTimestampMode = true;
        }
      }
    }
    if (!usedTimestampMode) {
      if (!silent) {
        toast('Timestamp mode requires valid increasing pin timestamps', 'warn');
        setStatus('Timestamp mode fallback: using uniform spacing.');
      }
      timelineProgresses = state.pins.map((_, i) => (count === 1 ? 0 : i / (count - 1)));
    }
  } else {
    timelineProgresses = state.pins.map((_, i) => (count === 1 ? 0 : i / (count - 1)));
  }

  state.timelineAnchors = state.pins.map((pin, i) => ({
    id: pin.id,
    label: pin.label,
    t: timelineProgresses[i],
    r: routeProgresses[i]
  }));
  renderTimelineMarkers();
}

function getRouteProgressFromTimeline() {
  const anchors = state.timelineAnchors;
  const t = clamp(state.progress, 0, 1);
  if (!anchors.length) return t;
  if (anchors.length === 1) return anchors[0].r;
  if (t <= anchors[0].t) return anchors[0].r;
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (t <= b.t) {
      const span = Math.max(1e-6, b.t - a.t);
      const k = (t - a.t) / span;
      return a.r + (b.r - a.r) * k;
    }
  }
  return anchors[anchors.length - 1].r;
}

function updateTimelineModeButton() {
  if (!ui.timelineModeBtn) return;
  if (state.timelineMode === 'timestamp') {
    ui.timelineModeBtn.innerHTML = '<i class="iconoir-calendar" aria-hidden="true"></i>';
    ui.timelineModeBtn.title = 'Timeline mode: timestamp';
  } else {
    ui.timelineModeBtn.innerHTML = '<i class="iconoir-clock-rotate-right" aria-hidden="true"></i>';
    ui.timelineModeBtn.title = 'Timeline mode: uniform';
  }
}

function updateTimelineMarkerActive() {
  if (!ui.timelineMarkers) return;
  const t = clamp(state.progress, 0, 1);
  for (const node of ui.timelineMarkers.querySelectorAll('.timeline-marker')) {
    const mt = Number(node.dataset.t || '0');
    node.classList.toggle('is-active', Math.abs(mt - t) <= 0.016);
  }
}

function updateTimelinePlayhead() {
  if (!ui.timelinePlayhead) return;
  const t = clamp(state.progress, 0, 1);
  ui.timelinePlayhead.style.left = `${t * 100}%`;
}

function renderTimelineMarkers() {
  if (!ui.timelineMarkers) return;
  ui.timelineMarkers.innerHTML = '';
  for (const anchor of state.timelineAnchors) {
    const marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'timeline-marker';
    marker.style.left = `${clamp(anchor.t, 0, 1) * 100}%`;
    marker.dataset.t = String(anchor.t);
    marker.title = anchor.label;
    marker.addEventListener('click', () => {
      state.progress = clamp(anchor.t, 0, 1);
      ui.timeline.value = String(Math.floor(state.progress * 1000));
      state.playing = false;
      updatePlayPauseLabel();
      requestRender();
      updateTimelineMarkerActive();
      updateTimelinePlayhead();
    });
    ui.timelineMarkers.appendChild(marker);
  }
  updateTimelineMarkerActive();
  updateTimelinePlayhead();
}

function toggleTimelineMode() {
  state.timelineMode = state.timelineMode === 'uniform' ? 'timestamp' : 'uniform';
  updateTimelineModeButton();
  rebuildTimelineAnchors({ silent: false });
  requestRender();
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function toLocalInputValue(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function inferMapsLabel(link, fallback) {
  const decoded = safeDecodeURIComponent(link);
  const place = decoded.match(/\/place\/([^/?#]+)/i);
  if (place?.[1]) return place[1].replace(/\+/g, ' ').slice(0, 24);
  const q = decoded.match(/[?&](?:q|query)=([^&#]+)/i);
  if (q?.[1] && !/^-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?$/.test(q[1])) {
    return q[1].replace(/\+/g, ' ').slice(0, 24);
  }
  const search = decoded.match(/\/maps\/search\/([^/?#]+)/i);
  if (search?.[1]) return search[1].replace(/\+/g, ' ').slice(0, 24);
  return fallback;
}

function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

function isValidLatLng(lat, lng) {
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function parseLatLngPair(a, b) {
  const lat = Number(a);
  const lng = Number(b);
  return isValidLatLng(lat, lng) ? { lat, lng } : null;
}

function extractCoordsFromGoogleMaps(text) {
  const decoded = safeDecodeURIComponent(text);
  const patterns = [
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /[?&](?:q|ll|query|destination|origin|center)=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i
  ];
  for (const rx of patterns) {
    const m = decoded.match(rx);
    if (!m) continue;
    const pair = parseLatLngPair(m[1], m[2]);
    if (pair) return pair;
  }

  // /maps/dir/... often contains multiple coord pairs. Prefer the last pair (destination).
  const pairMatches = [...decoded.matchAll(/(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/g)];
  if (pairMatches.length) {
    for (let i = pairMatches.length - 1; i >= 0; i--) {
      const pair = parseLatLngPair(pairMatches[i][1], pairMatches[i][2]);
      if (pair) return pair;
    }
  }
  return null;
}

function parsePinLine(line, i) {
  const fallbackLabel = `PIN-${i + 1}`;
  if (/https?:\/\/\S+/i.test(line) && /(google\.[^/\s]+\/maps|maps\.app\.goo\.gl|maps\.google\.[^/\s]+)/i.test(line)) {
    const coords = extractCoordsFromGoogleMaps(line);
    if (!coords) {
      const shortLink = /maps\.app\.goo\.gl|goo\.gl\/maps/i.test(line);
      return {
        ok: false,
        reason: shortLink
          ? 'Short Google link unresolved. Open it, then copy the full browser URL.'
          : 'Google Maps link has no explicit coordinates.'
      };
    }
    return {
      ok: true,
      pin: {
        id: state.nextPinId++,
        lat: coords.lat,
        lng: coords.lng,
        label: inferMapsLabel(line, fallbackLabel),
        timestamp: '',
        note: '',
        source: 'google-maps-link'
      }
    };
  }

  const parts = line.split(',').map(s => s.trim());
  if (parts.length < 2) return { ok: false, reason: 'Line requires at least latitude and longitude.' };
  const lat = Number(parts[0]);
  const lng = Number(parts[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return { ok: false, reason: 'Latitude/longitude are not valid numbers.' };
  return {
    ok: true,
    pin: {
      id: state.nextPinId++,
      lat,
      lng,
      label: (parts[2] || fallbackLabel).slice(0, 24),
      timestamp: parts[3] || '',
      note: parts.slice(4).join(', ').slice(0, 180),
      source: 'manual'
    }
  };
}

function isGoogleMapsShortLink(line) {
  return /https?:\/\/(?:maps\.app\.goo\.gl|goo\.gl\/maps)\//i.test(line);
}

async function resolveGoogleMapsShortLink(url) {
  if (!ensureNetworkContext('Google short-link resolve')) return null;
  const attempts = [
    { mode: 'cors' },
    { mode: 'no-cors' }
  ];
  for (const opt of attempts) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        cache: 'no-store',
        mode: opt.mode
      });
      if (res?.url && /^https?:\/\//i.test(res.url) && res.url !== url) return res.url;
    } catch {
      // Try next strategy.
    }
  }
  return null;
}

function looksLikeAddress(line) {
  if (!line || /https?:\/\//i.test(line)) return false;
  // Keep this intentionally simple: text-heavy strings with at least one digit.
  return /[a-z]/i.test(line) && /\d/.test(line) && line.length >= 8;
}

async function geocodeAddressToPin(line, i) {
  if (!ensureNetworkContext('address geocoding')) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(line)}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) return null;
    const json = await res.json();
    const item = Array.isArray(json) ? json[0] : null;
    const lat = Number(item?.lat);
    const lng = Number(item?.lon);
    if (!isValidLatLng(lat, lng)) return null;
    return {
      id: state.nextPinId++,
      lat,
      lng,
      label: (item?.display_name?.split(',')?.[0] || `PIN-${i + 1}`).slice(0, 24),
      timestamp: '',
      note: line.slice(0, 180),
      source: 'address-geocode'
    };
  } catch {
    return null;
  }
}

function parsePins(raw) {
  const pins = [];
  const errors = [];
  const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
  lines.forEach((line, i) => {
    const parsed = parsePinLine(line, i);
    if (parsed.ok) pins.push(parsed.pin);
    else errors.push(`Line ${i + 1}: ${parsed.reason}`);
  });
  return { pins, errors, total: lines.length };
}

function updateBounds() {
  const all = [...state.pins, ...state.path, ...state.countryOutline];
  if (!all.length) {
    state.bounds = { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 };
    if (!state.geoWindow.manual) fitGeoWindowToBounds();
    return;
  }
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const p of all) {
    if (!isValidGeoPoint(p)) continue;
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  }
  if (!Number.isFinite(minLat) || !Number.isFinite(maxLat) || !Number.isFinite(minLng) || !Number.isFinite(maxLng)) {
    state.bounds = { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 };
    if (!state.geoWindow.manual) fitGeoWindowToBounds();
    return;
  }
  const padLat = Math.max((maxLat - minLat) * 0.16, 0.01);
  const padLng = Math.max((maxLng - minLng) * 0.16, 0.01);
  state.bounds = {
    minLat: minLat - padLat,
    maxLat: maxLat + padLat,
    minLng: minLng - padLng,
    maxLng: maxLng + padLng
  };
  if (!state.geoWindow.manual) fitGeoWindowToBounds();
  markStaticDirty();
  refreshDebugIfVisible();
}

function fitGeoWindowToBounds() {
  const b = state.bounds;
  const latSpan = Math.max(b.maxLat - b.minLat, 1e-6);
  const lngSpan = Math.max(b.maxLng - b.minLng, 1e-6);
  state.geoWindow.centerLat = (b.minLat + b.maxLat) * 0.5;
  state.geoWindow.centerLng = (b.minLng + b.maxLng) * 0.5;
  const cosLat = Math.max(Math.cos(state.geoWindow.centerLat * Math.PI / 180), 0.15);
  state.geoWindow.spanDeg = clamp(Math.max(latSpan, lngSpan * cosLat), 0.5, 360);
  state.geoWindow.fineScale = clamp(state.geoWindow.fineScale, 0.2, 4);
  syncGeoWindowToUI();
}

function syncGeoWindowToUI() {
  if (ui.geoCenterLat) ui.geoCenterLat.value = String(state.geoWindow.centerLat);
  if (ui.geoCenterLng) ui.geoCenterLng.value = String(state.geoWindow.centerLng);
  if (ui.geoSpanDeg) ui.geoSpanDeg.value = String(state.geoWindow.spanDeg);
  if (ui.geoFineScale) ui.geoFineScale.value = String(state.geoWindow.fineScale);
  updateMapSettingsHint();
}

function setGeoWindow(patch = {}, options = {}) {
  const { manual = true } = options;
  state.geoWindow.centerLat = clamp(patch.centerLat ?? state.geoWindow.centerLat, -85, 85);
  state.geoWindow.centerLng = clamp(patch.centerLng ?? state.geoWindow.centerLng, -180, 180);
  state.geoWindow.spanDeg = clamp(patch.spanDeg ?? state.geoWindow.spanDeg, 0.5, 360);
  state.geoWindow.fineScale = clamp(patch.fineScale ?? state.geoWindow.fineScale, 0.2, 4);
  if (manual) state.geoWindow.manual = true;
  state.geoCache.key = '';
  state.geoCache.map.clear();
  syncGeoWindowToUI();
  markStaticDirty();
  refreshDebugIfVisible();
  requestRender();
}

function noise(x, z) {
  const h = Math.sin(x * 0.035) * Math.cos(z * 0.038) + Math.sin((x + z) * 0.016);
  return h * 0.5;
}

function getMapProjectionMode() {
  return state.mapProjection === 'globe' ? 'globe' : 'flat';
}

function getGlobeRadius() {
  const fine = clamp(state.geoWindow.fineScale, 0.2, 4);
  return clamp(0.92 * fine, 0.36, 3.4);
}

function wrapLongitude(lng) {
  let out = Number(lng);
  if (!Number.isFinite(out)) return 0;
  while (out > 180) out -= 360;
  while (out < -180) out += 360;
  return out;
}

function buildGeoCacheKey() {
  return [
    getMapProjectionMode(),
    state.geoWindow.centerLat.toFixed(5),
    state.geoWindow.centerLng.toFixed(5),
    state.geoWindow.spanDeg.toFixed(5),
    state.geoWindow.fineScale.toFixed(5)
  ].join('|');
}

function updateMapSettingsHint() {
  if (!ui.mapSettingsHint) return;
  const projection = getMapProjectionMode() === 'globe' ? 'Globe' : 'Flat';
  ui.mapSettingsHint.textContent =
    `Projection: ${projection}. Center Lat/Lng sets focus point. Window Span controls visible degree range in flat mode. Fine Scale controls map size multiplier.`;
}

function mapToWorld(lat, lng) {
  const centerLat = state.geoWindow.centerLat;
  const centerLng = state.geoWindow.centerLng;
  const span = Math.max(state.geoWindow.spanDeg, 1e-6);
  const scale = clamp(state.geoWindow.fineScale, 0.2, 4);
  const cosLat = Math.max(Math.cos(centerLat * Math.PI / 180), 0.15);
  const x = (((lng - centerLng) * cosLat) / span) * 2 * scale;
  const z = ((lat - centerLat) / span) * 2 * scale;
  return { x, z };
}

function mapToScene(lat, lng, y = 0) {
  const cacheKey = buildGeoCacheKey();
  if (state.geoCache.key !== cacheKey) {
    state.geoCache.key = cacheKey;
    state.geoCache.map.clear();
  }
  const latNum = clamp(Number(lat), -89.999, 89.999);
  const lngNum = wrapLongitude(Number(lng));
  const yNum = Number(y) || 0;
  const entryKey = `${latNum.toFixed(5)}|${lngNum.toFixed(5)}|${yNum.toFixed(4)}`;
  const cached = state.geoCache.map.get(entryKey);
  if (cached) return cached;

  let scene = null;
  if (getMapProjectionMode() === 'flat') {
    const w = mapToWorld(latNum, lngNum);
    scene = { x: w.x, y: yNum, z: w.z };
  } else {
    const latR = latNum * Math.PI / 180;
    const lngR = lngNum * Math.PI / 180;
    const centerLngR = state.geoWindow.centerLng * Math.PI / 180;
    const centerLatR = state.geoWindow.centerLat * Math.PI / 180;
    const relLng = lngR - centerLngR;
    const radius = getGlobeRadius() + yNum;
    const cosLat = Math.cos(latR);
    const sinLat = Math.sin(latR);
    const sinLng = Math.sin(relLng);
    const cosLng = Math.cos(relLng);

    const x0 = radius * cosLat * sinLng;
    // Positive latitude should appear as "up" in screen space for globe mode.
    const y0 = -radius * sinLat;
    const z0 = radius * cosLat * cosLng;

    const c = Math.cos(centerLatR);
    const s = Math.sin(centerLatR);
    const y1 = y0 * c - z0 * s;
    const z1 = y0 * s + z0 * c;
    scene = { x: x0, y: y1, z: z1 };
  }
  if (state.geoCache.map.size > 20000) state.geoCache.map.clear();
  state.geoCache.map.set(entryKey, scene);
  return scene;
}

function worldWithCameraOffsets(world) {
  return {
    x: world.x - state.camera.focusX,
    y: world.y ?? 0,
    z: world.z - state.camera.focusZ
  };
}

function geoToCameraWorld(lat, lng, y = 0) {
  return worldWithCameraOffsets(mapToScene(lat, lng, y));
}

function getCameraCache(camera = state.camera) {
  const cy = Math.cos(camera.yaw);
  const sy = Math.sin(camera.yaw);
  const cx = Math.cos(camera.pitch);
  const sx = Math.sin(camera.pitch);
  const cr = Math.cos(camera.roll || 0);
  const sr = Math.sin(camera.roll || 0);
  const lens = clamp(camera.lensAngle, 22, 95) * Math.PI / 180;
  const lensFactor = 1 / Math.tan(lens * 0.5);
  const focalNorm = clamp(camera.focalLength, 18, 120) / 50;
  return { cy, sy, cx, sx, cr, sr, zoom: camera.zoom, focusY: camera.focusY, lensFactor, focalNorm };
}

function project(x, y, z, cam) {
  const x1 = x * cam.cy + z * cam.sy;
  const z1 = -x * cam.sy + z * cam.cy;
  const yShifted = y - cam.focusY;
  const y2 = yShifted * cam.cx - z1 * cam.sx;
  const z2 = yShifted * cam.sx + z1 * cam.cx + cam.zoom;
  const persp = (cam.lensFactor * cam.focalNorm) / Math.max(0.6, z2);
  const scale = state.dims.w * 0.38;
  const cx = state.dims.w * 0.5;
  const cy = state.dims.h * 0.53;
  const px0 = cx + x1 * persp * scale;
  const py0 = cy + y2 * persp * scale;
  const rx = (px0 - cx) * cam.cr - (py0 - cy) * cam.sr;
  const ry = (px0 - cx) * cam.sr + (py0 - cy) * cam.cr;
  return { x: cx + rx, y: cy + ry, z: z2 };
}

function getDepthOfFieldForZ(z) {
  const strength = state.camera.dofStrength || 0;
  if (strength <= 0) return { alpha: 1, blur: 0 };
  const focus = state.camera.focusDepth || state.camera.zoom;
  const delta = Math.abs(z - focus);
  const blur = clamp(delta * strength * 3.2, 0, 14);
  const alpha = clamp(1 - delta * strength * 0.2, 0.2, 1);
  return { alpha, blur };
}

function buildTerrainGrid(size) {
  if (state.terrainGrid.size === size && state.terrainGrid.points.length) return;
  const points = [];
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      const x = (i / size - 0.5) * 2.3;
      const z = (j / size - 0.5) * 2.3;
      points.push({ i, j, x, z, base: noise(i * 4.5, j * 4.5) });
    }
  }
  state.terrainGrid = { size, points };
  markStaticDirty();
}

function ensureScanlinePattern() {
  const color = cssVar('--tk-scanline', 'rgba(95, 215, 245, 0.04)');
  if (state.scanlinePattern?.color === color) return state.scanlinePattern.value;
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 2;
  patternCanvas.height = 3;
  const pctx = patternCanvas.getContext('2d');
  pctx.fillStyle = color;
  pctx.fillRect(0, 0, 2, 1);
  state.scanlinePattern = { color, value: ctx.createPattern(patternCanvas, 'repeat') };
  return state.scanlinePattern.value;
}

function hexToRgba(hex, a) {
  const clean = hex.replace('#', '');
  const x = parseInt(clean, 16);
  return `rgba(${(x >> 16) & 255},${(x >> 8) & 255},${x & 255},${a})`;
}

function drawTerrain(targetCtx, cam) {
  if (!state.layerVisible.seaLevel) return;
  const pattern = ui.terrainPattern?.value || 'grid';
  const color = ui.terrainColor?.value || '#3cd7ff';
  const opacity = Number(ui.wireOpacity?.value || 0.3);
  const glow = Number(ui.terrainGlow?.value || 0) * 6;
  const density = Math.max(0.5, Number(ui.terrainDensity?.value || 6));
  const y = Number(ui.terrainHeight?.value || 0);
  const half = Math.max(state.geoWindow.spanDeg * 0.5, 1e-6);
  const b = {
    minLat: state.geoWindow.centerLat - half,
    maxLat: state.geoWindow.centerLat + half,
    minLng: state.geoWindow.centerLng - half,
    maxLng: state.geoWindow.centerLng + half
  };
  const step = clamp(state.geoWindow.spanDeg / (density * 4), 0.05, 45);
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
  if (!state.layerVisible.outline) return;
  if (!state.countryOutline.length) return;
  const outlineColor = ui.outlineColor?.value || cssVar('--tk-country-outline', '#8dffcf');
  const outlineOpacity = Number(ui.outlineOpacity?.value || 0.32);
  const outlineWidth = Number(ui.outlineWidth?.value || 1.2);
  targetCtx.save();
  targetCtx.strokeStyle = hexToRgba(outlineColor, outlineOpacity);
  targetCtx.lineWidth = outlineWidth;
  targetCtx.shadowColor = outlineColor;
  targetCtx.shadowBlur = 8;
  let drawing = false;
  targetCtx.beginPath();
  state.countryOutline.forEach((pt) => {
    if (!isValidGeoPoint(pt)) {
      drawing = false;
      return;
    }
    const w = geoToCameraWorld(pt.lat, pt.lng, 0);
    const p = project(w.x, w.y, w.z, cam);
    if (!drawing) {
      targetCtx.moveTo(p.x, p.y);
      drawing = true;
    } else {
      targetCtx.lineTo(p.x, p.y);
    }
  });
  targetCtx.stroke();
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
  const latStep = clamp(Number(ui.geoLatStep?.value || niceStep(state.geoWindow.spanDeg, 6)), 0.05, 60);
  const lngStep = clamp(Number(ui.geoLngStep?.value || niceStep(state.geoWindow.spanDeg, 6)), 0.05, 60);
  const latDigits = latStep < 1 ? 2 : 0;
  const lngDigits = lngStep < 1 ? 2 : 0;
  const color = ui.geoGridColor?.value || '#7dcbff';
  const opacity = Number(ui.geoGridOpacity?.value || 0.22);
  const width = Number(ui.geoGridWidth?.value || 1);
  const labelOpacity = Number(ui.geoLabelOpacity?.value || 0.68);

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
    for (let lat = -85; lat <= 85 + 1e-6; lat += latStep) {
      let started = false;
      targetCtx.beginPath();
      for (let lng = -180; lng <= 180 + 1e-6; lng += lonDrawStep) {
        const w = geoToCameraWorld(lat, lng, 0);
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
    targetCtx.fillText(`${lng.toFixed(lngDigits)}`, p0.x + 3, p0.y - 2);
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
    targetCtx.fillText(`${lat.toFixed(latDigits)}`, p1.x + 3, p1.y - 2);
  }
  targetCtx.restore();
}

function getTopographyBounds() {
  const src = state.countryOutline.length ? state.countryOutline.filter(isValidGeoPoint) : [...state.pins, ...state.path];
  if (!src.length) return null;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const p of src) {
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  }
  const padLat = Math.max((maxLat - minLat) * 0.06, 0.005);
  const padLng = Math.max((maxLng - minLng) * 0.06, 0.005);
  return {
    minLat: minLat - padLat,
    maxLat: maxLat + padLat,
    minLng: minLng - padLng,
    maxLng: maxLng + padLng
  };
}

function makeGridAxis(min, max, count, descending = false) {
  const out = [];
  const steps = Math.max(count - 1, 1);
  for (let i = 0; i < count; i++) {
    const t = i / steps;
    out.push(descending ? max - (max - min) * t : min + (max - min) * t);
  }
  return out;
}

async function fetchElevationBatch(locations) {
  const encoded = encodeURIComponent(locations.join('|'));
  const url = `https://api.opentopodata.org/v1/aster30m?locations=${encoded}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!Array.isArray(data?.results)) throw new Error('Invalid elevation response.');
  return data.results.map(r => {
    const v = Number(r.elevation);
    return Number.isFinite(v) ? v : 0;
  });
}

async function loadTopographyFromOpenData() {
  if (!ensureNetworkContext('topography import')) return;
  setButtonBusy(ui.loadTopography, true, 'Loading...');
  const bbox = getTopographyBounds();
  if (!bbox) {
    setTopoStatus('Load a country outline or pins first.');
    toast('Need country or pins for topography bounds', 'warn');
    setButtonBusy(ui.loadTopography, false);
    return;
  }
  const res = Number(ui.topoResolution?.value || 24);
  const contourCount = Number(ui.topoContours?.value || 10);
  const mode = ui.topoMode?.value || 'contour2d';
  const rows = Math.max(8, res);
  const cols = Math.max(8, res);
  const latList = makeGridAxis(bbox.minLat, bbox.maxLat, rows, true);
  const lngList = makeGridAxis(bbox.minLng, bbox.maxLng, cols, false);
  const queries = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      queries.push(`${latList[r].toFixed(6)},${lngList[c].toFixed(6)}`);
    }
  }

  try {
    setTopoStatus(`Fetching topography ${rows}x${cols}...`);
    const batchSize = 70;
    const valuesFlat = [];
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      const vals = await fetchElevationBatch(batch);
      valuesFlat.push(...vals);
      setTopoStatus(`Topography download ${(Math.min(i + batchSize, queries.length) / queries.length * 100).toFixed(0)}%`);
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
      mode,
      contourCount
    };
    markStaticDirty();
    updateRawView();
    requestRender();
    setTopoStatus(`Topography loaded. Elevation ${min.toFixed(0)}m to ${max.toFixed(0)}m.`);
    toast('Topography loaded', 'ok');
  } catch (err) {
    console.error(err);
    setTopoStatus('Topography fetch failed.');
    toast('Topography fetch failed', 'err');
  } finally {
    setButtonBusy(ui.loadTopography, false);
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
    lngList: []
  };
  markStaticDirty();
  updateRawView();
  requestRender();
  setTopoStatus('Topography cleared.');
}

function drawTopographyContours(targetCtx, cam) {
  if (!state.layerVisible.topography) return;
  const topo = state.topography;
  if (!topo.loaded || topo.rows < 2 || topo.cols < 2) return;
  const min = topo.min;
  const max = topo.max;
  const span = Math.max(max - min, 1e-6);
  const contourCount = Math.max(2, topo.contourCount | 0);
  const levels = [];
  for (let i = 1; i <= contourCount; i++) levels.push(min + (span * i) / (contourCount + 1));
  const mode3d = topo.mode === 'contour3d';
  const topoColor = ui.topoColor?.value || '#8dffcf';
  const topoOpacity = Number(ui.topoOpacity?.value || 0.68);
  const topoLineWidth = Number(ui.topoLineWidth?.value || 1.1);
  const topoHeightScale = Number(ui.topoHeightScale?.value || 0.26);

  const cellPoint = (r, c, elevFor3d) => {
    const lat = topo.latList[r];
    const lng = topo.lngList[c];
    const norm = mode3d ? ((elevFor3d - min) / span) : 0;
    if (getMapProjectionMode() === 'globe') {
      const radial = mode3d ? norm * topoHeightScale * 0.32 : 0;
      const w0 = geoToCameraWorld(lat, lng, radial);
      return { x: w0.x, y: w0.y, z: w0.z };
    }
    const w0 = geoToCameraWorld(lat, lng, 0);
    const h = mode3d ? norm * topoHeightScale : 0;
    return { x: w0.x, y: h, z: w0.z };
  };

  const edgePoint = (edge, p0, p1, p2, p3, v0, v1, v2, v3, level) => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const interp = (pa, pb, va, vb) => {
      const t = Math.abs(vb - va) < 1e-6 ? 0.5 : (level - va) / (vb - va);
      return { x: lerp(pa.x, pb.x, t), y: lerp(pa.y, pb.y, t), z: lerp(pa.z, pb.z, t) };
    };
    if (edge === 0) return interp(p0, p1, v0, v1);
    if (edge === 1) return interp(p1, p2, v1, v2);
    if (edge === 2) return interp(p2, p3, v2, v3);
    return interp(p3, p0, v3, v0);
  };

  const cases = {
    0: [],
    1: [[3, 0]],
    2: [[0, 1]],
    3: [[3, 1]],
    4: [[1, 2]],
    5: [[3, 2], [0, 1]],
    6: [[0, 2]],
    7: [[3, 2]],
    8: [[2, 3]],
    9: [[0, 2]],
    10: [[0, 3], [1, 2]],
    11: [[1, 2]],
    12: [[1, 3]],
    13: [[0, 1]],
    14: [[0, 3]],
    15: []
  };

  targetCtx.save();
  targetCtx.strokeStyle = hexToRgba(topoColor, topoOpacity);
  targetCtx.lineWidth = topoLineWidth;
  targetCtx.shadowColor = topoColor;
  targetCtx.shadowBlur = mode3d ? 6 : 3;
  targetCtx.globalAlpha = mode3d ? 0.9 : 0.72;

  for (let r = 0; r < topo.rows - 1; r++) {
    for (let c = 0; c < topo.cols - 1; c++) {
      const v0 = topo.values[r][c];
      const v1 = topo.values[r][c + 1];
      const v2 = topo.values[r + 1][c + 1];
      const v3 = topo.values[r + 1][c];
      const p0 = cellPoint(r, c, v0);
      const p1 = cellPoint(r, c + 1, v1);
      const p2 = cellPoint(r + 1, c + 1, v2);
      const p3 = cellPoint(r + 1, c, v3);

      for (const level of levels) {
        const idx =
          (v0 >= level ? 1 : 0) |
          (v1 >= level ? 2 : 0) |
          (v2 >= level ? 4 : 0) |
          (v3 >= level ? 8 : 0);
        const segments = cases[idx];
        if (!segments?.length) continue;
        for (const [eA, eB] of segments) {
          const a = edgePoint(eA, p0, p1, p2, p3, v0, v1, v2, v3, level);
          const b = edgePoint(eB, p0, p1, p2, p3, v0, v1, v2, v3, level);
          const pa = project(a.x, a.y, a.z, cam);
          const pb = project(b.x, b.y, b.z, cam);
          targetCtx.beginPath();
          targetCtx.moveTo(pa.x, pa.y);
          targetCtx.lineTo(pb.x, pb.y);
          targetCtx.stroke();
        }
      }
    }
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
  const pts = buildAnimatedPath();
  if (!pts.length) return;
  const c = ui.pathColor.value;
  const projected = pts.map(pt => {
    const w = geoToCameraWorld(pt.lat, pt.lng, getMapProjectionMode() === 'globe' ? 0.008 : 0.01);
    return project(w.x, w.y, w.z, cam);
  });

  ctx.save();
  ctx.strokeStyle = c;
  ctx.lineWidth = Number(ui.pathWidth.value);
  ctx.shadowColor = c;
  for (let i = 0; i < projected.length - 1; i++) {
    const a = projected[i];
    const b = projected[i + 1];
    const z = (a.z + b.z) * 0.5;
    const dof = getDepthOfFieldForZ(z);
    ctx.globalAlpha = dof.alpha;
    ctx.shadowBlur = 8 + dof.blur;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPins(cam) {
  if (!state.layerVisible.pins) return;
  if (!state.pins.length) return;
  const c = ui.pinColor.value;
  const size = Number(ui.pinSize.value);
  const routeProgress = getRouteProgressFromTimeline();
  state.lastProjectedPins = [];

  ctx.save();
  ctx.font = "12px 'Orbitron', sans-serif";
  ctx.fillStyle = c;
  ctx.strokeStyle = c;
  ctx.shadowColor = c;
  ctx.shadowBlur = 10;
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
    const dof = getDepthOfFieldForZ(top.z);
    ctx.globalAlpha = dof.alpha;
    ctx.shadowBlur = 10 + dof.blur;
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

    ctx.fillText(pin.label, top.x + size + 5, top.y - 3);
  });
  ctx.restore();
}

function drawHUD() {
  ui.hudPins.textContent = `Pins: ${state.pins.length}`;
  ui.hudPath.textContent = `Path nodes: ${state.path.length}`;
  ui.hudTime.textContent = `Timeline: ${(state.progress * 100).toFixed(1)}%`;
  ui.hudCam.textContent = `Cam: y ${state.camera.yaw.toFixed(2)} p ${state.camera.pitch.toFixed(2)} z ${state.camera.zoom.toFixed(1)} fx ${state.camera.focusX.toFixed(2)} fz ${state.camera.focusZ.toFixed(2)}`;
  ui.hudFps.textContent = state.playing || state.interaction.dragging ? `FPS: ${state.perf.fps.toFixed(0)}` : 'FPS: idle';
}

function drawCornerOrientationGlobe() {
  const cx = 66;
  const cy = 72;
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
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2;
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
      ctx.strokeStyle = front
        ? hexToRgba(accent, 0.58)
        : hexToRgba(accent, 0.18);
    }
    if (started) ctx.stroke();
  };

  ctx.save();
  ctx.fillStyle = hexToRgba(panelBg, 0.62);
  ctx.strokeStyle = hexToRgba(panelLine, 0.72);
  ctx.lineWidth = 1;
  ctx.shadowColor = hexToRgba(accent2, 0.45);
  ctx.shadowBlur = 6;
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

  // Dynamic cardinal anchors that move with globe orientation.
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
  ctx.shadowBlur = 5;
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

  // Pole markers improve orientation readability.
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

  ctx.shadowBlur = 0;
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
  ctx.restore();
}

function drawCameraFocusMarker(cam) {
  const p = project(0, 0, 0, cam);
  const size = 8;
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 210, 120, 0.9)';
  ctx.lineWidth = 1.2;
  ctx.shadowColor = 'rgba(255, 210, 120, 0.7)';
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.moveTo(p.x - size, p.y);
  ctx.lineTo(p.x + size, p.y);
  ctx.moveTo(p.x, p.y - size);
  ctx.lineTo(p.x, p.y + size);
  ctx.stroke();
  ctx.font = '10px monospace';
  ctx.fillStyle = 'rgba(255, 230, 170, 0.95)';
  ctx.fillText('FOCUS', p.x + size + 4, p.y - size - 2);
  ctx.restore();
}

function refreshPinList() {
  if (!ui.pinTableBody) return;
  ui.pinTableBody.innerHTML = '';
  if (!state.pins.length) {
    state.selectedPinId = null;
    ui.pinLabel.value = '';
    ui.pinTimestamp.value = '';
    ui.pinNote.value = '';
    ui.pinSource.value = '';
    ui.savePinMeta.disabled = true;
    ui.cancelPinMeta.disabled = true;
    ui.deletePin.disabled = true;
    const row = document.createElement('tr');
    row.innerHTML = '<td class="pin-empty" colspan="4">No pins loaded.</td>';
    ui.pinTableBody.appendChild(row);
    return;
  }

  if (!state.selectedPinId || !state.pins.some(p => p.id === state.selectedPinId)) {
    state.selectedPinId = state.pins[0].id;
  }

  for (const pin of state.pins) {
    const row = document.createElement('tr');
    row.className = `pin-row${pin.id === state.selectedPinId ? ' is-selected' : ''}`;
    row.dataset.pinId = String(pin.id);
    const labelCell = document.createElement('td');
    labelCell.title = pin.label;
    labelCell.textContent = pin.label;
    const latCell = document.createElement('td');
    latCell.title = pin.lat.toFixed(6);
    latCell.textContent = pin.lat.toFixed(4);
    const lngCell = document.createElement('td');
    lngCell.title = pin.lng.toFixed(6);
    lngCell.textContent = pin.lng.toFixed(4);
    const src = pin.source || 'manual';
    const srcCell = document.createElement('td');
    srcCell.title = src;
    srcCell.textContent = src.replace('google-maps-link', 'google');
    row.append(labelCell, latCell, lngCell, srcCell);
    row.addEventListener('click', () => {
      state.selectedPinId = pin.id;
      syncMetadataEditor();
    });
    ui.pinTableBody.appendChild(row);
  }
  syncMetadataEditor();
}

function getSelectedPin() {
  return state.pins.find(p => p.id === state.selectedPinId) || null;
}

function syncMetadataEditor() {
  const pin = getSelectedPin();
  if (!pin) return;
  ui.pinLabel.value = pin.label || '';
  ui.pinTimestamp.value = toLocalInputValue(pin.timestamp);
  ui.pinNote.value = pin.note || '';
  ui.pinSource.textContent = `Source: ${pin.source || 'manual'}`;
  state.metadataSnapshot = {
    label: ui.pinLabel.value,
    timestamp: ui.pinTimestamp.value,
    note: ui.pinNote.value
  };
  state.metadataDirty = false;
  ui.savePinMeta.disabled = true;
  ui.cancelPinMeta.disabled = true;
  ui.deletePin.disabled = false;
  refreshPinListHighlight();
  requestRender();
}

function refreshPinListHighlight() {
  if (!ui.pinTableBody) return;
  for (const el of ui.pinTableBody.querySelectorAll('.pin-row')) {
    const selected = Number(el.dataset.pinId) === state.selectedPinId;
    el.classList.toggle('is-selected', selected);
  }
}

function handleMetadataChange() {
  if (!state.metadataSnapshot) return;
  const dirty = (
    ui.pinLabel.value !== state.metadataSnapshot.label
    || ui.pinTimestamp.value !== state.metadataSnapshot.timestamp
    || ui.pinNote.value !== state.metadataSnapshot.note
  );
  state.metadataDirty = dirty;
  ui.savePinMeta.disabled = !dirty;
  ui.cancelPinMeta.disabled = !dirty;
}

function markRouteDirty(reason) {
  state.routeDirty = true;
  setStatus(`${reason} Route data is out of date. Run Route.`);
}

function saveMetadataFromEditor() {
  const pin = getSelectedPin();
  if (!pin || !state.metadataDirty) return;
  pin.label = (ui.pinLabel.value || pin.label).slice(0, 24);
  pin.timestamp = ui.pinTimestamp.value ? new Date(ui.pinTimestamp.value).toISOString() : '';
  pin.note = (ui.pinNote.value || '').slice(0, 180);
  state.metadataDirty = false;
  ui.savePinMeta.disabled = true;
  ui.cancelPinMeta.disabled = true;
  refreshPinList();
  updateRawView();
  rebuildTimelineAnchors();
  toast(`Saved ${pin.label}`, 'ok');
  setStatus(`Saved metadata for ${pin.label}.`);
  requestRender();
}

function cancelMetadataChanges() {
  if (!state.metadataDirty || !state.metadataSnapshot) return;
  ui.pinLabel.value = state.metadataSnapshot.label;
  ui.pinTimestamp.value = state.metadataSnapshot.timestamp;
  ui.pinNote.value = state.metadataSnapshot.note;
  state.metadataDirty = false;
  ui.savePinMeta.disabled = true;
  ui.cancelPinMeta.disabled = true;
  toast('Metadata changes canceled', 'warn');
}

function deleteSelectedPin() {
  const pin = getSelectedPin();
  if (!pin) return;
  if (ui.confirmDeleteDialog?.showModal) {
    ui.confirmDeleteDialog.showModal();
    return;
  }
  if (confirm(`Delete ${pin.label}?`)) {
    confirmDeletePin();
  }
}

function confirmDeletePin() {
  const pin = getSelectedPin();
  if (!pin) return;
  state.pins = state.pins.filter(p => p.id !== pin.id);
  state.path = state.pins.map(p => ({ lat: p.lat, lng: p.lng, label: p.label }));
  markRouteDirty(`Deleted pin ${pin.label}.`);
  updateBounds();
  refreshPinList();
  rebuildTimelineAnchors();
  updateRawView();
  toast(`Deleted ${pin.label}`, 'warn');
  requestRender();
}

function downsamplePath(coords, maxPoints = 700) {
  if (coords.length <= maxPoints) return coords;
  const stride = Math.ceil(coords.length / maxPoints);
  const out = [];
  for (let i = 0; i < coords.length; i += stride) out.push(coords[i]);
  const last = coords[coords.length - 1];
  if (out[out.length - 1] !== last) out.push(last);
  return out;
}

async function loadPinsFromUI(options = {}) {
  const { silent = false } = options;
  const rawLines = ui.pinData.value.split('\n');
  const failed = [];
  const added = [];
  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const line = raw.trim();
    if (!line) continue;
    const parsed = parsePinLine(line, i);
    if (parsed.ok) {
      added.push(parsed.pin);
    } else {
      let recovered = false;
      let reason = parsed.reason || 'Could not parse row.';
      if (isGoogleMapsShortLink(line)) {
        const expanded = await resolveGoogleMapsShortLink(line);
        if (expanded) {
          const expandedParsed = parsePinLine(expanded, i);
          if (expandedParsed.ok) {
            expandedParsed.pin.source = 'google-maps-short-link';
            added.push(expandedParsed.pin);
            recovered = true;
          } else {
            reason = expandedParsed.reason || reason;
          }
        } else {
          reason = 'Could not expand short Google Maps link.';
        }
      }
      if (looksLikeAddress(line)) {
        const pin = await geocodeAddressToPin(line, i);
        if (pin) {
          added.push(pin);
          recovered = true;
        } else if (!recovered) {
          reason = 'Address geocoding failed (network/CORS or no result).';
        }
      }
      if (!recovered) failed.push({ raw, reason });
    }
  }

  if (!added.length) {
    const failHint = failed.length ? ` First issue: ${failed[0].reason}` : '';
    setStatus(`No valid pin rows found.${failHint}`);
    if (!silent) toast('No valid pins parsed', 'err');
    return;
  }

  state.pins = [...state.pins, ...added];
  state.path = state.pins.map(p => ({ lat: p.lat, lng: p.lng, label: p.label }));
  state.progress = 0;
  ui.timeline.value = '0';
  state.selectedPinId = added[added.length - 1].id;
  updateBounds();
  refreshPinList();
  rebuildTimelineAnchors();
  markRouteDirty(`Added ${added.length} pin(s).`);
  updateRawView();
  ui.pinData.value = failed.map(f => f.raw).join('\n');
  if (!silent) {
    for (const pin of added) toast(`Added ${pin.label}`, 'ok');
    if (failed.length) toast(`${failed.length} row(s) could not be parsed`, 'warn');
  }
  if (failed.length) {
    setStatus(`Added ${added.length} pin(s). ${failed.length} row(s) failed. First issue: ${failed[0].reason}`);
  } else {
    setStatus(`Added ${added.length} pin(s).`);
  }
  requestRender();
}

function pickPin(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const maxDist = Math.max(10, Number(ui.pinSize.value) + 4);
  let best = null;
  let bestD = Infinity;
  for (const p of state.lastProjectedPins) {
    const d = Math.hypot(p.x - x, p.y - y);
    if (d < bestD && d <= maxDist) {
      best = p;
      bestD = d;
    }
  }
  if (best) {
    state.selectedPinId = best.id;
    syncMetadataEditor();
  }
}

async function fetchRouteFromOSRM() {
  if (!ensureNetworkContext('route lookup')) return;
  setButtonBusy(ui.sampleRoute, true, 'Routing...');
  if (state.pins.length < 2) {
    setStatus('Need at least 2 pins to build a route.');
    toast('Add at least 2 pins first', 'warn');
    setButtonBusy(ui.sampleRoute, false);
    return;
  }
  const pairs = state.pins.map(p => `${p.lng},${p.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${pairs}?overview=full&geometries=geojson`;
  try {
    setStatus('Fetching route from OSRM...');
    const res = await fetch(url);
    const json = await res.json();
    const coords = json.routes?.[0]?.geometry?.coordinates;
    if (!coords || !coords.length) throw new Error('No route found');
    const sampled = downsamplePath(coords, 900);
    state.path = sampled.map(([lng, lat], i) => ({ lat, lng, label: `R${i}` }));
    state.routeDirty = false;
    state.progress = 0;
    ui.timeline.value = '0';
    updateBounds();
    rebuildTimelineAnchors();
    setStatus(`Loaded route with ${state.path.length} path nodes.`);
    toast('Route updated', 'ok');
    updateRawView();
    requestRender();
  } catch (err) {
    console.error(err);
    setStatus('Route lookup failed. Using direct pin path.');
    state.path = state.pins.map(p => ({ lat: p.lat, lng: p.lng, label: p.label }));
    state.routeDirty = true;
    rebuildTimelineAnchors();
    updateRawView();
    requestRender();
  } finally {
    setButtonBusy(ui.sampleRoute, false);
  }
}

async function fetchCountryOutline(name) {
  if (!ensureNetworkContext('country outline lookup')) return;
  setButtonBusy(ui.loadCountry, true, 'Loading...');

  try {
    setStatus(`Fetching country outline for ${name}...`);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&country=${encodeURIComponent(name)}&limit=1`;
    const nominatimRes = await fetch(nominatimUrl, { headers: { 'Accept-Language': 'en' } });
    const nominatimText = await nominatimRes.text();
    let geo = null;
    try {
      geo = JSON.parse(nominatimText);
    } catch {
      throw new Error(`Nominatim returned non-JSON (${nominatimRes.status}).`);
    }
    if (!nominatimRes.ok) throw new Error(`Nominatim request failed (${nominatimRes.status}).`);
    const item = geo?.[0];
    if (!item?.osm_id || !item?.osm_type) throw new Error('Country not found');

    const nominatimPts = buildOutlinePathFromGeoJSON(item.geojson);
    if (nominatimPts.length >= 2) {
      state.countryOutlineRaw = downsampleOutlinePath(nominatimPts, 5000);
      applyCountryOutlineFilter();
      const count = state.countryOutline.filter(isValidGeoPoint).length;
      setStatus(`Loaded ${name} outline from Nominatim (${count} vertices).`);
      return;
    }

    setStatus('Nominatim geometry unavailable, trying Overpass...');
    const overpassType = item.osm_type === 'way' ? 'way' : 'relation';
    const overpass = `[out:json][timeout:40];${overpassType}(${item.osm_id});out geom;`;
    const overpassEndpoints = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter'
    ];
    let lastErr = null;
    for (const endpoint of overpassEndpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: overpass,
          headers: { 'Content-Type': 'text/plain' }
        });
        const text = await res.text();
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Overpass non-JSON response (${res.status})`);
        }
        const pts = [];
        for (const el of data.elements || []) {
          if (Array.isArray(el.geometry)) {
            const segment = [];
            for (const g of el.geometry) {
              const lat = Number(g.lat);
              const lng = Number(g.lon);
              if (Number.isFinite(lat) && Number.isFinite(lng)) segment.push({ lat, lng });
            }
            const normalized = normalizeSegmentLongitudes(segment);
            pts.push(...normalized);
            pts.push(null);
          }
        }
        if (pts.filter(isValidGeoPoint).length < 2) throw new Error('No boundary geometry from Overpass');
        state.countryOutlineRaw = downsampleOutlinePath(pts, 5000);
        applyCountryOutlineFilter();
        const count = state.countryOutline.filter(isValidGeoPoint).length;
        setStatus(`Loaded ${name} outline from Overpass (${count} vertices).`);
        return;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error('Country outline lookup failed');
  } catch (err) {
    console.error(err);
    const reason = err?.message ? ` ${err.message}` : '';
    setStatus(`Country outline lookup failed for ${name}.${reason}`);
    toast('Country outline fetch failed', 'err');
  } finally {
    setButtonBusy(ui.loadCountry, false);
  }
}
function getStaticLayerKey() {
  return [
    state.dims.w,
    state.dims.h,
    state.camera.yaw.toFixed(3),
    state.camera.pitch.toFixed(3),
    state.camera.zoom.toFixed(2),
    state.camera.focusX.toFixed(3),
    state.camera.focusZ.toFixed(3),
    state.camera.focusY.toFixed(3),
    state.camera.roll.toFixed(3),
    state.camera.focalLength.toFixed(1),
    state.camera.lensAngle.toFixed(1),
    state.topography.loaded ? 1 : 0,
    state.topography.rows,
    state.topography.cols,
    state.topography.mode,
    state.topography.contourCount,
    state.topography.min.toFixed(1),
    state.topography.max.toFixed(1),
    ui.terrainColor.value,
    ui.wireOpacity.value,
    ui.terrainGlow.value,
    ui.terrainHeight.value,
    ui.terrainPattern?.value || '',
    ui.terrainDensity?.value || '',
    state.showGeoGrid ? 1 : 0,
    ui.geoGridColor?.value || '',
    ui.geoGridOpacity?.value || '',
    ui.geoGridWidth?.value || '',
    ui.geoLatStep?.value || '',
    ui.geoLngStep?.value || '',
    ui.geoLabelOpacity?.value || '',
    state.layerVisible.pins ? 1 : 0,
    state.layerVisible.path ? 1 : 0,
    state.layerVisible.outline ? 1 : 0,
    state.layerVisible.geoGrid ? 1 : 0,
    state.layerVisible.topography ? 1 : 0,
    state.layerVisible.seaLevel ? 1 : 0,
    state.geoStepLinked ? 1 : 0,
    cssVar('--tk-country-outline', ''),
    cssVar('--tk-country-shadow', ''),
    cssVar('--tk-scanline', ''),
    state.countryOutline.length,
    state.geoWindow.centerLat.toFixed(4),
    state.geoWindow.centerLng.toFixed(4),
    state.geoWindow.spanDeg.toFixed(4),
    state.geoWindow.fineScale.toFixed(4)
  ].join('|');
}

function rebuildStaticLayer(cam) {
  const layer = state.staticLayer;
  layer.canvas.width = Math.max(1, Math.floor(state.dims.w));
  layer.canvas.height = Math.max(1, Math.floor(state.dims.h));
  const lctx = layer.ctx;
  lctx.setTransform(1, 0, 0, 1, 0, 0);
  lctx.clearRect(0, 0, state.dims.w, state.dims.h);

  lctx.fillStyle = ensureScanlinePattern() || cssVar('--tk-scanline', 'rgba(95, 215, 245, 0.04)');
  lctx.fillRect(0, 0, state.dims.w, state.dims.h);
  drawTerrain(lctx, cam);
  drawGeoGrid(lctx, cam);
  drawTopographyContours(lctx, cam);
  drawCountryOutline(lctx, cam);
}

function markStaticDirty() {
  state.staticDirty = true;
}

function requestRender() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(render);
}

function render(now = 0) {
  state.renderQueued = false;
  const dt = Math.min(0.045, (now - state.lastFrame) / 1000 || 0);
  state.lastFrame = now;

  if (state.playing) {
    state.progress += dt * Number(ui.speed.value) * 0.2;
    if (state.progress >= 1) {
      state.progress = 1;
      state.playing = false;
      updatePlayPauseLabel();
    }
    ui.timeline.value = String(Math.floor(state.progress * 1000));
  }

  const cam = getCameraCache();
  const key = getStaticLayerKey();
  if (state.staticDirty || key !== state.staticLayer.key) {
    rebuildStaticLayer(cam);
    state.staticLayer.key = key;
    state.staticDirty = false;
  }

  ctx.clearRect(0, 0, state.dims.w, state.dims.h);
  ctx.drawImage(state.staticLayer.canvas, 0, 0, state.dims.w, state.dims.h);
  drawCameraFocusMarker(cam);
  drawPath(cam);
  drawPins(cam);
  drawHUD();
  drawCornerOrientationGlobe();
  updateTimelineMarkerActive();
  updateTimelinePlayhead();

  if (state.playing || state.interaction.dragging) {
    state.perf.frames += 1;
    if (!state.perf.sampleStart) state.perf.sampleStart = now;
    const elapsed = now - state.perf.sampleStart;
    if (elapsed >= 400) {
      state.perf.fps = state.perf.frames * (1000 / elapsed);
      state.perf.frames = 0;
      state.perf.sampleStart = now;
    }
    requestRender();
  }
}

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);
  state.dims = { w: rect.width, h: rect.height, ratio };
  markStaticDirty();
  requestRender();
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
  state.camera.pitch = clamp(patch.pitch ?? state.camera.pitch, -1.55, 1.55);
  state.camera.zoom = clamp(patch.zoom ?? state.camera.zoom, 0.35, 16);
  state.camera.focusX = clamp(patch.focusX ?? patch.panX ?? state.camera.focusX, -8, 8);
  state.camera.focusZ = clamp(patch.focusZ ?? patch.panZ ?? state.camera.focusZ, -8, 8);
  state.camera.focusY = clamp(patch.focusY ?? patch.pedestal ?? state.camera.focusY, -1.2, 1.2);
  state.camera.roll = clamp(patch.roll ?? state.camera.roll, -3.14, 3.14);
  state.camera.focalLength = clamp(patch.focalLength ?? state.camera.focalLength, 18, 120);
  state.camera.lensAngle = clamp(patch.lensAngle ?? state.camera.lensAngle, 22, 95);
  state.camera.focusDepth = clamp(patch.focusDepth ?? state.camera.focusDepth, 0.35, 18);
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
    iso: { yaw: -0.76, pitch: 0.93, roll: 0, zoom: 3.4 },
    top: { yaw: 0, pitch: 1.55, roll: 0, zoom: 3.6 },
    bottom: { yaw: 0, pitch: -1.55, roll: 0, zoom: 3.6 },
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
  const source = [...state.pins, ...state.path, ...state.countryOutline].filter(isValidGeoPoint);
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

function nudgeGeoWindow(dLat, dLng) {
  const step = Math.max(0.01, state.geoWindow.spanDeg * 0.08);
  setGeoWindow({
    centerLat: state.geoWindow.centerLat + dLat * step,
    centerLng: state.geoWindow.centerLng + dLng * step
  }, { manual: true });
}

ui.loadPins.addEventListener('click', loadPinsFromUI);
ui.parsePreview.addEventListener('click', () => {
  const lines = ui.pinData.value
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
  const parsed = parsePins(ui.pinData.value);
  const addrCandidates = lines.filter(looksLikeAddress).length;
  const shortCandidates = lines.filter(isGoogleMapsShortLink).length;
  let msg = `Preview: ${parsed.pins.length} directly valid, ${parsed.errors.length} unresolved.`;
  if (addrCandidates) msg += ` ${addrCandidates} address row(s) resolve on Add Pins.`;
  if (shortCandidates) msg += ` ${shortCandidates} short-link row(s) attempt expansion on Add Pins.`;
  setStatus(msg);
  toast(`Preview ${parsed.pins.length} direct / ${parsed.errors.length} unresolved`, parsed.errors.length ? 'warn' : 'ok');
});
ui.clearInput.addEventListener('click', () => {
  ui.pinData.value = '';
  setStatus('Input cleared.');
});
ui.sampleRoute.addEventListener('click', fetchRouteFromOSRM);
ui.clearRoute.addEventListener('click', () => {
  state.path = [];
  state.countryOutline = [];
  state.countryOutlineRaw = [];
  state.outlineSegmentsMeta = [];
  state.selectedOutlineSegmentIndex = 0;
  state.geoWindow.manual = false;
  populateOutlineSegmentSelect();
  state.routeDirty = true;
  state.progress = 0;
  ui.timeline.value = '0';
  state.playing = false;
  updatePlayPauseLabel();
  setStatus('Cleared route and outline. Run Route after pin changes.');
  toast('Route cleared', 'warn');
  updateBounds();
  rebuildTimelineAnchors();
  updateRawView();
  requestRender();
});

ui.playPause.addEventListener('click', () => {
  state.playing = !state.playing;
  updatePlayPauseLabel();
  requestRender();
});

ui.reset.addEventListener('click', () => {
  state.progress = 0;
  ui.timeline.value = '0';
  state.playing = false;
  updatePlayPauseLabel();
  updateTimelinePlayhead();
  requestRender();
});

ui.timeline.addEventListener('input', () => {
  state.progress = Number(ui.timeline.value) / 1000;
  state.playing = false;
  updatePlayPauseLabel();
  updateTimelineMarkerActive();
  updateTimelinePlayhead();
  requestRender();
});

ui.loadCountry.addEventListener('click', () => {
  const name = ui.countryName.value.trim();
  if (name) fetchCountryOutline(name);
});
ui.outlineMainlandOnly?.addEventListener('change', () => {
  state.outlineFilterMode = ui.outlineMainlandOnly.value || 'all';
  applyCountryOutlineFilter();
});
ui.outlineSegmentSelect?.addEventListener('change', () => {
  state.selectedOutlineSegmentIndex = Number(ui.outlineSegmentSelect.value || 0);
  updateDebugView();
});
ui.centerOutlineSegment?.addEventListener('click', centerOnSelectedOutlineSegment);
ui.terrainPattern?.addEventListener('change', () => {
  markStaticDirty();
  requestRender();
});
ui.geoCenterLat?.addEventListener('input', () => setGeoWindow({ centerLat: Number(ui.geoCenterLat.value) }, { manual: true }));
ui.geoCenterLng?.addEventListener('input', () => setGeoWindow({ centerLng: Number(ui.geoCenterLng.value) }, { manual: true }));
ui.geoSpanDeg?.addEventListener('input', () => setGeoWindow({ spanDeg: Number(ui.geoSpanDeg.value) }, { manual: true }));
ui.geoFineScale?.addEventListener('input', () => setGeoWindow({ fineScale: Number(ui.geoFineScale.value) }, { manual: true }));
ui.mapProjection?.addEventListener('change', () => {
  const next = ui.mapProjection.value === 'globe' ? 'globe' : 'flat';
  state.mapProjection = next;
  state.geoCache.key = '';
  state.geoCache.map.clear();
  if (next === 'globe' && !state.geoWindow.manual) {
    state.geoWindow.centerLat = 0;
    state.geoWindow.centerLng = 0;
    state.geoWindow.spanDeg = 180;
    state.geoWindow.fineScale = clamp(state.geoWindow.fineScale, 0.85, 2.2);
    syncGeoWindowToUI();
  }
  updateMapSettingsHint();
  markStaticDirty();
  updateDebugView();
  requestRender();
  toast(`Projection: ${next === 'globe' ? 'Globe' : 'Flat map'}`, 'ok');
});
ui.geoNudgeN?.addEventListener('click', () => nudgeGeoWindow(1, 0));
ui.geoNudgeS?.addEventListener('click', () => nudgeGeoWindow(-1, 0));
ui.geoNudgeE?.addEventListener('click', () => nudgeGeoWindow(0, 1));
ui.geoNudgeW?.addEventListener('click', () => nudgeGeoWindow(0, -1));
ui.fitGeoWindow?.addEventListener('click', () => {
  state.geoWindow.manual = false;
  fitGeoWindowToBounds();
  markStaticDirty();
  updateDebugView();
  requestRender();
});
ui.geoLatStep?.addEventListener('input', () => {
  if (state.geoStepLinked && ui.geoLngStep) ui.geoLngStep.value = ui.geoLatStep.value;
  markStaticDirty();
  updateDebugView();
  requestRender();
});
ui.geoLngStep?.addEventListener('input', () => {
  if (state.geoStepLinked && ui.geoLatStep) ui.geoLatStep.value = ui.geoLngStep.value;
  markStaticDirty();
  updateDebugView();
  requestRender();
});
ui.geoStepLink?.addEventListener('click', () => {
  state.geoStepLinked = !state.geoStepLinked;
  if (state.geoStepLinked && ui.geoLatStep && ui.geoLngStep) ui.geoLngStep.value = ui.geoLatStep.value;
  syncLayerToggleButtons();
  markStaticDirty();
  updateDebugView();
  requestRender();
});
ui.visPins?.addEventListener('click', () => setLayerVisibility('pins', !state.layerVisible.pins));
ui.visPath?.addEventListener('click', () => setLayerVisibility('path', !state.layerVisible.path));
ui.visOutline?.addEventListener('click', () => setLayerVisibility('outline', !state.layerVisible.outline));
ui.visGeoGrid?.addEventListener('click', () => setLayerVisibility('geoGrid', !state.layerVisible.geoGrid));
ui.visTopography?.addEventListener('click', () => setLayerVisibility('topography', !state.layerVisible.topography));
ui.visSeaLevel?.addEventListener('click', () => setLayerVisibility('seaLevel', !state.layerVisible.seaLevel));

ui.loadTopography?.addEventListener('click', loadTopographyFromOpenData);
ui.clearTopography?.addEventListener('click', clearTopography);
ui.topoMode?.addEventListener('change', () => {
  state.topography.mode = ui.topoMode.value || 'contour2d';
  markStaticDirty();
  updateRawView();
  requestRender();
});
ui.topoContours?.addEventListener('input', () => {
  state.topography.contourCount = Number(ui.topoContours.value || 10);
  markStaticDirty();
  requestRender();
});

ui.timelineModeBtn?.addEventListener('click', toggleTimelineMode);

ui.savePinMeta.addEventListener('click', saveMetadataFromEditor);
ui.cancelPinMeta.addEventListener('click', cancelMetadataChanges);
ui.deletePin.addEventListener('click', deleteSelectedPin);
ui.refreshRaw?.addEventListener('click', updateRawView);
ui.refreshDebug?.addEventListener('click', updateDebugView);

if (ui.confirmDeleteBtn) {
  ui.confirmDeleteBtn.addEventListener('click', () => {
    ui.confirmDeleteDialog?.close();
    confirmDeletePin();
  });
}
if (ui.cancelDeleteBtn) {
  ui.cancelDeleteBtn.addEventListener('click', () => ui.confirmDeleteDialog?.close());
}

[ui.pinLabel, ui.pinTimestamp, ui.pinNote].forEach(el => {
  el.addEventListener('input', handleMetadataChange);
});

ui.panelHelpButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.help || 'No help text available.';
    const sectionTitle = btn.closest('.group')?.querySelector('h3')?.textContent?.trim() || 'Panel Help';
    if (ui.helpDialogTitle) ui.helpDialogTitle.textContent = sectionTitle;
    if (ui.helpDialogBody) ui.helpDialogBody.textContent = text;
    if (ui.helpDialog?.showModal) ui.helpDialog.showModal();
  });
});

ui.closeHelpDialogBtn?.addEventListener('click', () => ui.helpDialog?.close());

ui.cameraYaw?.addEventListener('input', () => setCameraState({ yaw: Number(ui.cameraYaw.value) }));
ui.cameraPitch?.addEventListener('input', () => setCameraState({ pitch: Number(ui.cameraPitch.value) }));
ui.cameraZoom?.addEventListener('input', () => setCameraState({ zoom: Number(ui.cameraZoom.value) }));
ui.cameraPanX?.addEventListener('input', () => setCameraState({ panX: Number(ui.cameraPanX.value) }));
ui.cameraPanZ?.addEventListener('input', () => setCameraState({ panZ: Number(ui.cameraPanZ.value) }));
ui.cameraPedestal?.addEventListener('input', () => setCameraState({ pedestal: Number(ui.cameraPedestal.value) }));
ui.cameraRoll?.addEventListener('input', () => setCameraState({ roll: Number(ui.cameraRoll.value) }));
ui.cameraFocal?.addEventListener('input', () => setCameraState({ focalLength: Number(ui.cameraFocal.value) }));
ui.cameraLens?.addEventListener('input', () => setCameraState({ lensAngle: Number(ui.cameraLens.value) }));
ui.cameraFocusDepth?.addEventListener('input', () => setCameraState({ focusDepth: Number(ui.cameraFocusDepth.value) }));
ui.cameraDof?.addEventListener('input', () => setCameraState({ dofStrength: Number(ui.cameraDof.value) }));
ui.resetCamera?.addEventListener('click', () => setCameraPreset('home'));
ui.viewHome?.addEventListener('click', () => setCameraPreset('home'));
ui.viewFit?.addEventListener('click', fitMapToFrame);
ui.viewIso?.addEventListener('click', () => setCameraPreset('iso'));
ui.viewTop?.addEventListener('click', () => setCameraPreset('top'));
ui.viewBottom?.addEventListener('click', () => setCameraPreset('bottom'));
ui.viewLeft?.addEventListener('click', () => setCameraPreset('left'));
ui.viewRight?.addEventListener('click', () => setCameraPreset('right'));
ui.viewFront?.addEventListener('click', () => setCameraPreset('front'));
ui.viewBack?.addEventListener('click', () => setCameraPreset('back'));

[ui.terrainColor, ui.terrainGlow, ui.wireOpacity, ui.terrainHeight, ui.terrainPattern, ui.terrainDensity].filter(Boolean).forEach(el => {
  el.addEventListener('input', () => {
    markStaticDirty();
    requestRender();
  });
});
[ui.pathColor, ui.pathWidth, ui.pinColor, ui.pinSize].forEach(el => el.addEventListener('input', requestRender));
[ui.outlineColor, ui.outlineOpacity, ui.outlineWidth, ui.topoColor, ui.topoOpacity, ui.topoLineWidth, ui.topoHeightScale]
  .filter(Boolean)
  .forEach(el => el.addEventListener('input', () => {
    markStaticDirty();
    requestRender();
  }));
[ui.geoGridColor, ui.geoGridOpacity, ui.geoGridWidth, ui.geoLabelOpacity]
  .filter(Boolean)
  .forEach(el => el.addEventListener('input', () => {
    markStaticDirty();
    updateDebugView();
    requestRender();
  }));

ui.exportPng?.addEventListener('click', () => {
  try {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `trekulate_${stamp}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setExportStatus('PNG exported.');
    toast('PNG exported', 'ok');
  } catch (err) {
    console.error(err);
    setExportStatus('PNG export failed.');
    toast('PNG export failed', 'err');
  }
});

canvas.addEventListener('mousedown', (e) => {
  if (e.button !== 0 && e.button !== 1) return;
  if (e.button === 1) e.preventDefault();
  state.interaction.dragging = true;
  state.interaction.moved = false;
  state.interaction.mode = (e.button === 1 || e.shiftKey) ? 'pan' : 'orbit';
  state.interaction.button = e.button;
  state.interaction.x = e.clientX;
  state.interaction.y = e.clientY;
  requestRender();
});
window.addEventListener('mousemove', (e) => {
  if (!state.interaction.dragging) return;
  const dx = e.clientX - state.interaction.x;
  const dy = e.clientY - state.interaction.y;
  state.interaction.x = e.clientX;
  state.interaction.y = e.clientY;
  if (Math.abs(dx) + Math.abs(dy) > 1) state.interaction.moved = true;
  if (state.interaction.mode === 'pan') {
    // Surface-plane tracking: translate only on map plane (X/Z), no vertical focus shift.
    const panScale = 0.0022 * state.camera.zoom;
    const moveX = dx * panScale;
    const moveZ = dy * panScale;
    const cy = Math.cos(state.camera.yaw);
    const sy = Math.sin(state.camera.yaw);
    // Right/forward axes projected on the map surface.
    const deltaX = moveX * cy + moveZ * sy;
    const deltaZ = moveX * sy - moveZ * cy;
    setCameraState({
      focusX: state.camera.focusX - deltaX,
      focusZ: state.camera.focusZ - deltaZ
    }, { syncUI: false });
  } else {
    setCamera(state.camera.yaw + dx * 0.006, state.camera.pitch + dy * 0.005, state.camera.zoom, { syncUI: false });
  }
});
window.addEventListener('mouseup', (e) => {
  if (!state.interaction.dragging) return;
  const shouldPick = state.interaction.button === 0;
  state.interaction.dragging = false;
  state.interaction.mode = '';
  state.interaction.button = -1;
  if (shouldPick && !state.interaction.moved) pickPin(e.clientX, e.clientY);
  syncCameraToUI();
  requestRender();
});
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY) * Math.max(0.05, state.camera.zoom * 0.08);
  setCamera(state.camera.yaw, state.camera.pitch, state.camera.zoom + delta, { syncUI: false });
  if (wheelSyncTimer) clearTimeout(wheelSyncTimer);
  wheelSyncTimer = setTimeout(() => {
    syncCameraToUI();
    wheelSyncTimer = null;
  }, 90);
}, { passive: false });
canvas.addEventListener('auxclick', (e) => {
  if (e.button === 1) e.preventDefault();
});

window.addEventListener('resize', resize);
const savedTheme = localStorage.getItem(themeStorageKey) || document.documentElement.getAttribute('data-theme') || 'mono-slate';
applyTheme(savedTheme);
ui.themeSelectApp.addEventListener('change', (e) => applyTheme(e.target.value));
setupTabs();
setupCollapsibleGroups();
updatePlayPauseLabel();
updateTimelineModeButton();

loadPinsFromUI({ silent: true });
syncCameraToUI();
syncGeoWindowToUI();
if (ui.mapProjection) ui.mapProjection.value = state.mapProjection;
if (ui.topoContours) ui.topoContours.value = String(state.topography.contourCount);
if (ui.topoMode) ui.topoMode.value = state.topography.mode;
if (ui.outlineMainlandOnly) ui.outlineMainlandOnly.value = state.outlineFilterMode;
syncLayerToggleButtons();
populateOutlineSegmentSelect();
setTopoStatus('Topography idle.');
updateDebugView();
resize();
requestRender();
