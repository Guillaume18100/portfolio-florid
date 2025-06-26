# Copilot Edits Operational Guidelines

### For a **React portfolio website** showcasing the work of an art student

> **Scope**: A small‑to‑medium single‑page React application (SPA) that displays galleries, project details, and contact information. No server‑side rendering or complex backend. Target modern evergreen browsers.

---

## PRIME DIRECTIVE

* Keep the editing focus on **one file at a time** to avoid merge conflicts or accidental corruption.
* Provide concise, educational commit messages and explain your steps while coding to help the student learn.

## SIMPLICITY FIRST

Because this project is intentionally lightweight:

* Prefer **functional components** with React hooks; avoid unnecessary abstractions.
* Use **TypeScript** only if the student is already comfortable with it.
* Third‑party dependencies should be kept minimal (e.g. `react-router-dom`, `tailwindcss`, `framer-motion`).

---

## PLANNING & EDIT PROTOCOL

### When a file exceeds 200 lines *or* the requested change touches multiple files:

#### Mandatory planning template

```text
## PROPOSED EDIT PLAN  
Working with: [filename]  
Total planned edits: [number]
```

* List every function/section to be modified.
* Specify the edit order and any dependencies.
* Estimate the number of commits / separate edits.

#### Edit sequence

1. `[Describe first change]` – *Purpose: why it’s needed*
2. `[Describe second change]` – *Purpose: why it’s needed*
3. **Ask for approval**: “Do you approve this plan? I’ll start with Edit 1 after confirmation.”
4. Wait for explicit user confirmation.

#### During execution

* After *each* change:

  > ✅ Completed edit `[x] of [y]`. Ready for the next one?
* If a new requirement appears, **pause**, update the plan, and seek approval.

---

## ACCESSIBILITY (WCAG 2.1 AA minimum)

* All images must include meaningful `alt` text or `aria-label`.
* Ensure color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI components; test with tools such as Lighthouse or WebAIM Contrast Checker.
* Use semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
* Keyboard navigation: every interactive element reachable with <kbd>Tab</kbd>.
* Announce dynamic content with ARIA roles (`role="status"`, `aria-live="polite"`).

---

## BROWSER & DEVICE SUPPORT

* Latest **two** stable versions of Chrome, Firefox, Safari (macOS/iOS), and Edge.
* Use **feature detection** (e.g. `if ('IntersectionObserver' in window)`) before polyfilling.
* Test performance and responsiveness on mobile (≤ 420 px) and desktop (≥ 1280 px).

---

## TOOLING & BUILD

* **Vite** + React 18 (or newer); enables instant reload and code splitting.
* **Tailwind CSS** for utility‑first styling; configure dark‑mode via `class` strategy.
* **ESLint** + **Prettier** + **Husky** pre‑commit hooks for consistent style.
* Optional: **GitHub Pages** or **Netlify** for one‑command deployment (`npm run deploy`).

---

## HTML & CSS REQUIREMENTS

* Use responsive `<img>` with `srcset`, `sizes`, and `loading="lazy"`.
* Optimise imagery (`.webp`/`.avif` first, fallback to JPEG/PNG).
* Layouts: **CSS Grid** for galleries, **Flexbox** for nav and footer.
* Support dark/light with `@media (prefers-color-scheme)` and Tailwind.
* Animate subtly with `framer-motion` (e.g. fade‑in gallery items).

---

## JAVASCRIPT / REACT REQUIREMENTS

* **ES2022** syntax (top‑level `await`, class fields, etc.).
* Functional components + hooks (`useState`, `useEffect`, `useRef`).
* Lazy‑load heavy components with `React.lazy` + `Suspense`.
* Use `react-router-dom` (v6+) for client routing; keep routes in `src/routes.jsx`.
* Handle errors with an `ErrorBoundary` component.

---

## STATE & DATA

* Store static project data in `/src/data/projects.json` or fetch from a simple headless CMS (e.g. Notion public API) if desired.
* Use `localStorage` only for ephemeral preferences (e.g. theme). No backend or SQL required.

---

## PERFORMANCE & SEO

* Preload hero images and fonts.
* Add Open Graph + Twitter meta tags for social previews.
* Use Lighthouse to target performance score ≥ 90 on mobile.
* Minify and treeshake during `vite build`.

---

## SECURITY BASICS

* Sanitize any user‑supplied form input (contact form).
* Use `Content-Security-Policy` headers in production; restrict `img-src`, `script-src`, etc.
* Serve over HTTPS only.

---

## DOCUMENTATION

* Add JSDoc comments to non‑trivial functions and custom hooks.
* Maintain a concise `README.md` with:

  1. Project overview & screenshots
  2. Quick start (`npm install && npm run dev`)
  3. Deployment steps
  4. Known issues / TODO

---

*Have fun and keep the code approachable for a creative audience!*
