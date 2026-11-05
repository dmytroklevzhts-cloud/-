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

await new Promise(r => server.listen(3457, r));

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();

// Measure 390
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3457', { waitUntil: 'networkidle' });

const m390 = await page.evaluate(() => {
  const tabs = Array.from(document.querySelectorAll('.tech-lab-tab')).map(t => ({
    text: t.innerText.replace(/\s+/g, ' ').trim(),
    w: t.offsetWidth,
    sw: t.scrollWidth
  }));
  const container = document.querySelector('.tech-lab-container');
  const tabsContainer = document.querySelector('.tech-lab-tabs');
  const algoCanvas = document.querySelector('.algo-canvas-panel');
  const sideInspector = document.querySelector('.algo-side-inspector');
  const sidebarTools = document.querySelector('.lab-sidebar-tools');
  return {
    windowWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    tabsContainer: { w: tabsContainer?.offsetWidth, sw: tabsContainer?.scrollWidth },
    tabs,
    containerW: container?.offsetWidth,
    sidebarW: sidebarTools?.offsetWidth,
    sidebarH: sidebarTools?.offsetHeight,
    algoCanvasW: algoCanvas?.offsetWidth,
    algoCanvasH: algoCanvas?.offsetHeight,
    sideInspectorDisplay: sideInspector ? window.getComputedStyle(sideInspector).display : null
  };
});

console.log('Mobile 390:', JSON.stringify(m390, null, 2));

// Measure 1058
await page.setViewportSize({ width: 1058, height: 873 });
await page.goto('http://localhost:3457', { waitUntil: 'networkidle' });

const m1058 = await page.evaluate(() => {
  const tabs = Array.from(document.querySelectorAll('.tech-lab-tab')).map(t => ({
    text: t.innerText.replace(/\s+/g, ' ').trim(),
    w: t.offsetWidth,
    sw: t.scrollWidth
  }));
  const container = document.querySelector('.tech-lab-container');
  const tabsContainer = document.querySelector('.tech-lab-tabs');
  const algoCanvas = document.querySelector('.algo-canvas-panel');
  const sideInspector = document.querySelector('.algo-side-inspector');
  const sidebarTools = document.querySelector('.lab-sidebar-tools');
  return {
    windowWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    tabs,
    containerW: container?.offsetWidth,
    sidebarW: sidebarTools?.offsetWidth,
    sidebarH: sidebarTools?.offsetHeight,
    algoCanvasW: algoCanvas?.offsetWidth,
    algoCanvasH: algoCanvas?.offsetHeight,
    sideInspectorDisplay: sideInspector ? window.getComputedStyle(sideInspector).display : null
  };
});

console.log('Laptop 1058:', JSON.stringify(m1058, null, 2));

await browser.close();
server.close();

