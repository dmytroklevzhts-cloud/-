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

    // 1. Check total page scroll width
    const pageScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`Viewport: 325px, Page ScrollWidth: ${pageScrollWidth}px (overflow: ${pageScrollWidth > 325})`);

    // 2. Check Header
    const headerInfo = await page.evaluate(() => {
        const h = document.getElementById('site-header');
        const logo = document.querySelector('.site-header__logo-wrap');
        const nav = document.querySelector('.site-header__nav');
        const cta = document.querySelector('.btn-header-cta-fixed');
        const next = document.querySelector('.site-header__next-btn');
        return {
            headerW: h ? h.offsetWidth : 0,
            logoW: logo ? logo.offsetWidth : 0,
            ctaW: cta ? cta.offsetWidth : 0,
            nextVisible: next ? window.getComputedStyle(next).display : 'none',
            ctaText: cta ? cta.textContent.trim() : ''
        };
    });
    console.log('Header info at 325px:', headerInfo);
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_header.png' });

    // 3. Scroll to Section 04
    await page.evaluate(() => {
        document.getElementById('section-4')?.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(400);

    // Check Algo lab tabs, submodes, sorting bars
    const algoCheck = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('.tech-lab-tab')).map(t => ({
            text: t.querySelector('.lab-tab-text')?.innerText?.trim(),
            w: t.offsetWidth
        }));
        const submodes = Array.from(document.querySelectorAll('.lab-tool-btn')).map(b => ({
            title: b.querySelector('.lab-tool-btn__title')?.innerText?.trim(),
            w: b.offsetWidth
        }));
        const bars = document.querySelectorAll('.sorting-bar-col');
        const barsContainer = document.getElementById('sorting-bars-container');
        const actionBtns = Array.from(document.querySelectorAll('.lab-action-vgroup .btn-lab-action')).map(b => ({
            text: b.innerText?.trim(),
            w: b.offsetWidth,
            h: b.offsetHeight
        }));
        return {
            tabs,
            submodes,
            barsCount: bars.length,
            barsContainerW: barsContainer ? barsContainer.offsetWidth : 0,
            barsContainerScrollW: barsContainer ? barsContainer.scrollWidth : 0,
            actionBtns
        };
    });
    console.log('Algo Check at 325px:', JSON.stringify(algoCheck, null, 2));

    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_sec4_algo.png' });

    // Click modal trigger in Algo mode
    await page.click('#btn-open-algo-modal');
    await page.waitForTimeout(400);
    const modalIsOpen = await page.evaluate(() => {
        const m = document.getElementById('tech-lab-modal');
        return m ? m.classList.contains('is-open') : false;
    });
    console.log('Algo modal opened:', modalIsOpen);
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_algo_modal.png' });

    // Close modal
    await page.click('#tech-lab-modal-close');
    await page.waitForTimeout(300);

    // Switch to DB Lab
    await page.click('.tech-lab-tab[data-lab="db"]');
    await page.waitForTimeout(400);
    const dbCheck = await page.evaluate(() => {
        const stage = document.querySelector('.db-er-stage');
        const hint = document.querySelector('.db-er-hint');
        const modalBtn = document.querySelector('.db-modal-info-btn');
        return {
            stageH: stage ? stage.offsetHeight : 0,
            hintText: hint ? hint.innerText.trim() : '',
            modalBtnText: modalBtn ? modalBtn.innerText.trim() : '',
            modalBtnW: modalBtn ? modalBtn.offsetWidth : 0
        };
    });
    console.log('DB Check at 325px:', dbCheck);
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_sec4_db.png' });

    // Click DB modal trigger
    await page.click('.db-modal-info-btn');
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_db_modal.png' });

    // Close modal
    await page.click('#tech-lab-modal-close');
    await page.waitForTimeout(300);

    // Switch to AI Lab
    await page.click('.tech-lab-tab[data-lab="ai"]');
    await page.waitForTimeout(400);
    const aiCheck = await page.evaluate(() => {
        const submodes = Array.from(document.querySelectorAll('.lab-tool-btn[data-aimode]')).map(b => ({
            title: b.querySelector('.lab-tool-btn__title')?.innerText?.trim(),
            w: b.offsetWidth
        }));
        const actionBtns = Array.from(document.querySelectorAll('.lab-action-vgroup .btn-lab-action')).map(b => ({
            text: b.innerText?.trim(),
            w: b.offsetWidth
        }));
        return { submodes, actionBtns };
    });
    console.log('AI Check (KMeans) at 325px:', JSON.stringify(aiCheck, null, 2));
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_sec4_ai_kmeans.png' });

    // Switch to Regression mode
    await page.click('.lab-tool-btn[data-aimode="regression"]');
    await page.waitForTimeout(400);
    const regCheck = await page.evaluate(() => {
        const degrees = Array.from(document.querySelectorAll('.btn-reg-degree')).map(b => ({
            text: b.innerText?.trim(),
            w: b.offsetWidth
        }));
        const actionBtns = Array.from(document.querySelectorAll('.lab-action-vgroup .btn-lab-action')).map(b => ({
            text: b.innerText?.trim(),
            w: b.offsetWidth
        }));
        return { degrees, actionBtns };
    });
    console.log('AI Check (Regression) at 325px:', JSON.stringify(regCheck, null, 2));
    await page.screenshot({ path: 'C:/Users/User/.gemini/antigravity/brain/50e1a54c-fd0b-4ce6-af1a-e188f08bcaf4/screenshots/verify_325_sec4_ai_regression.png' });

    await browser.close();
    console.log('ALL TESTS COMPLETED SUCCESSFULY!');
})();
