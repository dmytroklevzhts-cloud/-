/**
 * Fixed Site Header & Real-Time Section Tracking
 * Керування єдиною закріпленою шапкою сайту (навігація, активні пігулки 01-10, переходи)
 * Дніпровський політехнічний фаховий коледж — 122 «Комп'ютерні науки»
 */

import { $, $$ } from '../utils/dom.js';

const SECTIONS_CONFIG = [
    {
        id: 'section-1',
        num: '01',
        shortTitle: 'Головна',
        fullTitle: 'Головна сторінка',
        nextId: 'section-2',
        nextLabel: '02 Знайомство з програмами',
        isLast: false
    },
    {
        id: 'section-2',
        num: '02',
        shortTitle: 'Програми',
        fullTitle: 'Знайомство з програмами',
        nextId: 'section-3',
        nextLabel: '03 Дизайн, веб і цифрові продукти',
        isLast: false
    },
    {
        id: 'section-3',
        num: '03',
        shortTitle: 'Дизайн і веб',
        fullTitle: 'Дизайн і веб · Проєкти',
        nextId: 'section-4',
        nextLabel: '04 Програмування, дані та системи',
        isLast: false
    },
    {
        id: 'section-4',
        num: '04',
        shortTitle: 'Код і системи',
        fullTitle: 'Код, дані та системи',
        nextId: 'section-5',
        nextLabel: '05 Практика й портфоліо',
        isLast: false
    },
    {
        id: 'section-5',
        num: '05',
        shortTitle: 'Практика',
        fullTitle: 'Практика й портфоліо',
        nextId: 'section-6',
        nextLabel: '06 Команда викладачів',
        isLast: false
    },
    {
        id: 'section-6',
        num: '06',
        shortTitle: 'Команда',
        fullTitle: 'Команда викладачів ПР та КД',
        nextId: 'section-7',
        nextLabel: '07 3D-моделювання',
        isLast: false
    },
    {
        id: 'section-7',
        num: '07',
        shortTitle: '3D-моделі',
        fullTitle: '3D-моделювання та CAD',
        nextId: 'section-8',
        nextLabel: '08 Професії випускників',
        isLast: false
    },
    {
        id: 'section-8',
        num: '08',
        shortTitle: 'Професії',
        fullTitle: 'Професії випускників',
        nextId: 'section-9',
        nextLabel: '09 Де застосувати свої навички',
        isLast: false
    },
    {
        id: 'section-9',
        num: '09',
        shortTitle: 'Кар’єра',
        fullTitle: 'Де працювати та стажування',
        nextId: 'section-10',
        nextLabel: '10 Продовження освіти та вступ',
        isLast: false
    },
    {
        id: 'section-10',
        num: '10',
        shortTitle: 'Вступ',
        fullTitle: 'Освіта та вступ до коледжу',
        nextId: 'section-1',
        nextLabel: 'До початку сайту',
        isLast: true
    }
];

let headerEl = null;
let pillsList = [];
let currentNameEl = null;
let nextBtnEl = null;
let nextLabelEl = null;
let nextArrowEl = null;
let activeIndex = 0;
let ticking = false;

export function initSiteHeader() {
    headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    pillsList = $$( '.site-header__pill', headerEl);
    currentNameEl = document.getElementById('hdr-current-title');
    nextBtnEl = document.getElementById('hdr-next-btn');
    nextLabelEl = document.getElementById('hdr-next-label');
    nextArrowEl = document.getElementById('hdr-next-arrow');

    // Плавний скрол при кліках по пігулках та кнопках
    headerEl.addEventListener('click', handleHeaderClick);

    // Відстеження скролу для оновлення активного розділу
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Початкове оновлення
    updateActiveSection();
}

function handleHeaderClick(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
    }
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveSection();
            ticking = false;
        });
        ticking = true;
    }
}

function updateActiveSection() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const checkLine = scrollY + windowHeight * 0.35; // Лінія фокусу погляду (35% від верху)

    // Тінь шапки при скролі вниз
    if (headerEl) {
        if (scrollY > 20) {
            headerEl.classList.add('site-header--scrolled');
        } else {
            headerEl.classList.remove('site-header--scrolled');
        }
    }

    // Пошук активної секції
    let foundIdx = 0;
    for (let i = 0; i < SECTIONS_CONFIG.length; i++) {
        const sec = document.getElementById(SECTIONS_CONFIG[i].id);
        if (sec) {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (checkLine >= top && checkLine < top + height) {
                foundIdx = i;
                break;
            } else if (checkLine >= top) {
                foundIdx = i;
            }
        }
    }

    // Перевірка останньої секції в самому низу сторінки
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
        foundIdx = SECTIONS_CONFIG.length - 1;
    }

    if (foundIdx !== activeIndex || !pillsList[foundIdx]?.classList.contains('site-header__pill--active')) {
        activeIndex = foundIdx;
        applyActiveSection(activeIndex);
    }
}

function applyActiveSection(index) {
    const config = SECTIONS_CONFIG[index];
    if (!config) return;

    // Оновлюємо пігулки
    pillsList.forEach((pill, idx) => {
        if (idx === index) {
            pill.classList.add('site-header__pill--active');
            pill.setAttribute('aria-current', 'page');
            if (pill.scrollIntoView && window.innerWidth <= 1024) {
                try {
                    pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } catch (_) {}
            }
        } else {
            pill.classList.remove('site-header__pill--active');
            pill.removeAttribute('aria-current');
        }
    });

    // Оновлюємо назву поточного розділу
    if (currentNameEl) {
        currentNameEl.textContent = `${config.num} · ${config.shortTitle}`;
        currentNameEl.title = config.fullTitle;
    }

    // Оновлюємо кнопку переходу до наступного
    if (nextBtnEl && nextLabelEl) {
        nextBtnEl.setAttribute('href', `#${config.nextId}`);
        nextLabelEl.textContent = config.nextLabel;

        if (nextArrowEl) {
            if (config.isLast) {
                nextArrowEl.textContent = '↑';
                nextBtnEl.title = 'Повернутися на початок сайту';
            } else {
                nextArrowEl.textContent = '↓';
                nextBtnEl.title = `Перейти до розділу: ${config.nextLabel}`;
            }
        }
    }
}

