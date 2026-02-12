# NOESIS 2026 — Vedam Tech Fest Frontend

**NOESIS 2026** is the official web experience for the Vedam Tech Fest, featuring a highly interactive, scroll-driven user interface built with **React** and **GSAP**.

## 🚀 Overview

This repository houses the frontend application that serves as the digital gateway to the festival. It is designed to be immersive, cinematic, and highly responsive, pushing the boundaries of standard event websites.

## ✨ Key Features

### 1. Cinematic Scroll Experience
-   **GSAP ScrollTrigger**: Powering complex parallax effects, pin-scrolling, and motion choreography.
-   **Story-Canvas**: A global background system featuring matrix rain, aurora effects, and beams that react to scroll position.
-   **Floating-Glass Nav**: A dynamic navigation bar that adapts its appearance based on the active section.

### 2. Sponsorship Portal (New)
A fully redesigned, executive-style modal for potential sponsors, featuring:
-   **Tiers & Benefits**: Interactive comparison of sponsorship packages with clear value badges and grid layouts.
-   **Reach & Metrics**: A dashboard-style view of audience data, featuring glassmorphic cards and high-impact ROI banners.
-   **Vertical Navigation**: Smooth sidebar navigation for easy access to detailed information.

### 3. Program Tracks
Architecture based on distinct tracks rather than generic pages:
-   **Tech**
-   **Robotics**
-   **E-Cell**
-   **E-Sports**
-   **Cultural**

## 📸 Visual Showcase

### Sponsorship Tiers
*Interactive tier comparison with "Benefits" badges and grid layout for easy scanning.*
![Sponsorship Tiers](/docs/sponsorship-tiers.png)

### Reach & Metrics Dashboard
*High-impact ROI banner and glassmorphic platform cards showcasing audience reach.*
![Reach Dashboard](/docs/reach-dashboard.png)

## 🛠️ Tech Stack

-   **Framework**: React 19 + Vite 7
-   **Animation**: GSAP (GreenSock Animation Platform) + ScrollTrigger
-   **Styling**: CSS Modules + Modern CSS Variables (Glassmorphism, Gradients)
-   **Icons**: Lucide React
-   **Quality Assurance**: Playwright (for visual regression testing)

## ⚡ Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/noesis-website.git

# Navigate to directory
cd noesis-website

# Install dependencies
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```
Visit `http://localhost:5173` to view the app.

### Build for Production

```bash
npm run build
```
The output will be in the `dist/` folder.

## 🧪 QA & Testing

This project includes a visual QA pipeline using Playwright.

### Run QA Checks

```bash
# Lint code
npm run qa:lint

# Build project
npm run qa:build

# Capture Screenshots (Desktop & Mobile)
npm run qa:screenshots
```

Screenshots are saved in `artifacts/screenshots/` for visual verification of layout stability across updates.

## 📂 Project Structure

```text
src/
├── components/          # React components
│   ├── SponsorDetailsModal.jsx  # Main sponsorship modal
│   ├── ProgramCard.jsx          # Event track cards
│   ├── TrackChapter.jsx         # Section chapters
│   └── TrackRail.jsx            # Scroll rail logic
├── data/                # Static data files
│   ├── sponsorshipData.js       # Sponsorship perks & metrics
│   └── programTracksData.js     # Event track info
├── lib/                 # Utilities
│   └── scrollScenes.js          # GSAP animation configs
├── styles/              # Global styles (if any)
└── App.jsx              # Main application entry
```

---
*Built for Vedam Tech Fest 2026. Designed for Impact.*
