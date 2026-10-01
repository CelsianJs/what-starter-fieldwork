import { Link } from 'what-framework/router';
import GenerativeCanvas from '../components/GenerativeCanvas.jsx';
import { findProject } from '../data/projects.js';
import { selectedSlug } from '../state/gallery.js';

export default function ProjectDetailPage({ params }) {
  const project = findProject(params.slug);
  if (!project) {
    return (
      <section class="not-found">
        <p class="kicker">Missing record</p>
        <h1>This research record is not in the local dataset.</h1>
        <p>The route is valid client-side plumbing, but the slug does not match <code>src/data/projects.js</code>.</p>
        <Link class="button" href="/projects">Back to index</Link>
      </section>
    );
  }
  selectedSlug(project.slug);

  return (
    <article class="detail-page" style={{ '--project-accent': project.accent }}>
      <header class="record-header">
        <div class="detail-heading">
          <p class="kicker">{project.discipline} / {project.phase}</p>
          <h1>{project.title}</h1>
          <p>{project.detail}</p>
        </div>
        <dl class="specimen-list">
          <div>
            <dt>Sample</dt>
            <dd>{project.sample}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd>{project.tags.join(', ')}</dd>
          </div>
        </dl>
      </header>
      <GenerativeCanvas />
    </article>
  );
}
