import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { projects } from '../src/data/projects.js';

const aliases = [
  '/projects',
  ...projects.map((project) => `/projects/${project.slug}`),
  '/build',
  '/404',
];

async function copyIndex(route) {
  const target = join('dist', route.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await copyFile('dist/index.html', target);
}

for (const route of aliases) {
  await copyIndex(route);
}

await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n', 'utf8');
await writeFile('dist/404.html', '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Fieldwork</title><body><main><h1>This record is not in the archive.</h1><p><a href="/projects">Browse the research index</a></p></main></body></html>', 'utf8');
