# TREKULATE Development + Wireframe Plan

## Document Status
- Version: 0.1
- Date: 2026-02-22
- Owner: TREKULATE project
- Purpose: Plan functional development and UX wireframe structure before implementation.

## Current Product Goal
Build a journey tracking app that renders:
- Terrain/wireframe map context
- Pin list with metadata
- Animated path over time
- Technical holographic display style
- Exportable outputs (model + media + layered vectors)

## Immediate Known Issues
1. Theme text/style mismatch
- Symptom: `industrial-terminal` appears correct, other themes appear to fall back inconsistently.
- Initial check: Theme names used in app are present in `_DesignSystem/css/themes.css`.
- Hypothesis: Token cascade or local app overrides are still overriding DS typography tokens in some contexts.
- Action: Add a Theme QA matrix and token-diff check before further UI work.

2. Panel overload and excessive scroll
- Current state: Most controls are stacked into one vertical column.
- UX impact: High cognitive load, poor task flow, frequent scrolling.

## Information Architecture (Target)
Organize by user job, not by technical implementation.

### A. Map Workspace (Primary)
- 3D canvas viewport
- Pin-to-canvas interactions
- Optional floating metadata card anchored to selected pin

### B. Mapping Panel
- Pin list (single source of truth)
- Add/import pins
- Select pin
- Metadata editor stacked directly under pin list

### C. Playback Bar (Bottom)
- Full-width timeline
- Play/pause, scrubber/playhead, speed
- Event markers mapped to pins/timestamps

### D. Rendering Tab
- Visual style controls (terrain/path/pins/labels)
- Layer visibility toggles

### E. Data + Map Tools Tab
- Base map settings
- Route/outline imports
- OSM/Nominatim/Overpass/OSRM helpers

### F. Export Tab
- 3D model export
- GIF/video/image export
- Vector layer export (map/path/pins/labels separated)

## UX Wireframe (Low Fidelity)

### Layout V1 (Docked Metadata)
- Left: Mapping panel (Pin List + Metadata)
- Right: Canvas workspace
- Bottom: Timeline playback strip
- Top-right or top-left: Global tabs for `Mapping | Rendering | Data/Import | Export`

### Layout V2 (Undocked Metadata)
- Same as V1, plus:
- Metadata panel can be toggled between:
  - Docked (in Mapping panel)
  - Floating (on canvas), with connector line to selected pin

### Pin Interaction Flow
1. User adds pins manually or via import.
2. Pin appears in list.
3. Selecting a pin highlights map marker.
4. Metadata panel shows selected pin details.
5. Edits auto-save or explicit save (decision pending).

### Google Maps Import Flow
1. User pastes one or more Google Maps share links into an import textarea.
2. App parses coordinates/label candidates.
3. User previews extracted rows.
4. User confirms add -> pins appended to pin list.
5. Parse errors shown with line-level feedback.

## Functional Modules (Planned)

### 1) Pin Store + Metadata Store
- Canonical pin model with ID, lat/lng, label, timestamp, note, source.
- Selection state and highlight sync between list and canvas.

### 2) Import Pipeline
- Raw paste input area
- Parser adapters (Google Maps links, CSV rows)
- Preview + validation stage
- Commit to store

### 3) Timeline Engine
- Playback by normalized progress and by real timestamp mode
- Bottom bar UI with markers and event labels

### 4) Camera + Interaction
- Orbit/zoom/pan
- Pin hit testing
- Floating metadata anchor behavior

### 5) Render Stack
- Static layers: terrain/base map/country outline
- Dynamic layers: path head, pins, labels, selections
- Layer toggles and style controls

### 6) Export Stack
- Raster snapshot (PNG)
- Animated export (GIF/video)
- Vector layer export (SVG per layer)
- 3D geometry export (GLTF/OBJ target TBD)

## Proposed UX Hierarchy Update (Implementation Order)

### Phase 1: Structure First
- Introduce top-level tabbed control architecture.
- Move Playback controls to dedicated bottom bar.
- Keep Mapping tab focused on pin list + metadata only.

### Phase 2: Import + Metadata Quality
- Add dedicated paste/import area for Google Maps content.
- Add parse preview table and add/append action.
- Add undock toggle for metadata panel.

### Phase 3: Rendering + Data Tools Segmentation
- Move visual controls into Rendering tab.
- Move map settings and open-data tools into Data/Import tab.

### Phase 4: Export Features
- Export tab with format-specific controls and presets.
- Layer-based export pipeline.

## User Guide Strategy (Living Documentation)
Create and maintain docs as features land.

### Documentation files to maintain
- `docs/user-guide.md` (end-user actions)
- `docs/dev-notes.md` (technical implementation notes)
- `docs/changelog.md` (feature-by-feature progress)
- `docs/known-issues.md` (active bugs, mitigations, status)

### Update rule
- Every merged feature updates:
  - User flow steps
  - Screenshots/GIFs (when available)
  - Known constraints

## Theme QA Plan

### QA Matrix
Validate each theme for:
- Font family (`--ds-font-sans`, `--ds-font-mono`)
- Button sizing and borders
- Input/select/textarea typography
- Label casing and spacing
- Scrollbar style consistency in control panel

### Debug Tasks
- Audit app-local CSS for remaining typography overrides.
- Verify computed styles for controls and labels per theme.
- Confirm no hardcoded fallback font overrides DS tokens.

## Backlog Checklist
- [ ] Build tabbed control shell (Mapping / Rendering / Data+Import / Export)
- [ ] Build bottom timeline playback bar
- [ ] Refactor mapping panel to Pin List + Metadata stack
- [ ] Add metadata undock/floating mode with pin connector
- [ ] Add Google Maps paste import box + preview + add action
- [ ] Add map settings and import tools section
- [ ] Add export architecture and first output target (PNG)
- [ ] Establish docs folder and living user guide workflow
- [ ] Run theme QA matrix and close fallback issue

## Open Decisions
1. Metadata save behavior
- Option A: Auto-save on field change
- Option B: Explicit Save button

2. Floating metadata behavior
- Option A: Single floating card for selected pin
- Option B: Multiple cards for multiple pinned selections

3. Export priority
- Option A: PNG + SVG first
- Option B: GLTF first

4. Timeline semantics
- Option A: Even spacing between pins
- Option B: Real timestamps drive timing

## Definition of Done for Next Milestone
- New layout hierarchy implemented (tabbed controls + bottom timeline)
- Mapping tab reduced to Pin List + Metadata only
- Google Maps paste import added with preview
- Theme QA issue tracked with clear pass/fail results per theme
- User-guide skeleton created and linked to feature status
