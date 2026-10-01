# Build notes

Fieldwork is a small but complete What Framework starter. The rendered `/build` page is generated from the same ideas in this file, but this file is easier for agents to scan in source form.

## State and routing

`src/state/gallery.js` owns the reusable reactive state. `activeFilter`, `canvasSeed`, `drawingMode`, and `selectedSlug` are module-level signals. `filteredProjects` and `activeProject` are computed values so the filter rail and project grid update without re-running the whole app.

`src/routes.jsx` declares the public pages: `/`, `/projects`, `/projects/:slug`, `/build`, and `/404`. The project detail page validates the slug against `src/data/projects.js` and renders an honest missing-record state when the slug is unknown.

## Effects and cleanup

`src/components/GenerativeCanvas.jsx` uses `useEffect` to bind `resize` and `keydown` listeners. The cleanup function removes both listeners. This is the main lifecycle pattern agents should copy when they add browser APIs.

## Vura shape

`npm run build` runs Vite, then `scripts/generate-static-aliases.mjs` copies `dist/index.html` into known deep route folders. That makes `/projects/radio-garden` and `/build` work as static entry points after upload.

## Issues encountered

- Passing sampled signal values to an effect did not redraw the canvas. Dependencies now use the signal accessors, and browser coverage compares actual canvas pixels after a seed change.
- A detail record lacked a direct deployment alias. Aliases now derive from the shared project dataset, and browser coverage opens each record directly.
- Shared module state must use `signal()` and `computed()`. Hook-style `useSignal()` is component-only and will throw at runtime when used in `src/state/gallery.js`.
- The design needed to be explicit that the canvas is seeded browser code, not live AI.
- Known static aliases are deliberate. They avoid treating every unknown path as a successful page.
- The starter uses CSR for simplicity. A future Vura demo can add server-rendered variants.
