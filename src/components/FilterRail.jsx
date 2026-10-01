import { filters } from '../data/projects.js';
import { activeFilter } from '../state/gallery.js';

const labels = {
  all: 'All records',
  perception: 'Perception',
  language: 'Language',
  tools: 'Tools',
  ecology: 'Ecology',
};

export default function FilterRail() {
  return (
    <div class="filter-rail" role="group" aria-label="Research filters">
      {filters.map((filter) => (
        <button
          class={() => activeFilter() === filter ? 'filter active' : 'filter'}
          aria-pressed={() => activeFilter() === filter ? 'true' : 'false'}
          onClick={() => activeFilter(filter)}
        >
          {labels[filter]}
        </button>
      ))}
    </div>
  );
}
