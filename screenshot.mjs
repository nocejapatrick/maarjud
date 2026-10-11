import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [, , urlArg, labelArg] = process.argv;
const targetUrl = urlArg || 'http://localhost:3000';
const label = labelArg ? `-${labelArg.replace(/[^a-z0-9-_]+/gi, '-').toLowerCase()}` : '';
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

fs.mkdirSync(screenshotsDir, { recursive: true });

const existing = fs
  .readdirSync(screenshotsDir)
  .filter((file) => /^screenshot-\d+.*\.png$/.test(file))
  .map((file) => Number(file.match(/screenshot-(\d+)/)?.[1] || 0));

const nextIndex = existing.length ? Math.max(...existing) + 1 : 1;
const outputPath = path.join(screenshotsDir, `screenshot-${nextIndex}${label}.png`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1440, height: 1800 }
});

try {
  const page = await browser.newPage();
  await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 120000 });
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Screenshot saved to ${outputPath}`);
} finally {
  await browser.close();
}
