export default function BuildPage() {
  return (
    <section class="build-page">
      <p class="kicker">Agent reference</p>
      <h1>How Fieldwork is built</h1>
      <div class="build-grid">
        <article>
          <h2>Signals and computed state</h2>
          <p><code>src/state/gallery.js</code> owns the global filter, active seed, drawing mode, and selected project. <code>filteredProjects</code> and <code>activeProject</code> are computed values that only update dependent DOM.</p>
          <pre><code>{`export const activeFilter = signal('all');
export const filteredProjects = computed(() => {
  const filter = activeFilter();
  return filter === 'all'
    ? projects
    : projects.filter((project) => project.discipline === filter);
});`}</code></pre>
        </article>
        <article>
          <h2>Routing</h2>
          <p><code>src/routes.jsx</code> declares <code>/</code>, <code>/projects</code>, <code>/projects/:slug</code>, <code>/build</code>, and <code>/404</code>. Vura aliases copy the built shell to the main deep routes.</p>
        </article>
        <article>
          <h2>Effects and cleanup</h2>
          <p><code>GenerativeCanvas</code> attaches resize and keyboard listeners in <code>useEffect</code> and removes them in the returned cleanup function.</p>
          <pre><code>{`useEffect(() => {
  draw();
  window.addEventListener('resize', draw);
  window.addEventListener('keydown', onKey);
  return () => {
    window.removeEventListener('resize', draw);
    window.removeEventListener('keydown', onKey);
  };
}, [canvasSeed, drawingMode]);`}</code></pre>
        </article>
        <article>
          <h2>Known limits</h2>
          <p>The artwork is deterministic browser code, not live AI. These are client-rendered shells, not server-rendered research articles. Vura serves the emitted routes and a real HTTP 404 for unknown paths; local Vite preview uses SPA fallback.</p>
        </article>
        <article>
          <h2>Issues and lessons</h2>
          <p>Passing sampled values to an effect left the drawing unchanged when the seed changed. Pass signal accessors: <code>useEffect(draw, [canvasSeed, drawingMode])</code>. The browser test checks actual canvas pixels, not just whether a click succeeds.</p>
          <p>A research record initially lacked a direct deployment route. Aliases now come from the project dataset, and the smoke test opens every record directly. Listener cleanup prevents stale keyboard handlers after navigation.</p>
          <p>The Opus design pass found that card footers were stretching title baselines and the detail record gave metadata more weight than the title. The card stack now pins tags and links to the foot, the detail title spans the record, and the canvas metadata names the selected record so agents can copy a truthful archive pattern.</p>
          <p>The first detail specimen also left too much empty black field. The generator now expands its point envelope on wide canvases, and a unit test checks the rendered field covers a useful portion of a 1220×660 specimen.</p>
          <p><a href="https://github.com/CelsianJs/what-starter-fieldwork/blob/main/src/components/GenerativeCanvas.jsx">Read the canvas source</a> or <a href="https://github.com/CelsianJs/what-starter-fieldwork/blob/main/BUILD.md">the complete build guide</a>.</p>
        </article>
      </div>
    </section>
  );
}
