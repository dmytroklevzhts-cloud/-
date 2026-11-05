import { chromium } from 'playwright';
import path from 'path';

(async () => {
    const browser = await chromium.launch({
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--allow-file-access-from-files']
    });

    const context = await browser.newContext({
        viewport: { width: 325, height: 873 }
    });

    const page = await context.newPage();
    const filePath = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
    await page.goto(filePath);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(600);

    const sectionIds = [
        'section-1', 'section-2', 'section-3', 'section-4', 'section-5',
        'section-6', 'section-7', 'section-8', 'section-9', 'section-10'
    ];

    const results = [];

    for (const id of sectionIds) {
        await page.evaluate((sId) => {
            const el = document.getElementById(sId);
            if (el) el.scrollIntoView({ behavior: 'instant' });
        }, id);
        await page.waitForTimeout(400);

        const check = await page.evaluate((sId) => {
            const el = document.getElementById(sId);
            const docScrollW = document.documentElement.scrollWidth;
            const bodyScrollW = document.body.scrollWidth;
            const elScrollW = el ? el.scrollWidth : 0;
            const elClientW = el ? el.clientWidth : 0;
            return {
                id: sId,
                docScrollW,
                bodyScrollW,
                elScrollW,
                elClientW,
                overflow: docScrollW > 325 || elScrollW > elClientW
            };
        }, id);

        results.push(check);
        await page.screenshot({
            path: `C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_${id}.png`
        });
    }

    console.log('ALL SECTIONS AUDIT at 325px:');
    console.table(results);

    await browser.close();
})();

