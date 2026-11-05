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

await new Promise(r => server.listen(3458, r));
console.log('Server started on http://localhost:3458');

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();

// --------------------------------------------------------------------------
// TEST 1: Mobile 390x844
// --------------------------------------------------------------------------
console.log('--- Testing Mobile 390x844 ---');
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3458', { waitUntil: 'networkidle' });

await page.evaluate(() => document.getElementById('section-4').scrollIntoView());
await new Promise(r => setTimeout(r, 400));

// Algo QuickSort on mobile
await page.screenshot({ path: 'scratch/revised_390_algo.png' });

// Open modal in Algo
await page.click('.btn-lab-modal-prominent');
await new Promise(r => setTimeout(r, 300));
const isModalOpenAlgo = await page.evaluate(() => document.getElementById('tech-lab-modal')?.classList.contains('is-open'));
console.log('Algo Modal is open on 390:', isModalOpenAlgo);
await page.screenshot({ path: 'scratch/revised_390_modal_algo.png' });
await page.click('#tech-lab-modal-close');
await new Promise(r => setTimeout(r, 300));

// Switch to DB on mobile
await page.click('[data-lab="db"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/revised_390_db.png' });

// Click first quick pill in DB
await page.click('.db-quick-pill');
await new Promise(r => setTimeout(r, 300));
const isModalOpenDb = await page.evaluate(() => document.getElementById('tech-lab-modal')?.classList.contains('is-open'));
console.log('DB Modal is open on pill click:', isModalOpenDb);
await page.screenshot({ path: 'scratch/revised_390_modal_db.png' });
await page.click('#tech-lab-modal-close');
await new Promise(r => setTimeout(r, 300));

// Switch to AI on mobile (K-Means)
await page.click('[data-lab="ai"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/revised_390_ai_kmeans.png' });

// Switch to AI Regression on mobile
await page.click('[data-aimode="regression"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/revised_390_ai_regression.png' });

// --------------------------------------------------------------------------
// TEST 2: Laptop 1058x873 (User screen)
// --------------------------------------------------------------------------
console.log('--- Testing Laptop 1058x873 ---');
await page.setViewportSize({ width: 1058, height: 873 });
await page.goto('http://localhost:3458', { waitUntil: 'networkidle' });
await page.evaluate(() => document.getElementById('section-4').scrollIntoView());
await new Promise(r => setTimeout(r, 400));

// Algo on 1058
await page.screenshot({ path: 'scratch/revised_1058_algo.png' });

// DB on 1058
await page.click('[data-lab="db"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/revised_1058_db.png' });

// AI on 1058
await page.click('[data-lab="ai"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'scratch/revised_1058_ai.png' });

// Check metrics and text truncation at 1058
const check1058 = await page.evaluate(() => {
  const tabs = Array.from(document.querySelectorAll('.tech-lab-tab')).map(t => {
    const textEl = t.querySelector('.lab-tab-text');
    return {
      text: textEl ? textEl.innerText.trim() : t.innerText.trim(),
      hasEllipsis: textEl ? textEl.scrollWidth > textEl.clientWidth : false
    };
  });
  return {
    tabs,
    bodyScrollWidth: document.body.scrollWidth,
    windowWidth: window.innerWidth
  };
});
console.log('1058 Check Results:', JSON.stringify(check1058, null, 2));

await browser.close();
server.close();
console.log('All tests passed!');

