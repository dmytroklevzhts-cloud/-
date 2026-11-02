/**
 * Section 3: Web & UI/UX Student Showcase
 * Clean viewer for student Figma mockups & web landing snapshots.
 * Code protected (static high-res visual render with zoom & pan).
 * Fully anonymous - no student names.
 * Fixed height info card with description & tags - zero jumping.
 * Pinned to bottom to match left viewer height.
 */

(function () {
    const webProjects = [
        {
            id: "01",
            name: "Strawberry",
            title: "Strawberry — Промо-сайт бренду",
            badge: "МАКЕТ 01 · UI/UX ДИЗАЙН",
            image: "img/Figma/1.png",
            tags: ["Figma", "Брендинг", "HTML5", "CSS3", "Адаптивний веб"],
            desc: "Яскравий концептуальний промо-сайт полуничних десертів та напоїв. Соковита коралово-градієнтна палітра, виразна заголовкова типографіка, картки смаків та інтерактивні елементи замовлення."
        },
        {
            id: "02",
            name: "NOIRA",
            title: "NOIRA — Minimalist Clothing Store",
            badge: "МАКЕТ 02 · UI/UX ДИЗАЙН",
            image: "img/Figma/2.png",
            tags: ["Figma", "UI Kit", "HTML5", "CSS3", "Модульна сітка"],
            desc: "Мінімалістичний інтернет-магазин капсульного міського одягу (Urban Casual Silhouettes). Фріз-композиція моделей у повний зріст, витончений лукбук, продумана сітка каталогу та чиста естетика."
        },
        {
            id: "03",
            name: "ZeroCoin",
            title: "ZeroCoin — Crypto Exchange Platform",
            badge: "МАКЕТ 03 · UI/UX ДИЗАЙН",
            image: "img/Figma/3.png",
            tags: ["Figma", "Dark Theme", "HTML5", "CSS3", "Фінансовий UI"],
            desc: "Неонова криптовалютна біржа та аналітична платформа. Глибока темна тема, біржові графіки торгів у реальному часі, 3D-ілюстрації лептопа, аналітика активів та мобільний інтерфейс."
        },
        {
            id: "04",
            name: "Lingo",
            title: "Lingo — Language Learning Dashboard",
            badge: "МАКЕТ 04 · UI/UX ДИЗАЙН",
            image: "img/Figma/4.png",
            tags: ["Figma", "SaaS UI", "HTML5", "CSS3", "UX Flow"],
            desc: "Сучасний освітній веб-сервіс для вивчення мов. Продуманий особистий кабінет учня, трекер щоденного прогресу, картки практичних завдань та інтерактивні тести вибору правильних відповідей."
        },
        {
            id: "05",
            name: "FLORA",
            title: "FLORA — Botanical Concept Store",
            badge: "МАКЕТ 05 · UI/UX ДИЗАЙН",
            image: "img/Figma/5.png",
            tags: ["Figma", "Grid Layout", "HTML5", "CSS3", "Арт-дирекшн"],
            desc: "Витончений онлайн-магазин кімнатних рослин та архітектурної кераміки ручної роботи. Природна тепла палітра, журнальна антиквенна типографіка, бейджі догляду та гарантії адаптації рослин."
        },
        {
            id: "06",
            name: "Christian Dior",
            title: "Christian Dior 1999 Haute Couture",
            badge: "МАКЕТ 06 · UI/UX ДИЗАЙН",
            image: "img/Figma/6.png",
            tags: ["Figma", "High Fashion", "HTML5", "CSS3", "Колаж"],
            desc: "Концептуальний цифровий триб’ют кутюрній колекції Джона Гальяно для дому Dior (1999). Вишукана монохромна палітра з фіолетовими нюансами, колажні силуети моделей та історична естетика."
        }
    ];

    let currentIndex = 0;
    let currentZoom = 1.0;
    const zoomLevels = [0.8, 1.0, 1.25, 1.5, 2.0];
    let zoomIndex = 1;

    let modalZoom = 1.0;

    function initShowcase() {
        const sec3 = document.getElementById("section-3");
        if (!sec3) return;

        // Elements
        const viewportImg = document.getElementById("showcase-screen-img");
        const viewportWrap = document.getElementById("showcase-viewport");
        const badgeEl = document.getElementById("showcase-badge-text");
        const titleEl = document.getElementById("showcase-title");
        const descEl = document.getElementById("showcase-desc");
        const tagsContainer = document.getElementById("showcase-tags");
        const counterEl = document.getElementById("showcase-counter");
        const zoomValEl = document.getElementById("showcase-zoom-val");

        // Buttons
        const prevBtn = document.getElementById("showcase-prev-btn");
        const nextBtn = document.getElementById("showcase-next-btn");
        const zoomInBtn = document.getElementById("showcase-zoom-in");
        const zoomOutBtn = document.getElementById("showcase-zoom-out");
        const zoomResetBtn = document.getElementById("showcase-zoom-reset");
        const fullscreenBtn = document.getElementById("showcase-fullscreen-btn");
        const selectorBtns = document.querySelectorAll(".showcase-selector-btn");

        // Lightbox modal elements
        const modal = document.getElementById("showcase-modal");
        const modalImg = document.getElementById("showcase-modal-img");
        const modalClose = document.getElementById("showcase-modal-close");
        const modalTitle = document.getElementById("showcase-modal-title");
        const modalAuthor = document.getElementById("showcase-modal-author");
        const modalZoomIn = document.getElementById("modal-zoom-in");
        const modalZoomOut = document.getElementById("modal-zoom-out");
        const modalZoomReset = document.getElementById("modal-zoom-reset");
        const modalZoomVal = document.getElementById("modal-zoom-val");

        function updateProject(index, animate = true) {
            if (index < 0) index = webProjects.length - 1;
            if (index >= webProjects.length) index = 0;
            currentIndex = index;

            const proj = webProjects[currentIndex];

            // Animate transition of image
            if (animate && viewportImg) {
                viewportImg.style.opacity = "0.2";
                viewportImg.style.transform = `scale(${currentZoom * 0.98})`;
                setTimeout(() => {
                    loadProjectContent(proj);
                    viewportImg.style.opacity = "1";
                    viewportImg.style.transform = `scale(${currentZoom})`;
                }, 150);
            } else {
                loadProjectContent(proj);
            }
        }

        function loadProjectContent(proj) {
            if (viewportImg) {
                viewportImg.src = proj.image;
                viewportImg.alt = proj.title;
            }
            if (viewportWrap) {
                viewportWrap.scrollTop = 0;
            }
            if (badgeEl) badgeEl.textContent = proj.badge;
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
                if (idx === currentIndex) {
                    btn.classList.add("showcase-selector-btn--active");
                } else {
                    btn.classList.remove("showcase-selector-btn--active");
                }
            });

            // Update modal if open
            if (modalTitle) modalTitle.textContent = proj.title;
            if (modalAuthor) modalAuthor.textContent = "Повноекранний перегляд макета";
            if (modalImg) modalImg.src = proj.image;
        }

        function applyZoom() {
            currentZoom = zoomLevels[zoomIndex];
            if (viewportImg) {
                viewportImg.style.transform = `scale(${currentZoom})`;
                viewportImg.style.transformOrigin = "top center";
            }
            if (zoomValEl) {
                zoomValEl.textContent = `${Math.round(currentZoom * 100)}%`;
            }
        }

        // Zoom handlers
        if (zoomInBtn) {
            zoomInBtn.addEventListener("click", () => {
                if (zoomIndex < zoomLevels.length - 1) {
                    zoomIndex++;
                    applyZoom();
                }
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener("click", () => {
                if (zoomIndex > 0) {
                    zoomIndex--;
                    applyZoom();
                }
            });
        }

        if (zoomResetBtn) {
            zoomResetBtn.addEventListener("click", () => {
                zoomIndex = 1; // 1.0 (100%)
                applyZoom();
                if (viewportWrap) viewportWrap.scrollTop = 0;
            });
        }

        // Project navigation
        if (prevBtn) {
            prevBtn.addEventListener("click", () => updateProject(currentIndex - 1));
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => updateProject(currentIndex + 1));
        }

        selectorBtns.forEach((btn, idx) => {
            btn.addEventListener("click", () => updateProject(idx));
        });

        // Lightbox modal handlers
        function openModal() {
            if (!modal) return;
            const proj = webProjects[currentIndex];
            if (modalImg) modalImg.src = proj.image;
            if (modalTitle) modalTitle.textContent = proj.title;
            if (modalAuthor) modalAuthor.textContent = "Повноекранний перегляд макета";
            modalZoom = 1.0;
            applyModalZoom();
            modal.classList.add("showcase-modal--open");
            document.body.style.overflow = "hidden";
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.remove("showcase-modal--open");
            document.body.style.overflow = "";
        }

        function applyModalZoom() {
            if (modalImg) {
                modalImg.style.transform = `scale(${modalZoom})`;
                modalImg.style.transformOrigin = "top center";
            }
            if (modalZoomVal) {
                modalZoomVal.textContent = `${Math.round(modalZoom * 100)}%`;
            }
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener("click", openModal);
        }

        if (modalClose) {
            modalClose.addEventListener("click", closeModal);
        }

        const modalOverlay = document.querySelector(".showcase-modal__overlay");
        if (modalOverlay) {
            modalOverlay.addEventListener("click", closeModal);
        }

        if (modalZoomIn) {
            modalZoomIn.addEventListener("click", () => {
                if (modalZoom < 2.5) {
                    modalZoom += 0.25;
                    applyModalZoom();
                }
            });
        }

        if (modalZoomOut) {
            modalZoomOut.addEventListener("click", () => {
                if (modalZoom > 0.5) {
                    modalZoom -= 0.25;
                    applyModalZoom();
                }
            });
        }

        if (modalZoomReset) {
            modalZoomReset.addEventListener("click", () => {
                modalZoom = 1.0;
                applyModalZoom();
            });
        }

        // Keyboard shortcuts
        document.addEventListener("keydown", (e) => {
            if (modal && modal.classList.contains("showcase-modal--open")) {
                if (e.key === "Escape") {
                    closeModal();
                } else if (e.key === "+" || e.key === "=") {
                    if (modalZoom < 2.5) { modalZoom += 0.25; applyModalZoom(); }
                } else if (e.key === "-") {
                    if (modalZoom > 0.5) { modalZoom -= 0.25; applyModalZoom(); }
                }
            } else {
                const sec3Rect = sec3.getBoundingClientRect();
                const isSec3Visible = sec3Rect.top < window.innerHeight && sec3Rect.bottom > 0;
                if (isSec3Visible) {
                    if (e.key === "ArrowLeft") {
                        updateProject(currentIndex - 1);
                    } else if (e.key === "ArrowRight") {
                        updateProject(currentIndex + 1);
                    }
                }
            }
        });

        // Wheel zoom inside viewer with Ctrl key
        if (viewportWrap) {
            viewportWrap.addEventListener("wheel", (e) => {
                if (e.ctrlKey) {
                    e.preventDefault();
                    if (e.deltaY < 0 && zoomIndex < zoomLevels.length - 1) {
                        zoomIndex++;
                        applyZoom();
                    } else if (e.deltaY > 0 && zoomIndex > 0) {
                        zoomIndex--;
                        applyZoom();
                    }
                }
            }, { passive: false });
        }

        // Initialize state
        loadProjectContent(webProjects[0]);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initShowcase);
    } else {
        initShowcase();
    }
})();
