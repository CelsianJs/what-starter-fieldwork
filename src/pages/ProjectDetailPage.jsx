import { Link } from 'what-framework/router';
import GenerativeCanvas from '../components/GenerativeCanvas.jsx';
import { findProject, projects } from '../data/projects.js';
import { dossiers } from '../data/dossiers.js';
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
  const dossier = dossiers[project.slug];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article class="detail-page" style={{ '--project-accent': project.accent }}>
      <header class="record-header">
        <div class="detail-heading">
          <p class="kicker">{dossier.accession} / {project.discipline} / {project.phase}</p>
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
      <section class="research-dossier" aria-label="Research dossier">
        <div class="research-question"><p class="kicker">Research question</p><h2>{dossier.question}</h2><p class="dossier-medium">{dossier.medium} / illustrative local study</p></div>
        <div><p class="kicker">Method</p><p>{dossier.method}</p></div>
        <div class="specimen-drawer">{dossier.specimens.map(specimen => <article><p class="kicker">{specimen.label}</p><p>{specimen.text}</p></article>)}</div>
        <div><p class="kicker">Reading notes</p><ul>{dossier.observations.map(note => <li>{note}</li>)}</ul></div>
        <aside class="research-limits"><p class="kicker">Limits of this record</p><p>{dossier.limits}</p></aside>
      </section>
      <GenerativeCanvas />
      <nav class="record-navigation" aria-label="Adjacent research records"><Link href="/projects">← All records</Link><Link href={`/projects/${next.slug}`}>Next: {next.title} →</Link></nav>
    </article>
  );
}
