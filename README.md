# NVIDIA NCA-AIIO Flashcards

A free, static flashcard web app for studying for the NVIDIA NCA-AIIO (NVIDIA-Certified Associate: AI Infrastructure and Operations) certification. No login, no accounts, no backend. Each visitor's bookmarked cards are saved in their own browser via `localStorage` and never leave their device.

**Live app:** https://techtokwithkriti.github.io/nvidia-aiio-flash-cards/

## What's here

- Nine study categories covering AI infrastructure, GPU architecture, networking, virtualization, storage, MLOps, and applied AI platforms.
- Flip cards with keyboard navigation (`Space` to flip, `←`/`→` to move between cards, `B` to bookmark).
- Per-category and bookmarked-only filtering, plus a progress tracker.
- Every card is written from scratch and checked against NVIDIA's own official documentation before being added.

## Running it locally

Most people should just use the live app above, no setup needed there, GitHub Actions builds and deploys it automatically. These steps are only for cloning the repo yourself (to contribute or test changes): the card content is generated from source Markdown at build time, and that generated file isn't committed to the repo, so there's one setup step before a local checkout will load in a browser.

1. Clone the repo.
2. Generate `cards.json` from the source content in `data/`:
   ```
   node scripts/build.js
   ```
3. Serve the folder with any static file server (opening `index.html` directly via `file://` won't work because the app fetches `cards.json`):
   ```
   python3 -m http.server 8000
   ```
4. Open `http://localhost:8000` in your browser.

Re-run step 2 any time you edit a file under `data/`.

## Contributing content

Card content lives in `data/*.md`, one file per category. See the format and rules documented in that folder before adding or editing cards.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) rebuilds `cards.json` from `data/*.md` and deploys the app to GitHub Pages on every push to `main`. `cards.json` itself is not committed to the repo, it's a generated build artifact.
