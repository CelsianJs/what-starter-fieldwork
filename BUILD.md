# How Fieldwork is built

Fieldwork is a client-rendered research archive built with What Framework 0.13.10. This guide records the implementation, failed approaches and checks that shaped the starter. The live `/build` page and the public starter journal provide the same learning path.

## Read the source in this order

- [src/state/gallery.js](src/state/gallery.js) — Module signals hold filters, canvas seed, drawing mode and the selected research slug.
- [src/components/GenerativeCanvas.jsx](src/components/GenerativeCanvas.jsx) — The component draws from signal accessors and cleans up resize/keyboard listeners.
- [scripts/generate-static-aliases.mjs](scripts/generate-static-aliases.mjs) — Deployment aliases derive from the projects dataset so every detail route is directly openable.
- [tests/smoke.mjs](tests/smoke.mjs) — The smoke test compares canvas pixels, opens every detail route and screenshots desktop/mobile pages.

## State and rendering

Module-level `signal()` values are shared between routes. `computed()` derives filtered records; views read reactive values through function bindings. Components initialize once rather than rerendering like React components. A mutable signal is the source of truth; do not copy a computed total into another signal and create a synchronization loop.

```js
import { signal, computed } from 'what-framework';

export const activeFilter = signal('all');
export const filteredProjects = computed(() => {
  const filter = activeFilter();
  return filter === 'all'
    ? projects
    : projects.filter(project => project.discipline === filter);
});
```

This excerpt uses the `projects` dataset imported in `src/state/gallery.js`. Module state uses `signal`, not component-only `useSignal`.

## Use signal accessors as effect dependencies

Source: [src/components/GenerativeCanvas.jsx](src/components/GenerativeCanvas.jsx).

```jsx
useEffect(() => {
  draw();
  const onResize = () => draw();
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, [canvasSeed, drawingMode]);
```

Passing the accessor lets the effect observe future signal writes. Passing canvasSeed() would sample one value and miss redraws.

## Generate route aliases from the content source

Source: [scripts/generate-static-aliases.mjs](scripts/generate-static-aliases.mjs).

```js
const aliases = [
  '/projects',
  ...projects.map((project) => `/projects/${project.slug}`),
  '/build',
  '/404',
];
```

The deploy shape follows the data list, so new records get static entry points when the dataset changes.

## Assert the canvas really redraws

Source: [tests/smoke.mjs](tests/smoke.mjs).

```js
const beforeCanvas = await page.locator('canvas').evaluate((canvas) => canvas.toDataURL());
await page.getByRole('button', { name: 'New seed' }).click();
await page.waitForFunction((before) => {
  const canvas = document.querySelector('canvas');
  return canvas && canvas.toDataURL() !== before;
}, beforeCanvas);
```

A visual starter needs evidence that the visual state changed, not only that the event handler ran.

## The canvas did not redraw

The first implementation sampled dependency values instead of passing accessors. Clicking the seed control succeeded, but the drawing stayed unchanged.

Before:

```js
useEffect(() => {
  draw();
}, [canvasSeed(), drawingMode()]);
```

After:

```js
useEffect(() => {
  draw();
}, [canvasSeed, drawingMode]);
```

The full component also binds keyboard and resize listeners and removes them during cleanup. The smoke test compares canvas pixels after a seed change; a successful click alone would not prove redraw.

## A detail page had no deployment entry

The archive included a record that the alias script omitted. Generating routes from the shared dataset fixed the mismatch. The browser suite opens every record directly, not only through client navigation.

## A passing smoke still hung in CI

The browser assertions passed, but the workflow never finished: the test had started `npx vite preview` and terminated the wrapper instead of the real preview process.

Before:

```js
const server = spawn('npx', ['vite', 'preview']);
// ...assertions...
server.kill('SIGTERM');
```

Now [scripts/smoke-harness.mjs](scripts/smoke-harness.mjs) starts the local Vite CLI through `process.execPath`, requires owned-child readiness, uses a strict port and awaits termination with a bounded fallback. Each standalone repository includes its own helper. Isolated copies passed without sibling files and exited after their PASS line; the next hosted CI run verifies the Linux path too.

## Visual iteration

The first dark layout passed functional checks but did not meet the showcase bar. A light archive frame, dominant canvas specimen and smaller headline made the artifact easier to use. A separate review checked real desktop and 390px screenshots. Functional tests and visual review support different claims; neither substitutes for the other.

## Opus refinement: archive hierarchy and specimen scale

The follow-up design review found two real layout mistakes. The record cards used `justify-content: space-between`, so titles landed at different vertical positions when summaries and tag counts varied. The fix keeps the card content top-aligned and pushes only the tag/link footer down with `margin-top: auto`; the smoke test now compares the three card-title baselines.

The detail view also gave the metadata table the wide column while the record title was squeezed into a narrow column. The header now lets the record title and summary span the page, then presents the specimen metadata as a compact row. The canvas metadata includes the selected record title, which protects the route-level state pattern from displaying a stale or generic label.

The canvas was deterministic but too timid on wide detail pages. `generateField()` now expands the radius envelope and applies a slight horizontal bias when the specimen is wide. A unit test checks that a 1220×660 specimen fills a useful area without changing the seeded redraw lifecycle, keyboard shortcuts or cleanup behavior.

## What worked smoothly

- Deriving detail aliases from the dataset removed the chance of forgetting a single research record.
- The canvas smoke test checks pixel changes, not just button text, so it catches a silent rendering no-op.
- The card-alignment smoke catches flex layouts that accidentally turn variable content into uneven archive cards.

## Research dossiers without invented evidence

`src/data/dossiers.js` provides an accession, question, method, three locally authored specimens, reading notes and limits for each known route. `ProjectDetailPage` reads the record once from route params, then renders its dossier before the shared canvas. The caption drawer is authored text, not a generated corpus; the slow-interface notes are design reflections, not measured behavioral results.

```jsx
const dossier = dossiers[project.slug];
const next = projects[(projects.indexOf(project) + 1) % projects.length];
```

This is static route content, so it does not need another signal or synchronization effect. Adjacent navigation comes from the same dataset that supplies static aliases. The dossier test requires every project to have its own question and complete content; the browser smoke opens every dossier and follows its next-record link.

Problem: the original metadata named fragments and measurements the UI did not actually contain. Fix: replace those counts with honest authored specimens and explicit limitations. The shared canvas remains useful for comparison but is not presented as evidence for every study. Mobile now opens with a compact accession header before the specimen, preserving the paper/ink/citron archive rather than turning it into a dashboard.

What stayed smooth: the existing generator, signal-accessor dependencies, resize/keyboard cleanup and route-alias generator needed no redesign. The same canvas pixel test still locks real redraw behavior.

## Verification commands

Use Node.js 22.x:

```sh
npm ci
npx playwright install chromium
npm test
npm run smoke
```

`smoke` builds fresh before testing. The recorded local gates passed: unit tests, production build, real canvas pixel changes, card baseline alignment, every record route, desktop/mobile rendering and zero dependency audit findings. The 390px overflow check covered the home, index, record and build pages. Hosted CI status is separate from these local results.

## Deployment and boundaries

`npm run build` emits explicit HTML shells, hashed client assets and root `404.html`. Vura's static hosting returns HTTP 404 for unknown paths. Local Vite preview uses SPA fallback, so do not infer production HTTP status from preview alone.

- Canvas art is deterministic browser drawing, not live AI inference.
- The archive is client rendered; research detail content is not request-time SSR article HTML.

## Presentation contract

The stylesheet uses local Avenir/Segoe sans fallbacks, 16px body copy, 14px labels and controls, bounded build/detail headings, and 44px controls. Code and structured readouts keep their monospace role. Theme identity comes from the real art, instrument, gear or status data rather than decorative page texture. Browser checks assert this contract alongside the existing behavior tests. Keep source/public CSS synchronized where server-rendered packaging requires it.
