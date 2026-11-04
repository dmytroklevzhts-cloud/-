/**
 * Section 3: Web & UI/UX Student Showcase
 * Pure 3D Floating Mockup Cards Cascade (Figma & Artboard Style).
 * Clean presentation with zero UI clutter.
 * Stable, fixed 3-depth slot stack with tactile mid-air hop & flip animations.
 * Cards jump and flip in-place without ever flying away to the left.
 */

(function () {
    const webProjects = [
        {
            id: "01",
            name: "Strawberry",
            title: "Strawberry — Промо-сайт бренду",
            badge: "МАКЕТ 01 · UI/UX ДИЗАЙН",
            tags: ["Figma", "Брендинг", "HTML5", "CSS3", "Адаптивний веб"],
            desc: "Яскравий концептуальний промо-сайт полуничних десертів та напоїв. Соковита коралово-градієнтна палітра, виразна заголовкова типографіка, картки смаків та інтерактивні елементи замовлення.",
            frames: [
                { src: "img/Figma/frames/1_1.webp", title: "Головний екран (Hero)" },
                { src: "img/Figma/frames/1_2.webp", title: "Каталог десертів та меню" },
                { src: "img/Figma/frames/1_3.webp", title: "Деталі замовлення та футер" }
            ]
        },
        {
            id: "02",
            name: "NOIRA",
            title: "NOIRA — Minimalist Clothing Store",
            badge: "МАКЕТ 02 · UI/UX ДИЗАЙН",
            tags: ["Figma", "UI Kit", "HTML5", "CSS3", "Модульна сітка"],
            desc: "Мінімалістичний інтернет-магазин капсульного міського одягу (Urban Casual Silhouettes). Фріз-композиція моделей у повний зріст, витончений лукбук, продумана сітка каталогу та чиста естетика.",
            frames: [
                { src: "img/Figma/frames/2_1.webp", title: "Hero з моделями бренду" },
                { src: "img/Figma/frames/2_2.webp", title: "Модульний каталог одягу" },
                { src: "img/Figma/frames/2_3.webp", title: "Картка речі та кошик" }
            ]
        },
        {
            id: "03",
            name: "ZeroCoin",
            title: "ZeroCoin — Crypto Exchange Platform",
            badge: "МАКЕТ 03 · UI/UX ДИЗАЙН",
            tags: ["Figma", "Dark Theme", "HTML5", "CSS3", "Фінансовий UI"],
            desc: "Неонова криптовалютна біржа та аналітична платформа. Глибока темна тема, біржові графіки торгів у реальному часі, 3D-ілюстрації лептопа, аналітика активів та мобільний інтерфейс.",
            frames: [
                { src: "img/Figma/frames/3_1.webp", title: "Темна тема та 3D лептоп" },
                { src: "img/Figma/frames/3_2.webp", title: "Біржові графіки та ринки" },
                { src: "img/Figma/frames/3_3.webp", title: "Мобільний додаток та безпека" }
            ]
        },
        {
            id: "04",
            name: "Lingo",
            title: "Lingo — Language Learning Dashboard",
            badge: "МАКЕТ 04 · UI/UX ДИЗАЙН",
            tags: ["Figma", "SaaS UI", "HTML5", "CSS3", "UX Flow"],
            desc: "Сучасний освітній веб-сервіс для вивчення мов. Продуманий особистий кабінет учня, трекер щоденного прогресу, картки практичних завдань та інтерактивні тести вибору правильних відповідей.",
            frames: [
                { src: "img/Figma/frames/4_1.webp", title: "Дашборд учня та прогрес" },
                { src: "img/Figma/frames/4_2.webp", title: "Картки курсів та тем" },
                { src: "img/Figma/frames/4_3.webp", title: "Інтерактивний тест знань" }
            ]
        },
        {
            id: "05",
            name: "FLORA",
            title: "FLORA — Botanical Concept Store",
            badge: "МАКЕТ 05 · UI/UX ДИЗАЙН",
            tags: ["Figma", "Grid Layout", "HTML5", "CSS3", "Арт-дирекшн"],
            desc: "Витончений онлайн-магазин кімнатних рослин та архітектурної кераміки ручної роботи. Природна тепла палітра, журнальна антиквенна типографіка, бейджі догляду та гарантії адаптації рослин.",
            frames: [
                { src: "img/Figma/frames/5_1.webp", title: "Атмосферний Hero з рослинами" },
                { src: "img/Figma/frames/5_2.webp", title: "Колекція та авторська кераміка" },
                { src: "img/Figma/frames/5_3.webp", title: "Поради з догляду та замовлення" }
            ]
        },
        {
            id: "06",
            name: "Christian Dior",
            title: "Christian Dior 1999 Haute Couture",
            badge: "МАКЕТ 06 · UI/UX ДИЗАЙН",
            tags: ["Figma", "High Fashion", "HTML5", "CSS3", "Колаж"],
            desc: "Концептуальний цифровий триб’ют кутюрній колекції Джона Гальяно для дому Dior (1999). Вишукана монохромна палітра з фіолетовими нюансами, колажні силуети моделей та історична естетика.",
            frames: [
                { src: "img/Figma/frames/6_1.webp", title: "Кутюрний колаж та естетика" },
                { src: "img/Figma/frames/6_2.webp", title: "Історична сітка образів" },
                { src: "img/Figma/frames/6_3.webp", title: "Архівні нотатки та силуети" }
            ]
        }
    ];

    let currentProjectIndex = 0;
    let currentFrameIndex = 0;
    let isTransitioning = false;

    function initShowcase() {
        const sec3 = document.getElementById("section-3");
        if (!sec3) return;

        // Right column elements
        const titleEl = document.getElementById("showcase-title");
        const descEl = document.getElementById("showcase-desc");
        const tagsContainer = document.getElementById("showcase-tags");
        const counterEl = document.getElementById("showcase-counter");
        const prevProjectBtn = document.getElementById("showcase-prev-btn");
        const nextProjectBtn = document.getElementById("showcase-next-btn");
        const selectorBtns = document.querySelectorAll(".showcase-selector-btn");

        // 3D Deck Card elements
        const cardEls = document.querySelectorAll(".deck-card");
        const imgEls = [
            document.getElementById("deck-img-0"),
            document.getElementById("deck-img-1"),
            document.getElementById("deck-img-2")
        ];

        // Slot mapping: each active frame assigns cards to (Front, Mid, Back)
        const slotMap = [
            ["slot-front", "slot-mid", "slot-back"], // Frame 0: 0 is front, 1 is mid, 2 is back
            ["slot-back", "slot-front", "slot-mid"], // Frame 1: 1 is front, 2 is mid, 0 is back
            ["slot-mid", "slot-back", "slot-front"]  // Frame 2: 2 is front, 0 is mid, 1 is back
        ];

        /**
         * Update card slot assignments smoothly in-place with tactile hop
         */
        function setFrame(frameIdx, isHop = true) {
            if (frameIdx < 0) frameIdx = 2;
            if (frameIdx > 2) frameIdx = 0;
            const prevIndex = currentFrameIndex;
            currentFrameIndex = frameIdx;

            const slots = slotMap[currentFrameIndex];

            cardEls.forEach((card, idx) => {
                card.classList.remove(
                    "deck-card--slot-front",
                    "deck-card--slot-mid",
                    "deck-card--slot-back",
                    "deck-card--active",
                    "deck-card--hop-to-front"
                );
                const slot = slots[idx];
                card.classList.add(`deck-card--${slot}`);

                if (slot === "slot-front") {
                    card.classList.add("deck-card--active");

                    // Trigger tactile hop into the air if user changed frame
                    if (isHop && prevIndex !== currentFrameIndex) {
                        const fromMid = (prevIndex === (currentFrameIndex + 2) % 3);
                        card.style.setProperty("--from-x", fromMid ? "20px" : "75px");
                        card.style.setProperty("--from-y", fromMid ? "12px" : "24px");
                        card.style.setProperty("--from-rot", fromMid ? "2deg" : "4.5deg");
                        card.style.setProperty("--from-scale", fromMid ? "0.93" : "0.86");

                        card.classList.add("deck-card--hop-to-front");
                        setTimeout(() => {
                            card.classList.remove("deck-card--hop-to-front");
                        }, 540);
                    }
                }
            });
        }

        // Preload all 18 project frame images for instant, zero-flicker transitions
        webProjects.forEach(p => {
            p.frames.forEach(f => {
                const img = new Image();
                img.src = f.src;
            });
        });

        /**
         * Update project data with Gather & Fan-Out + Directional Solid Horizontal Slide
         * Zero white flash - images slide 100% opaque edge-to-edge!
         */
        function updateProject(index) {
            if (index < 0) index = webProjects.length - 1;
            if (index >= webProjects.length) index = 0;
            if (isTransitioning || (index === currentProjectIndex && currentFrameIndex === 0)) return;

            const prevProjIndex = currentProjectIndex;
            currentProjectIndex = index;
            currentFrameIndex = 0; // reset to Hero frame

            const proj = webProjects[currentProjectIndex];

            // Determine slide direction:
            // Next: slides left (incoming from right: +100% -> 0, outgoing: 0 -> -100%)
            // Prev: slides right (incoming from left: -100% -> 0, outgoing: 0 -> +100%)
            const isForward = (index > prevProjIndex) || (prevProjIndex === webProjects.length - 1 && index === 0);
            const inStart = isForward ? "100%" : "-100%";
            const outEnd  = isForward ? "-100%" : "100%";

            // Update title, desc, counter
            if (titleEl) titleEl.textContent = proj.title;
            if (descEl) descEl.textContent = proj.desc;
            if (counterEl) counterEl.textContent = `${proj.id} / 0${webProjects.length}`;

            // Update tags
            if (tagsContainer) {
                tagsContainer.innerHTML = "";
                proj.tags.forEach(tag => {
                    const t = document.createElement("span");
                    t.className = "showcase-tech-tag";
                    t.textContent = tag;
                    tagsContainer.appendChild(t);
                });
            }

            // Update selector buttons active state
            selectorBtns.forEach((btn, idx) => {
                if (idx === currentProjectIndex) {
                    btn.classList.add("showcase-selector-btn--active");
                } else {
                    btn.classList.remove("showcase-selector-btn--active");
                }
            });

            isTransitioning = true;
            const fanDuration = 560;   // 560ms: gather into stack & spring fan out
            const slideDelay = 120;    // start slide as cards converge in stack
            const slideDuration = 300; // duration of the horizontal push

            // Align slots to Frame 0
            setFrame(0, false);

            // Trigger Gather & Fan-Out on all cards
            cardEls.forEach((card, i) => {
                card.classList.add(`deck-card--fan-${i}`);
            });

            // Clean up any stale incoming images
            cardEls.forEach(card => {
                const stale = card.querySelectorAll(".deck-card__img--incoming");
                stale.forEach(el => el.remove());
            });

            // Perform solid, zero-flash directional slide
            cardEls.forEach((card, i) => {
                const currentImg = imgEls[i];
                if (!currentImg) return;

                // Create 100% opaque incoming image
                const incomingImg = document.createElement("img");
                incomingImg.className = "deck-card__img deck-card__img--incoming";
                incomingImg.src = proj.frames[i].src;
                incomingImg.alt = `${proj.title} — ${proj.frames[i].title}`;
                incomingImg.style.transform = `translateX(${inStart})`;
                incomingImg.style.transition = `transform ${slideDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                card.appendChild(incomingImg);

                // Start the slide
                setTimeout(() => {
                    currentImg.style.transition = `transform ${slideDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                    currentImg.style.transform = `translateX(${outEnd})`;
                    incomingImg.style.transform = "translateX(0)";
                }, slideDelay);

                // When slide finishes: commit new src and remove incoming image
                setTimeout(() => {
                    currentImg.style.transition = "none";
                    currentImg.style.transform = "none";
                    currentImg.src = proj.frames[i].src;
                    currentImg.alt = `${proj.title} — ${proj.frames[i].title}`;
                    if (incomingImg.parentNode) {
                        incomingImg.parentNode.removeChild(incomingImg);
                    }
                }, slideDelay + slideDuration + 30);
            });

            // Clean up after fanning out into cascade
            setTimeout(() => {
                cardEls.forEach((card, i) => {
                    card.classList.remove(`deck-card--fan-${i}`);
                });
                isTransitioning = false;
            }, fanDuration + 30);
        }

        // Direct click on cards:
        // - Click background card -> brings it forward with hop
        // - Click front card -> cycles to next card with hop
        cardEls.forEach((card, idx) => {
            card.addEventListener("click", () => {
                if (isTransitioning) return;
                if (currentFrameIndex !== idx) {
                    setFrame(idx, true);
                } else {
                    setFrame((currentFrameIndex + 1) % 3, true);
                }
            });
        });

        // Project selector grid & nav buttons
        if (prevProjectBtn) {
            prevProjectBtn.addEventListener("click", () => updateProject(currentProjectIndex - 1));
        }

        if (nextProjectBtn) {
            nextProjectBtn.addEventListener("click", () => updateProject(currentProjectIndex + 1));
        }

        selectorBtns.forEach((btn, idx) => {
            btn.addEventListener("click", () => updateProject(idx));
        });

        // Keyboard navigation (arrows and keys 1, 2, 3)
        document.addEventListener("keydown", (e) => {
            const sec3Rect = sec3.getBoundingClientRect();
            const isSec3Visible = sec3Rect.top < window.innerHeight && sec3Rect.bottom > 0;
            if (isSec3Visible && !isTransitioning) {
                if (e.key === "ArrowLeft") {
                    setFrame(currentFrameIndex - 1, true);
                } else if (e.key === "ArrowRight") {
                    setFrame(currentFrameIndex + 1, true);
                } else if (e.key === "1") {
                    setFrame(0, true);
                } else if (e.key === "2") {
                    setFrame(1, true);
                } else if (e.key === "3") {
                    setFrame(2, true);
                }
            }
        });

        // Initialize state
        setFrame(0, false);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initShowcase);
    } else {
        initShowcase();
    }
})();
