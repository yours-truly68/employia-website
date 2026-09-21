# Employia — Website Redesign

> **Exceptional people. High-impact roles.**

A ground-up redesign of [employia.de](https://employia.de) — a focused recruitment platform connecting vetted technical builders with ambitious AI and deep-tech companies.

---

## Overview

This project is a complete visual and interactive redesign of the Employia website. The new design adopts an **editorial, brutalist-inspired aesthetic** with bold typography, full-bleed imagery, and immersive scroll-driven interactions. Built as a static site with no frameworks — pure HTML, CSS, and vanilla JavaScript.

---

## Design Philosophy

- **Quiet editorial tone** — confident, minimal, and typographically driven
- **Content-first hierarchy** — large headlines, restrained color palette, generous whitespace
- **Immersive interactions** — scroll-pinned horizontal rails, parallax hero, entrance curtain
- **Accessibility-first** — WCAG-compliant focus states, keyboard navigation, reduced-motion support

---

## Sections

| Section | Description |
|---|---|
| **Entrance Curtain** | Animated brand reveal on page load with progress line |
| **Header** | Fixed nav with blur backdrop, scroll progress bar, mobile hamburger |
| **Hero** | Full-viewport editorial cover with parallax image and dual CTAs |
| **Positioning** | Selective impact statement with domain spectrum bar |
| **The Roles** | Horizontal pinned-scroll chapter showcasing 6 key roles |
| **Two Doors** | Split-screen founder vs. builder pathways |
| **How It Works** | 4-step operational process in editorial grid |
| **Closing CTA** | Direct contact with email copy-to-clipboard |
| **Footer** | Minimal footer with privacy policy and impressum modals |

---

## Key Roles Featured

1. **Founding Engineer** — Build the technical foundation from zero
2. **AI Engineer** — Turn frontier models into production systems
3. **Forward Deployed Engineer** — Take technology into the real world
4. **Founding GTM** — Create the first growth engine
5. **Chief of Staff** — Turn ambiguity into execution
6. **Executives** — Lead what comes next

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | Vanilla CSS (custom properties, no preprocessor) |
| **Interactivity** | Vanilla JavaScript (ES6+, no dependencies) |
| **Typography** | DM Sans via Google Fonts |
| **Images** | WebP format, responsive with lazy loading |

---

## File Structure

```
Employia/
├── index.html          # Main page
├── styles.css          # Editorial design system (1500+ lines)
├── script.js           # Client-side interactions (8 modules)
├── .gitignore          # Excludes .DS_Store and .impeccable/
├── assets/
│   ├── Employia_hero_image.webp
│   ├── Founder_Image.webp
│   └── Hire_Talent.webp
└── README.md
```

---

## Features

### Performance
- Single-page architecture — no page loads
- `fetchpriority="high"` on hero image for LCP
- Passive scroll listeners for 60fps performance
- `will-change` hints for GPU-accelerated animations
- Inline SVG favicon (zero HTTP request)

### Interactions
- **Brand curtain** — Animated entrance with progress line, respects `prefers-reduced-motion`
- **Hero parallax** — Scroll-driven image translation and overlay fade
- **Scroll progress** — Top-bar indicator showing page position
- **Pinned roles rail** — Desktop: scroll-driven horizontal translation; Mobile: snap-scroll track
- **Dynamic inquiry routing** — Clicking a role card pre-fills the contact email subject
- **Toast notifications** — Clipboard copy feedback

### Accessibility
- Semantic landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`)
- `aria-label`, `aria-expanded`, `aria-controls` on interactive elements
- `aria-modal="true"` with focus trapping on legal modals
- Keyboard navigation for role cards (Enter/Space)
- Escape key dismissal for mobile menu and modals
- `:focus-visible` outlines with 2px solid offset
- Full `prefers-reduced-motion` support — disables parallax, curtain, and transitions

### Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `> 1024px` | Large desktops |
| `960px–1024px` | Small desktops / tablets — 2-column process grid |
| `≤ 959px` | Tablets — horizontal scroll rail, stacked doors |
| `≤ 860px` | Mobile — hamburger nav, simplified layout |
| `≤ 640px` | Small mobile — single-column process, stacked CTAs |

---

## Legal Compliance

- **Privacy Policy (Datenschutz)** — GDPR-compliant data handling disclosure
- **Impressum** — German Telemedia Act (TMG §5) legal notice
- Both accessible via modal dialogs from the footer

---

## Running Locally

No build step required. Open `index.html` in any modern browser:

```bash
# Option 1: Direct file open
open index.html

# Option 2: Local server (if Python is installed)
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Browser Support

- Chrome / Edge 90+
- Firefox 90+
- Safari 14+
- Mobile Safari / Chrome (iOS 14+)

---

## License

© 2026 Employia. All rights reserved.

---

*Designed with a focus on editorial clarity, accessibility, and performance.*
