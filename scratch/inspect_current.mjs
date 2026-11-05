import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
    res.end(data);
  });
});

await new Promise(r => server.listen(3456, r));
console.log('Server listening on http://localhost:3456');

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();

// 1. Check 1058x873
await page.setViewportSize({ width: 1058, height: 873 });
await page.goto('http://localhost:3456', { waitUntil: 'networkidle' });

await page.evaluate(() => {
  const el = document.getElementById('section-4');
  if (el) el.scrollIntoView();
});
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/shot_1058_algo.png' });

await page.click('[data-lab="db"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/shot_1058_db.png' });

await page.click('[data-lab="ai"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/shot_1058_ai.png' });

// 2. Check mobile 390x844
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3456', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  const el = document.getElementById('section-4');
  if (el) el.scrollIntoView();
});
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/shot_390_algo.png' });

await page.click('[data-lab="db"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/shot_390_db.png' });

await page.click('[data-lab="ai"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/shot_390_ai.png' });

await browser.close();
server.close();
console.log('Finished capturing screenshots!');
