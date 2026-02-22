const canvas = document.getElementById('view');
const ctx = canvas.getContext('2d');

const ui = {
  themeSelectApp: document.getElementById('themeSelectApp'),
  tabMapping: document.getElementById('tabMapping'),
  tabRendering: document.getElementById('tabRendering'),
  tabData: document.getElementById('tabData'),
  tabRaw: document.getElementById('tabRaw'),
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
  timeline: document.getElementById('timeline'),
  speed: document.getElementById('speed'),
  terrainColor: document.getElementById('terrainColor'),
  terrainGlow: document.getElementById('terrainGlow'),
  pathColor: document.getElementById('pathColor'),
  pathWidth: document.getElementById('pathWidth'),
  pinColor: document.getElementById('pinColor'),
  pinSize: document.getElementById('pinSize'),
  wireOpacity: document.getElementById('wireOpacity'),
  terrainHeight: document.getElementById('terrainHeight'),
  cameraYaw: document.getElementById('cameraYaw'),
  cameraPitch: document.getElementById('cameraPitch'),
  cameraZoom: document.getElementById('cameraZoom'),
  cameraPedestal: document.getElementById('cameraPedestal'),
  cameraFocal: document.getElementById('cameraFocal'),
  cameraLens: document.getElementById('cameraLens'),
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
  loadCountry: document.getElementById('loadCountry'),
  exportPng: document.getElementById('exportPng'),
  exportStatus: document.getElementById('exportStatus'),
  hudPins: document.getElementById('hudPins'),
  hudPath: document.getElementById('hudPath'),
  hudTime: document.getElementById('hudTime'),
  hudCam: document.getElementById('hudCam'),
  hudFps: document.getElementById('hudFps')
};
ui.tabButtons = [ui.tabMapping, ui.tabRendering, ui.tabData, ui.tabRaw, ui.tabExport, ui.tabSettings].filter(Boolean);
ui.tabPanels = Array.from(document.querySelectorAll('[data-tab-panel]'));

const themeStorageKey = 'trekulate.theme';
const CAMERA_DEFAULT = {
  yaw: -0.76,
  pitch: 0.93,
  zoom: 3.4,
  panX: 0,
  panZ: 0,
  pedestal: 0,
  focalLength: 50,
  lensAngle: 58
};

const state = {
  pins: [],
  path: [],
  countryOutline: [],
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
  selectedPinId: null,
  routeDirty: false,
  timelineMode: 'uniform',
  timelineAnchors: [],
  metadataDirty: false,
  metadataSnapshot: null,
  nextPinId: 1,
  lastProjectedPins: [],
  perf: { fps: 0, frames: 0, sampleStart: 0 }
};
state.staticLayer.ctx = state.staticLayer.canvas.getContext('2d');

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

function setExportStatus(text) {
  if (ui.exportStatus) ui.exportStatus.textContent = text;
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

function updateRawView() {
  if (!ui.rawJsonView) return;
  const payload = {
    pins: state.pins,
    path: state.path,
    countryOutline: state.countryOutline,
    routeDirty: state.routeDirty,
    timelineMode: state.timelineMode,
    timelineAnchors: state.timelineAnchors
  };
  ui.rawJsonView.value = JSON.stringify(payload, null, 2);
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
    });
    ui.timelineMarkers.appendChild(marker);
  }
  updateTimelineMarkerActive();
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
  const decoded = decodeURIComponent(link);
  const place = decoded.match(/\/place\/([^/?#]+)/i);
  if (place?.[1]) return place[1].replace(/\+/g, ' ').slice(0, 24);
  return fallback;
}

function extractCoordsFromGoogleMaps(text) {
  const decoded = decodeURIComponent(text);
  const patterns = [
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /[?&](?:q|ll|query)=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/i,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i
  ];
  for (const rx of patterns) {
    const m = decoded.match(rx);
    if (!m) continue;
    const lat = Number(m[1]);
    const lng = Number(m[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  return null;
}

function parsePinLine(line, i) {
  const fallbackLabel = `PIN-${i + 1}`;
  if (/https?:\/\/(?:www\.)?(?:google\.[^/\s]+\/maps|maps\.app\.goo\.gl|maps\.google\.[^/\s]+)/i.test(line)) {
    const coords = extractCoordsFromGoogleMaps(line);
    if (!coords) return { ok: false, reason: 'Google Maps link has no explicit coordinates.' };
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
    return;
  }
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const p of all) {
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  }
  const padLat = Math.max((maxLat - minLat) * 0.16, 0.01);
  const padLng = Math.max((maxLng - minLng) * 0.16, 0.01);
  state.bounds = {
    minLat: minLat - padLat,
    maxLat: maxLat + padLat,
    minLng: minLng - padLng,
    maxLng: maxLng + padLng
  };
  markStaticDirty();
}

function noise(x, z) {
  const h = Math.sin(x * 0.035) * Math.cos(z * 0.038) + Math.sin((x + z) * 0.016);
  return h * 0.5;
}

function mapToWorld(lat, lng) {
  const { minLat, maxLat, minLng, maxLng } = state.bounds;
  const nx = (lng - minLng) / Math.max(maxLng - minLng, 1e-6);
  const nz = 1 - ((lat - minLat) / Math.max(maxLat - minLat, 1e-6));
  return { x: (nx - 0.5) * 2, z: (nz - 0.5) * 2 };
}

function worldWithCameraOffsets(world) {
  return { x: world.x + state.camera.panX, z: world.z + state.camera.panZ };
}

function getCameraCache(camera = state.camera) {
  const cy = Math.cos(camera.yaw);
  const sy = Math.sin(camera.yaw);
  const cx = Math.cos(camera.pitch);
  const sx = Math.sin(camera.pitch);
  const lens = clamp(camera.lensAngle, 22, 95) * Math.PI / 180;
  const lensFactor = 1 / Math.tan(lens * 0.5);
  const focalNorm = clamp(camera.focalLength, 18, 120) / 50;
  return { cy, sy, cx, sx, zoom: camera.zoom, pedestal: camera.pedestal, lensFactor, focalNorm };
}

function project(x, y, z, cam) {
  const x1 = x * cam.cy + z * cam.sy;
  const z1 = -x * cam.sy + z * cam.cy;
  const yShifted = y + cam.pedestal;
  const y2 = yShifted * cam.cx - z1 * cam.sx;
  const z2 = yShifted * cam.sx + z1 * cam.cx + cam.zoom;
  const persp = (cam.lensFactor * cam.focalNorm) / Math.max(0.6, z2);
  const scale = state.dims.w * 0.38;
  const px = state.dims.w * 0.5 + x1 * persp * scale;
  const py = state.dims.h * 0.53 + y2 * persp * scale;
  return { x: px, y: py, z: z2 };
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
  const grid = state.terrainGrid.size;
  const pts = state.terrainGrid.points;
  const get = (i, j) => pts[i * (grid + 1) + j];
  const c = ui.terrainColor.value;
  const alpha = Number(ui.wireOpacity.value);
  const glow = Number(ui.terrainGlow.value) * 8;
  const heightScale = Number(ui.terrainHeight.value);

  targetCtx.save();
  targetCtx.strokeStyle = hexToRgba(c, alpha);
  targetCtx.lineWidth = 1;
  targetCtx.shadowColor = c;
  targetCtx.shadowBlur = glow;

  for (let i = 0; i <= grid; i++) {
    targetCtx.beginPath();
    for (let j = 0; j <= grid; j++) {
      const p0 = get(i, j);
      const p = project(p0.x + state.camera.panX, p0.base * 0.22 * heightScale, p0.z + state.camera.panZ, cam);
      if (j === 0) targetCtx.moveTo(p.x, p.y);
      else targetCtx.lineTo(p.x, p.y);
    }
    targetCtx.stroke();
  }
  for (let j = 0; j <= grid; j++) {
    targetCtx.beginPath();
    for (let i = 0; i <= grid; i++) {
      const p0 = get(i, j);
      const p = project(p0.x + state.camera.panX, p0.base * 0.22 * heightScale, p0.z + state.camera.panZ, cam);
      if (i === 0) targetCtx.moveTo(p.x, p.y);
      else targetCtx.lineTo(p.x, p.y);
    }
    targetCtx.stroke();
  }
  targetCtx.restore();
}

function drawCountryOutline(targetCtx, cam) {
  if (!state.countryOutline.length) return;
  targetCtx.save();
  targetCtx.strokeStyle = cssVar('--tk-country-outline', 'rgba(175, 245, 255, 0.28)');
  targetCtx.lineWidth = 1.2;
  targetCtx.shadowColor = cssVar('--tk-country-shadow', '#95f0ff');
  targetCtx.shadowBlur = 8;
  targetCtx.beginPath();
  state.countryOutline.forEach((pt, i) => {
    const w = worldWithCameraOffsets(mapToWorld(pt.lat, pt.lng));
    const p = project(w.x, noise(w.x * 90, w.z * 90) * 0.06, w.z, cam);
    if (i === 0) targetCtx.moveTo(p.x, p.y);
    else targetCtx.lineTo(p.x, p.y);
  });
  targetCtx.stroke();
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
  const pts = buildAnimatedPath();
  if (!pts.length) return;
  const c = ui.pathColor.value;
  ctx.save();
  ctx.strokeStyle = c;
  ctx.lineWidth = Number(ui.pathWidth.value);
  ctx.shadowColor = c;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  pts.forEach((pt, i) => {
    const w = worldWithCameraOffsets(mapToWorld(pt.lat, pt.lng));
    const p = project(w.x, noise(w.x * 90, w.z * 90) * 0.07 + 0.018, w.z, cam);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.restore();
}

function drawPins(cam) {
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
    const w = worldWithCameraOffsets(mapToWorld(pin.lat, pin.lng));
    const base = project(w.x, noise(w.x * 90, w.z * 90) * 0.07, w.z, cam);
    const top = project(w.x, noise(w.x * 90, w.z * 90) * 0.07 - 0.06, w.z, cam);
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
  ui.hudCam.textContent = `Cam: y ${state.camera.yaw.toFixed(2)} p ${state.camera.pitch.toFixed(2)} z ${state.camera.zoom.toFixed(1)} f ${state.camera.focalLength.toFixed(0)} l ${state.camera.lensAngle.toFixed(0)}`;
  ui.hudFps.textContent = state.playing || state.interaction.dragging ? `FPS: ${state.perf.fps.toFixed(0)}` : 'FPS: idle';
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

function loadPinsFromUI(options = {}) {
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
      failed.push(raw);
    }
  }

  if (!added.length) {
    setStatus('No valid pin rows found.');
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
  ui.pinData.value = failed.join('\n');
  if (!silent) {
    for (const pin of added) toast(`Added ${pin.label}`, 'ok');
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
  if (state.pins.length < 2) {
    setStatus('Need at least 2 pins to build a route.');
    toast('Add at least 2 pins first', 'warn');
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
  }
}

async function fetchCountryOutline(name) {
  try {
    setStatus(`Fetching country outline for ${name}...`);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&country=${encodeURIComponent(name)}&limit=1`;
    const geo = await fetch(nominatimUrl, { headers: { 'Accept-Language': 'en' } }).then(r => r.json());
    const item = geo?.[0];
    if (!item?.osm_id || !item?.osm_type) throw new Error('Country not found');
    const overpassType = item.osm_type === 'way' ? 'way' : 'relation';
    const overpass = `[out:json];${overpassType}(${item.osm_id});out geom;`;
    const data = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpass,
      headers: { 'Content-Type': 'text/plain' }
    }).then(r => r.json());
    const pts = [];
    for (const el of data.elements || []) {
      if (Array.isArray(el.geometry)) {
        for (const g of el.geometry) pts.push({ lat: g.lat, lng: g.lon });
      }
    }
    if (pts.length < 2) throw new Error('No boundary geometry');
    state.countryOutline = downsamplePath(pts, 1700).map(p => ({ lat: p.lat, lng: p.lng }));
    updateBounds();
    setStatus(`Loaded ${name} outline (${state.countryOutline.length} vertices).`);
    updateRawView();
    requestRender();
  } catch (err) {
    console.error(err);
    setStatus('Country outline lookup failed.');
  }
}
function getStaticLayerKey() {
  return [
    state.dims.w,
    state.dims.h,
    state.camera.yaw.toFixed(3),
    state.camera.pitch.toFixed(3),
    state.camera.zoom.toFixed(2),
    state.camera.panX.toFixed(3),
    state.camera.panZ.toFixed(3),
    state.camera.pedestal.toFixed(3),
    state.camera.focalLength.toFixed(1),
    state.camera.lensAngle.toFixed(1),
    ui.terrainColor.value,
    ui.wireOpacity.value,
    ui.terrainGlow.value,
    ui.terrainHeight.value,
    cssVar('--tk-country-outline', ''),
    cssVar('--tk-country-shadow', ''),
    cssVar('--tk-scanline', ''),
    state.countryOutline.length,
    state.bounds.minLat.toFixed(4),
    state.bounds.maxLat.toFixed(4),
    state.bounds.minLng.toFixed(4),
    state.bounds.maxLng.toFixed(4)
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
  drawPath(cam);
  drawPins(cam);
  drawHUD();
  updateTimelineMarkerActive();

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
  if (ui.cameraPedestal) ui.cameraPedestal.value = String(state.camera.pedestal);
  if (ui.cameraFocal) ui.cameraFocal.value = String(state.camera.focalLength);
  if (ui.cameraLens) ui.cameraLens.value = String(state.camera.lensAngle);
}

function setCameraState(patch = {}, options = {}) {
  const { skipRender = false } = options;
  state.camera.yaw = clamp(patch.yaw ?? state.camera.yaw, -3.14, 3.14);
  state.camera.pitch = clamp(patch.pitch ?? state.camera.pitch, 0.08, 1.56);
  state.camera.zoom = clamp(patch.zoom ?? state.camera.zoom, 1.4, 9.5);
  state.camera.panX = clamp(patch.panX ?? state.camera.panX, -3.5, 3.5);
  state.camera.panZ = clamp(patch.panZ ?? state.camera.panZ, -3.5, 3.5);
  state.camera.pedestal = clamp(patch.pedestal ?? state.camera.pedestal, -1.2, 1.2);
  state.camera.focalLength = clamp(patch.focalLength ?? state.camera.focalLength, 18, 120);
  state.camera.lensAngle = clamp(patch.lensAngle ?? state.camera.lensAngle, 22, 95);
  syncCameraToUI();
  markStaticDirty();
  if (!skipRender) requestRender();
}

function setCamera(yaw, pitch, zoom) {
  setCameraState({ yaw, pitch, zoom });
}

function setCameraPreset(name) {
  const presets = {
    iso: { yaw: -0.76, pitch: 0.93, zoom: 3.4 },
    top: { yaw: 0, pitch: 1.56, zoom: 3.6 },
    bottom: { yaw: 0, pitch: 0.08, zoom: 3.6 },
    left: { yaw: -Math.PI / 2, pitch: 0.93, zoom: 3.4 },
    right: { yaw: Math.PI / 2, pitch: 0.93, zoom: 3.4 },
    front: { yaw: 0, pitch: 0.93, zoom: 3.4 },
    back: { yaw: Math.PI, pitch: 0.93, zoom: 3.4 },
    home: { ...CAMERA_DEFAULT }
  };
  const next = presets[name];
  if (!next) return;
  setCameraState(next);
}

function collectFrameWorldPoints(limit = 220) {
  const source = [...state.pins, ...state.path, ...state.countryOutline];
  if (!source.length) {
    return [
      { x: -1, z: -1 },
      { x: 1, z: -1 },
      { x: -1, z: 1 },
      { x: 1, z: 1 }
    ];
  }
  const step = Math.max(1, Math.ceil(source.length / limit));
  const points = [];
  for (let i = 0; i < source.length; i += step) {
    points.push(mapToWorld(source[i].lat, source[i].lng));
  }
  return points;
}

function fitMapToFrame() {
  const points = collectFrameWorldPoints();
  const test = (zoom) => {
    const cam = getCameraCache({ ...state.camera, zoom, panX: 0, panZ: 0 });
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const w of points) {
      const p = project(w.x, noise(w.x * 90, w.z * 90) * 0.06, w.z, cam);
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    return { width: maxX - minX, height: maxY - minY };
  };

  let lo = 1.4;
  let hi = 9.5;
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) * 0.5;
    const frame = test(mid);
    const fits = frame.width <= state.dims.w * 0.82 && frame.height <= state.dims.h * 0.74;
    if (fits) hi = mid;
    else lo = mid;
  }
  setCameraState({ panX: 0, panZ: 0, zoom: hi });
}

ui.loadPins.addEventListener('click', loadPinsFromUI);
ui.parsePreview.addEventListener('click', () => {
  const parsed = parsePins(ui.pinData.value);
  setStatus(`Preview: ${parsed.pins.length} valid, ${parsed.errors.length} invalid.`);
  toast(`Preview ${parsed.pins.length} valid / ${parsed.errors.length} invalid`, parsed.errors.length ? 'warn' : 'ok');
});
ui.clearInput.addEventListener('click', () => {
  ui.pinData.value = '';
  setStatus('Input cleared.');
});
ui.sampleRoute.addEventListener('click', fetchRouteFromOSRM);
ui.clearRoute.addEventListener('click', () => {
  state.path = [];
  state.countryOutline = [];
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
  requestRender();
});

ui.timeline.addEventListener('input', () => {
  state.progress = Number(ui.timeline.value) / 1000;
  state.playing = false;
  updatePlayPauseLabel();
  updateTimelineMarkerActive();
  requestRender();
});

ui.loadCountry.addEventListener('click', () => {
  const name = ui.countryName.value.trim();
  if (name) fetchCountryOutline(name);
});

ui.timelineModeBtn?.addEventListener('click', toggleTimelineMode);

ui.savePinMeta.addEventListener('click', saveMetadataFromEditor);
ui.cancelPinMeta.addEventListener('click', cancelMetadataChanges);
ui.deletePin.addEventListener('click', deleteSelectedPin);
ui.refreshRaw?.addEventListener('click', updateRawView);

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
ui.cameraPedestal?.addEventListener('input', () => setCameraState({ pedestal: Number(ui.cameraPedestal.value) }));
ui.cameraFocal?.addEventListener('input', () => setCameraState({ focalLength: Number(ui.cameraFocal.value) }));
ui.cameraLens?.addEventListener('input', () => setCameraState({ lensAngle: Number(ui.cameraLens.value) }));
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

[ui.terrainColor, ui.terrainGlow, ui.wireOpacity, ui.terrainHeight].forEach(el => {
  el.addEventListener('input', () => {
    markStaticDirty();
    requestRender();
  });
});
[ui.pathColor, ui.pathWidth, ui.pinColor, ui.pinSize].forEach(el => el.addEventListener('input', requestRender));

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
  state.interaction.mode = e.button === 1 ? 'pan' : 'orbit';
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
    const panScale = 0.0022 * state.camera.zoom;
    setCameraState({ panX: state.camera.panX + dx * panScale, panZ: state.camera.panZ + dy * panScale });
  } else {
    setCamera(state.camera.yaw + dx * 0.006, state.camera.pitch + dy * 0.005, state.camera.zoom);
  }
});
window.addEventListener('mouseup', (e) => {
  if (!state.interaction.dragging) return;
  const shouldPick = state.interaction.button === 0;
  state.interaction.dragging = false;
  state.interaction.mode = '';
  state.interaction.button = -1;
  if (shouldPick && !state.interaction.moved) pickPin(e.clientX, e.clientY);
  requestRender();
});
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  setCamera(state.camera.yaw, state.camera.pitch, state.camera.zoom + Math.sign(e.deltaY) * 0.2);
}, { passive: false });
canvas.addEventListener('auxclick', (e) => {
  if (e.button === 1) e.preventDefault();
});

window.addEventListener('resize', resize);
const savedTheme = localStorage.getItem(themeStorageKey) || document.documentElement.getAttribute('data-theme') || 'mono-slate';
applyTheme(savedTheme);
ui.themeSelectApp.addEventListener('change', (e) => applyTheme(e.target.value));
setupTabs();
updatePlayPauseLabel();
updateTimelineModeButton();

buildTerrainGrid(32);
loadPinsFromUI({ silent: true });
syncCameraToUI();
resize();
requestRender();
