import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { projects } from '../src/data/projects.js';

const port = 5178;
const baseURL = `http://127.0.0.1:${port}`;
const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

const logs = [];
server.stdout.on('data', (chunk) => logs.push(chunk.toString()));
server.stderr.on('data', (chunk) => logs.push(chunk.toString()));

async function waitForServer() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseURL);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Vite preview did not start: ${logs.join('\n')}`);
}

try {
  await waitForServer();
  await mkdir('test-artifacts', { recursive: true });
  var browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /signals from the edge/i }).waitFor();
  const beforeCanvas = await page.locator('canvas').evaluate((canvas) => canvas.toDataURL());
  await page.getByRole('button', { name: 'New seed' }).click();
  await page.waitForFunction((before) => {
    const canvas = document.querySelector('canvas');
    return canvas && canvas.toDataURL() !== before;
  }, beforeCanvas);
  await page.keyboard.press('M');
  await page.screenshot({ path: 'test-artifacts/fieldwork-desktop.png', fullPage: true });

  await page.goto(`${baseURL}/projects`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Language' }).click();
  await page.getByRole('heading', { name: /Atlas of Latent Weather/i }).waitFor();

  await page.goto(`${baseURL}/projects/radio-garden`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /Radio Garden For Latent Machines/i }).waitFor();
  for (const project of projects) {
    await page.goto(`${baseURL}/projects/${project.slug}`, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: project.title }).waitFor();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/build`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /How Fieldwork is built/i }).waitFor();
  await page.screenshot({ path: 'test-artifacts/fieldwork-mobile-build.png', fullPage: true });

  if (consoleErrors.length) {
    throw new Error(`Console errors:\n${consoleErrors.join('\n')}`);
  }
  await browser.close();
  browser = null;
  console.log('PASS fieldwork smoke: home keyboard, filtered index, detail route, build route, desktop/mobile screenshots');
} finally {
  if (browser) await browser.close().catch(() => {});
  server.kill('SIGTERM');
}
