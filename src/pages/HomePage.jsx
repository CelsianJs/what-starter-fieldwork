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
        </div>
        <div class="project-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard project={project} />)}
        </div>
      </section>
    </div>
  );
}
