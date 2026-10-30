# Trekulate Development

Read [README](README.md) for serving, checks, proxy requirements, and legacy publication limits.

- Preserve journey/pin/render/camera contracts and portable import/export. Browser localStorage belongs to the current origin; changing hosts/ports does not migrate it.
- Runtime inputs are `index.html`, `trekulate.js`, `js/`, `design-system/`, and icon assets. Keep their relative layout intact.
- `_tools/topography_proxy.py` supports runtime topography on localhost; the app expects port 8080. Keep it repository-owned, even though it is not a deployed browser asset. It uses Python's standard library.
- Use `node --check` on `trekulate.js` and all five `js/*.js` files. No package manifest, automated app test runner, build, or lint command is configured. Syntax checks do not verify rendering or persistence.
- Do not run legacy `publish.ps1` until its old `_TREKULATE` destination has been reviewed. No deployment/publishing is implied by normal organization work.
- Follow applicable parent instructions when available. Optional local context is `../_docs/README.md`; normal static inputs and proxy execution must not depend on outer docs. Preserve unrelated user changes and document unrun checks.
