/**
 * Дніпровський політехнічний фаховий коледж
 * Секція 06: Команда викладачів (ПР та КД)
 * Концепція: «Чистий Split: Spotlight Stage + Візуальна сітка карток 5x2»
 */

(function () {
    'use strict';

    /**
     * Повна база даних 10 викладачів циклової комісії
     */
    const TEACHERS_DATA = [
        {
            id: 1,
            num: "01",
            name: "Омельяненко Анна Миколаївна",
            shortName: "Омельяненко А. М.",
            role: "Голова циклової комісії",
            position: "голова циклової комісії електротехнічних та комп’ютерних дисциплін, викладач спеціальних дисциплін",
            photo: "img/Teacher/1.png",
            isHead: true,
            focusTag: "Програмування та комп’ютерні мережі",
            cardTag: "Програмування · Мережі",
            programs: ["all", "pr", "kd"],
            education: "повна вища, 2012 р. – ДВНЗ «Національний гірничий університет»",
            educationLevel: "Повна вища (магістр)",
            speciality: "Системне програмування, магістр з комп'ютерних систем",
            qualification: "аналітик комп'ютерних систем",
            category: "спеціаліст вищої кваліфікаційної категорії",
            experience: "10 років 10 місяців",
            disciplines: [
                "Комп'ютерні мережі",
                "Технології захисту інформації",
                "Основи програмної інженерії",
                "Мережні технології та адміністрування"
            ]
        },
        {
            id: 2,
            num: "02",
            name: "Бондарєва Людмила Анатоліївна",
            shortName: "Бондарєва Л. А.",
            role: "Викладач спеціальних дисциплін",
            position: "викладач спеціальних дисциплін",
            photo: "img/Teacher/2.png",
            isHead: false,
            focusTag: "Мікропроцесори · ЕОМ",
            cardTag: "Мікропроцесори · ЕОМ",
            programs: ["all", "pr"],
            education: "повна вища, 1989 р. – Дніпропетровський металургійний інститут",
            educationLevel: "Повна вища (спеціаліст)",
            speciality: "Електропривод і автоматизація промислових установок",
            qualification: "інженер-електрик",
            category: "спеціаліст першої кваліфікаційної категорії",
            experience: "31 рік",
            disciplines: [
                "Електронно-обчислювальні машини",
                "Периферійні пристрої",
                "Основи мікропроцесорної техніки",
                "Схемотехніка комп'ютерних систем"
            ]
        },
        {
            id: 3,
            num: "03",
            name: "Приходько Лариса Євстафіївна",
            shortName: "Приходько Л. Є.",
            role: "Викладач за суміщенням · Ст. інспектор ВК",
            position: "викладач за суміщенням",
            photo: "img/Teacher/3.png",
            isHead: false,
            focusTag: "Монтаж технічних засобів АСУ",
            cardTag: "Монтаж систем АСУ",
            programs: ["all", "pr"],
            education: "повна вища, 1990 р. – Дніпропетровський металургійний інститут",
            educationLevel: "Повна вища (спеціаліст)",
            speciality: "Автоматизація технологічних процесів і виробництв",
            qualification: "інженер-металург",
            category: "спеціаліст першої кваліфікаційної категорії",
            experience: "32 роки 10 місяців",
            disciplines: [
                "Монтаж технічних засобів АСУ",
                "Технічні засоби автоматизації",
                "Основи промислової автоматики"
            ]
        },
        {
            id: 4,
            num: "04",
            name: "Вишневецький Артур Валерійович",
            shortName: "Вишневецький А. В.",
            role: "Викладач спеціальних дисциплін",
            position: "викладач спеціальних дисциплін",
            photo: "img/Teacher/4.png",
            isHead: false,
            focusTag: "Основи проєктування · Електроніка",
            cardTag: "Проєктування · Електроніка",
            programs: ["all", "pr", "kd"],
            education: "повна вища, 2018 р. – Національний технічний університет «Дніпровська політехніка»",
            educationLevel: "Повна вища (магістр)",
            speciality: "Інженерія програмного забезпечення",
            qualification: "магістр з інженерії програмного забезпечення",
            category: "спеціаліст другої кваліфікаційної категорії",
            experience: "3 роки 10 місяців",
            disciplines: [
                "Основи проєктування програмних систем",
                "Електротехніка та електроніка",
                "Архітектура комп'ютерних систем",
                "Програмне моделювання"
            ]
        },
        {
            id: 5,
            num: "05",
            name: "Новик Євген Анатолійович",
            shortName: "Новик Є. А.",
            role: "Викладач метрології та технічного контролю",
            position: "викладач метрології та стандартизації",
            photo: "img/Teacher/5.png",
            isHead: false,
            focusTag: "Метрологія та техконтроль",
            cardTag: "Метрологія · Контроль",
            programs: ["all", "pr"],
            education: "повна вища, 2007 р. – Дніпропетровський національний університет залізничного транспорту",
            educationLevel: "Повна вища (магістр)",
            speciality: "Рухомий склад та спеціальна техніка залізничного транспорту",
            qualification: "магістр-дослідник",
            category: "спеціаліст з вищою освітою",
            experience: "1 рік",
            disciplines: [
                "Метрологія та технічні вимірювання",
                "Стандартизація та сертифікація ПЗ",
                "Технічний контроль систем"
            ]
        },
        {
            id: 6,
            num: "06",
            name: "Ковальчук Світлана Миколаївна",
            shortName: "Ковальчук С. М.",
            role: "Викладач комп'ютерних дисциплін",
            position: "викладач комп'ютерних дисциплін",
            photo: "img/Teacher/6.png",
            isHead: false,
            focusTag: "Бази даних · Тестування ПЗ",
            cardTag: "Бази даних · QA",
            programs: ["all", "pr", "kd"],
            education: "повна вища, 2009 р. – Дніпропетровський національний університет ім. Олеся Гончара",
            educationLevel: "Повна вища (спеціаліст)",
            speciality: "Комп'ютерні системи та мережі",
            qualification: "інженер комп'ютерних систем",
            category: "спеціаліст вищої кваліфікаційної категорії",
            experience: "12 років 10 місяців",
            disciplines: [
                "Організація баз даних та знань",
                "Тестування програмних систем і комплексів",
                "Операційні системи та системне ПЗ"
            ]
        },
        {
            id: 7,
            num: "07",
            name: "Черниш Микола Іванович",
            shortName: "Черниш М. І.",
            role: "Викладач комп'ютерних дисциплін",
            position: "викладач комп'ютерних дисциплін",
            photo: "img/Teacher/7.png",
            isHead: false,
            focusTag: "Теорія алгоритмів · Комп'ютерна техніка",
            cardTag: "Алгоритми · Комп'ютери",
            programs: ["all", "pr"],
            education: "повна вища, 1980 р. – Дніпропетровський гірничий інститут",
            educationLevel: "Повна вища (спеціаліст)",
            speciality: "Електрифікація та автоматизація гірничих робіт",
            qualification: "гірничий інженер-електрик",
            category: "спеціаліст другої кваліфікаційної категорії",
            experience: "1 рік 10 місяців",
            disciplines: [
                "Інформатика і комп’ютерна техніка",
                "Теорія алгоритмів та математичні методи"
            ]
        },
        {
            id: 8,
            num: "08",
            name: "Радзіховський Костянтин Сергійович",
            shortName: "Радзіховський К. С.",
            role: "Викладач електротехнічних та комп'ютерних дисциплін",
            position: "викладач електротехнічних та комп`ютерних дисциплін",
            photo: "img/Teacher/8.png",
            isHead: false,
            focusTag: "Автоматизація процесів · АСУ",
            cardTag: "Автоматизація · АСУ",
            programs: ["all", "pr"],
            education: "повна вища, 2021 р. – «Український державний університет науки і технологій»",
            educationLevel: "Повна вища (магістр)",
            speciality: "Автоматизація та комп'ютерно-інтегровані технології, магістр",
            qualification: "фахівець з автоматизації та приладобудування",
            category: "спеціаліст з вищою освітою",
            experience: "6 місяців",
            disciplines: [
                "Автоматизація технологічних процесів",
                "Основи автоматизації виробництва",
                "Основи комп'ютерно-інтегрованого управління",
                "Обчислювальна та мікропроцесорна техніка",
                "Електроконструкційні матеріали",
                "Основи мікропроцесорної техніки"
            ]
        },
        {
            id: 9,
            num: "09",
            name: "Шуть Олександр Феліксович",
            shortName: "Шуть О. Ф.",
            role: "Викладач спеціальних дисциплін",
            position: "викладач спеціальних дисциплін",
            photo: "img/Teacher/9.png",
            isHead: false,
            focusTag: "Програмування в АСУ · Автоматизація",
            cardTag: "Програмування в АСУ",
            programs: ["all", "pr"],
            education: "повна вища, 1985 р. – Дніпропетровський металургійний інститут",
            educationLevel: "Повна вища (спеціаліст)",
            speciality: "Автоматизовані системи управління",
            qualification: "інженер-електрик",
            category: "спеціаліст другої кваліфікаційної категорії",
            experience: "15 років",
            disciplines: [
                "Програмування в системах автоматизації",
                "Автоматизація промислових процесів",
                "Технічне забезпечення систем управління"
            ]
        },
        {
            id: 10,
            num: "10",
            name: "Клевжиць Дмитро Дмитрович",
            shortName: "Клевжиць Д. Д.",
            role: "Викладач комп'ютерних дисциплін та дизайну",
            position: "викладач спеціальних дисциплін, викладач комп'ютерного дизайну",
            photo: "img/Teacher/10.png",
            isHead: false,
            focusTag: "Комп'ютерне проєктування · Графіка",
            cardTag: "3D-проєктування · Дизайн",
            programs: ["all", "kd"],
            education: "повна вища, 2021 р. – Національний технічний університет «Дніпровська політехніка»",
            educationLevel: "Повна вища (магістр)",
            speciality: "Комп'ютерні науки, магістр",
            qualification: "магістр з комп'ютерних наук",
            category: "спеціаліст з вищою освітою",
            experience: "6 місяців",
            disciplines: [
                "Комп'ютерна графіка та візуалізація",
                "3D-моделювання та комп'ютерне проєктування",
                "UI/UX основи дизайну інтерфейсів",
                "Програмні засоби комп'ютерної графіки"
            ]
        }
    ];

    const TOTAL_TEACHERS = TEACHERS_DATA.length;
    let activeIndex = 0;
    let modalIndex = 0;
    let modalEl = null;

    /**
     * Ініціалізація секції 06
     */
    function initTeachersSection() {
        renderCardsGrid();

        // Обробка карток
        const cards = document.querySelectorAll('.team-card[data-teacher-index]');
        cards.forEach((card) => {
            const idx = parseInt(card.dataset.teacherIndex, 10);
            if (isNaN(idx)) return;

            // Наведення: плавний перегляд у лівому шоукейсі
            card.addEventListener('mouseenter', () => {
                selectTeacher(idx, false);
            });

            // Клік: відкриття детального досьє
            card.addEventListener('click', () => {
                selectTeacher(idx, false);
                openModal(idx);
            });

            // Доступність з клавіатури
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectTeacher(idx, false);
                    openModal(idx);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIdx = (idx + 1) % TOTAL_TEACHERS;
                    const nextCard = document.querySelector(`.team-card[data-teacher-index="${nextIdx}"]`);
                    if (nextCard) {
                        nextCard.focus();
                        selectTeacher(nextIdx, false);
                    }
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIdx = (idx - 1 + TOTAL_TEACHERS) % TOTAL_TEACHERS;
                    const prevCard = document.querySelector(`.team-card[data-teacher-index="${prevIdx}"]`);
                    if (prevCard) {
                        prevCard.focus();
                        selectTeacher(prevIdx, false);
                    }
                }
            });
        });

        // Кнопка CTA у нижній капсулі лівого шоукейсу
        const ctaBtn = document.getElementById('btn-spotlight-dossier');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(activeIndex);
            });
        }

        // Клік по всьому лівому блоку також відкриває досьє
        const spotlightStage = document.getElementById('spotlight-stage');
        if (spotlightStage) {
            spotlightStage.style.cursor = 'pointer';
            spotlightStage.addEventListener('click', (e) => {
                if (e.target.closest('#btn-spotlight-dossier')) return;
                openModal(activeIndex);
            });
        }

        // Фільтрація карток за програмами (Всі / ПР / КД)
        const filterBtns = document.querySelectorAll('.team-grid-filters .team-filter-btn');
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                const prog = btn.dataset.filterProgram || 'all';
                applyProgramFilter(prog);
            });
        });

        // Початкова активація Голови ЦК (Омельяненко)
        selectTeacher(0, true);
        initModal();
    }

    /**
     * Генерація 10 карток у правій сітці 5x2
     */
    function renderCardsGrid() {
        const grid = document.querySelector('.team-cards-grid');
        if (!grid) return;

        let html = '';
        TEACHERS_DATA.forEach((t, i) => {
            const headBadge = t.isHead ? '<span class="team-card__badge-head">★ Голова ЦК</span>' : '';
            const activeClass = i === 0 ? ' is-active' : '';

            // Коротке налаштування фокусу для фото
            let objPos = 'center 15%';
            if (i === 4) objPos = '50% 12%';
            if (i === 7) objPos = 'center top';
            if (i === 9) objPos = 'center 8%';

            html += `
                <div class="team-card${activeClass}" data-teacher-index="${i}" tabindex="0" role="button" aria-label="Викладач: ${t.name}">
                    <div class="team-card__media">
                        <img src="${t.photo}" alt="${t.name}" class="team-card__img" style="object-position: ${objPos};" loading="lazy">
                        <div class="team-card__overlay"></div>
                        <span class="team-card__num">${t.num}</span>
                        ${headBadge}
                    </div>
                    <div class="team-card__body">
                        <div class="team-card__name" title="${t.name}">${t.name}</div>
                        <div class="team-card__footer">
                            <span class="team-card__focus">${t.cardTag || t.focusTag.split('·')[0].trim()}</span>
                            <span class="team-card__arrow">↗</span>
                        </div>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    /**
     * Оновлення виділеного викладача в лівому Spotlight Stage
     */
    function selectTeacher(index, isInitial = false) {
        if (index === activeIndex && !isInitial) return;
        activeIndex = index;
        const t = TEACHERS_DATA[index];
        if (!t) return;

        // 1. Оновлення активного класу в правій сітці
        const cards = document.querySelectorAll('.team-card[data-teacher-index]');
        cards.forEach((card) => {
            const idx = parseInt(card.dataset.teacherIndex, 10);
            if (idx === index) {
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
            }
        });

        // 2. Оновлення лівого Spotlight Stage з м'яким cross-fade
        const imgEl = document.getElementById('spotlight-hero-img');
        const badgeEl = document.getElementById('spotlight-badge');
        const badgeText = document.getElementById('spotlight-badge-text');
        const counterEl = document.getElementById('spotlight-counter');
        const tagEl = document.getElementById('spotlight-tag');
        const nameEl = document.getElementById('spotlight-name');
        const focusEl = document.getElementById('spotlight-focus');

        if (imgEl) {
            imgEl.classList.add('is-switching');
            setTimeout(() => {
                imgEl.src = t.photo;
                imgEl.alt = t.name;
                // Центрування портрета для відкритості обличчя
                if (index === 4) {
                    imgEl.style.objectPosition = '50% 12%';
                } else if (index === 7) {
                    imgEl.style.objectPosition = 'center top';
                } else if (index === 9) {
                    imgEl.style.objectPosition = 'center 8%';
                } else {
                    imgEl.style.objectPosition = 'center 15%';
                }
                imgEl.classList.remove('is-switching');
            }, 100);
        }

        if (counterEl) counterEl.textContent = `${t.num} / ${TOTAL_TEACHERS}`;

        if (badgeEl && badgeText) {
            badgeText.textContent = t.isHead ? "ГОЛОВА ЦИКЛОВОЇ КОМІСІЇ" : "ВИКЛАДАЧ ЦИКЛОВОЇ КОМІСІЇ";
            if (t.isHead) {
                badgeEl.className = "spotlight-badge spotlight-badge--head";
            } else {
                badgeEl.className = "spotlight-badge";
            }
        }

        if (tagEl) {
            tagEl.textContent = t.isHead
                ? "КЕРІВНИК ЦИКЛОВОЇ КОМІСІЇ"
                : "ВИКЛАДАЧ ЦИКЛОВОЇ КОМІСІЇ";
        }

        if (nameEl) nameEl.textContent = t.name;
        if (focusEl) focusEl.textContent = `${t.focusTag} · Досвід: ${t.experience}`;
    }

    /**
     * Фільтрація сітки за освітніми програмами
     */
    function applyProgramFilter(program) {
        const cards = document.querySelectorAll('.team-card[data-teacher-index]');
        let firstVisible = null;
        let visibleCount = 0;

        cards.forEach((card) => {
            const idx = parseInt(card.dataset.teacherIndex, 10);
            const t = TEACHERS_DATA[idx];
            if (!t) return;

            const isMatch = program === 'all' || t.programs.includes(program);
            if (isMatch) {
                card.style.display = 'flex';
                visibleCount++;
                if (firstVisible === null) firstVisible = idx;
            } else {
                card.style.display = 'none';
            }
        });

        // Оновлення лічильника в шапці
        const countBadge = document.querySelector('.team-grid-count');
        if (countBadge) {
            let label = 'викладачів';
            if (visibleCount === 1) label = 'викладач';
            else if (visibleCount >= 2 && visibleCount <= 4) label = 'викладачі';
            countBadge.textContent = `${visibleCount} ${label}`;
        }

        // Якщо поточний викладач схований — перемкнути на першого видимого
        if (firstVisible !== null && (!TEACHERS_DATA[activeIndex].programs.includes(program) && program !== 'all')) {
            selectTeacher(firstVisible, false);
        }
    }

    /**
     * Ініціалізація модального вікна
     */
    function initModal() {
        modalEl = document.getElementById('teacher-detail-modal');
        if (!modalEl) return;

        // Закриття по кліку на бекдроп або хрестик
        modalEl.addEventListener('click', (e) => {
            if (
                e.target.classList.contains('teacher-modal__backdrop') ||
                e.target.closest('#btn-teacher-close') ||
                e.target.closest('.teacher-modal__close') ||
                e.target.closest('#btn-teacher-modal-close')
            ) {
                closeModal();
            }
        });

        const closeBtn = modalEl.querySelector('#btn-teacher-close') || modalEl.querySelector('.teacher-modal__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeModal();
            });
        }

        // Навігація в модалці (Попередній / Наступний)
        const prevBtn = modalEl.querySelector('#btn-teacher-prev');
        const nextBtn = modalEl.querySelector('#btn-teacher-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateModal(-1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateModal(1);
            });
        }

        // Керування клавіатурою при відкритій модалці
        document.addEventListener('keydown', (e) => {
            if (!modalEl || !modalEl.classList.contains('is-open')) return;
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                navigateModal(-1);
            } else if (e.key === 'ArrowRight') {
                navigateModal(1);
            }
        });
    }

    /**
     * Відкрити модальне вікно для викладача
     */
    function openModal(index) {
        if (!modalEl) return;
        populateModal(index);
        modalEl.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Закрити модальне вікно
     */
    function closeModal() {
        if (!modalEl) return;
        modalEl.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    /**
     * Перехід до попереднього/наступного викладача в модалці
     */
    function navigateModal(direction) {
        let nextIndex = (modalIndex + direction + TOTAL_TEACHERS) % TOTAL_TEACHERS;
        populateModal(nextIndex);
        selectTeacher(nextIndex, false);
    }

    /**
     * Заповнення модального вікна даними конкретного викладача
     */
    function populateModal(index) {
        modalIndex = index;
        const t = TEACHERS_DATA[index];
        if (!t || !modalEl) return;

        const imgEl = modalEl.querySelector('#teacher-modal-img');
        if (imgEl) {
            imgEl.src = t.photo;
            imgEl.alt = t.name;
            if (index === 4) {
                imgEl.style.objectPosition = '50% 12%';
            } else if (index === 7) {
                imgEl.style.objectPosition = 'center top';
            } else if (index === 9) {
                imgEl.style.objectPosition = 'center 8%';
            } else {
                imgEl.style.objectPosition = 'center 15%';
            }
        }

        const counterEl = modalEl.querySelector('#teacher-modal-counter');
        if (counterEl) counterEl.textContent = `ВИКЛАДАЧ ${t.num} / ${TOTAL_TEACHERS}`;

        const nameEl = modalEl.querySelector('#teacher-modal-name');
        if (nameEl) nameEl.textContent = t.name;

        const posEl = modalEl.querySelector('#teacher-modal-pos');
        if (posEl) posEl.textContent = `Посада: ${t.position}`;

        // Статистичні картки лівої колонки
        const catStat = modalEl.querySelector('#teacher-modal-cat-stat');
        if (catStat) catStat.textContent = t.category;

        const expStat = modalEl.querySelector('#teacher-modal-exp-stat');
        if (expStat) expStat.textContent = t.experience;

        const eduStat = modalEl.querySelector('#teacher-modal-edu-stat');
        if (eduStat) eduStat.textContent = t.educationLevel;

        const qualStat = modalEl.querySelector('#teacher-modal-qual-stat');
        if (qualStat) qualStat.textContent = t.qualification;

        // Детальні текстові блоки правої колонки
        const eduEl = modalEl.querySelector('#teacher-modal-education');
        if (eduEl) eduEl.textContent = t.education;

        const specEl = modalEl.querySelector('#teacher-modal-speciality');
        if (specEl) specEl.textContent = t.speciality;

        const qualFull = modalEl.querySelector('#teacher-modal-qualification');
        if (qualFull) qualFull.textContent = t.qualification;

        const catFull = modalEl.querySelector('#teacher-modal-category');
        if (catFull) catFull.textContent = t.category;

        const expFull = modalEl.querySelector('#teacher-modal-experience');
        if (expFull) expFull.textContent = t.experience;

        // Список дисциплін
        const discContainer = modalEl.querySelector('#teacher-modal-disciplines');
        if (discContainer) {
            discContainer.innerHTML = t.disciplines
                .map(d => `<span class="teacher-modal__discipline-pill">${d}</span>`)
                .join('');
        }
    }

    // Запуск після завантаження DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTeachersSection);
    } else {
        initTeachersSection();
    }
})();
