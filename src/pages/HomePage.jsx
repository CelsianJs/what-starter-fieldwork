import { Link } from 'what-framework/router';
import GenerativeCanvas from '../components/GenerativeCanvas.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function HomePage() {
  return (
    <div>
      <section class="hero">
        <div class="hero-copy">
          <p class="kicker">Public research journal</p>
          <h1>Signals from the edge of perception.</h1>
          <p class="lede">Fieldwork is a lab journal for computational art, machine perception, and the human taste that surrounds them. The first specimen is a seeded browser instrument, repeatable enough to cite and strange enough to keep looking at.</p>
          <dl class="hero-register" aria-label="Archive summary">
            <div>
              <dt>Records</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Collection</dt>
              <dd>Perception studies</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>Seeded browser art</dd>
            </div>
          </dl>
          <div class="button-row">
            <Link class="button" href="/projects">Browse records</Link>
            <Link class="button ghost" href="/build">How it is built</Link>
          </div>
        </div>
        <GenerativeCanvas />
      </section>

      <section class="section-split">
        <div>
          <p class="kicker">Three records</p>
          <h2>Designed like a gallery, structured like a lab archive.</h2>
          <p class="section-note">The archive moves between machine perception, language weather, cooperative tools, and slow interfaces without pretending the browser is a black box.</p>
        </div>
        <div class="project-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard project={project} />)}
        </div>
      </section>
    </div>
  );
}
