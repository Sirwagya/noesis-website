# NOESIS 2026 Frontend

NOESIS is a scroll-driven tech-fest frontend built with React + Vite.

## What This Version Delivers

- Program architecture based on **Tracks** instead of separate competitions/events sections:
  - Tech
  - Robotics
  - E-Cell
  - E-Sports
  - Cultural
- **GSAP ScrollTrigger**-powered scroll choreography:
  - Floating-glass cinematic navbar interpolation
  - Story-canvas global parallax (matrix, aurora, beams, grain)
  - Pinned hero + pinned program tracks chapter
  - Continuous depth-grid chapter/card parallax
- Frontend-only placeholder-safe flow:
  - `Register (Coming Soon)` state (no broken dead links)
- Accessibility-conscious baseline:
  - keyboard focus visibility
  - reduced-motion fallback
  - semantic section structure

## Stack

- React 19
- Vite 7
- GSAP + ScrollTrigger
- Playwright (visual QA capture)

## Getting Started

```bash
npm install
npm run dev
```

## Build and Lint

```bash
npm run lint
npm run build
```

## Frontend QA Runbook

### 1) Lint

```bash
npm run qa:lint
```

### 2) Build

```bash
npm run qa:build
```

### 3) Screenshot Verification

```bash
npm run qa:screenshots
```

This command:

- starts preview server if not already running
- captures desktop and mobile screenshots for each static section id
- captures transition checkpoints for seam/motion QA
- stores outputs in:
  - `artifacts/screenshots/desktop`
  - `artifacts/screenshots/mobile`

### 4) Full QA Chain

```bash
npm run qa:frontend
```

## Screenshot Stability Rule

The screenshot pipeline intentionally waits only on static selectors/timeouts and **never** on observer/animation classes (such as `.in-view`).

## Project Layout

```text
src/
  App.jsx
  App.css
  index.css
  components/
    ProgramCard.jsx
    TrackChapter.jsx
    TrackRail.jsx
  data/
    programTracksData.js
  lib/
    scrollScenes.js
scripts/
  capture-screenshots.mjs
artifacts/
  screenshots/
```

## Deployment

Build output remains in `dist/` and can be deployed on Netlify using existing project setup.
