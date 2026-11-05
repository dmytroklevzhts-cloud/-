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
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let fp = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(fp)] || 'text/plain' });
    res.end(data);
  });
});

await new Promise(r => server.listen(3459, r));
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3459', { waitUntil: 'networkidle' });

// 1. Algo on 390
const sec4Handle = await page.$('#section-4');
await sec4Handle.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_390_algo.png' });
console.log('Saved revised_390_algo.png');

// 2. DB on 390
await page.click('[data-lab="db"]');
await new Promise(r => setTimeout(r, 400));
await sec4Handle.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_390_db.png' });
console.log('Saved revised_390_db.png');

// 3. AI K-Means on 390
await page.click('[data-lab="ai"]');
await new Promise(r => setTimeout(r, 400));
await sec4Handle.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_390_ai_kmeans.png' });
console.log('Saved revised_390_ai_kmeans.png');

// 4. AI Regression on 390
await page.click('[data-aimode="regression"]');
await new Promise(r => setTimeout(r, 400));
await sec4Handle.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_390_ai_regression.png' });
console.log('Saved revised_390_ai_regression.png');

// 5. Open modal on 390
await page.click('.btn-lab-modal-prominent');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_390_modal.png' });
console.log('Saved revised_390_modal.png');
await page.click('#tech-lab-modal-close');
await new Promise(r => setTimeout(r, 300));

// 6. Laptop 1058x873
await page.setViewportSize({ width: 1058, height: 873 });
await page.goto('http://localhost:3459', { waitUntil: 'networkidle' });
const sec4_1058 = await page.$('#section-4');
await sec4_1058.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_1058_algo.png' });

await page.click('[data-lab="db"]');
await new Promise(r => setTimeout(r, 400));
await sec4_1058.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_1058_db.png' });

await page.click('[data-lab="ai"]');
await new Promise(r => setTimeout(r, 400));
await sec4_1058.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/revised_1058_ai.png' });
console.log('Saved 1058 screenshots');

await browser.close();
server.close();

