export const filters = ['all', 'perception', 'language', 'tools', 'ecology'];

export const projects = [
  {
    slug: 'radio-garden',
    title: 'Radio Garden For Latent Machines',
    discipline: 'perception',
    year: '2026',
    phase: 'active',
    summary: 'A repeatable drawing instrument for studying the relationship between a process, a caption and a reading.',
    detail: 'The project studies how people read machine-made artifacts when the system names its seed and process. Nothing here calls a live model. The canvas uses a deterministic algorithm so the same seed always draws the same constellation.',
    tags: ['seeded canvas', 'artifact reading', 'perception'],
    accent: '#dfff39',
    sample: 'Seed 3029 · 84 points in bands mode',
  },
  {
    slug: 'atlas-of-latents',
    title: 'Atlas of Latent Weather',
    discipline: 'language',
    year: '2025',
    phase: 'archive',
    summary: 'An editorial drawer of authored captions and ambiguous readings, arranged as illustrative specimens.',
    detail: 'A drawer of locally authored captions, sorted by the kinds of association they invite. The fragments below are illustrative readings, not generated outputs or a measured corpus.',
    tags: ['taxonomy', 'language lab', 'archive'],
    accent: '#ff6b2b',
    sample: 'Three authored caption fragments',
  },
  {
    slug: 'signal-commons',
    title: 'Signal Commons For Cooperative Tools',
    discipline: 'tools',
    year: '2026',
    phase: 'prototype',
    summary: 'A public log about shared agent tools, notation, and where human taste stays in the loop.',
    detail: 'The study is represented as structured public notes about shared agent tools, notation, and where judgment belongs in the loop.',
    tags: ['agents', 'notation', 'tools'],
    accent: '#8fd7ff',
    sample: 'Three authored interface notes',
  },
  {
    slug: 'moss-index',
    title: 'Moss Index of Slow Interfaces',
    discipline: 'ecology',
    year: '2024',
    phase: 'field note',
    summary: 'A quiet counterpoint to infinite feeds, studying patient interfaces and hand-paced interactions.',
    detail: 'This field note tracks interfaces that ask for a slower hand: fewer pulses, longer rests, and enough quiet for a reader to notice what changed.',
    tags: ['slow media', 'ecology', 'interfaces'],
    accent: '#b7f0c2',
    sample: 'Three authored slow-interface notes',
  },
];

export function findProject(slug) {
  return projects.find((project) => project.slug === slug) || null;
}
