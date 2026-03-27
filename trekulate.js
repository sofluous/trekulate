const canvas = document.getElementById('view');
const ctx = canvas.getContext('2d');

const ui = {
  viewerPanel: document.getElementById('viewerPanel'),
  themeSelectApp: document.getElementById('themeSelectApp'),
  tabMapping: document.getElementById('tabMapping'),
  tabRendering: document.getElementById('tabRendering'),
  tabCamera: document.getElementById('tabCamera'),
  tabData: document.getElementById('tabData'),
  tabRaw: document.getElementById('tabRaw'),
  tabDebug: document.getElementById('tabDebug'),
  tabExport: document.getElementById('tabExport'),
  tabSettings: document.getElementById('tabSettings'),
  headerJourneyBtn: document.getElementById('headerJourneyBtn'),
  headerJourneyName: document.getElementById('headerJourneyName'),
  journeyDialog: document.getElementById('journeyDialog'),
  closeJourneyDialogBtn: document.getElementById('closeJourneyDialogBtn'),
  journeyList: document.getElementById('journeyList'),
  journeyListPage: document.getElementById('journeyListPage'),
  journeyCreatePage: document.getElementById('journeyCreatePage'),
  openCreateJourney: document.getElementById('openCreateJourney'),
  journeyName: document.getElementById('journeyName'),
  journeyCreateRow: document.getElementById('journeyCreateRow'),
  confirmCreateJourney: document.getElementById('confirmCreateJourney'),
  cancelCreateJourney: document.getElementById('cancelCreateJourney'),
  exportJourney: document.getElementById('exportJourney'),
  importJourney: document.getElementById('importJourney'),
  importJourneyFile: document.getElementById('importJourneyFile'),
  saveJourneyNow: document.getElementById('saveJourneyNow'),
  journeyStatus: document.getElementById('journeyStatus'),
  journeyStatusText: document.getElementById('journeyStatusText'),
  journeyStatusBadge: document.getElementById('journeyStatusBadge'),
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
  pathOpacity: document.getElementById('pathOpacity'),
  pathWidth: document.getElementById('pathWidth'),
  pinColor: document.getElementById('pinColor'),
  pinLabelColor: document.getElementById('pinLabelColor'),
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
  visWorldContext: document.getElementById('visWorldContext'),
  visGeoGrid: document.getElementById('visGeoGrid'),
  visTopography: document.getElementById('visTopography'),
  visSeaLevel: document.getElementById('visSeaLevel'),
  quickPerfMode: document.getElementById('quickPerfMode'),
  quickVisPins: document.getElementById('quickVisPins'),
  quickVisPath: document.getElementById('quickVisPath'),
  quickVisOutline: document.getElementById('quickVisOutline'),
  quickVisWorldContext: document.getElementById('quickVisWorldContext'),
  quickVisGeoGrid: document.getElementById('quickVisGeoGrid'),
  quickVisTopography: document.getElementById('quickVisTopography'),
  quickVisSeaLevel: document.getElementById('quickVisSeaLevel'),
  outlineColor: document.getElementById('outlineColor'),
  outlineOpacity: document.getElementById('outlineOpacity'),
  outlineWidth: document.getElementById('outlineWidth'),
  worldContextColor: document.getElementById('worldContextColor'),
  worldContextOpacity: document.getElementById('worldContextOpacity'),
  worldContextWidth: document.getElementById('worldContextWidth'),
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
  appStatus: document.getElementById('appStatus'),
  appStatusScope: document.getElementById('appStatusScope'),
  appStatusText: document.getElementById('appStatusText'),
  toastWrap: document.getElementById('toastWrap'),
  confirmDialog: document.getElementById('confirmDialog'),
  confirmDialogTitle: document.getElementById('confirmDialogTitle'),
  confirmDialogBody: document.getElementById('confirmDialogBody'),
  confirmDialogConfirmBtn: document.getElementById('confirmDialogConfirmBtn'),
  confirmDialogCancelBtn: document.getElementById('confirmDialogCancelBtn'),
  helpDialog: document.getElementById('helpDialog'),
  helpDialogTitle: document.getElementById('helpDialogTitle'),
  helpDialogBody: document.getElementById('helpDialogBody'),
  closeHelpDialogBtn: document.getElementById('closeHelpDialogBtn'),
  panelHelpButtons: Array.from(document.querySelectorAll('.panel-help')),
  pinParseStatus: document.getElementById('pinParseStatus'),
  countryName: document.getElementById('countryName'),
  countrySuggestions: document.getElementById('countrySuggestions'),
  outlineMainlandOnly: document.getElementById('outlineMainlandOnly'),
  outlineSegmentSelect: document.getElementById('outlineSegmentSelect'),
  centerOutlineSegment: document.getElementById('centerOutlineSegment'),
  showGeoGrid: document.getElementById('showGeoGrid'),
  geoCenterLat: document.getElementById('geoCenterLat'),
  geoCenterLng: document.getElementById('geoCenterLng'),
  geoSpanDeg: document.getElementById('geoSpanDeg'),
  geoFineScale: document.getElementById('geoFineScale'),
  mapProjection: document.getElementById('mapProjection'),
  mapProjectionFlat: document.getElementById('mapProjectionFlat'),
  mapProjectionGlobe: document.getElementById('mapProjectionGlobe'),
  mapSettingsHint: document.getElementById('mapSettingsHint'),
  geoNudgeN: document.getElementById('geoNudgeN'),
  geoNudgeS: document.getElementById('geoNudgeS'),
  geoNudgeE: document.getElementById('geoNudgeE'),
  geoNudgeW: document.getElementById('geoNudgeW'),
  fitGeoWindow: document.getElementById('fitGeoWindow'),
  loadCountry: document.getElementById('loadCountry'),
  refreshCountry: document.getElementById('refreshCountry'),
  syncGlobalBaseline: document.getElementById('syncGlobalBaseline'),
  topoQuality: document.getElementById('topoQuality'),
  topoResolution: document.getElementById('topoResolution'),
  topoContours: document.getElementById('topoContours'),
  topoMode: document.getElementById('topoMode'),
  loadTopography: document.getElementById('loadTopography'),
  refreshTopography: document.getElementById('refreshTopography'),
  clearTopography: document.getElementById('clearTopography'),
  topoStatus: document.getElementById('topoStatus'),
  exportPng: document.getElementById('exportPng'),
  exportStatus: document.getElementById('exportStatus'),
  layoutToolbarPos: document.getElementById('layoutToolbarPos'),
  layoutHudSide: document.getElementById('layoutHudSide'),
  layoutCameraSide: document.getElementById('layoutCameraSide'),
  layoutGlobeCorner: document.getElementById('layoutGlobeCorner'),
  hudPins: document.getElementById('hudPins'),
  hudPath: document.getElementById('hudPath'),
  hudTime: document.getElementById('hudTime'),
  hudCam: document.getElementById('hudCam'),
  hudFps: document.getElementById('hudFps')
};
ui.tabButtons = [ui.tabMapping, ui.tabRendering, ui.tabCamera, ui.tabData, ui.tabRaw, ui.tabDebug, ui.tabExport, ui.tabSettings].filter(Boolean);
ui.tabPanels = Array.from(document.querySelectorAll('[data-tab-panel]'));
const feedback = window.TrekulateFeedback?.create(ui);
if (!feedback) {
  throw new Error('Trekulate feedback module failed to initialize.');
}
const {
  applyStatusTone,
  setStatus,
  setPinImportStatus,
  setTopoStatus,
  setExportStatus,
  confirmAction,
  resolveConfirmDialog,
  hasPendingConfirm
} = feedback;
let listJourneyEntries;
let suggestJourneyName;
let persistJourneysToStorage;
let loadJourneysFromStorage;
let renderJourneyList;
let syncJourneyUI;
let saveCurrentJourney;
let deleteJourneyById;
let openJourneyDialog;
let closeJourneyDialog;
let showJourneyCreateComposer;
let hideJourneyCreateComposer;
let loadJourneyFromModal;
let confirmCreateJourney;
let exportCurrentJourneyToFile;
let importJourneyFromFile;
let syncTopographyQualityFromControls;
let applyTopographyQualityPreset;
let buildTopographyCacheKey;
let isValidTopographyPayload;
let applyTopographyPayload;
let loadTopographyFromOpenData;
let clearTopography;
let saveViewerLayoutPrefs;
let applyViewerLayoutPrefs;
let loadViewerLayoutPrefs;
let setViewerLayoutPrefs;
let syncPerformanceModeButton;
let setPerformanceMode;
let getMapProjectionMode;
let syncProjectionButtons;
let syncCameraToUI;
let setCameraState;
let setCamera;
let setCameraPreset;
let homeView;
let fitMapToFrame;
let nudgeGeoWindow;
let drawTerrain;
let drawCountryOutline;
let drawWorldContextOutline;
let drawGeoGrid;
let drawTopographyContours;
let drawTopographyWireframe;
let drawPath;
let drawPins;
let drawHUD;
let drawCornerOrientationGlobe;
let drawCameraFocusMarker;

const themeStorageKey = 'trekulate.theme';
const layoutStorageKey = 'trekulate.viewerLayout';
const journeyStorageKey = 'trekulate.journeys.v1';
const currentJourneyStorageKey = 'trekulate.currentJourneyId.v1';
const outlineCacheStorageKey = 'trekulate.countryOutlineCache.v1';
const outlineCacheLimit = 24;
const globalBaselineDbName = 'trekulate.cache.db';
const globalBaselineStore = 'kv';
const globalBaselineKey = 'worldContextBaseline.v2';
const topographyCachePrefix = 'topography.v1';
const CAMERA_NEAR_CLIP = 0.14;
const CAMERA_RENDER_MIN_Z = 0.1;
const TOPO_QUALITY_PRESETS = {
  low: { resolution: 18, contours: 8 },
  medium: { resolution: 30, contours: 12 },
  high: { resolution: 48, contours: 18 }
};
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

// Coarse global fallback context (used when cache does not yet have enough countries).
const WORLD_CONTEXT_FALLBACK = [
  [ // North America
    { lat: 72, lng: -168 }, { lat: 70, lng: -140 }, { lat: 62, lng: -123 }, { lat: 53, lng: -110 },
    { lat: 49, lng: -96 }, { lat: 44, lng: -84 }, { lat: 31, lng: -81 }, { lat: 23, lng: -97 },
    { lat: 17, lng: -101 }, { lat: 14, lng: -88 }, { lat: 20, lng: -76 }, { lat: 31, lng: -64 },
    { lat: 47, lng: -56 }, { lat: 58, lng: -67 }, { lat: 67, lng: -95 }, { lat: 72, lng: -130 },
    { lat: 72, lng: -168 }
  ],
  [ // South America
    { lat: 12, lng: -79 }, { lat: 6, lng: -74 }, { lat: 2, lng: -51 }, { lat: -8, lng: -36 },
    { lat: -25, lng: -45 }, { lat: -39, lng: -57 }, { lat: -55, lng: -68 }, { lat: -49, lng: -74 },
    { lat: -34, lng: -73 }, { lat: -11, lng: -78 }, { lat: 1, lng: -79 }, { lat: 12, lng: -79 }
  ],
  [ // Eurasia
    { lat: 71, lng: -11 }, { lat: 70, lng: 26 }, { lat: 66, lng: 62 }, { lat: 62, lng: 95 },
    { lat: 58, lng: 127 }, { lat: 51, lng: 141 }, { lat: 44, lng: 150 }, { lat: 37, lng: 142 },
    { lat: 28, lng: 128 }, { lat: 20, lng: 120 }, { lat: 12, lng: 108 }, { lat: 7, lng: 98 },
    { lat: 7, lng: 81 }, { lat: 15, lng: 71 }, { lat: 24, lng: 60 }, { lat: 31, lng: 44 },
    { lat: 36, lng: 30 }, { lat: 44, lng: 15 }, { lat: 56, lng: 4 }, { lat: 62, lng: -5 },
    { lat: 71, lng: -11 }
  ],
  [ // Africa
    { lat: 37, lng: -17 }, { lat: 33, lng: 10 }, { lat: 31, lng: 35 }, { lat: 22, lng: 43 },
    { lat: 12, lng: 51 }, { lat: 4, lng: 42 }, { lat: -8, lng: 40 }, { lat: -20, lng: 35 },
    { lat: -34, lng: 19 }, { lat: -34, lng: 10 }, { lat: -27, lng: 2 }, { lat: -15, lng: -7 },
    { lat: 0, lng: -10 }, { lat: 16, lng: -17 }, { lat: 29, lng: -12 }, { lat: 37, lng: -17 }
  ],
  [ // Australia
    { lat: -11, lng: 113 }, { lat: -16, lng: 128 }, { lat: -24, lng: 137 }, { lat: -31, lng: 152 },
    { lat: -39, lng: 146 }, { lat: -42, lng: 129 }, { lat: -34, lng: 115 }, { lat: -24, lng: 113 },
    { lat: -11, lng: 113 }
  ],
  [ // Greenland
    { lat: 83, lng: -73 }, { lat: 81, lng: -45 }, { lat: 76, lng: -18 }, { lat: 69, lng: -20 },
    { lat: 61, lng: -43 }, { lat: 59, lng: -52 }, { lat: 67, lng: -62 }, { lat: 75, lng: -70 },
    { lat: 83, lng: -73 }
  ],
  [ // Antarctica belt
    { lat: -76, lng: -180 }, { lat: -72, lng: -120 }, { lat: -74, lng: -60 }, { lat: -73, lng: 0 },
    { lat: -75, lng: 60 }, { lat: -73, lng: 120 }, { lat: -76, lng: 180 }
  ]
];

const state = {
  pins: [],
  path: [],
  countryOutline: [],
  countryOutlineRaw: [],
  currentCountryKey: '',
  outlineFilterMode: 'mainland',
  outlineSegmentsMeta: [],
  selectedOutlineSegmentIndex: 0,
  outlineCache: {},
  globalBaseline: {
    loading: false,
    loaded: false,
    entries: []
  },
  showGeoGrid: true,
  geoStepLinked: true,
  layerVisible: {
    pins: true,
    path: true,
    outline: true,
    worldContext: true,
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
  interaction: { dragging: false, moved: false, x: 0, y: 0, mode: '', button: -1, lodUntil: 0 },
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
    quality: 'medium',
    mode: 'contour2d',
    contourCount: 12,
    source: 'opentopodata/aster30m',
    cacheKey: '',
    cacheState: 'none',
    contourGeometry: {
      key: '',
      segmentCount: 0,
      levels: [],
      segments: []
    },
    wireGeometry: {
      key: '',
      segmentCount: 0,
      segments: []
    }
  },
  selectedPinId: null,
  routeDirty: false,
  performanceMode: false,
  currentJourneyId: '',
  journeyDirty: false,
  journeys: {},
  uiLayout: {
    toolbarPos: 'top-center',
    hudSide: 'left',
    cameraSide: 'right',
    globeCorner: 'top-right'
  },
  timelineMode: 'uniform',
  timelineAnchors: [],
  metadataDirty: false,
  metadataSnapshot: null,
  nextPinId: 1,
  lastProjectedPins: [],
  perf: { fps: 0, frames: 0, sampleStart: 0, frameMs: 0, staticMs: 0, staticScale: 1 },
  geoCache: {
    key: '',
    map: new Map()
  }
};
state.staticLayer.ctx = state.staticLayer.canvas.getContext('2d');
let wheelSyncTimer = null;
let journeyAutosaveTimer = null;
let renderDefaultsInitialized = false;

function noteInteractionActivity(durationMs = 160) {
  state.interaction.lodUntil = Math.max(state.interaction.lodUntil || 0, performance.now() + durationMs);
}

function isInteractionLodActive(now = performance.now()) {
  return !!state.performanceMode || !!state.interaction.dragging || now < (state.interaction.lodUntil || 0);
}

function isHeavyScene() {
  const topo = state.topography;
  const topo3d = topo.loaded && (topo.mode === 'contour3d' || topo.mode === 'wireframe3d' || topo.mode === 'hybrid3d');
  const topoDense = (topo.contourGeometry?.segmentCount || 0) > 8000 || (topo.wireGeometry?.segmentCount || 0) > 8000;
  return topo3d || topoDense || (getMapProjectionMode() === 'globe' && topo.loaded);
}

function getStaticLayerScale(interactionLod = isInteractionLodActive()) {
  if (state.performanceMode) return isHeavyScene() ? 0.42 : 0.56;
  if (!interactionLod) return 1;
  if (getMapProjectionMode() === 'globe') return isHeavyScene() ? 0.52 : 0.68;
  return isHeavyScene() ? 0.62 : 0.78;
}

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
  if (ui.pinLabelColor) ui.pinLabelColor.value = cssColorToHex(cssVar('--text', '#f2fdff'), '#f2fdff');
  if (ui.worldContextColor) ui.worldContextColor.value = cssColorToHex(cssVar('--ds-text-muted', '#6ecae3'), '#6ecae3');
}

function normalizeCountryKey(name) {
  return String(name || '').trim().toLowerCase();
}

function openBaselineDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB unavailable.'));
      return;
    }
    const req = indexedDB.open(globalBaselineDbName, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(globalBaselineStore)) db.createObjectStore(globalBaselineStore);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed.'));
  });
}

async function idbGet(key) {
  const db = await openBaselineDb();
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(globalBaselineStore, 'readonly');
    const store = tx.objectStore(globalBaselineStore);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error || new Error('IndexedDB read failed.'));
    tx.oncomplete = () => db.close();
  });
}

async function idbSet(key, value) {
  const db = await openBaselineDb();
  return await new Promise((resolve, reject) => {
    const tx = db.transaction(globalBaselineStore, 'readwrite');
    const store = tx.objectStore(globalBaselineStore);
    const req = store.put(value, key);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error || new Error('IndexedDB write failed.'));
    tx.oncomplete = () => db.close();
  });
}

function normalizeBaselineEntry(entry) {
  if (!entry || !Array.isArray(entry.raw)) return null;
  const raw = sanitizeOutlinePath(entry.raw, 2600);
  if (raw.filter(isValidGeoPoint).length < 2) return null;
  return annotateOutlineEntry({
    key: normalizeCountryKey(entry.name || entry.key || ''),
    name: String(entry.name || entry.key || 'Country'),
    source: String(entry.source || 'baseline'),
    fetchedAt: Number(entry.fetchedAt || 0),
    raw
  });
}

function sanitizeOutlinePath(rawPath, maxPoints = 5000) {
  const pts = [];
  for (const p of rawPath || []) {
    if (!p || !isValidGeoPoint(p)) {
      if (pts.length && pts[pts.length - 1] !== null) pts.push(null);
      continue;
    }
    pts.push({ lat: Number(p.lat), lng: Number(p.lng) });
  }
  while (pts.length && pts[pts.length - 1] === null) pts.pop();
  return downsampleOutlinePath(pts, maxPoints);
}

function computeOutlineBounds(path) {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const pt of path || []) {
    if (!isValidGeoPoint(pt)) continue;
    if (pt.lat < minLat) minLat = pt.lat;
    if (pt.lat > maxLat) maxLat = pt.lat;
    if (pt.lng < minLng) minLng = pt.lng;
    if (pt.lng > maxLng) maxLng = pt.lng;
  }
  if (!Number.isFinite(minLat) || !Number.isFinite(maxLat) || !Number.isFinite(minLng) || !Number.isFinite(maxLng)) {
    return null;
  }
  return { minLat, maxLat, minLng, maxLng };
}

function annotateOutlineEntry(entry) {
  if (!entry || !Array.isArray(entry.raw)) return entry;
  entry.bbox = computeOutlineBounds(entry.raw);
  entry._renderPath = null;
  entry._renderBudget = 0;
  return entry;
}

function getEntryRenderPath(entry, budget) {
  if (!entry || !Array.isArray(entry.raw)) return [];
  const safeBudget = clamp(Math.floor(budget), 180, 2200);
  if (entry._renderPath && entry._renderBudget === safeBudget) return entry._renderPath;
  entry._renderPath = downsampleOutlinePath(entry.raw, safeBudget);
  entry._renderBudget = safeBudget;
  return entry._renderPath;
}

function getGeoWindowBounds() {
  const half = Math.max(state.geoWindow.spanDeg * 0.5, 1e-6);
  return {
    minLat: state.geoWindow.centerLat - half,
    maxLat: state.geoWindow.centerLat + half,
    minLng: state.geoWindow.centerLng - half,
    maxLng: state.geoWindow.centerLng + half
  };
}

function boxesIntersect(a, b) {
  if (!a || !b) return true;
  const latOverlap = !(a.maxLat < b.minLat || a.minLat > b.maxLat);
  if (!latOverlap) return false;
  const lngOverlap = (x1, x2, y1, y2) => !(x2 < y1 || x1 > y2);
  // Handle dateline-adjacent windows by checking wrapped longitude offsets.
  if (lngOverlap(a.minLng, a.maxLng, b.minLng, b.maxLng)) return true;
  if (lngOverlap(a.minLng - 360, a.maxLng - 360, b.minLng, b.maxLng)) return true;
  if (lngOverlap(a.minLng + 360, a.maxLng + 360, b.minLng, b.maxLng)) return true;
  return false;
}

function outlineEntryArea(entry) {
  const b = entry?.bbox;
  if (!b) return 0;
  const latSpan = Math.max(0, b.maxLat - b.minLat);
  const lngSpan = Math.max(0, b.maxLng - b.minLng);
  return latSpan * lngSpan;
}

function loadOutlineCacheFromStorage() {
  try {
    const raw = localStorage.getItem(outlineCacheStorageKey);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return;
    const out = {};
    for (const [key, entry] of Object.entries(parsed)) {
      if (!entry || !Array.isArray(entry.raw)) continue;
      const path = sanitizeOutlinePath(entry.raw, 5000);
      if (path.filter(isValidGeoPoint).length < 2) continue;
      out[key] = {
        name: String(entry.name || key),
        source: String(entry.source || 'unknown'),
        fetchedAt: Number(entry.fetchedAt || 0),
        lastUsed: Number(entry.lastUsed || 0),
        raw: path,
        bbox: computeOutlineBounds(path),
        _renderPath: null,
        _renderBudget: 0
      };
    }
    state.outlineCache = out;
    refreshCountrySuggestions();
  } catch (err) {
    console.warn('Failed to load outline cache:', err);
    state.outlineCache = {};
  }
}

function saveOutlineCacheToStorage() {
  try {
    const persistable = {};
    for (const [key, entry] of Object.entries(state.outlineCache || {})) {
      if (!entry || !Array.isArray(entry.raw)) continue;
      persistable[key] = {
        name: entry.name,
        source: entry.source,
        fetchedAt: Number(entry.fetchedAt || 0),
        lastUsed: Number(entry.lastUsed || 0),
        raw: entry.raw
      };
    }
    localStorage.setItem(outlineCacheStorageKey, JSON.stringify(persistable));
  } catch (err) {
    console.warn('Failed to save outline cache:', err);
  }
}

function trimOutlineCache() {
  const keys = Object.keys(state.outlineCache);
  if (keys.length <= outlineCacheLimit) return;
  keys.sort((a, b) => (state.outlineCache[b]?.lastUsed || 0) - (state.outlineCache[a]?.lastUsed || 0));
  const keep = new Set(keys.slice(0, outlineCacheLimit));
  for (const k of Object.keys(state.outlineCache)) {
    if (!keep.has(k)) delete state.outlineCache[k];
  }
}

function getCachedOutlineEntry(countryName) {
  const key = normalizeCountryKey(countryName);
  return key ? state.outlineCache[key] || null : null;
}

async function loadGlobalBaselineFromStorage() {
  try {
    const payload = await idbGet(globalBaselineKey);
    const entries = Array.isArray(payload?.entries) ? payload.entries.map(normalizeBaselineEntry).filter(Boolean) : [];
    state.globalBaseline.entries = entries;
    state.globalBaseline.loaded = entries.length > 0;
    refreshCountrySuggestions();
    markStaticDirty();
    updateDebugView();
    requestRender();
  } catch (err) {
    console.warn('Failed to load global baseline:', err);
    state.globalBaseline.entries = [];
    state.globalBaseline.loaded = false;
  }
}

function parseGlobalBaselineGeoJSON(featureCollection) {
  const features = Array.isArray(featureCollection?.features) ? featureCollection.features : [];
  const out = [];
  for (const f of features) {
    const geometry = f?.geometry;
    const raw = buildOutlinePathFromGeoJSON(geometry);
    if (raw.filter(isValidGeoPoint).length < 2) continue;
    const props = f?.properties || {};
    const name = props.ADMIN || props.NAME_EN || props.name || props.NAME || 'Country';
    const normalized = sanitizeOutlinePath(raw, 2400);
    out.push({
      key: normalizeCountryKey(name),
      name: String(name),
      source: 'global-baseline',
      fetchedAt: Date.now(),
      raw: normalized
    });
  }
  return out
    .filter(e => e.key && e.raw.filter(isValidGeoPoint).length >= 2)
    .map(annotateOutlineEntry);
}

function refreshCountrySuggestions() {
  if (!ui.countrySuggestions) return;
  const names = new Set();
  for (const entry of Object.values(state.outlineCache || {})) {
    const name = String(entry?.name || '').trim();
    if (name) names.add(name);
  }
  for (const entry of state.globalBaseline.entries || []) {
    const name = String(entry?.name || '').trim();
    if (name) names.add(name);
  }
  const sorted = Array.from(names).sort((a, b) => a.localeCompare(b));
  ui.countrySuggestions.innerHTML = '';
  for (const name of sorted) {
    const option = document.createElement('option');
    option.value = name;
    ui.countrySuggestions.appendChild(option);
  }
}

async function syncGlobalBaselineFromNetwork() {
  if (state.globalBaseline.loading) return;
  if (!ensureNetworkContext('global context baseline sync')) return;
  state.globalBaseline.loading = true;
  setButtonBusy(ui.syncGlobalBaseline, true, 'Syncing...');
  try {
    setStatus('Syncing global outline baseline...', 'Data', 'info');
    const sources = [
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    ];
    let lastErr = null;
    let parsed = [];
    for (const src of sources) {
      try {
        const res = await fetch(src, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        parsed = parseGlobalBaselineGeoJSON(json);
        if (parsed.length >= 100) break;
      } catch (err) {
        lastErr = err;
      }
    }
    if (parsed.length < 20) throw lastErr || new Error('Global baseline parse produced too few countries.');
    state.globalBaseline.entries = parsed;
    state.globalBaseline.loaded = true;
    refreshCountrySuggestions();
    await idbSet(globalBaselineKey, { version: 2, fetchedAt: Date.now(), entries: parsed });
    setStatus(`Global baseline synced (${parsed.length} countries).`, 'Data', 'success');
    toast(`Global baseline synced (${parsed.length})`, 'ok');
    markStaticDirty();
    updateRawView();
    updateDebugView();
    requestRender();
  } catch (err) {
    console.error(err);
    const reason = err?.message ? ` ${err.message}` : '';
    setStatus(`Global baseline sync failed.${reason}`, 'Data', 'error');
    toast('Global baseline sync failed', 'err');
  } finally {
    state.globalBaseline.loading = false;
    setButtonBusy(ui.syncGlobalBaseline, false);
  }
}

function upsertOutlineCacheEntry(countryName, rawPath, source = 'nominatim') {
  const key = normalizeCountryKey(countryName);
  if (!key) return;
  const path = sanitizeOutlinePath(rawPath, 5000);
  if (path.filter(isValidGeoPoint).length < 2) return;
  const now = Date.now();
  state.outlineCache[key] = annotateOutlineEntry({
    name: String(countryName || key),
    source: String(source || 'unknown'),
    fetchedAt: now,
    lastUsed: now,
    raw: path
  });
  trimOutlineCache();
  saveOutlineCacheToStorage();
  refreshCountrySuggestions();
}

function touchCachedOutline(countryName) {
  const key = normalizeCountryKey(countryName);
  if (!key || !state.outlineCache[key]) return;
  state.outlineCache[key].lastUsed = Date.now();
  saveOutlineCacheToStorage();
}

function getContextOutlineEntries() {
  const projection = getMapProjectionMode();
  const drag = !!state.interaction.dragging;
  const flatWindow = getGeoWindowBounds();
  const cached = Object.entries(state.outlineCache)
    .filter(([, entry]) => entry?.raw?.length)
    .filter(([, entry]) => (projection === 'flat' ? boxesIntersect(entry.bbox, flatWindow) : true))
    .sort((a, b) => (b[1].lastUsed || 0) - (a[1].lastUsed || 0))
    .slice(0, drag ? 8 : 14)
    .map(([, entry]) => entry);
  const seen = new Set(cached.map(e => normalizeCountryKey(e?.key || e?.name || '')));
  const baselineCap = projection === 'flat'
    ? (drag ? 48 : 92)
    : (drag ? 70 : 130);
  const baseline = (state.globalBaseline.entries || [])
    .filter(e => e?.raw?.length && !seen.has(normalizeCountryKey(e.key || e.name || '')))
    .filter(e => (projection === 'flat' ? boxesIntersect(e.bbox, flatWindow) : true))
    .sort((a, b) => outlineEntryArea(b) - outlineEntryArea(a))
    .slice(0, baselineCap);
  return [...cached, ...baseline];
}

function applyLoadedCountryOutline(countryName, rawPath, sourceLabel = 'cache') {
  state.currentCountryKey = normalizeCountryKey(countryName);
  state.countryOutlineRaw = sanitizeOutlinePath(rawPath, 5000);
  applyCountryOutlineFilter();
  touchCachedOutline(countryName);
  const count = state.countryOutline.filter(isValidGeoPoint).length;
  const outlinePolys = splitOutlineSegments(state.countryOutlineRaw).filter(seg => seg.length >= 3);
  const outOfOutlinePins = state.pins.filter(pin => !pointInAnyPolygon(pin.lat, pin.lng, outlinePolys));
  if (outOfOutlinePins.length) {
    setStatus(
      `Loaded ${countryName} outline from ${sourceLabel}. ${outOfOutlinePins.length} pin(s) sit outside this country; use context or load another country for broader travel framing.`,
      'Data',
      'warn'
    );
  } else {
    setStatus(`Loaded ${countryName} outline from ${sourceLabel} (${count} vertices).`, 'Data', 'success');
  }
  markStaticDirty();
  updateRawView();
  updateDebugView();
  markJourneyDirty(true);
  requestRender();
}

function applyTheme(name) {
  const nextTheme = window.DesignSystemThemeSelector
    ? window.DesignSystemThemeSelector.applyTheme(name, {
        root: document.documentElement,
        storageKey: themeStorageKey
      })
    : name;
  document.documentElement.setAttribute('data-theme', nextTheme);
  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (err) {
    // Ignore storage failures in restricted contexts.
  }
  if (ui.themeSelectApp) ui.themeSelectApp.value = nextTheme;
  if (!renderDefaultsInitialized) {
    initRenderControlDefaultsFromTheme();
    renderDefaultsInitialized = true;
  }
  markStaticDirty();
  requestRender();
}

({
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
} = (() => {
  if (!window.TrekulateCamera?.create) {
    throw new Error('Trekulate camera module failed to initialize.');
  }
  return window.TrekulateCamera.create({
    state,
    ui,
    constants: {
      layoutStorageKey,
      CAMERA_DEFAULT
    },
    deps: {
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
      project,
      isValidGeoPoint
    }
  });
})());

({
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
} = (() => {
  if (!window.TrekulateRenderLayers?.create) {
    throw new Error('Trekulate render-layers module failed to initialize.');
  }
  return window.TrekulateRenderLayers.create({
    state,
    ui,
    ctx,
    deps: {
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
    }
  });
})());

function markJourneyDirty(isDirty = true) {
  state.journeyDirty = !!isDirty;
  if (!isDirty && journeyAutosaveTimer) {
    clearTimeout(journeyAutosaveTimer);
    journeyAutosaveTimer = null;
  }
  if (isDirty && state.currentJourneyId) {
    if (journeyAutosaveTimer) clearTimeout(journeyAutosaveTimer);
    journeyAutosaveTimer = setTimeout(() => {
      journeyAutosaveTimer = null;
      if (state.currentJourneyId && state.journeyDirty) saveCurrentJourney({ silent: true });
    }, 420);
  }
  syncJourneyUI();
}

function getRenderSettingsSnapshot() {
  return {
    mapProjection: state.mapProjection,
    timelineMode: state.timelineMode,
    geoWindow: { ...state.geoWindow },
    outlineFilterMode: state.outlineFilterMode,
    layerVisible: { ...state.layerVisible },
    showGeoGrid: !!state.showGeoGrid,
    geoStepLinked: !!state.geoStepLinked,
    topography: {
      quality: ui.topoQuality?.value || state.topography.quality,
      resolution: Number(ui.topoResolution?.value || 30),
      contours: Number(ui.topoContours?.value || state.topography.contourCount || 12),
      mode: ui.topoMode?.value || state.topography.mode
    },
    controls: {
      terrainColor: ui.terrainColor?.value || '',
      terrainGlow: ui.terrainGlow?.value || '',
      wireOpacity: ui.wireOpacity?.value || '',
      terrainHeight: ui.terrainHeight?.value || '',
      terrainPattern: ui.terrainPattern?.value || '',
      terrainDensity: ui.terrainDensity?.value || '',
      pathColor: ui.pathColor?.value || '',
      pathOpacity: ui.pathOpacity?.value || '',
      pathWidth: ui.pathWidth?.value || '',
      pinColor: ui.pinColor?.value || '',
      pinLabelColor: ui.pinLabelColor?.value || '',
      pinSize: ui.pinSize?.value || '',
      geoGridColor: ui.geoGridColor?.value || '',
      geoGridOpacity: ui.geoGridOpacity?.value || '',
      geoGridWidth: ui.geoGridWidth?.value || '',
      geoLatStep: ui.geoLatStep?.value || '',
      geoLngStep: ui.geoLngStep?.value || '',
      geoLabelOpacity: ui.geoLabelOpacity?.value || '',
      outlineColor: ui.outlineColor?.value || '',
      outlineOpacity: ui.outlineOpacity?.value || '',
      outlineWidth: ui.outlineWidth?.value || '',
      worldContextColor: ui.worldContextColor?.value || '',
      worldContextOpacity: ui.worldContextOpacity?.value || '',
      worldContextWidth: ui.worldContextWidth?.value || '',
      topoColor: ui.topoColor?.value || '',
      topoOpacity: ui.topoOpacity?.value || '',
      topoLineWidth: ui.topoLineWidth?.value || '',
      topoHeightScale: ui.topoHeightScale?.value || ''
    }
  };
}

function buildJourneyPayload(name) {
  return {
    id: state.currentJourneyId || `journey_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: String(name || suggestJourneyName()).trim() || suggestJourneyName(),
    createdAt: state.currentJourneyId && state.journeys[state.currentJourneyId]?.createdAt
      ? state.journeys[state.currentJourneyId].createdAt
      : Date.now(),
    updatedAt: Date.now(),
    pins: state.pins.map(pin => ({
      id: Number(pin.id),
      lat: Number(pin.lat),
      lng: Number(pin.lng),
      label: String(pin.label || ''),
      timestamp: String(pin.timestamp || ''),
      note: String(pin.note || ''),
      source: String(pin.source || 'manual')
    })),
    path: state.path.map(node => ({
      lat: Number(node.lat),
      lng: Number(node.lng),
      label: String(node.label || '')
    })),
    routeDirty: !!state.routeDirty,
    selectedPinId: state.selectedPinId || null,
    countryName: String(ui.countryName?.value || ''),
    currentCountryKey: String(state.currentCountryKey || ''),
    renderSettings: getRenderSettingsSnapshot()
  };
}

function buildJourneyFilePayload(name) {
  return {
    kind: 'trekulate-journey',
    version: 1,
    exportedAt: new Date().toISOString(),
    journey: buildJourneyPayload(name)
  };
}

function normalizeImportedJourneyPayload(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('JSON file is empty or invalid.');
  const root = payload.kind === 'trekulate-journey' ? payload.journey : payload;
  if (!root || typeof root !== 'object') throw new Error('Journey payload missing.');
  if (!Array.isArray(root.pins)) throw new Error('Journey file is missing a pin list.');
  return {
    ...root,
    id: String(root.id || `journey_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
    name: String(root.name || suggestJourneyName()).trim() || suggestJourneyName()
  };
}

function resetLoadedTopographyData() {
  state.topography.loaded = false;
  state.topography.values = [];
  state.topography.rows = 0;
  state.topography.cols = 0;
  state.topography.latList = [];
  state.topography.lngList = [];
  state.topography.min = 0;
  state.topography.max = 0;
  state.topography.cacheKey = '';
  state.topography.cacheState = 'none';
  resetTopographyContourGeometry();
  resetTopographyWireGeometry();
  updateTopographyScaleUI();
  setTopoStatus('Topography idle.');
}

function applyRenderSettingsSnapshot(snapshot = {}) {
  const controls = snapshot.controls || {};
  const topo = snapshot.topography || {};
  const setValue = (el, value) => {
    if (!el || value == null) return;
    el.value = String(value);
  };

  state.mapProjection = snapshot.mapProjection === 'globe' ? 'globe' : 'flat';
  if (ui.mapProjection) ui.mapProjection.value = state.mapProjection;
  syncProjectionButtons();
  state.timelineMode = snapshot.timelineMode === 'time' ? 'time' : 'uniform';
  updateTimelineModeButton();

  if (snapshot.geoWindow) {
    state.geoWindow = {
      ...state.geoWindow,
      centerLat: clamp(Number(snapshot.geoWindow.centerLat ?? state.geoWindow.centerLat), -85, 85),
      centerLng: clamp(Number(snapshot.geoWindow.centerLng ?? state.geoWindow.centerLng), -180, 180),
      spanDeg: clamp(Number(snapshot.geoWindow.spanDeg ?? state.geoWindow.spanDeg), 0.5, 360),
      fineScale: clamp(Number(snapshot.geoWindow.fineScale ?? state.geoWindow.fineScale), 0.2, 4),
      manual: !!snapshot.geoWindow.manual
    };
    syncGeoWindowToUI();
  }

  if (snapshot.camera) setCameraState(snapshot.camera, { skipRender: true });

  state.outlineFilterMode = snapshot.outlineFilterMode === 'all' ? 'all' : 'mainland';
  if (ui.outlineMainlandOnly) ui.outlineMainlandOnly.value = state.outlineFilterMode;

  state.layerVisible = {
    ...state.layerVisible,
    ...(snapshot.layerVisible || {})
  };
  state.showGeoGrid = snapshot.showGeoGrid !== false && !!state.layerVisible.geoGrid;
  state.geoStepLinked = snapshot.geoStepLinked !== false;

  setValue(ui.topoQuality, topo.quality || state.topography.quality);
  setValue(ui.topoResolution, topo.resolution || TOPO_QUALITY_PRESETS.medium.resolution);
  setValue(ui.topoContours, topo.contours || state.topography.contourCount);
  setValue(ui.topoMode, topo.mode || state.topography.mode);
  state.topography.quality = ui.topoQuality?.value || state.topography.quality;
  state.topography.contourCount = Number(ui.topoContours?.value || state.topography.contourCount);
  state.topography.mode = ui.topoMode?.value || state.topography.mode;

  [
    ['terrainColor', ui.terrainColor],
    ['terrainGlow', ui.terrainGlow],
    ['wireOpacity', ui.wireOpacity],
    ['terrainHeight', ui.terrainHeight],
    ['terrainPattern', ui.terrainPattern],
    ['terrainDensity', ui.terrainDensity],
    ['pathColor', ui.pathColor],
    ['pathOpacity', ui.pathOpacity],
    ['pathWidth', ui.pathWidth],
    ['pinColor', ui.pinColor],
    ['pinLabelColor', ui.pinLabelColor],
    ['pinSize', ui.pinSize],
    ['geoGridColor', ui.geoGridColor],
    ['geoGridOpacity', ui.geoGridOpacity],
    ['geoGridWidth', ui.geoGridWidth],
    ['geoLatStep', ui.geoLatStep],
    ['geoLngStep', ui.geoLngStep],
    ['geoLabelOpacity', ui.geoLabelOpacity],
    ['outlineColor', ui.outlineColor],
    ['outlineOpacity', ui.outlineOpacity],
    ['outlineWidth', ui.outlineWidth],
    ['worldContextColor', ui.worldContextColor],
    ['worldContextOpacity', ui.worldContextOpacity],
    ['worldContextWidth', ui.worldContextWidth],
    ['topoColor', ui.topoColor],
    ['topoOpacity', ui.topoOpacity],
    ['topoLineWidth', ui.topoLineWidth],
    ['topoHeightScale', ui.topoHeightScale]
  ].forEach(([key, el]) => setValue(el, controls[key]));

  resetLoadedTopographyData();
  syncLayerToggleButtons();
  syncTopographyQualityFromControls();
  updateTopographyScaleUI();
}

function restoreOutlineForJourney(countryName) {
  const trimmed = String(countryName || '').trim();
  if (!trimmed) {
    state.currentCountryKey = '';
    state.countryOutlineRaw = [];
    state.countryOutline = [];
    state.outlineSegmentsMeta = [];
    state.selectedOutlineSegmentIndex = 0;
    populateOutlineSegmentSelect();
    return;
  }
  const cached = getCachedOutlineEntry(trimmed);
  if (cached?.raw?.length) {
    state.currentCountryKey = normalizeCountryKey(trimmed);
    state.countryOutlineRaw = sanitizeOutlinePath(cached.raw, 5000);
    applyCountryOutlineFilter();
    return;
  }
  state.currentCountryKey = '';
  state.countryOutlineRaw = [];
  state.countryOutline = [];
  state.outlineSegmentsMeta = [];
  state.selectedOutlineSegmentIndex = 0;
  populateOutlineSegmentSelect();
}

function applyJourneyPayload(journey, options = {}) {
  const { silent = false } = options;
  if (!journey) return;
  state.currentJourneyId = journey.id || '';
  if (ui.journeyName) ui.journeyName.value = journey.name || '';
  if (ui.countryName) ui.countryName.value = journey.countryName || '';

  state.pins = Array.isArray(journey.pins) ? journey.pins.map(pin => ({
    id: Number(pin.id),
    lat: Number(pin.lat),
    lng: Number(pin.lng),
    label: String(pin.label || ''),
    timestamp: String(pin.timestamp || ''),
    note: String(pin.note || ''),
    source: String(pin.source || 'manual')
  })).filter(pin => isValidLatLng(pin.lat, pin.lng)) : [];
  state.nextPinId = Math.max(1, ...state.pins.map(pin => Number(pin.id) || 0)) + 1;
  state.path = Array.isArray(journey.path) && journey.path.length
    ? journey.path.map(node => ({ lat: Number(node.lat), lng: Number(node.lng), label: String(node.label || '') })).filter(isValidGeoPoint)
    : state.pins.map(pin => ({ lat: pin.lat, lng: pin.lng, label: pin.label }));
  state.routeDirty = !!journey.routeDirty;
  state.selectedPinId = state.pins.some(pin => pin.id === journey.selectedPinId)
    ? journey.selectedPinId
    : (state.pins[0]?.id || null);
  state.progress = 0;
  state.playing = false;
  if (ui.timeline) ui.timeline.value = '0';
  updatePlayPauseLabel();

  applyRenderSettingsSnapshot(journey.renderSettings || {});
  restoreOutlineForJourney(journey.countryName || journey.currentCountryKey || '');
  updateBounds();
  refreshPinList();
  rebuildTimelineAnchors();
  updateRawView();
  updateDebugView();
  markStaticDirty();
  markJourneyDirty(false);
  syncActionAvailability();
  if (!silent) {
    toast(`Loaded ${journey.name}`, 'ok');
    setStatus(`Loaded journey ${journey.name}.`, 'Journey', 'success');
  }
  requestRender();
}

function createNewJourneyWorkspace() {
  state.currentJourneyId = '';
  state.pins = [];
  state.path = [];
  state.countryOutline = [];
  state.countryOutlineRaw = [];
  state.currentCountryKey = '';
  state.outlineSegmentsMeta = [];
  state.selectedOutlineSegmentIndex = 0;
  state.selectedPinId = null;
  state.routeDirty = false;
  state.progress = 0;
  state.playing = false;
  state.timelineAnchors = [];
  state.metadataDirty = false;
  state.metadataSnapshot = null;
  resetLoadedTopographyData();
  if (ui.pinData) ui.pinData.value = '';
  if (ui.countryName) ui.countryName.value = '';
  if (ui.timeline) ui.timeline.value = '0';
  populateOutlineSegmentSelect();
  refreshPinList();
  updateBounds();
  rebuildTimelineAnchors();
  updateRawView();
  updateDebugView();
  markStaticDirty();
  if (ui.journeyName) ui.journeyName.value = suggestJourneyName();
  markJourneyDirty(true);
  syncActionAvailability();
  setStatus('Started a new journey workspace.', 'Journey', 'info');
  toast('New journey workspace', 'ok');
  requestRender();
}

({
  listJourneyEntries,
  suggestJourneyName,
  persistJourneysToStorage,
  loadJourneysFromStorage,
  renderJourneyList,
  syncJourneyUI,
  saveCurrentJourney,
  deleteJourneyById,
  openJourneyDialog,
  closeJourneyDialog,
  showJourneyCreateComposer,
  hideJourneyCreateComposer,
  loadJourneyFromModal,
  confirmCreateJourney,
  exportCurrentJourneyToFile,
  importJourneyFromFile
} = (() => {
  if (!window.TrekulateJourneys?.create) {
    throw new Error('Trekulate journeys module failed to initialize.');
  }
  return window.TrekulateJourneys.create({
  state,
  ui,
  storageKeys: {
    journeyStorageKey,
    currentJourneyStorageKey
  },
  buildJourneyPayload,
  buildJourneyFilePayload,
  normalizeImportedJourneyPayload,
  applyJourneyPayload,
  createNewJourneyWorkspace,
  markJourneyDirty,
  updateRawView,
  toast,
  setStatus,
  confirmAction
  });
})());

function bindJourneyDirtyTracking() {
  [
    ui.countryName,
    ui.outlineMainlandOnly,
    ui.geoCenterLat,
    ui.geoCenterLng,
    ui.geoSpanDeg,
    ui.geoFineScale,
    ui.mapProjection,
    ui.topoQuality,
    ui.topoResolution,
    ui.topoContours,
    ui.topoMode,
    ui.terrainColor,
    ui.terrainGlow,
    ui.wireOpacity,
    ui.terrainHeight,
    ui.terrainPattern,
    ui.terrainDensity,
    ui.pathColor,
    ui.pathOpacity,
    ui.pathWidth,
    ui.pinColor,
    ui.pinLabelColor,
    ui.pinSize,
    ui.geoGridColor,
    ui.geoGridOpacity,
    ui.geoGridWidth,
    ui.geoLatStep,
    ui.geoLngStep,
    ui.geoLabelOpacity,
    ui.geoStepLink,
    ui.outlineColor,
    ui.outlineOpacity,
    ui.outlineWidth,
    ui.worldContextColor,
    ui.worldContextOpacity,
    ui.worldContextWidth,
    ui.topoColor,
    ui.topoOpacity,
    ui.topoLineWidth,
    ui.topoHeightScale,
  ].filter(Boolean).forEach((el) => {
    el.addEventListener('input', () => markJourneyDirty(true));
    el.addEventListener('change', () => markJourneyDirty(true));
  });
}

function updateTopographyScaleUI() {
  if (!ui.topoHeightScale) return;
  const exaggeration = Number(ui.topoHeightScale.value || 0);
  const topo = state.topography;
  const elevSpan = Math.max(0, Number(topo.max) - Number(topo.min));
  const mode = topo.mode || ui.topoMode?.value || 'contour2d';
  const modeLabel = mode === 'contour2d'
    ? '2D contours'
    : mode === 'contour3d'
      ? '3D contours'
      : mode === 'wireframe3d'
        ? '3D wireframe'
        : 'Hybrid 3D';
  ui.topoHeightScale.title = topo.loaded
    ? `Vertical exaggeration for ${modeLabel}. Uses the loaded local elevation span (${elevSpan.toFixed(0)} m), then applies a normalized visual scale of ${exaggeration.toFixed(2)}.`
    : `Vertical exaggeration for ${modeLabel}. This is a normalized visual scale, not real meters. Current value: ${exaggeration.toFixed(2)}.`;
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
    syncActionAvailability();
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
  syncActionAvailability();
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
  resetTopographyContourGeometry();
  if (!segments.length) {
    state.countryOutline = [];
    populateOutlineSegmentSelect();
    updateBounds({ preserveGeoWindow: true });
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
  syncActionAvailability();
}

function syncActionAvailability() {
  const hasInput = !!ui.pinData?.value.trim();
  const hasPins = state.pins.length > 0;
  const hasPath = state.path.length > 1;
  const hasOutline = state.countryOutline.some(isValidGeoPoint);
  const hasOutlineRaw = state.countryOutlineRaw.some(isValidGeoPoint);
  const hasRouteOrMap = hasPath || hasOutline || hasOutlineRaw;
  const hasCountryName = !!ui.countryName?.value.trim();
  const selectedCountryKey = normalizeCountryKey(ui.countryName?.value || '');
  const hasCurrentOutline = !!state.currentCountryKey && hasOutlineRaw;
  const selectedMatchesOutlined = hasCurrentOutline && selectedCountryKey === state.currentCountryKey;
  const hasOutlineSegments = state.outlineSegmentsMeta.length > 0;
  const hasTopo = !!state.topography.loaded;
  const hasBoundsSource = hasPins || hasPath || hasOutline;
  const hasPlayback = hasPath || hasPins;
  const hasTimelineRange = state.timelineAnchors.length > 1 || hasPath;

  if (!hasPlayback && state.playing) {
    state.playing = false;
    updatePlayPauseLabel();
  }

  if (ui.parsePreview) ui.parsePreview.disabled = !hasInput;
  if (ui.loadPins) ui.loadPins.disabled = !hasInput;
  if (ui.clearInput) ui.clearInput.disabled = !hasInput;
  if (ui.sampleRoute && !ui.sampleRoute.classList.contains('is-busy')) ui.sampleRoute.disabled = state.pins.length < 2;
  if (ui.clearRoute) ui.clearRoute.disabled = !hasRouteOrMap;
  if (ui.playPause) ui.playPause.disabled = !hasPlayback;
  if (ui.reset) ui.reset.disabled = !hasPlayback;
  if (ui.timeline) ui.timeline.disabled = !hasTimelineRange;
  if (ui.timelineModeBtn) ui.timelineModeBtn.disabled = state.pins.length < 2;
  if (ui.loadCountry && !ui.loadCountry.classList.contains('is-busy')) ui.loadCountry.disabled = !hasCountryName || selectedMatchesOutlined;
  if (ui.refreshCountry && !ui.refreshCountry.classList.contains('is-busy')) ui.refreshCountry.disabled = !selectedMatchesOutlined;
  if (ui.outlineMainlandOnly) ui.outlineMainlandOnly.disabled = !hasOutlineRaw;
  if (ui.outlineSegmentSelect) ui.outlineSegmentSelect.disabled = !hasOutlineSegments;
  if (ui.centerOutlineSegment) ui.centerOutlineSegment.disabled = !hasOutlineSegments;
  if (ui.fitGeoWindow) ui.fitGeoWindow.disabled = !hasBoundsSource;
  if (ui.geoNudgeN) ui.geoNudgeN.disabled = !hasBoundsSource;
  if (ui.geoNudgeS) ui.geoNudgeS.disabled = !hasBoundsSource;
  if (ui.geoNudgeE) ui.geoNudgeE.disabled = !hasBoundsSource;
  if (ui.geoNudgeW) ui.geoNudgeW.disabled = !hasBoundsSource;
  if (ui.loadTopography && !ui.loadTopography.classList.contains('is-busy')) ui.loadTopography.disabled = !hasBoundsSource;
  if (ui.clearTopography && !ui.clearTopography.classList.contains('is-busy')) ui.clearTopography.disabled = !hasTopo;
  if (ui.refreshTopography && !ui.refreshTopography.classList.contains('is-busy')) ui.refreshTopography.disabled = !hasBoundsSource;
  if (ui.topoMode) ui.topoMode.disabled = !hasTopo;
  syncJourneyUI();
}

function setLayerToggleButton(btn, isOn) {
  if (!btn) return;
  if (btn === ui.geoStepLink && btn.type === 'checkbox') {
    btn.checked = !!isOn;
    btn.setAttribute('aria-checked', String(!!isOn));
    return;
  }
  btn.classList.toggle('is-on', !!isOn);
  btn.classList.toggle('is-off', !isOn);
  btn.setAttribute('aria-pressed', String(!!isOn));
  if (btn.dataset.toggleStyle === 'static') return;
  if (btn === ui.geoStepLink) {
    btn.innerHTML = '<i class="iconoir-link" aria-hidden="true"></i>';
    return;
  }
  btn.innerHTML = isOn
    ? '<span class="icon-current"><i class="iconoir-eye" aria-hidden="true"></i></span><span class="icon-next"><i class="iconoir-eye-closed" aria-hidden="true"></i></span>'
    : '<span class="icon-current"><i class="iconoir-eye-closed" aria-hidden="true"></i></span><span class="icon-next"><i class="iconoir-eye" aria-hidden="true"></i></span>';
}

function syncLayerToggleButtons() {
  setLayerToggleButton(ui.visPins, state.layerVisible.pins);
  setLayerToggleButton(ui.visPath, state.layerVisible.path);
  setLayerToggleButton(ui.visOutline, state.layerVisible.outline);
  setLayerToggleButton(ui.visWorldContext, state.layerVisible.worldContext);
  setLayerToggleButton(ui.visGeoGrid, state.layerVisible.geoGrid);
  setLayerToggleButton(ui.visTopography, state.layerVisible.topography);
  setLayerToggleButton(ui.visSeaLevel, state.layerVisible.seaLevel);
  setLayerToggleButton(ui.quickVisPins, state.layerVisible.pins);
  setLayerToggleButton(ui.quickVisPath, state.layerVisible.path);
  setLayerToggleButton(ui.quickVisOutline, state.layerVisible.outline);
  setLayerToggleButton(ui.quickVisWorldContext, state.layerVisible.worldContext);
  setLayerToggleButton(ui.quickVisGeoGrid, state.layerVisible.geoGrid);
  setLayerToggleButton(ui.quickVisTopography, state.layerVisible.topography);
  setLayerToggleButton(ui.quickVisSeaLevel, state.layerVisible.seaLevel);
  setLayerToggleButton(ui.geoStepLink, state.geoStepLinked);
}

function setLayerVisibility(layerKey, on) {
  if (!(layerKey in state.layerVisible)) return;
  state.layerVisible[layerKey] = !!on;
  if (layerKey === 'geoGrid') state.showGeoGrid = !!on;
  syncLayerToggleButtons();
  markStaticDirty();
  updateDebugView();
  markJourneyDirty(true);
  requestRender();
}

function setupCollapsibleGroups() {
  const collapseKeyForGroup = (group) => {
    const panel = group.closest('[data-tab-panel]')?.getAttribute('data-tab-panel') || 'panel';
    const title = group.querySelector(':scope > .group-head > h3')?.textContent?.trim() || 'group';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return `trekulate.groupCollapsed.${panel}.${slug || 'group'}`;
  };
  const setCollapsed = (group, toggle, collapsed) => {
    group.classList.toggle('is-collapsed', !!collapsed);
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    toggle.title = collapsed ? 'Expand section' : 'Collapse section';
  };

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
    toggle.className = 'group-icon-btn group-toggle';
    toggle.setAttribute('aria-label', 'Collapse or expand section');
    toggle.innerHTML = '<i class="iconoir-nav-arrow-down group-chevron" aria-hidden="true"></i>';
    const storageKey = collapseKeyForGroup(group);
    const stored = localStorage.getItem(storageKey);
    setCollapsed(group, toggle, stored === '1');
    toggle.addEventListener('click', () => {
      const collapsed = !group.classList.contains('is-collapsed');
      setCollapsed(group, toggle, collapsed);
      localStorage.setItem(storageKey, collapsed ? '1' : '0');
    });
    head.appendChild(toggle);
  }
}

function updateRawView() {
  if (!ui.rawJsonView) return;
  const payload = {
    currentJourneyId: state.currentJourneyId,
    journeyDirty: state.journeyDirty,
    savedJourneys: Object.keys(state.journeys || {}).length,
    pins: state.pins,
    path: state.path,
    countryOutline: state.countryOutline,
    countryOutlineRaw: state.countryOutlineRaw,
    currentCountryKey: state.currentCountryKey,
    outlineFilterMode: state.outlineFilterMode,
    selectedOutlineSegmentIndex: state.selectedOutlineSegmentIndex,
    outlineSegmentsMeta: state.outlineSegmentsMeta,
    outlineCacheEntries: Object.keys(state.outlineCache).length,
    globalBaseline: {
      loaded: !!state.globalBaseline.loaded,
      loading: !!state.globalBaseline.loading,
      entries: state.globalBaseline.entries.length
    },
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
      quality: state.topography.quality,
      mode: state.topography.mode,
      contourCount: state.topography.contourCount,
      source: state.topography.source,
      cacheKey: state.topography.cacheKey,
      cacheState: state.topography.cacheState,
      contourGeometryKey: state.topography.contourGeometry?.key || '',
      contourSegmentCount: state.topography.contourGeometry?.segmentCount || 0,
      wireGeometryKey: state.topography.wireGeometry?.key || '',
      wireSegmentCount: state.topography.wireGeometry?.segmentCount || 0
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
    `Current country key: ${state.currentCountryKey || 'n/a'}`,
    `Outline filter: ${state.outlineFilterMode}`,
    `Outline segments: ${segments.length}`,
    `Outline vertices: ${outlinePts}`,
    `Outline cache entries: ${Object.keys(state.outlineCache).length}`,
    `Global baseline loaded: ${state.globalBaseline.loaded ? 'yes' : 'no'}`,
    `Global baseline entries: ${state.globalBaseline.entries.length}`,
    `Selected landmass index: ${state.selectedOutlineSegmentIndex}`,
    `Coordinate markers: ${state.showGeoGrid ? 'on' : 'off'}`,
    `Layer visibility: pins=${state.layerVisible.pins ? '1' : '0'} path=${state.layerVisible.path ? '1' : '0'} outline=${state.layerVisible.outline ? '1' : '0'} context=${state.layerVisible.worldContext ? '1' : '0'} grid=${state.layerVisible.geoGrid ? '1' : '0'} topo=${state.layerVisible.topography ? '1' : '0'} sea=${state.layerVisible.seaLevel ? '1' : '0'}`,
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
    `Topography cache key: ${topo.cacheKey || 'n/a'}`,
    `Topography cache state: ${topo.cacheState || 'none'}`,
    `Topography grid: ${topo.rows} x ${topo.cols}`,
    `Topography elevation min/max: ${Number(topo.min).toFixed(2)} / ${Number(topo.max).toFixed(2)}`,
    `Topography elevation span: ${Math.max(0, Number(topo.max) - Number(topo.min)).toFixed(2)} m`,
    `Topography quality: ${topo.quality || 'custom'}`,
    `Topography mode: ${topo.mode}`,
    `Topography contours: ${topo.contourCount}`,
    `Topography exaggeration: ${Number(ui.topoHeightScale?.value || 0).toFixed(2)} (normalized visual scale)`,
    `Topography contour cache key: ${topo.contourGeometry?.key || 'none'}`,
    `Topography contour segments: ${topo.contourGeometry?.segmentCount || 0}`,
    `Topography wire cache key: ${topo.wireGeometry?.key || 'none'}`,
    `Topography wire segments: ${topo.wireGeometry?.segmentCount || 0}`,
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
    `Performance mode: ${state.performanceMode ? 'on' : 'off'}`,
    `Static dirty: ${state.staticDirty ? 'yes' : 'no'}`,
    `Playing: ${state.playing ? 'yes' : 'no'}`,
    `Render queued: ${state.renderQueued ? 'yes' : 'no'}`,
    `Interaction LOD: ${isInteractionLodActive() ? 'yes' : 'no'}`,
    `Heavy scene: ${isHeavyScene() ? 'yes' : 'no'}`,
    `Static layer scale: ${Number(state.perf.staticScale || 1).toFixed(2)}`,
    `Static rebuild: ${Number(state.perf.staticMs || 0).toFixed(2)} ms`,
    `Frame time: ${Number(state.perf.frameMs || 0).toFixed(2)} ms`,
    `Geo cache size: ${state.geoCache.map.size}`,
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

function updateBounds(options = {}) {
  const { preserveGeoWindow = false } = options;
  const all = [...state.pins, ...state.path, ...state.countryOutline];
  if (!all.length) {
    state.bounds = { minLat: 0, maxLat: 1, minLng: 0, maxLng: 1 };
    if (!state.geoWindow.manual && !preserveGeoWindow && getMapProjectionMode() !== 'globe') fitGeoWindowToBounds();
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
    if (!state.geoWindow.manual && !preserveGeoWindow && getMapProjectionMode() !== 'globe') fitGeoWindowToBounds();
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
  if (!state.geoWindow.manual && !preserveGeoWindow && getMapProjectionMode() !== 'globe') fitGeoWindowToBounds();
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

    const x0 = -radius * cosLat * sinLng;
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
  const persp = (cam.lensFactor * cam.focalNorm) / Math.max(CAMERA_NEAR_CLIP, z2);
  const scale = state.dims.w * 0.38;
  const cx = state.dims.w * 0.5;
  const cy = state.dims.h * 0.53;
  const px0 = cx + x1 * persp * scale;
  const py0 = cy + y2 * persp * scale;
  const rx = (px0 - cx) * cam.cr - (py0 - cy) * cam.sr;
  const ry = (px0 - cx) * cam.sr + (py0 - cy) * cam.cr;
  return { x: cx + rx, y: cy + ry, z: z2 };
}

function projectWithDepth(x, y, z, cam) {
  const x1 = x * cam.cy + z * cam.sy;
  const z1 = -x * cam.sy + z * cam.cy;
  const yShifted = y - cam.focusY;
  const y2 = yShifted * cam.cx - z1 * cam.sx;
  const zCam = yShifted * cam.sx + z1 * cam.cx;
  const z2 = zCam + cam.zoom;
  const persp = (cam.lensFactor * cam.focalNorm) / Math.max(CAMERA_NEAR_CLIP, z2);
  const scale = state.dims.w * 0.38;
  const cx = state.dims.w * 0.5;
  const cy = state.dims.h * 0.53;
  const px0 = cx + x1 * persp * scale;
  const py0 = cy + y2 * persp * scale;
  const rx = (px0 - cx) * cam.cr - (py0 - cy) * cam.sr;
  const ry = (px0 - cx) * cam.sr + (py0 - cy) * cam.cr;
  return { x: cx + rx, y: cy + ry, z: z2, depth: zCam };
}

function isProjectedPointRenderable(p, margin = 24) {
  if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z)) return false;
  if (p.z <= CAMERA_RENDER_MIN_Z) return false;
  return (
    p.x >= -margin &&
    p.x <= state.dims.w + margin &&
    p.y >= -margin &&
    p.y <= state.dims.h + margin
  );
}

function isProjectedSegmentRenderable(a, b, margin = 24) {
  if (!a || !b) return false;
  if ((a.z <= CAMERA_RENDER_MIN_Z && b.z <= CAMERA_RENDER_MIN_Z) || (!Number.isFinite(a.x) || !Number.isFinite(b.x))) return false;
  const minX = Math.min(a.x, b.x);
  const maxX = Math.max(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxY = Math.max(a.y, b.y);
  return !(
    maxX < -margin ||
    minX > state.dims.w + margin ||
    maxY < -margin ||
    minY > state.dims.h + margin
  );
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
  // Keep bounds tighter so sampled terrain better matches selected outline area.
  const padLat = Math.max((maxLat - minLat) * 0.02, 0.001);
  const padLng = Math.max((maxLng - minLng) * 0.02, 0.001);
  return {
    minLat: minLat - padLat,
    maxLat: maxLat + padLat,
    minLng: minLng - padLng,
    maxLng: maxLng + padLng
  };
}

function pointInPolygon2D(lat, lng, polygon) {
  if (!Array.isArray(polygon) || polygon.length < 3) return false;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const yi = polygon[i].lat;
    const xi = polygon[i].lng;
    const yj = polygon[j].lat;
    const xj = polygon[j].lng;
    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lng < ((xj - xi) * (lat - yi)) / ((yj - yi) || 1e-9) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInAnyPolygon(lat, lng, polygons) {
  for (const poly of polygons || []) {
    if (pointInPolygon2D(lat, lng, poly)) return true;
  }
  return false;
}

function buildTopographyContourGeometry() {
  const topo = state.topography;
  if (!topo.loaded || topo.rows < 2 || topo.cols < 2) {
    resetTopographyContourGeometry();
    return state.topography.contourGeometry;
  }

  const min = topo.min;
  const max = topo.max;
  const span = Math.max(max - min, 1e-6);
  const contourCount = Math.max(2, topo.contourCount | 0);
  const levels = [];
  for (let i = 1; i <= contourCount; i++) {
    levels.push(min + (span * i) / (contourCount + 1));
  }

  const clipPolys = getOutlineClipPolygons();
  const clipToOutline = clipPolys.length > 0;
  const clipSignature = getTopographyClipSignature(clipPolys);
  const geometryKey = [
    topo.cacheKey || 'uncached',
    topo.rows,
    topo.cols,
    contourCount,
    clipSignature
  ].join('|');

  if (topo.contourGeometry?.key === geometryKey) return topo.contourGeometry;

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

  const edgePoint = (edge, g0, g1, g2, g3, v0, v1, v2, v3, level, levelNorm) => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const interp = (ga, gb, va, vb) => {
      const t = Math.abs(vb - va) < 1e-6 ? 0.5 : (level - va) / (vb - va);
      return {
        lat: lerp(ga.lat, gb.lat, t),
        lng: lerp(ga.lng, gb.lng, t),
        levelNorm
      };
    };
    if (edge === 0) return interp(g0, g1, v0, v1);
    if (edge === 1) return interp(g1, g2, v1, v2);
    if (edge === 2) return interp(g2, g3, v2, v3);
    return interp(g3, g0, v3, v0);
  };

  const segments = [];
  for (let r = 0; r < topo.rows - 1; r++) {
    for (let c = 0; c < topo.cols - 1; c++) {
      if (clipToOutline) {
        const centerLat = (topo.latList[r] + topo.latList[r + 1]) * 0.5;
        const centerLng = (topo.lngList[c] + topo.lngList[c + 1]) * 0.5;
        if (!pointInAnyPolygon(centerLat, centerLng, clipPolys)) continue;
      }
      const v0 = topo.values[r][c];
      const v1 = topo.values[r][c + 1];
      const v2 = topo.values[r + 1][c + 1];
      const v3 = topo.values[r + 1][c];
      const g0 = { lat: topo.latList[r], lng: topo.lngList[c] };
      const g1 = { lat: topo.latList[r], lng: topo.lngList[c + 1] };
      const g2 = { lat: topo.latList[r + 1], lng: topo.lngList[c + 1] };
      const g3 = { lat: topo.latList[r + 1], lng: topo.lngList[c] };

      for (let li = 0; li < levels.length; li++) {
        const level = levels[li];
        const levelNorm = (level - min) / span;
        const idx =
          (v0 >= level ? 1 : 0) |
          (v1 >= level ? 2 : 0) |
          (v2 >= level ? 4 : 0) |
          (v3 >= level ? 8 : 0);
        const contourSegments = cases[idx];
        if (!contourSegments?.length) continue;
        for (const [eA, eB] of contourSegments) {
          const a = edgePoint(eA, g0, g1, g2, g3, v0, v1, v2, v3, level, levelNorm);
          const b = edgePoint(eB, g0, g1, g2, g3, v0, v1, v2, v3, level, levelNorm);
          if (clipToOutline) {
            const midLat = (a.lat + b.lat) * 0.5;
            const midLng = (a.lng + b.lng) * 0.5;
            const inA = pointInAnyPolygon(a.lat, a.lng, clipPolys);
            const inB = pointInAnyPolygon(b.lat, b.lng, clipPolys);
            const inMid = pointInAnyPolygon(midLat, midLng, clipPolys);
            if (!(inA || inB || inMid)) continue;
          }
          segments.push({
            levelIndex: li,
            a,
            b
          });
        }
      }
    }
  }

  state.topography.contourGeometry = {
    key: geometryKey,
    segmentCount: segments.length,
    levels,
    segments
  };
  return state.topography.contourGeometry;
}

function buildTopographyWireframeGeometry() {
  const topo = state.topography;
  if (!topo.loaded || topo.rows < 2 || topo.cols < 2) {
    resetTopographyWireGeometry();
    return state.topography.wireGeometry;
  }

  const clipPolys = getOutlineClipPolygons();
  const clipToOutline = clipPolys.length > 0;
  const clipSignature = getTopographyClipSignature(clipPolys);
  const geometryKey = [
    topo.cacheKey || 'uncached',
    topo.rows,
    topo.cols,
    clipSignature
  ].join('|');

  if (topo.wireGeometry?.key === geometryKey) return topo.wireGeometry;

  const span = Math.max(topo.max - topo.min, 1e-6);
  const pointCache = Array.from({ length: topo.rows }, (_, r) => (
    Array.from({ length: topo.cols }, (_, c) => ({
      lat: topo.latList[r],
      lng: topo.lngList[c],
      levelNorm: (Number(topo.values[r]?.[c]) - topo.min) / span
    }))
  ));

  const isInside = (point) => !clipToOutline || pointInAnyPolygon(point.lat, point.lng, clipPolys);
  const segments = [];

  const pushSegmentIfVisible = (a, b) => {
    if (!a || !b) return;
    if (clipToOutline) {
      const inA = isInside(a);
      const inB = isInside(b);
      const midLat = (a.lat + b.lat) * 0.5;
      const midLng = (a.lng + b.lng) * 0.5;
      const inMid = pointInAnyPolygon(midLat, midLng, clipPolys);
      if (!(inA || inB || inMid)) return;
    }
    segments.push({ a, b });
  };

  for (let r = 0; r < topo.rows; r++) {
    for (let c = 0; c < topo.cols; c++) {
      const point = pointCache[r][c];
      if (c + 1 < topo.cols) pushSegmentIfVisible(point, pointCache[r][c + 1]);
      if (r + 1 < topo.rows) pushSegmentIfVisible(point, pointCache[r + 1][c]);
    }
  }

  state.topography.wireGeometry = {
    key: geometryKey,
    segmentCount: segments.length,
    segments
  };
  return state.topography.wireGeometry;
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

function resolveTopographyQuality(resolution, contours) {
  const res = Number(resolution);
  const cnt = Number(contours);
  for (const [quality, preset] of Object.entries(TOPO_QUALITY_PRESETS)) {
    if (Math.round(res) === preset.resolution && Math.round(cnt) === preset.contours) return quality;
  }
  return 'custom';
}

function resetTopographyContourGeometry() {
  state.topography.contourGeometry = {
    key: '',
    segmentCount: 0,
    levels: [],
    segments: []
  };
}

function resetTopographyWireGeometry() {
  state.topography.wireGeometry = {
    key: '',
    segmentCount: 0,
    segments: []
  };
}

({
  syncTopographyQualityFromControls,
  applyTopographyQualityPreset,
  buildTopographyCacheKey,
  isValidTopographyPayload,
  applyTopographyPayload,
  loadTopographyFromOpenData,
  clearTopography
} = (() => {
  if (!window.TrekulateTopography?.create) {
    throw new Error('Trekulate topography module failed to initialize.');
  }
  return window.TrekulateTopography.create({
    state,
    ui,
    constants: {
      TOPO_QUALITY_PRESETS,
      topographyCachePrefix
    },
    deps: {
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
    }
  });
})());

function getOutlineClipPolygons() {
  return splitOutlineSegments(state.countryOutline)
    .map(seg => seg.filter(isValidGeoPoint))
    .filter(seg => seg.length >= 3);
}

function getTopographyClipSignature(polygons) {
  if (!polygons?.length) return 'noclip';
  const first = polygons[0]?.[0];
  const lastPoly = polygons[polygons.length - 1];
  const last = lastPoly?.[lastPoly.length - 1];
  return [
    state.currentCountryKey || 'countryless',
    state.outlineFilterMode || 'all',
    polygons.length,
    first ? `${first.lat.toFixed(3)},${first.lng.toFixed(3)}` : 'na',
    last ? `${last.lat.toFixed(3)},${last.lng.toFixed(3)}` : 'na'
  ].join('|');
}

function projectTopographyPoint(point, cam, topoHeightScale, mode) {
  const mode3d = mode === 'contour3d' || mode === 'wireframe3d' || mode === 'hybrid3d';
  if (getMapProjectionMode() === 'globe') {
    const radial = mode3d ? point.levelNorm * topoHeightScale * 0.32 : 0;
    const w = geoToCameraWorld(point.lat, point.lng, radial);
    return project(w.x, w.y, w.z, cam);
  }
  const w = geoToCameraWorld(point.lat, point.lng, 0);
  const y = mode3d ? -point.levelNorm * topoHeightScale : 0;
  return project(w.x, y, w.z, cam);
}

function refreshPinList() {
  if (!ui.pinTableBody) return;
  ui.pinTableBody.innerHTML = '';
  if (!state.pins.length) {
    state.selectedPinId = null;
    ui.pinLabel.value = '';
    ui.pinTimestamp.value = '';
    ui.pinNote.value = '';
    ui.pinSource.textContent = '';
    ui.savePinMeta.disabled = true;
    ui.cancelPinMeta.disabled = true;
    ui.deletePin.disabled = true;
    const row = document.createElement('tr');
    row.innerHTML = '<td class="pin-empty" colspan="4">No pins loaded.</td>';
    ui.pinTableBody.appendChild(row);
    syncActionAvailability();
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
  syncActionAvailability();
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
  syncActionAvailability();
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
  markJourneyDirty(true);
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
  confirmAction({
    title: 'Delete Pin?',
    message: `This removes "${pin.label}" from the current journey.`,
    confirmLabel: 'Delete Pin',
    danger: true
  }).then((ok) => {
    if (ok) confirmDeletePin();
  });
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
  markJourneyDirty(true);
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
    setPinImportStatus(`No valid pin rows found.${failHint}`, 'error');
    setStatus(`No valid pin rows found.${failHint}`, 'Pins', 'error');
    if (!silent) toast('No valid pins parsed', 'err');
    syncActionAvailability();
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
    setPinImportStatus(`Added ${added.length} pin(s). ${failed.length} row(s) failed. First issue: ${failed[0].reason}`, 'warn');
    setStatus(`Added ${added.length} pin(s). ${failed.length} row(s) failed.`, 'Pins', 'warn');
  } else {
    setPinImportStatus(`Added ${added.length} pin(s).`, 'success');
    setStatus(`Added ${added.length} pin(s).`, 'Pins', 'success');
  }
  markJourneyDirty(true);
  syncActionAvailability();
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
    updateBounds({ preserveGeoWindow: true });
    rebuildTimelineAnchors();
    setStatus(`Loaded route with ${state.path.length} path nodes.`);
    toast('Route updated', 'ok');
    updateRawView();
    markJourneyDirty(true);
    requestRender();
  } catch (err) {
    console.error(err);
    setStatus('Route lookup failed. Using direct pin path.');
    state.path = state.pins.map(p => ({ lat: p.lat, lng: p.lng, label: p.label }));
    state.routeDirty = true;
    updateBounds({ preserveGeoWindow: true });
    rebuildTimelineAnchors();
    updateRawView();
    markJourneyDirty(true);
    requestRender();
  } finally {
    setButtonBusy(ui.sampleRoute, false);
  }
}

async function fetchCountryOutline(name, options = {}) {
  const { forceRefresh = false } = options;
  const trimmed = String(name || '').trim();
  if (!trimmed) return;

  if (!forceRefresh) {
    const cached = getCachedOutlineEntry(trimmed);
    if (cached?.raw?.length) {
      applyLoadedCountryOutline(trimmed, cached.raw, `cache/${cached.source || 'local'}`);
      toast(`Loaded ${trimmed} from local cache`, 'ok', 1400);
      return;
    }
  }

  if (!ensureNetworkContext('country outline lookup')) return;
  const busyBtn = forceRefresh ? ui.refreshCountry : ui.loadCountry;
  setButtonBusy(busyBtn, true, forceRefresh ? 'Refreshing...' : 'Loading...');

  try {
    setStatus(`${forceRefresh ? 'Refreshing' : 'Fetching'} country outline for ${trimmed}...`);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&country=${encodeURIComponent(trimmed)}&limit=1`;
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
      upsertOutlineCacheEntry(trimmed, nominatimPts, 'nominatim');
      applyLoadedCountryOutline(trimmed, nominatimPts, 'Nominatim');
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
        upsertOutlineCacheEntry(trimmed, pts, 'overpass');
        applyLoadedCountryOutline(trimmed, pts, 'Overpass');
        return;
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error('Country outline lookup failed');
  } catch (err) {
    console.error(err);
    const reason = err?.message ? ` ${err.message}` : '';
    setStatus(`Country outline lookup failed for ${trimmed}.${reason}`);
    toast('Country outline fetch failed', 'err');
  } finally {
    setButtonBusy(busyBtn, false);
  }
}
function getStaticLayerKey() {
  const staticScale = getStaticLayerScale();
  return [
    state.dims.w,
    state.dims.h,
    staticScale.toFixed(2),
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
    state.topography.quality || '',
    state.topography.mode,
    state.topography.contourCount,
    state.topography.min.toFixed(1),
    state.topography.max.toFixed(1),
    state.topography.source || '',
    state.topography.cacheKey || '',
    state.topography.cacheState || '',
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
    state.layerVisible.worldContext ? 1 : 0,
    state.layerVisible.geoGrid ? 1 : 0,
    state.layerVisible.topography ? 1 : 0,
    state.layerVisible.seaLevel ? 1 : 0,
    ui.worldContextColor?.value || '',
    ui.worldContextOpacity?.value || '',
    ui.worldContextWidth?.value || '',
    state.geoStepLinked ? 1 : 0,
    cssVar('--tk-country-outline', ''),
    cssVar('--tk-country-shadow', ''),
    cssVar('--tk-scanline', ''),
    state.currentCountryKey || '',
    Object.keys(state.outlineCache).length,
    state.countryOutline.length,
    state.geoWindow.centerLat.toFixed(4),
    state.geoWindow.centerLng.toFixed(4),
    state.geoWindow.spanDeg.toFixed(4),
    state.geoWindow.fineScale.toFixed(4),
    state.performanceMode ? 1 : 0
  ].join('|');
}

function rebuildStaticLayer(cam) {
  const layer = state.staticLayer;
  const staticScale = getStaticLayerScale();
  const drawW = Math.max(1, Math.floor(state.dims.w * staticScale));
  const drawH = Math.max(1, Math.floor(state.dims.h * staticScale));
  layer.canvas.width = drawW;
  layer.canvas.height = drawH;
  const lctx = layer.ctx;
  lctx.setTransform(1, 0, 0, 1, 0, 0);
  lctx.clearRect(0, 0, drawW, drawH);
  if (staticScale !== 1) lctx.scale(staticScale, staticScale);

  lctx.fillStyle = ensureScanlinePattern() || cssVar('--tk-scanline', 'rgba(95, 215, 245, 0.04)');
  lctx.fillRect(0, 0, state.dims.w, state.dims.h);
  drawTerrain(lctx, cam);
  drawGeoGrid(lctx, cam);
  drawTopographyContours(lctx, cam);
  drawTopographyWireframe(lctx, cam);
  drawWorldContextOutline(lctx, cam);
  drawCountryOutline(lctx, cam);
  state.perf.staticScale = staticScale;
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
  const frameStart = performance.now();
  state.renderQueued = false;
  const interactionLod = isInteractionLodActive(now);
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
    const staticStart = performance.now();
    rebuildStaticLayer(cam);
    state.perf.staticMs = performance.now() - staticStart;
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

  if (state.playing || interactionLod) {
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
  state.perf.frameMs = performance.now() - frameStart;
}

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, state.performanceMode ? 1 : 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);
  state.dims = { w: rect.width, h: rect.height, ratio };
  markStaticDirty();
  requestRender();
}

ui.loadPins.addEventListener('click', loadPinsFromUI);
ui.pinData?.addEventListener('input', syncActionAvailability);
ui.headerJourneyBtn?.addEventListener('click', openJourneyDialog);
ui.closeJourneyDialogBtn?.addEventListener('click', closeJourneyDialog);
ui.openCreateJourney?.addEventListener('click', showJourneyCreateComposer);
ui.cancelCreateJourney?.addEventListener('click', hideJourneyCreateComposer);
ui.confirmCreateJourney?.addEventListener('click', confirmCreateJourney);
ui.journeyName?.addEventListener('input', syncJourneyUI);
ui.saveJourneyNow?.addEventListener('click', () => {
  if (!state.currentJourneyId) return;
  saveCurrentJourney({ silent: false });
});
ui.exportJourney?.addEventListener('click', exportCurrentJourneyToFile);
ui.importJourney?.addEventListener('click', () => {
  if (state.journeyDirty && state.currentJourneyId) saveCurrentJourney({ silent: true });
  if (state.journeyDirty && !state.currentJourneyId) {
    confirmAction({
      title: 'Discard Unsaved Trek?',
      message: 'Importing a trek file will discard the current unsaved workspace.',
      confirmLabel: 'Discard And Import',
      danger: true
    }).then((ok) => {
      if (!ok) return;
      ui.importJourneyFile?.click();
    });
    return;
  }
  ui.importJourneyFile?.click();
});
ui.importJourneyFile?.addEventListener('change', () => {
  const file = ui.importJourneyFile?.files?.[0];
  if (file) importJourneyFromFile(file);
});
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
  setPinImportStatus(msg, parsed.errors.length ? 'warn' : 'success');
  setStatus(msg, 'Pins', parsed.errors.length ? 'warn' : 'success');
  toast(`Preview ${parsed.pins.length} direct / ${parsed.errors.length} unresolved`, parsed.errors.length ? 'warn' : 'ok');
});
ui.clearInput.addEventListener('click', () => {
  ui.pinData.value = '';
  setPinImportStatus('Input cleared.', 'info');
  setStatus('Input cleared.', 'Pins', 'info');
});
ui.sampleRoute.addEventListener('click', fetchRouteFromOSRM);
ui.clearRoute.addEventListener('click', () => {
  state.path = [];
  state.countryOutline = [];
  state.countryOutlineRaw = [];
  state.currentCountryKey = '';
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
  markJourneyDirty(true);
  syncActionAvailability();
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
  noteInteractionActivity(220);
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
ui.refreshCountry?.addEventListener('click', () => {
  const name = ui.countryName.value.trim();
  if (name) fetchCountryOutline(name, { forceRefresh: true });
});
ui.syncGlobalBaseline?.addEventListener('click', () => {
  syncGlobalBaselineFromNetwork();
});
ui.countryName?.addEventListener('input', syncActionAvailability);
ui.outlineMainlandOnly?.addEventListener('change', () => {
  state.outlineFilterMode = ui.outlineMainlandOnly.value || 'all';
  applyCountryOutlineFilter();
});
ui.outlineSegmentSelect?.addEventListener('change', () => {
  state.selectedOutlineSegmentIndex = Number(ui.outlineSegmentSelect.value || 0);
  updateDebugView();
});
ui.centerOutlineSegment?.addEventListener('click', () => {
  centerOnSelectedOutlineSegment();
  markJourneyDirty(true);
});
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
  if (next === 'globe') {
    state.geoWindow.centerLat = 0;
    state.geoWindow.centerLng = 0;
    state.geoWindow.spanDeg = 180;
    state.geoWindow.fineScale = clamp(state.geoWindow.fineScale, 0.85, 2.2);
    state.geoWindow.manual = true;
    // Neutral globe pose: front-facing, north-up/south-down.
    setCameraState({
      yaw: 0,
      pitch: 0,
      roll: 0,
      zoom: 3.6,
      focusX: 0,
      focusZ: 0,
      focusY: 0
    }, { skipRender: true });
    syncGeoWindowToUI();
  }
  syncProjectionButtons();
  updateMapSettingsHint();
  markStaticDirty();
  updateDebugView();
  requestRender();
  toast(`Projection: ${next === 'globe' ? 'Globe' : 'Flat map'}`, 'ok');
});
ui.mapProjectionFlat?.addEventListener('click', () => {
  if (!ui.mapProjection) return;
  ui.mapProjection.value = 'flat';
  ui.mapProjection.dispatchEvent(new Event('change'));
});
ui.mapProjectionGlobe?.addEventListener('click', () => {
  if (!ui.mapProjection) return;
  ui.mapProjection.value = 'globe';
  ui.mapProjection.dispatchEvent(new Event('change'));
});

ui.geoNudgeN?.addEventListener('click', () => {
  nudgeGeoWindow(1, 0);
  markJourneyDirty(true);
});
ui.geoNudgeS?.addEventListener('click', () => {
  nudgeGeoWindow(-1, 0);
  markJourneyDirty(true);
});
ui.geoNudgeE?.addEventListener('click', () => {
  nudgeGeoWindow(0, 1);
  markJourneyDirty(true);
});
ui.geoNudgeW?.addEventListener('click', () => {
  nudgeGeoWindow(0, -1);
  markJourneyDirty(true);
});
ui.fitGeoWindow?.addEventListener('click', () => {
  state.geoWindow.manual = false;
  fitGeoWindowToBounds();
  markStaticDirty();
  updateDebugView();
  markJourneyDirty(true);
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
ui.geoStepLink?.addEventListener('input', () => {
  state.geoStepLinked = ui.geoStepLink?.type === 'checkbox' ? !!ui.geoStepLink.checked : !state.geoStepLinked;
  if (state.geoStepLinked && ui.geoLatStep && ui.geoLngStep) ui.geoLngStep.value = ui.geoLatStep.value;
  syncLayerToggleButtons();
  markStaticDirty();
  updateDebugView();
  requestRender();
});
ui.visPins?.addEventListener('click', () => setLayerVisibility('pins', !state.layerVisible.pins));
ui.visPath?.addEventListener('click', () => setLayerVisibility('path', !state.layerVisible.path));
ui.visOutline?.addEventListener('click', () => setLayerVisibility('outline', !state.layerVisible.outline));
ui.visWorldContext?.addEventListener('click', () => setLayerVisibility('worldContext', !state.layerVisible.worldContext));
ui.visGeoGrid?.addEventListener('click', () => setLayerVisibility('geoGrid', !state.layerVisible.geoGrid));
ui.visTopography?.addEventListener('click', () => setLayerVisibility('topography', !state.layerVisible.topography));
ui.visSeaLevel?.addEventListener('click', () => setLayerVisibility('seaLevel', !state.layerVisible.seaLevel));
ui.quickVisPins?.addEventListener('click', () => setLayerVisibility('pins', !state.layerVisible.pins));
ui.quickVisPath?.addEventListener('click', () => setLayerVisibility('path', !state.layerVisible.path));
ui.quickVisOutline?.addEventListener('click', () => setLayerVisibility('outline', !state.layerVisible.outline));
ui.quickVisWorldContext?.addEventListener('click', () => setLayerVisibility('worldContext', !state.layerVisible.worldContext));
ui.quickVisGeoGrid?.addEventListener('click', () => setLayerVisibility('geoGrid', !state.layerVisible.geoGrid));
ui.quickVisTopography?.addEventListener('click', () => setLayerVisibility('topography', !state.layerVisible.topography));
ui.quickVisSeaLevel?.addEventListener('click', () => setLayerVisibility('seaLevel', !state.layerVisible.seaLevel));
ui.quickPerfMode?.addEventListener('click', () => setPerformanceMode(!state.performanceMode));
ui.layoutToolbarPos?.addEventListener('change', () => setViewerLayoutPrefs({ toolbarPos: ui.layoutToolbarPos.value || 'top-center' }));
ui.layoutHudSide?.addEventListener('change', () => setViewerLayoutPrefs({ hudSide: ui.layoutHudSide.value === 'right' ? 'right' : 'left' }));
ui.layoutCameraSide?.addEventListener('change', () => setViewerLayoutPrefs({ cameraSide: ui.layoutCameraSide.value === 'left' ? 'left' : 'right' }));
ui.layoutGlobeCorner?.addEventListener('change', () => setViewerLayoutPrefs({ globeCorner: ui.layoutGlobeCorner.value === 'top-left' ? 'top-left' : 'top-right' }));

ui.loadTopography?.addEventListener('click', loadTopographyFromOpenData);
ui.refreshTopography?.addEventListener('click', () => loadTopographyFromOpenData({ forceRefresh: true }));
ui.clearTopography?.addEventListener('click', clearTopography);
ui.topoQuality?.addEventListener('change', () => {
  applyTopographyQualityPreset(ui.topoQuality.value || 'custom');
});
ui.topoMode?.addEventListener('change', () => {
  state.topography.mode = ui.topoMode.value || 'contour2d';
  updateTopographyScaleUI();
  markStaticDirty();
  updateRawView();
  updateDebugView();
  requestRender();
});
ui.topoResolution?.addEventListener('input', () => {
  syncTopographyQualityFromControls();
  syncActionAvailability();
});
ui.topoContours?.addEventListener('input', () => {
  state.topography.contourCount = Number(ui.topoContours.value || 12);
  syncTopographyQualityFromControls();
  markStaticDirty();
  updateRawView();
  updateDebugView();
  requestRender();
});

ui.timelineModeBtn?.addEventListener('click', () => {
  toggleTimelineMode();
  markJourneyDirty(true);
});

ui.savePinMeta.addEventListener('click', saveMetadataFromEditor);
ui.cancelPinMeta.addEventListener('click', cancelMetadataChanges);
ui.deletePin.addEventListener('click', deleteSelectedPin);
ui.refreshRaw?.addEventListener('click', updateRawView);
ui.refreshDebug?.addEventListener('click', updateDebugView);

ui.confirmDialogConfirmBtn?.addEventListener('click', () => resolveConfirmDialog(true));
ui.confirmDialogCancelBtn?.addEventListener('click', () => resolveConfirmDialog(false));
ui.confirmDialog?.addEventListener('close', () => {
  if (hasPendingConfirm()) resolveConfirmDialog(false);
});

[ui.pinLabel, ui.pinTimestamp, ui.pinNote].forEach(el => {
  el.addEventListener('input', handleMetadataChange);
});

function anchorPanelHelpToGroupTitle() {
  document.querySelectorAll('.group .group-head').forEach((head) => {
    const title = head.querySelector('h3');
    const helpBtn = head.querySelector('.panel-help');
    if (!title || !helpBtn || title.contains(helpBtn)) return;
    title.appendChild(helpBtn);
  });
}

anchorPanelHelpToGroupTitle();

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
ui.viewHome?.addEventListener('click', () => {
  homeView();
});
ui.viewFit?.addEventListener('click', () => {
  fitMapToFrame();
});
ui.viewIso?.addEventListener('click', () => {
  setCameraPreset('iso');
});
ui.viewTop?.addEventListener('click', () => {
  setCameraPreset('top');
});
ui.viewBottom?.addEventListener('click', () => {
  setCameraPreset('bottom');
});
ui.viewLeft?.addEventListener('click', () => {
  setCameraPreset('left');
});
ui.viewRight?.addEventListener('click', () => {
  setCameraPreset('right');
});
ui.viewFront?.addEventListener('click', () => {
  setCameraPreset('front');
});
ui.viewBack?.addEventListener('click', () => {
  setCameraPreset('back');
});

[ui.terrainColor, ui.terrainGlow, ui.wireOpacity, ui.terrainHeight, ui.terrainPattern, ui.terrainDensity].filter(Boolean).forEach(el => {
  el.addEventListener('input', () => {
    markStaticDirty();
    requestRender();
  });
});
[ui.pathColor, ui.pathOpacity, ui.pathWidth, ui.pinColor, ui.pinLabelColor, ui.pinSize].filter(Boolean).forEach(el => el.addEventListener('input', requestRender));
[ui.outlineColor, ui.outlineOpacity, ui.outlineWidth, ui.worldContextColor, ui.worldContextOpacity, ui.worldContextWidth, ui.topoColor, ui.topoOpacity, ui.topoLineWidth, ui.topoHeightScale]
  .filter(Boolean)
  .forEach(el => el.addEventListener('input', () => {
    if (el === ui.topoHeightScale) updateTopographyScaleUI();
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
    setExportStatus('PNG exported.', 'success');
    toast('PNG exported', 'ok');
  } catch (err) {
    console.error(err);
    setExportStatus('PNG export failed.', 'error');
    toast('PNG export failed', 'err');
  }
});

canvas.addEventListener('mousedown', (e) => {
  if (e.button !== 0 && e.button !== 1) return;
  if (e.button === 1) e.preventDefault();
  noteInteractionActivity(220);
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
  noteInteractionActivity(220);
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
    setCamera(state.camera.yaw - dx * 0.006, state.camera.pitch + dy * 0.005, state.camera.zoom, { syncUI: false });
  }
});
window.addEventListener('mouseup', (e) => {
  if (!state.interaction.dragging) return;
  noteInteractionActivity(180);
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
  noteInteractionActivity(220);
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
const savedTheme = (() => {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (err) {
    return null;
  }
})();
if (window.DesignSystemThemeSelector && ui.themeSelectApp) {
  applyTheme(
    document.documentElement.getAttribute('data-theme') ||
      savedTheme ||
      'mono-slate'
  );
  ui.themeSelectApp.addEventListener('ds-theme-change', (e) => {
    applyTheme(e?.detail?.theme || ui.themeSelectApp.value);
  });
} else {
  applyTheme(savedTheme || document.documentElement.getAttribute('data-theme') || 'mono-slate');
  ui.themeSelectApp?.addEventListener('change', (e) => applyTheme(e.target.value));
}
loadOutlineCacheFromStorage();
loadGlobalBaselineFromStorage();
loadViewerLayoutPrefs();
loadJourneysFromStorage();
setupTabs();
setupCollapsibleGroups();
bindJourneyDirtyTracking();
updatePlayPauseLabel();
updateTimelineModeButton();

async function initApp() {
  if (state.currentJourneyId && state.journeys[state.currentJourneyId]) {
    applyJourneyPayload(state.journeys[state.currentJourneyId], { silent: true });
  } else {
    await loadPinsFromUI({ silent: true });
    if (ui.journeyName) ui.journeyName.value = suggestJourneyName();
    markJourneyDirty(true);
  }

  syncCameraToUI();
  syncGeoWindowToUI();
  if (ui.mapProjection) ui.mapProjection.value = state.mapProjection;
  syncProjectionButtons();
  if (ui.topoResolution) ui.topoResolution.value = String(ui.topoResolution.value || TOPO_QUALITY_PRESETS.medium.resolution);
  if (ui.topoContours) ui.topoContours.value = String(ui.topoContours.value || state.topography.contourCount);
  if (ui.topoMode) ui.topoMode.value = state.topography.mode;
  syncTopographyQualityFromControls();
  updateTopographyScaleUI();
  applyViewerLayoutPrefs();
  if (ui.outlineMainlandOnly) ui.outlineMainlandOnly.value = state.outlineFilterMode;
  syncLayerToggleButtons();
  syncPerformanceModeButton();
  populateOutlineSegmentSelect();
  setTopoStatus('Topography idle.');
  syncJourneyUI();
  syncActionAvailability();
  updateDebugView();
  resize();
  requestRender();
}

initApp();

