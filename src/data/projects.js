export const filters = ['all', 'perception', 'language', 'tools', 'ecology'];

export const projects = [
  {
    slug: 'radio-garden',
    title: 'Radio Garden For Latent Machines',
    discipline: 'perception',
    year: '2026',
    phase: 'active',
    summary: 'A gallery instrument for comparing deterministic field recordings against synthetic pattern maps.',
    detail: 'The project studies how people read machine-made artifacts when the system names its seed and process. Nothing here calls a live model. The canvas uses a deterministic algorithm so the same seed always draws the same constellation.',
    tags: ['seeded canvas', 'artifact reading', 'perception'],
    accent: '#dfff39',
    sample: 'Seed 3029, 84 particles, 11 attractor bands',
  },
  {
    slug: 'atlas-of-latents',
    title: 'Atlas of Latent Weather',
    discipline: 'language',
    year: '2025',
    phase: 'archive',
    summary: 'An editorial atlas of prompts, taxonomies, and ambiguous captions presented as research specimens.',
    detail: 'This study follows generated captions after they become research material: sorted, named, contradicted, and placed beside one another until language starts to look meteorological.',
    tags: ['taxonomy', 'language lab', 'archive'],
    accent: '#ff6b2b',
    sample: 'Specimen drawer B, 27 labeled fragments',
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
    sample: 'Notebook 14, 9 tool sketches, 3 critique passes',
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
    sample: 'Field card 08, 5 measured rests',
  },
];

export function findProject(slug) {
  return projects.find((project) => project.slug === slug) || null;
}
