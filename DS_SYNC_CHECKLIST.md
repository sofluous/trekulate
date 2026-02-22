# TREKULATE Design System Sync Checklist

Use this checklist whenever you update DesignSystemizer and want TREKULATE to stay consistent.

## 1) Copy Design System Snapshot

- [ ] Copy `_DesignSystem/theme.css` to `_TREKULATE/theme.css`
- [ ] Copy `_DesignSystem/css/tokens.css` to `_TREKULATE/css/tokens.css`
- [ ] Copy `_DesignSystem/css/themes.css` to `_TREKULATE/css/themes.css`
- [ ] Copy `_DesignSystem/css/components.css` to `_TREKULATE/css/components.css`

## 2) Verify App Link

- [ ] In `_TREKULATE/index.html`, confirm:
```html
<link rel="stylesheet" href="./theme.css">
```
- [ ] In current version file (example `_TREKULATE/index_v0.4.html`), confirm:
```html
<link rel="stylesheet" href="./theme.css">
```

## 3) Publish Current Version to Live Entry

- [ ] Run:
```powershell
powershell -ExecutionPolicy Bypass -File _TREKULATE/publish.ps1 -Version v0.4
```
- [ ] Replace `v0.4` with your latest version each release.

## 4) Quick Visual QA

- [ ] Open TREKULATE
- [ ] Switch through all themes
- [ ] Confirm fonts, borders, labels, scrollbars, and controls match expected DS look

## 5) Commit Only Relevant Files

Always include:
- [ ] `_TREKULATE/index.html`
- [ ] `_TREKULATE/index_v0.X.html` (current version file)
- [ ] `_TREKULATE/theme.css`
- [ ] `_TREKULATE/css/tokens.css`
- [ ] `_TREKULATE/css/themes.css`
- [ ] `_TREKULATE/css/components.css`
- [ ] `_TREKULATE/DS_SYNC_CHECKLIST.md` (if changed)

Do not include unrelated files/folders (example `_TREKULATE/_archive`).

## 6) Recommended Versioning Practice

- Keep `index_v0.X.html` files as immutable snapshots.
- Serve only `_TREKULATE/index.html` in production (GitHub Pages entry within project folder).
- Use `publish.ps1` to copy the chosen snapshot into `index.html`.
- Prefer a short changelog note per version (`what changed`, `why`).
