# TREKULATE

Browser journey-mapping tool with pins/routes, flat/globe views, outlines, topography, and image/portable journey export.

From this repository directory, serve the app with Python 3:

```text
python -m http.server 5500 --bind 127.0.0.1
```

Open `http://127.0.0.1:5500/`. External geographic/elevation services and CDN icons require network access. Journeys/preferences are browser-local; export portable trek files for transfer or backup, especially before changing origins.

For local topography, run in another terminal from this same directory:

```text
python -B _tools/topography_proxy.py
```

The standard-library proxy binds loopback port 8080; `http://127.0.0.1:8080/health` reports readiness. Stop either server with Ctrl+C. The app currently expects 8080; starting the proxy on another port alone does not reconfigure it. Python 3.14.2 was used for local validation. Live elevation still depends on the upstream service and its limits.

With Node.js available (validated with 24.14.1), check runtime syntax from this directory:

```powershell
node --check trekulate.js
Get-ChildItem js -Filter *.js -File | ForEach-Object { node --check $_.FullName; if ($LASTEXITCODE -ne 0) { throw "Syntax check failed" } }
```

There is no configured package/build/lint pipeline or automated app regression suite. Manually check journey CRUD/import/export, pins, camera/projection, and topography when changing those behaviors; syntax and health checks do not validate visual output.

| Path | Ownership |
| --- | --- |
| `index.html`, `trekulate.js`, `js/` | Application shell and runtime modules |
| `design-system/`, `icons/` | Runtime theme/icon assets |
| `_tools/topography_proxy.py` | Application-coupled local topography service |
| `publish.ps1` | Legacy snapshot copier; stale target path, do not run until repaired |

The existing tracked `_tools/__pycache__` is generated Python output, not required source. Its removal from tracking is a separate reviewed cleanup; `-B` avoids generating additional bytecode during proxy runs. No hosting configuration is supplied; publish only intended static runtime inputs and review exclusions independently of Git ignore rules.

See [AGENTS.md](AGENTS.md) for engineering guidance. Optional local docs at `../_docs/README.md` may be absent in a clone. Proxy and application inputs are repository-contained.
