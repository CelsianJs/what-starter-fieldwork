import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { projects } from '../src/data/projects.js';
import { collectChildLogs, spawnLocalVitePreview, starterRoot, stopOwnedProcess, waitForOwnedReadiness } from '../scripts/smoke-harness.mjs';

const port = 5178;
const baseURL = `http://127.0.0.1:${port}`;
const root = starterRoot(import.meta.url);
const server = spawnLocalVitePreview({ cwd: root, port });
const logs = collectChildLogs(server);

async function waitForServer() {
  await waitForOwnedReadiness(server, {
    logs,
    readyPattern: new RegExp(`Local:\\s+http://127\\.0\\.0\\.1:${port}/`),
    label: 'Fieldwork Vite preview',
  });
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
  await page.getByText('Selected records').waitFor();
  const cardTitleTops = await page.locator('.project-grid .project-card h3').evaluateAll((items) => (
    items.map((item) => Math.round(item.getBoundingClientRect().top))
  ));
  if (Math.max(...cardTitleTops) - Math.min(...cardTitleTops) > 4) {
    throw new Error(`Project card titles are not aligned: ${cardTitleTops.join(', ')}`);
  }
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
  await page.getByText('Record').waitFor();
  await page.getByText('Radio Garden For Latent Machines').first().waitFor();
  const detailLayout = await page.evaluate(() => {
    const heading = document.querySelector('.detail-heading h1').getBoundingClientRect();
    const specimen = document.querySelector('.specimen-list').getBoundingClientRect();
    return { headingWidth: Math.round(heading.width), specimenWidth: Math.round(specimen.width) };
  });
  if (detailLayout.headingWidth < detailLayout.specimenWidth * 0.8) {
    throw new Error(`Record heading hierarchy is too narrow: ${JSON.stringify(detailLayout)}`);
  }
  await page.screenshot({ path: 'test-artifacts/fieldwork-desktop-detail.png', fullPage: true });
  for (const project of projects) {
    await page.goto(`${baseURL}/projects/${project.slug}`, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: project.title }).waitFor();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/projects/radio-garden`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /Radio Garden For Latent Machines/i }).waitFor();
  await page.screenshot({ path: 'test-artifacts/fieldwork-mobile-detail.png', fullPage: true });
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
  await stopOwnedProcess(server, { logs, label: 'Fieldwork Vite preview' });
}
