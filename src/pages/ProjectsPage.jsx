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
      <FilterRail />
      <div class="project-grid wide">
        {() => filteredProjects().map((project) => <ProjectCard project={project} />)}
      </div>
    </section>
  );
}
