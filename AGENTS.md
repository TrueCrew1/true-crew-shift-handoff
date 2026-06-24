# AGENTS.md

## Cursor Cloud specific instructions

- This is a **static web tool** (HTML/CSS/JavaScript) per the tech stack in `README.md`. There is no package manager, no build step, and no automated tests/linters configured.
- Run it the way `README.md` documents: from the repo root run `python3 -m http.server 8000`, then open `http://localhost:8000`. `python3` is preinstalled on the VM, so there are no dependencies to install.
- Note: as of this setup the repo only contains `README.md` — the application entry point (`index.html`) and `assets/` described in the README do not exist yet, so the dev server currently serves a directory listing rather than the app. Once `index.html` is added at the repo root, the same server command serves the app at `http://localhost:8000`.
