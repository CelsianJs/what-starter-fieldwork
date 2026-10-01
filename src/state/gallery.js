import { computed, signal } from 'what-framework';
import { projects } from '../data/projects.js';

export const activeFilter = signal('all');
export const canvasSeed = signal(3029);
export const drawingMode = signal('bands');
export const selectedSlug = signal('radio-garden');

export const filteredProjects = computed(() => {
  const filter = activeFilter();
  if (filter === 'all') return projects;
  return projects.filter((project) => project.discipline === filter);
});

export const activeProject = computed(() => {
  return projects.find((project) => project.slug === selectedSlug()) || projects[0];
});

export function nextSeed() {
  canvasSeed((seed) => seed + 137);
}

export function resetSeed() {
  canvasSeed(3029);
}

export function cycleMode() {
  drawingMode((mode) => (mode === 'bands' ? 'orbit' : mode === 'orbit' ? 'mesh' : 'bands'));
}
