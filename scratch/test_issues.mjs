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

await new Promise(r => server.listen(3461, r));

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();

// Test at 1200px (or whatever resolution was in user image 4)
for (const w of [1033, 1200, 1440, 1600]) {
  await page.setViewportSize({ width: w, height: 873 });
  await page.goto('http://localhost:3461', { waitUntil: 'networkidle' });

  const teacherData = await page.evaluate(() => {
    const stage = document.querySelector('.spotlight-stage');
    const layout = document.querySelector('.team-split-layout');
    const grid = document.querySelector('.team-cards-grid');
    const img = document.querySelector('.spotlight-img');
    return {
      layoutH: layout?.offsetHeight,
      stageH: stage?.offsetHeight,
      gridH: grid?.offsetHeight,
      imgH: img?.offsetHeight
    };
  });
  console.log(`Teacher section at ${w}px:`, teacherData);

  const s3Data = await page.evaluate(() => {
    const stage = document.querySelector('.web-showcase-stage');
    const card = document.querySelector('.deck-card--slot-front');
    const details = document.querySelector('.section3-details-col');
    const title = document.querySelector('#section-3 .screen-title');
    const cardRect = card?.getBoundingClientRect();
    const titleRect = title?.getBoundingClientRect();
    const detailsRect = details?.getBoundingClientRect();
    return {
      cardRect: { x: cardRect?.x, y: cardRect?.y, w: cardRect?.width, h: cardRect?.height },
      titleRect: { x: titleRect?.x, y: titleRect?.y, w: titleRect?.width, h: titleRect?.height },
      detailsRect: { x: detailsRect?.x, y: detailsRect?.y, w: detailsRect?.width, h: detailsRect?.height },
      overlapsTitle: cardRect && titleRect ? !(cardRect.x + cardRect.width < titleRect.x || cardRect.x > titleRect.x + titleRect.width || cardRect.y + cardRect.height < titleRect.y || cardRect.y > titleRect.y + titleRect.height) : false,
      overlapsDetails: cardRect && detailsRect ? !(cardRect.x + cardRect.width < detailsRect.x || cardRect.x > detailsRect.x + detailsRect.width || cardRect.y + cardRect.height < detailsRect.y || cardRect.y > detailsRect.y + detailsRect.height) : false
    };
  });
  console.log(`Section 3 at ${w}px:`, s3Data);
}

await browser.close();
server.close();

