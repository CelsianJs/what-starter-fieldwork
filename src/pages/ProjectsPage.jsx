import FilterRail from '../components/FilterRail.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { filteredProjects } from '../state/gallery.js';

export default function ProjectsPage() {
  return (
    <section class="projects-page">
      <div class="page-heading">
        <p class="kicker">Research index</p>
        <h1>A filterable archive of field notes, studies, and tool sketches.</h1>
        <p>Each record is local, linkable, and written as a public research artifact with its own specimen notes.</p>
      </div>
      <div class="index-layout">
        <aside class="index-aside" aria-label="Index controls">
          <p class="kicker">Drawers</p>
          <FilterRail />
          <p class="index-note">{() => filteredProjects().length} visible records across the current drawer.</p>
        </aside>
        <div class="project-grid wide">
          {() => filteredProjects().map((project) => <ProjectCard project={project} />)}
        </div>
      </div>
    </section>
  );
}
