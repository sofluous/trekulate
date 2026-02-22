const canvas = document.getElementById('view');
const ctx = canvas.getContext('2d');

const ui = {
  themeSelectApp: document.getElementById('themeSelectApp'),
  tabMapping: document.getElementById('tabMapping'),
  tabRendering: document.getElementById('tabRendering'),
  tabData: document.getElementById('tabData'),
  tabExport: document.getElementById('tabExport'),
  tabSettings: document.getElementById('tabSettings'),
  pinData: document.getElementById('pinData'),
  loadPins: document.getElementById('loadPins'),
  sampleRoute: document.getElementById('sampleRoute'),
  clearRoute: document.getElementById('clearRoute'),
  playPause: document.getElementById('playPause'),
  reset: document.getElementById('reset'),
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
  resetCamera: document.getElementById('resetCamera'),
  pinSelect: document.getElementById('pinSelect'),
  pinLabel: document.getElementById('pinLabel'),
  pinTimestamp: document.getElementById('pinTimestamp'),
  pinNote: document.getElementById('pinNote'),
  pinSource: document.getElementById('pinSource'),
  savePinMeta: document.getElementById('savePinMeta'),
  pinParseStatus: document.getElementById('pinParseStatus'),
  countryName: document.getElementById('countryName'),
  loadCountry: document.getElementById('loadCountry'),
  hudPins: document.getElementById('hudPins'),
  hudPath: document.getElementById('hudPath'),
  hudTime: document.getElementById('hudTime'),
  hudCam: document.getElementById('hudCam'),
  hudFps: document.getElementById('hudFps')
};
ui.tabButtons = [ui.tabMapping, ui.tabRendering, ui.tabData, ui.tabExport, ui.tabSettings].filter(Boolean);
ui.tabPanels = Array.from(document.querySelectorAll('[data-tab-panel]'));

const themeStorageKey = 'trekulate.theme';

const state = {
  pins: [],
  path: [],
  countryOutline: [],
  playing: false,
  progress: 0,
  lastFrame: 0,
  dims: { w: 0, h: 0, ratio: 1 },
  bounds: { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 },
  camera: { yaw: -0.76, pitch: 0.93, zoom: 3.4 },
  interaction: { dragging: false, moved: false, x: 0, y: 0 },
  renderQueued: false,
  staticDirty: true,
  staticLayer: { canvas: document.createElement('canvas'), ctx: null, key: '' },
  scanlinePattern: null,
  terrainGrid: { size: 32, points: [] },
  selectedPinId: null,
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

function setActiveTab(tabName) {
  ui.tabButtons.forEach(btn => {
    const active = btn.dataset.tab === tabName;
    btn.setAttribute('aria-selected', String(active));
    btn.classList.toggle('ds-btn-primary', active);
  });
  ui.tabPanels.forEach(panel => {
    panel.hidden = panel.dataset.tabPanel !== tabName;
  });
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

function getCameraCache() {
  const cy = Math.cos(state.camera.yaw);
  const sy = Math.sin(state.camera.yaw);
  const cx = Math.cos(state.camera.pitch);
  const sx = Math.sin(state.camera.pitch);
  return { cy, sy, cx, sx, zoom: state.camera.zoom };
}

function project(x, y, z, cam) {
  const x1 = x * cam.cy + z * cam.sy;
  const z1 = -x * cam.sy + z * cam.cy;
  const y2 = y * cam.cx - z1 * cam.sx;
  const z2 = y * cam.sx + z1 * cam.cx + cam.zoom;
  const persp = 1 / Math.max(0.6, z2);
  const px = state.dims.w * 0.5 + x1 * persp * state.dims.w * 0.52;
  const py = state.dims.h * 0.53 + y2 * persp * state.dims.w * 0.52;
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
      const p = project(p0.x, p0.base * 0.22 * heightScale, p0.z, cam);
      if (j === 0) targetCtx.moveTo(p.x, p.y);
      else targetCtx.lineTo(p.x, p.y);
    }
    targetCtx.stroke();
  }
  for (let j = 0; j <= grid; j++) {
    targetCtx.beginPath();
    for (let i = 0; i <= grid; i++) {
      const p0 = get(i, j);
      const p = project(p0.x, p0.base * 0.22 * heightScale, p0.z, cam);
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
    const w = mapToWorld(pt.lat, pt.lng);
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
  const maxSeg = (n - 1) * state.progress;
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
  if (state.progress >= 1) out.push(state.path[n - 1]);
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
    const w = mapToWorld(pt.lat, pt.lng);
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
  const shown = Math.floor((state.pins.length - 1) * state.progress) + 1;
  state.lastProjectedPins = [];

  ctx.save();
  ctx.font = "12px 'Orbitron', sans-serif";
  ctx.fillStyle = c;
  ctx.strokeStyle = c;
  ctx.shadowColor = c;
  ctx.shadowBlur = 10;
  ctx.lineWidth = 1.2;

  state.pins.forEach((pin, i) => {
    if (i >= shown) return;
    const w = mapToWorld(pin.lat, pin.lng);
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
  ui.hudCam.textContent = `Cam: y ${state.camera.yaw.toFixed(2)} p ${state.camera.pitch.toFixed(2)} z ${state.camera.zoom.toFixed(1)}`;
  ui.hudFps.textContent = state.playing || state.interaction.dragging ? `FPS: ${state.perf.fps.toFixed(0)}` : 'FPS: idle';
}

function refreshPinSelect() {
  const current = String(state.selectedPinId ?? '');
  ui.pinSelect.innerHTML = '';
  for (const pin of state.pins) {
    const opt = document.createElement('option');
    opt.value = String(pin.id);
    opt.textContent = `${pin.label} (${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)})`;
    if (opt.value === current) opt.selected = true;
    ui.pinSelect.appendChild(opt);
  }

  if (!state.pins.length) {
    state.selectedPinId = null;
    ui.pinLabel.value = '';
    ui.pinTimestamp.value = '';
    ui.pinNote.value = '';
    ui.pinSource.value = '';
    return;
  }
  if (!state.selectedPinId || !state.pins.some(p => p.id === state.selectedPinId)) {
    state.selectedPinId = state.pins[0].id;
  }
  syncMetadataEditor();
}

function getSelectedPin() {
  return state.pins.find(p => p.id === state.selectedPinId) || null;
}

function syncMetadataEditor() {
  const pin = getSelectedPin();
  if (!pin) return;
  ui.pinSelect.value = String(pin.id);
  ui.pinLabel.value = pin.label || '';
  ui.pinTimestamp.value = toLocalInputValue(pin.timestamp);
  ui.pinNote.value = pin.note || '';
  ui.pinSource.value = pin.source || 'manual';
  requestRender();
}

function saveMetadataFromEditor() {
  const pin = getSelectedPin();
  if (!pin) return;
  pin.label = (ui.pinLabel.value || pin.label).slice(0, 24);
  pin.timestamp = ui.pinTimestamp.value ? new Date(ui.pinTimestamp.value).toISOString() : '';
  pin.note = (ui.pinNote.value || '').slice(0, 180);
  refreshPinSelect();
  setStatus(`Saved metadata for ${pin.label}.`);
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

function loadPinsFromUI() {
  const parsed = parsePins(ui.pinData.value);
  state.pins = parsed.pins;
  state.path = state.pins.length >= 2 ? state.pins.map(p => ({ lat: p.lat, lng: p.lng, label: p.label })) : [];
  state.progress = 0;
  ui.timeline.value = '0';
  refreshPinSelect();
  updateBounds();
  setStatus(`Loaded ${parsed.pins.length}/${parsed.total} pins.${parsed.errors.length ? ` Skipped ${parsed.errors.length}.` : ''}`);
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
  if (state.pins.length < 2) return;
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
    state.progress = 0;
    ui.timeline.value = '0';
    updateBounds();
    setStatus(`Loaded route with ${state.path.length} path nodes.`);
    requestRender();
  } catch (err) {
    console.error(err);
    setStatus('Route lookup failed. Using direct pin path.');
    state.path = state.pins.map(p => ({ lat: p.lat, lng: p.lng, label: p.label }));
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
  ui.cameraYaw.value = String(state.camera.yaw);
  ui.cameraPitch.value = String(state.camera.pitch);
  ui.cameraZoom.value = String(state.camera.zoom);
}

function setCamera(yaw, pitch, zoom) {
  state.camera.yaw = clamp(yaw, -3.14, 3.14);
  state.camera.pitch = clamp(pitch, 0.3, 1.45);
  state.camera.zoom = clamp(zoom, 2.2, 6.2);
  syncCameraToUI();
  markStaticDirty();
  requestRender();
}

ui.loadPins.addEventListener('click', loadPinsFromUI);
ui.sampleRoute.addEventListener('click', fetchRouteFromOSRM);
ui.clearRoute.addEventListener('click', () => {
  state.path = [];
  state.countryOutline = [];
  state.progress = 0;
  ui.timeline.value = '0';
  state.playing = false;
  updatePlayPauseLabel();
  setStatus('Cleared route and outline.');
  updateBounds();
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
  requestRender();
});

ui.loadCountry.addEventListener('click', () => {
  const name = ui.countryName.value.trim();
  if (name) fetchCountryOutline(name);
});

ui.pinSelect.addEventListener('change', () => {
  state.selectedPinId = Number(ui.pinSelect.value);
  syncMetadataEditor();
});
ui.savePinMeta.addEventListener('click', saveMetadataFromEditor);

ui.cameraYaw.addEventListener('input', () => setCamera(Number(ui.cameraYaw.value), state.camera.pitch, state.camera.zoom));
ui.cameraPitch.addEventListener('input', () => setCamera(state.camera.yaw, Number(ui.cameraPitch.value), state.camera.zoom));
ui.cameraZoom.addEventListener('input', () => setCamera(state.camera.yaw, state.camera.pitch, Number(ui.cameraZoom.value)));
ui.resetCamera.addEventListener('click', () => setCamera(-0.76, 0.93, 3.4));

[ui.terrainColor, ui.terrainGlow, ui.wireOpacity, ui.terrainHeight].forEach(el => {
  el.addEventListener('input', () => {
    markStaticDirty();
    requestRender();
  });
});
[ui.pathColor, ui.pathWidth, ui.pinColor, ui.pinSize].forEach(el => el.addEventListener('input', requestRender));

canvas.addEventListener('mousedown', (e) => {
  state.interaction.dragging = true;
  state.interaction.moved = false;
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
  setCamera(state.camera.yaw + dx * 0.006, state.camera.pitch + dy * 0.005, state.camera.zoom);
});
window.addEventListener('mouseup', (e) => {
  if (!state.interaction.dragging) return;
  state.interaction.dragging = false;
  if (!state.interaction.moved) pickPin(e.clientX, e.clientY);
  requestRender();
});
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  setCamera(state.camera.yaw, state.camera.pitch, state.camera.zoom + Math.sign(e.deltaY) * 0.2);
}, { passive: false });

window.addEventListener('resize', resize);
const savedTheme = localStorage.getItem(themeStorageKey) || document.documentElement.getAttribute('data-theme') || 'mono-slate';
applyTheme(savedTheme);
ui.themeSelectApp.addEventListener('change', (e) => applyTheme(e.target.value));
setupTabs();
updatePlayPauseLabel();

buildTerrainGrid(32);
loadPinsFromUI();
syncCameraToUI();
resize();
requestRender();
