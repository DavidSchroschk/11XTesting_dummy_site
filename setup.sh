#!/usr/bin/env bash
set -euo pipefail

# Setup script for the Next.js demo
# Usage: ./setup.sh [additional npm packages]
# Any arguments passed to this script will be installed via npm in addition to
# the packages specified in package.json.

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$ROOT_DIR/11xtesting"

cd "$PROJECT_DIR"

# Install core dependencies from package.json
npm install

# Install any extra dependencies provided by the user
if [ "$#" -gt 0 ]; then
  echo "Installing additional dependencies: $*"
  npm install "$@"
fi

# Set up Prisma (generate client and apply schema)
npx prisma generate
npx prisma db push

echo "Setup completed successfully."
