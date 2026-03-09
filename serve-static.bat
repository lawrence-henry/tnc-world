@echo off
REM Build the site once, then start a simple local server on port 8000
py -m mkdocs build -d site
py -m http.server 8000 -d site
pause
