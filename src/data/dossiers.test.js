import { expect, it } from 'vitest';
import { projects } from './projects.js';
import { dossiers } from './dossiers.js';

it('gives every route its own honest method, specimens, observations and limits', () => {
  for (const project of projects) {
    const dossier = dossiers[project.slug];
    expect(dossier.question.length).toBeGreaterThan(30);
    expect(dossier.method.length).toBeGreaterThan(50);
    expect(dossier.specimens).toHaveLength(3);
    expect(dossier.observations.length).toBeGreaterThan(1);
    expect(dossier.limits).toMatch(/illustrative|not|no /i);
  }
  expect(new Set(Object.values(dossiers).map(item => item.question)).size).toBe(projects.length);
});
