/**
 * Дніпровський політехнічний фаховий коледж
 * Освітній напрям 122 «Комп'ютерні науки»
 * Головна точка входу додатку (Application Entry Point)
 */

import { initSiteHeader } from './modules/site-header.js';
import { initHero } from './modules/01-hero.js';
import { initPrograms } from './modules/02-programs.js';
import { initWebShowcase } from './modules/03-web-showcase.js';
import { initTechLab } from './modules/04-tech-lab.js';
import { initPracticeSlider } from './modules/05-practice.js';
import { initTeachers } from './modules/06-teachers.js';
import { initCadViewer } from './modules/07-cad-viewer.js';
import { initCareers } from './modules/08-careers.js';
import { initWorkSpheres } from './modules/09-work-spheres.js';
import { initAdmission } from './modules/10-admission.js';

/**
 * Ініціалізація всіх модулів інтерфейсу та блоків сайту
 */
function initApp() {
    // 1. Головна навігаційна шапка (Scroll-spy та переходи 01-10)
    initSiteHeader();

    // 2. Ініціалізація 10 логічних секцій сайту
    initHero();
    initPrograms();
    initWebShowcase();
    initTechLab();
    initPracticeSlider();
    initTeachers();
    initCadViewer();
    initCareers();
    initWorkSpheres();
    initAdmission();
}

// Безпечний запуск після побудови DOM-дерева
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
