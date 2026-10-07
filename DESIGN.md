# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-10-07
- Primary product surfaces: Home, research index, research detail, build reference, 404
- Evidence reviewed: public What Framework package patterns, Vura static deployment needs, Fieldwork product brief

## Brand
- Personality: gallery-like, intellectual, strange, precise
- Trust signals: honest seeded algorithm language, visible build notes, clear route and state ownership
- Avoid: fake live AI claims, stock SaaS cards, purple-gradient startup visuals

## Product goals
- Goals: show a memorable What Framework starter for art and research pages; make agents understand signals, routes, and effect cleanup
- Non-goals: paid inference, CMS, remote images, server-only rendering
- Success signals: keyboard canvas works, filters work, detail routes are linkable, docs match code

## Personas and jobs
- Primary personas: framework evaluators, agents building starter apps, creative technologists
- User jobs: inspect a polished starter, copy patterns, deploy to Vura, adapt the design
- Key contexts of use: desktop review, mobile browsing, agent code reading

## Information architecture
- Primary navigation: Journal, index, build notes, featured study
- Core routes/screens: `/`, `/projects`, `/projects/:slug`, `/build`, `/404`
- Content hierarchy: oversized editorial hero, interactive field instrument, project records, reference notes
- Detail hierarchy: accession, concise record summary, question/method, three authored specimen excerpts, reading notes/limits, shared repeatability instrument, adjacent record navigation.
- Mobile first view: compact archive accession before the canvas; the collection and next action remain legible without sacrificing specimen scale.

## Design principles
- Principle 1: Treat the lab as a serious gallery and field archive, not a chatbot demo
- Principle 2: Make the generated canvas the primary material specimen, with text and controls arranged like accession notes
- Tradeoffs: CSR keeps the starter simple while Vura aliases preserve known deep routes

## Visual language
- Color: off-white archive paper, ink black, pale clay rules, acid citron as a narrow signal accent, occasional cyan/orange specimen colors
- Typography: readable literary serif for display; clear humanist sans for body and controls; monospace only for code and canvas annotations
- Spacing/layout rhythm: light research archive framing a large dark canvas specimen, concise captions, horizontal toolbars, measured index cards
- Shape/radius/elevation: hairline rules, accession labels, squared cards, quiet table borders, no generic SaaS shadows
- Motion: one restrained page-load reveal, precise hover/focus states, deterministic canvas redraws, reduced-motion safe CSS
- Imagery/iconography: generated canvas is the art object; no stock AI imagery or remote assets

## Direction log
- Considered: signal control room — dense neon dashboards, scopes, readouts. Rejected for this starter because it would make the field notes feel like generic analytics and fight the art-journal goal.
- Chosen: light research archive / specimen table — the page is mostly paper and ink, while the dark canvas is the dramatic object. Public product pages stay art/research focused; implementation teaching is reserved for `/build`.

## Components
- Existing components to reuse: What Router `Link`, What signals and effects
- New/changed components: `GenerativeCanvas`, `ProjectCard`, `FilterRail`
- Variants and states: active filters, missing detail, keyboard status, mobile stacked layout
- Token/component ownership: CSS variables in `src/styles.css`

## Accessibility
- Target standard: keyboard and screen-reader usable starter
- Keyboard/focus behavior: visible focus, canvas controls mirrored by real buttons and keyboard shortcuts
- Contrast/readability: ivory on black plus high-contrast acid accent
- Screen-reader semantics: labeled routes, aria-live canvas status, real buttons for filters
- Reduced motion and sensory considerations: CSS respects `prefers-reduced-motion`

## Responsive behavior
- Supported breakpoints/devices: desktop, tablet, narrow mobile
- Layout adaptations: hero and canvas collapse to one column, cards stack
- Touch/hover differences: no hover-only control

## Interaction states
- Loading: not needed for static local data
- Empty: filtered list naturally contracts; missing record route has explicit copy
- Error: unknown slugs render a missing-record view
- Success: aria-live canvas status confirms seed and mode changes
- Disabled: not used
- Offline/slow network: no runtime network dependency

## Content voice
- Tone: measured, art-critical, technically honest
- Terminology: seeded canvas, record, field note, static alias
- Microcopy rules: no fake AI, no internal task language
- Evidence rules: illustrative authored notes are labeled as such. Do not invent corpus sizes, measurements or participant studies; the shared canvas is a comparison instrument, not evidence of completed research.

## Implementation constraints
- Framework/styling system: What Framework 0.13.10, what-compiler 0.13.10, plain CSS
- Design-token constraints: local CSS variables only
- Performance constraints: canvas redraw only on seed, mode, or resize
- Compatibility constraints: current evergreen browsers with canvas
- Test/screenshot expectations: unit tests, build, Playwright smoke, desktop and mobile screenshots

## Open questions
- [ ] Final public URL and Vura project id, root agent owns deployment
