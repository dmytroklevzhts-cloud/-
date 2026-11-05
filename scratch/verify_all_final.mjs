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

await new Promise(r => server.listen(3460, r));

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();

const viewports = [
  { w: 320, h: 568, name: 'iPhone SE 1st gen' },
  { w: 360, h: 740, name: 'Galaxy S8 / S9' },
  { w: 375, h: 667, name: 'iPhone 6/7/8' },
  { w: 390, h: 844, name: 'iPhone 12/13/14' },
  { w: 412, h: 915, name: 'Pixel 7' },
  { w: 430, h: 932, name: 'iPhone 14 Pro Max' },
  { w: 768, h: 1024, name: 'iPad Mini / Air' },
  { w: 820, h: 1180, name: 'iPad 10th gen' },
  { w: 1024, h: 768, name: 'iPad Landscape' },
  { w: 1058, h: 873, name: 'User Laptop DevTools' },
  { w: 1280, h: 800, name: 'Laptop WXGA' },
  { w: 1440, h: 900, name: 'MacBook Pro 15' },
  { w: 1920, h: 1080, name: 'Full HD' },
  { w: 2560, h: 1440, name: '2K QHD' },
  { w: 3440, h: 1440, name: 'Ultrawide' }
];

let allPassed = true;

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.w, height: vp.h });
  await page.goto('http://localhost:3460', { waitUntil: 'networkidle' });

  // Test across all 3 labs in section 4
  for (const lab of ['algo', 'db', 'ai']) {
    await page.click(`[data-lab="${lab}"]`);
    await new Promise(r => setTimeout(r, 100));

    const check = await page.evaluate(() => {
      const bsw = document.body.scrollWidth;
      const docsw = document.documentElement.scrollWidth;
      const ww = window.innerWidth;
      return {
        hasScroll: bsw > ww || docsw > ww,
        bsw,
        docsw,
        ww
      };
    });

    if (check.hasScroll) {
      console.error(`FAIL: Horizontal scroll at ${vp.w}x${vp.h} (${vp.name}) in lab ${lab}: body=${check.bsw}, doc=${check.docsw}, window=${check.ww}`);
      allPassed = false;
    }
  }
}

if (allPassed) {
  console.log(`SUCCESS: All ${viewports.length} viewports (320px to 3440px) passed with ZERO horizontal scroll across all 3 labs!`);
} else {
  console.error('Some viewports failed horizontal scroll check.');
}

await browser.close();
server.close();

