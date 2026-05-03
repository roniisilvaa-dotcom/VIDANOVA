#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${RENDER_BASE_URL:-https://vidanova-1.onrender.com}"
echo "Pinging health: ${BASE_URL}/health"
curl -sS "${BASE_URL}/health" || true
echo
echo "Pinging status: ${BASE_URL}/api/status"
curl -sS "${BASE_URL}/api/status" || true
echo
echo "Smoke test completed."
