#!/usr/bin/env bash
# Client preview launcher: ./preview.sh <github-username>
# Builds a noindex preview into docs/, pushes to GitHub, turns on GitHub Pages.
set -e
USER_GH="${1:?Usage: ./preview.sh <github-username>}"
cd "$(dirname "$0")"
PREVIEW="$USER_GH" node tools/build.mjs
git add -A
git diff --cached --quiet || git commit -qm "Update client preview"
URL="https://$USER_GH.github.io/stayb/"
if command -v gh >/dev/null 2>&1; then
  gh repo view "$USER_GH/stayb" >/dev/null 2>&1 || gh repo create "$USER_GH/stayb" --public --source=. --remote=origin
  git branch -M main
  git push -u origin main
  gh api -X POST "repos/$USER_GH/stayb/pages" -f "source[branch]=main" -f "source[path]=/docs" >/dev/null 2>&1 || true
else
  git remote get-url origin >/dev/null 2>&1 || {
    echo "gh CLI not found. Create an EMPTY public repo named 'stayb' at https://github.com/new then run:"
    echo "  git remote add origin https://github.com/$USER_GH/stayb.git && ./preview.sh $USER_GH"; exit 1; }
  git branch -M main
  git push -u origin main
  echo "Now enable Pages: https://github.com/$USER_GH/stayb/settings/pages -> Branch: main, Folder: /docs"
fi
echo; echo "Client preview link (live in ~1 min): $URL"
