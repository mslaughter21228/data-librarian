#!/usr/bin/env bash
# start-librarian.sh
# Starts both the Data Librarian Python backend (port 2226) and the Next.js
# frontend (port 3000).  Ctrl+C kills both cleanly.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_DIR="$SCRIPT_DIR/python_core"

cleanup() {
    echo ""
    echo "Shutting down Data Librarian..."
    # Kill the Python backend by PID (captured at launch)
    if [[ -n "$PYTHON_PID" ]] && kill -0 "$PYTHON_PID" 2>/dev/null; then
        kill "$PYTHON_PID"
        echo "  Backend stopped (PID $PYTHON_PID)"
    fi
    # Belt-and-suspenders: also pkill in case PID tracking failed
    pkill -f "web_interface.py" 2>/dev/null || true
    pkill -f "next-dev|node.*next" 2>/dev/null || true
    echo "  Frontend stopped"
    exit 0
}

trap cleanup INT TERM

# Kill any leftover processes from a previous session before starting fresh
echo "Checking for existing processes..."
pkill -f "web_interface.py" 2>/dev/null && echo "  Stopped stale backend" || true
pkill -f "next-dev|node.*next" 2>/dev/null && echo "  Stopped stale frontend" || true
# Give the OS a moment to release the ports
sleep 1

echo "Starting Data Librarian backend..."
cd "$PYTHON_DIR"
python3 web_interface.py &
PYTHON_PID=$!
echo "  Backend PID: $PYTHON_PID"

echo "Starting Next.js frontend..."
cd "$SCRIPT_DIR"
npm run dev &
NPM_PID=$!

echo ""
echo "Data Librarian running."
echo "  Backend : http://localhost:2226"
echo "  Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both."
echo ""

# Wait for either process to exit
wait $PYTHON_PID $NPM_PID
