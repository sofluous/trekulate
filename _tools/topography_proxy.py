#!/usr/bin/env python3
"""
Local-only TREKULATE topography proxy.

Why this exists:
- Browsers block direct elevation API calls because of CORS.
- This small local server fetches elevation data on behalf of the app.

Safety:
- Binds only to 127.0.0.1 by default.
- Only proxies approved elevation datasets.
- Does not read local files or run shell commands.
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


HOST = "127.0.0.1"
PORT = 8080
ALLOWED_DATASETS = {"aster30m", "srtm90m"}


class TopographyProxyHandler(BaseHTTPRequestHandler):
    server_version = "TrekulateTopographyProxy/0.1"

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/health":
            self._write_json(200, {"ok": True, "service": "topography-proxy"})
            return
        if parsed.path != "/topography":
            self._write_json(404, {"error": "Not found"})
            return

        params = urllib.parse.parse_qs(parsed.query)
        dataset = (params.get("dataset") or ["aster30m"])[0].strip().lower()
        locations = (params.get("locations") or [""])[0].strip()

        if dataset not in ALLOWED_DATASETS:
            self._write_json(400, {"error": f"Dataset '{dataset}' is not allowed."})
            return
        if not locations:
            self._write_json(400, {"error": "Missing 'locations' query parameter."})
            return

        upstream = (
            f"https://api.opentopodata.org/v1/{urllib.parse.quote(dataset)}"
            f"?locations={urllib.parse.quote(locations, safe='|,.-')}"
        )

        try:
            request = urllib.request.Request(
                upstream,
                headers={
                    "User-Agent": "TREKULATE-Local-Proxy/0.1",
                    "Accept": "application/json",
                },
                method="GET",
            )
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = response.read()
            data = json.loads(payload.decode("utf-8"))
            self._write_json(200, data)
        except urllib.error.HTTPError as err:
            body = err.read().decode("utf-8", errors="replace")
            self._write_json(err.code, {"error": "Upstream HTTP error", "detail": body[:600]})
        except Exception as err:  # pragma: no cover - defensive local tooling
            self._write_json(502, {"error": "Proxy fetch failed", "detail": str(err)})

    def log_message(self, fmt: str, *args) -> None:
        sys.stdout.write(
            "%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), fmt % args)
        )

    def _write_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    port = PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            raise SystemExit("Port must be a number, e.g. python _tools/topography_proxy.py 8080")

    httpd = ThreadingHTTPServer((HOST, port), TopographyProxyHandler)
    print(f"TREKULATE topography proxy running on http://{HOST}:{port}")
    print("Press Ctrl+C in this terminal to stop it.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping proxy...")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
