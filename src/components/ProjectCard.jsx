import { Link } from 'what-framework/router';

export default function ProjectCard({ project }) {
  return (
    <article class="project-card" style={{ '--project-accent': project.accent }}>
      <div>
        <p class="card-meta">{project.discipline} / {project.year} / {project.phase}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div class="tag-row">
        {project.tags.map((tag) => <span>{tag}</span>)}
      </div>
      <Link class="text-link" href={`/projects/${project.slug}`}>Open record</Link>
    </article>
  );
}
