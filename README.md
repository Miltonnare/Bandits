# 254Bandits — Official Digital Headquarters

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-green?style=flat-square)](https://gsap.com)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange?style=flat-square)](https://github.com/darkroomengineering/lenis)

Welcome to the definitive digital experience for **254Bandits**, Kenya's voice of emotional rap redefining storytelling. This is an immersive cinematic universe designed with luxury neo-noir and Afrofuturistic aesthetics, built on a production-ready Next.js 15 architecture.

---

## ⚡ Key Interactive Experiences

*   **Cinematic Heartbeat Intro**: A heartbeat loading screen that requests user interaction to initialize the ambient soundtrack and bypass browser audio autoplay restrictions.
*   **Web Audio API Synthesizer**: A client-side synthesizer generating deep ambient sub-drones, warm pads, and low-frequency double beat thumper rhythms in real-time, completely self-contained.
*   **Canvas Spectral Visualizer**: A custom audio spectrum analyzer connected to the synthesizer voices, rendering frequency values on screen.
*   **3D Projection Globe**: A lightweight vector globe computed using an orthographic projection algorithm on HTML5 Canvas. Traces streaming connections from Nairobi to London, Los Angeles, and Tokyo.
*   **3D Member Cards**: Split-layout profiles for *Rockstar Bandit* and *Rasta Bandit* utilizing JS pointer coordinates to calculate responsive 3D card tilt transformations on hover.
*   **GSAP Pinned Timeline**: A horizontal scrolling timeline documenting the band's chronology (Origins -> Future) bound to vertical viewport scrolling.
*   **Luxury Merch Boutique**: eCommerce grid featuring size selection, Quick View drawers, slide-out shopping cart sidebar, and gold/crimson confetti trigger checkouts.
*   **Validated booking Coordinates**: Inquiry booking form with spam honey-pot protection and interactive success transitions.

---

## 🛠️ Technology Stack & Architecture

*   **Framework**: Next.js 15 (App Router) + React 19
*   **Type Safety**: TypeScript (Strict checks)
*   **Styling System**: Tailwind CSS v4 + Custom HSL design tokens
*   **Scroll Mechanics**: Lenis Smooth Scroll
*   **Animations**: GSAP (ScrollTrigger) & Framer Motion
*   **Vector Assets**: Lucide Icons & Custom SVG templates
*   **Ecosystem Utilities**: Canvas Confetti

### Folder Architecture
```
src/
├── app/                  # Route Pages, global styles, Sitemap & Robots specs
│   ├── globals.css       # HSL tokens, glassmorphism templates, film grain
│   ├── layout.tsx        # Typography, dynamic metadata APIs, Provider scopes
│   ├── icon.jpg          # Brand Favicon
│   └── page.tsx          # Home page assemblies
└── components/           # Modular client-side components
    ├── AudioPlayer.tsx   # Floating Web Audio synthesizer
    ├── BanditHero.tsx    # Landing hero with Canvas fireflies generator
    ├── BanditsCard.tsx   # 3D Tilt member profiles
    ├── BookingForm.tsx   # inquiry portal with validations
    ├── Discography.tsx   # Interactive albums & lyric details
    ├── InteractiveGlobe.tsx # HTML5 Canvas 3D globe projection
    ├── MerchShowcase.tsx # eCommerce cart drawer
    ├── Providers.tsx     # Custom cursor & Lenis wrapper
    └── Timeline.tsx      # GSAP horizontal scroll track
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies using npm:
```bash
npm install --legacy-peer-deps
```

### 2. Launch Local Dev Server
Start the development server to check modifications:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the dashboard.

### 3. Production Build Compilation
Compile the project to test optimized production static generation:
```bash
npm run build
```
Verify page bundles build without any hydration, TypeScript, or asset warnings.

---

## 💎 Design Token System (`globals.css`)

Colors are tailor-fit for the **Luxury Neo-Noir** and **Afrofuturism** style guidelines:

*   **Background**: `#050505` (Deep space black)
*   **Secondary**: `#0F0F10` (Frosted UI backgrounds)
*   **Surface / Cards**: `#181818` / `#1F1F1F`
*   **Borders**: `#2E2E2E`
*   **Primary Gold**: `#D4AF37`
*   **Deep Gold**: `#B8860B`
*   **Accent Red**: `#C1121F`
*   **Typography**: Editorial Warm Ivory (`#F9F9F9`) & Silver (`#A5A5A5`)
