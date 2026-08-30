# Waveform Modular — Landing Page

**Live Site:** [waveform-modular.netlify.app](https://waveform-modular.netlify.app/)

A responsive, interactive landing page for a small eurorack synth-module shop. Built across four weeks: Figma-style design, semantic HTML5 + Tailwind CSS layout, JavaScript interactivity, and finally production deployment with SEO and performance polish.

---

## Lighthouse Scores

| Category | Score |
|----------|-------|
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## Tech Stack

- HTML5 (semantic markup)
- Tailwind CSS (compiled locally, no CDN)
- Vanilla JavaScript (ES6, DOM APIs)
- Google Fonts
- Git & GitHub
- Netlify (CI/CD — every push to `main` auto-deploys)

---

## Features

- Light / dark mode — toggle in the navbar, persists via `localStorage`
- Responsive, mobile-first layout — hamburger navigation on small screens
- FAQ accordion — smooth expand/collapse, keyboard and screen-reader accessible
- Real-time form validation — inline feedback as user types
- Animated SVG oscilloscope trace in the hero section
- SEO & social sharing ready — OpenGraph + Twitter Card previews, custom favicon

---

## Performance Optimizations

- Critical CSS inlined for instant rendering
- Full CSS loaded asynchronously (non-blocking)
- Google Fonts loaded asynchronously
- JavaScript deferred until after HTML parsing
- Netlify caching headers for repeat visit speed
- Image preloading for LCP element
- CLS fixed with reserved space for dynamic content

---

## Running Locally

Just open `index.html` in a browser — no install or build step needed.

---

## Project Structure
waveform-modular/
├── index.html # Main HTML with critical CSS inlined
├── styles.css # Compiled Tailwind CSS
├── input.css # Tailwind source file
├── script.js # JavaScript (deferred)
├── favicon.svg # Browser tab icon
├── og-image.png # Social sharing preview image
├── netlify.toml # Netlify caching configuration
├── README.md # Project documentation
├── screenshot-desktop.png
└── screenshot-mobile.png

text

---

## Screenshots

### Desktop View

![Desktop Screenshot](screenshot-desktop.png)

### Mobile View

![Mobile Screenshot](screenshot-mobile.png)

---

## Deployment

This project is deployed on **Netlify** with continuous deployment from GitHub. Every push to the `main` branch triggers an automatic rebuild and deployment.

---

## Author

**Fatima Asif** — [GitHub](https://github.com/FatimaAsif1211)

---
