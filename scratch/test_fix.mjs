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

await new Promise(r => server.listen(3467, r));
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 873 });
await page.goto('http://localhost:3467', { waitUntil: 'networkidle' });

// Inject styles:
await page.addStyleTag({
  content: `
    .team-split-layout {
      height: 610px !important;
    }
    .spotlight-stage {
      height: 100% !important;
    }
    .team-cards-grid {
      height: 100% !important;
    }
    .section3-showcase-container {
      height: 565px !important;
    }
    .web-showcase-stage {
      height: 100% !important;
    }
  `
});

// Wait for all images in section 6 to be fully loaded
await page.evaluate(async () => {
  const imgs = Array.from(document.querySelectorAll('#section-6 img'));
  await Promise.all(imgs.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  }));
});
await new Promise(r => setTimeout(r, 800));

const sec6 = await page.$('#section-6');
await sec6.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/test_sec6_loaded.png' });

console.log('Saved loaded screenshots');
await browser.close();
server.close();
