/**
 * Дніпровський політехнічний фаховий коледж
 * Секція 06: Команда викладачів (ПР та КД)
 * Концепція: «Чистий Split: Голова ЦК ліворуч + 9 викладачів у сітці праворуч»
 */

(function () {
    'use strict';

    /**
     * Дані Голови циклової комісії (фіксована картка ліворуч)
     */
    const HEAD_TEACHER_DATA = {
        id: 1,
        num: "01",
        name: "Омельяненко Анна Миколаївна",
        role: "Голова циклової комісії",
        position: "голова циклової комісії електротехнічних та комп’ютерних дисциплін, викладач спеціальних дисциплін",
        photo: "img/Teacher/1.jpg",
        isHead: true,
        focusTag: "Програмування та комп’ютерні мережі",
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
    };

    /**
     * База даних 9 викладачів циклової комісії для правої сітки
     */
    const TEACHERS_DATA = [
        {
            id: 2,
            num: "02",
            name: "Бондарєва Людмила Анатоліївна",
            role: "Викладач спеціальних дисциплін",
            position: "викладач спеціальних дисциплін",
            photo: "img/Teacher/2.jpg",
            isHead: false,
            focusTag: "Мікропроцесори · ЕОМ",
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
            role: "Викладач за суміщенням · Ст. інспектор ВК",
            position: "викладач за суміщенням",
            photo: "img/Teacher/3.jpg",
            isHead: false,
            focusTag: "Монтаж технічних засобів АСУ",
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
            role: "Викладач спеціальних дисциплін",
            position: "викладач спеціальних дисциплін",
            photo: "img/Teacher/4.jpg",
            isHead: false,
            focusTag: "Основи проєктування · Електроніка",
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
            role: "Викладач метрології та технічного контролю",
            position: "викладач метрології та стандартизації",
            photo: "img/Teacher/5.jpg",
            isHead: false,
            focusTag: "Метрологія та техконтроль",
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
            role: "Викладач комп'ютерних дисциплін",
            position: "викладач комп'ютерних дисциплін",
            photo: "img/Teacher/6.jpg",
            isHead: false,
            focusTag: "Бази даних · Тестування ПЗ",
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
            role: "Викладач комп'ютерних дисциплін",
            position: "викладач комп'ютерних дисциплін",
            photo: "img/Teacher/7.jpg",
            isHead: false,
            focusTag: "Теорія алгоритмів · Комп'ютерна техніка",
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
            role: "Викладач електротехнічних та комп'ютерних дисциплін",
            position: "викладач електротехнічних та комп`ютерних дисциплін",
            photo: "img/Teacher/8.jpg",
            isHead: false,
            focusTag: "Автоматизація процесів · АСУ",
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
            role: "Викладач спеціальних дисциплін",
            position: "викладач спеціальних дисциплін",
            photo: "img/Teacher/9.jpg",
            isHead: false,
            focusTag: "Програмування в АСУ · Автоматизація",
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
            role: "Викладач комп'ютерних дисциплін та дизайну",
            position: "викладач спеціальних дисциплін, викладач комп'ютерного дизайну",
            photo: "img/Teacher/10.jpg",
            isHead: false,
            focusTag: "Комп'ютерне проєктування · Графіка",
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

    let currentModalTarget = null;
    let modalEl = null;

    /**
     * Ініціалізація секції 06
     */
    function initTeachersSection() {
        renderCardsGrid();

        // Клік по лівому блоку (Голова ЦК) або її кнопці Досьє
        const spotlightStage = document.getElementById('spotlight-stage');
        if (spotlightStage) {
            spotlightStage.addEventListener('click', () => {
                openModal('head');
            });
        }

        const ctaBtn = document.getElementById('btn-spotlight-dossier');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal('head');
            });
        }

        initModal();
    }

    /**
     * Генерація 9 карток у правій сітці (ПІБ у 3 рядки, без номерів та дисциплін)
     */
    function renderCardsGrid() {
        const grid = document.querySelector('.team-cards-grid');
        if (!grid) return;

        let html = '';
        TEACHERS_DATA.forEach((t, i) => {
            const parts = t.name.split(' ');
            const lastName = parts[0] || '';
            const firstName = parts[1] || '';
            const patronymic = parts[2] || '';

            let objPos = 'center 15%';
            if (t.id === 5) objPos = '50% 12%';
            if (t.id === 8) objPos = 'center top';
            if (t.id === 10) objPos = 'center 8%';

            html += `
                <div class="team-card" data-teacher-index="${i}" tabindex="0" role="button" aria-label="Викладач: ${t.name}">
                    <div class="team-card__media">
                        <img src="${t.photo}" alt="${t.name}" class="team-card__img" style="object-position: ${objPos};" loading="lazy">
                        <div class="team-card__overlay"></div>
                    </div>
                    <div class="team-card__body">
                        <div class="team-card__name">
                            <span class="name-last">${lastName}</span>
                            <span class="name-first">${firstName}</span>
                            <span class="name-patronymic">${patronymic}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

        // Навішуємо кліки на відкриття модального вікна для кожної картки
        const cards = grid.querySelectorAll('.team-card[data-teacher-index]');
        cards.forEach((card) => {
            const idx = parseInt(card.dataset.teacherIndex, 10);
            if (isNaN(idx)) return;

            card.addEventListener('click', () => {
                openModal(idx);
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(idx);
                }
            });
        });
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
                e.target.closest('.teacher-modal__close-btn')
            ) {
                closeModal();
            }
        });

        const closeBtn = modalEl.querySelector('#btn-teacher-close') || modalEl.querySelector('.teacher-modal__close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeModal();
            });
        }

        // Закриття по клавіші Escape
        document.addEventListener('keydown', (e) => {
            if (!modalEl || !modalEl.classList.contains('is-open')) return;
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    /**
     * Відкрити модальне вікно для конкретного викладача ('head' або індекс 0..8)
     */
    function openModal(target) {
        if (!modalEl) return;
        currentModalTarget = target;

        let teacherData = null;
        if (target === 'head') {
            teacherData = HEAD_TEACHER_DATA;
        } else {
            const idx = typeof target === 'number' ? target : parseInt(target, 10);
            teacherData = TEACHERS_DATA[idx];
        }

        if (!teacherData) return;
        populateModalData(teacherData);

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
     * Заповнення модального вікна даними (без колонок під фото та без верхньої панелі)
     */
    function populateModalData(t) {
        if (!t || !modalEl) return;

        const imgEl = modalEl.querySelector('#teacher-modal-img');
        if (imgEl) {
            imgEl.src = t.photo;
            imgEl.alt = t.name;
            if (t.id === 5) {
                imgEl.style.objectPosition = '50% 12%';
            } else if (t.id === 8) {
                imgEl.style.objectPosition = 'center top';
            } else if (t.id === 10) {
                imgEl.style.objectPosition = 'center 8%';
            } else {
                imgEl.style.objectPosition = 'center 15%';
            }
        }

        const nameEl = modalEl.querySelector('#teacher-modal-name');
        if (nameEl) nameEl.textContent = t.name;

        const posEl = modalEl.querySelector('#teacher-modal-pos');
        if (posEl) posEl.textContent = `Посада: ${t.position}`;

        // Текстові блоки досьє
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
