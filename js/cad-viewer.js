/**
 * Дніпровський політехнічний фаховий коледж
 * Інтерактивний 3D Showroom для Секції 07 (3D-моделювання)
 * 8 студентських робіт: плавний 3D-слайдер (горизонтальне переміщення моделей у просторі).
 */

(function () {
    // 8 студентських 3D-робіт
    const CAD_MODELS = [
        {
            id: 1,
            file: 'models/1.stl',
            name: 'Модель 01: Маяк та човен',
            shortName: 'Маяк та човен',
            category: 'Сюжетна 3D-композиція',
            desc: 'Морська сюжетна діорама: восьмигранний маяк із оглядовим балконом і ліхтарем, кам’яна основа, пірс із огороджувальними ланцюгами та пришвартований моторний катер.'
        },
        {
            id: 2,
            file: 'models/2.stl',
            name: 'Модель 02: Відьма з Minecraft',
            shortName: 'Відьма з Minecraft',
            category: 'Персонажне воксельне моделювання',
            desc: 'Воксельний персонаж гри: ступінчастий капелюх із заломленим верхом, характерне блокове обличчя з довгим носом, схрещені в рукавах руки та довга простора мантія.'
        },
        {
            id: 3,
            file: 'models/3.stl',
            name: 'Модель 03: Містечко',
            shortName: 'Містечко',
            category: 'Архітектурне макетування',
            desc: 'Просторовий міський ансамбль: дві високі вежі з арковими вікнами та пірамідальними дахами, затишні житлові будинки з димарями, аркові ворота та сходи на мощеній міській терасі.'
        },
        {
            id: 4,
            file: 'models/4.stl',
            name: 'Модель 04: Острівець з вітряком',
            shortName: 'Острівець з вітряком',
            category: 'Концептуальний ландшафт',
            desc: 'Фантазійний літаючий острів: напівсферична плавуча основа, традиційний вітряк із чотирма ґратчастими крилами та стилізовані сферичні дерева на краю скелі.'
        },
        {
            id: 5,
            file: 'models/5.stl',
            name: 'Модель 05: Замок',
            shortName: 'Замок',
            category: 'Фортифікаційна архітектура',
            desc: 'Укріплена середньовічна фортеця: круглий острів із під’їзним мостом-пандусом, надбрамна вежа з арковим порталом, кутові башти зі шпилями, зубчасті мури та вічнозелені ялинки біля входу.'
        },
        {
            id: 6,
            file: 'models/6.stl',
            name: 'Модель 06: Скелет з Minecraft',
            shortName: 'Скелет з Minecraft',
            category: 'Персонажне воксельне моделювання',
            desc: 'Кубічна анатомія класичного ігрового моба: рельєфна грудна клітка з ребрами, характерний череп із прорізами очей і рота та блоковий лук у руках.'
        },
        {
            id: 7,
            file: 'models/7.stl',
            name: 'Модель 07: Настільна лампа',
            shortName: 'Настільна лампа',
            category: 'Предметний інтер’єрний дизайн',
            desc: 'Витончений настільний світильник: профільована кругла підставка, плавна керамічна ніжка тіла обертання з вузькою шийкою та конічний абажур із внутрішньою хрестовиною кріплення.'
        },
        {
            id: 8,
            file: 'models/8.stl',
            name: 'Модель 08: Дім серед лісу',
            shortName: 'Дім серед лісу',
            category: 'Ландшафтно-середовищний дизайн',
            desc: 'Затишна лісова садиба: двоповерховий будинок із двосхилим дахом та воротами, композиція з дерев’яних діжок різного калібру, оточення зі стилізованих ялинок та кулястих листяних дерев.'
        }
    ];

    if (typeof THREE === 'undefined') {
        console.warn('Three.js не знайдено.');
        return;
    }

    const container = document.getElementById('cad-canvas-wrap');
    const canvas = document.getElementById('cad-canvas');
    if (!container || !canvas) return;

    // Сцена
    const scene = new THREE.Scene();

    // Рендерер
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    function getContainerSize() {
        return {
            w: container.clientWidth || 1060,
            h: container.clientHeight || 590
        };
    }

    const initialSize = getContainerSize();
    renderer.setSize(initialSize.w, initialSize.h);

    // Камера
    const camera = new THREE.PerspectiveCamera(40, initialSize.w / initialSize.h, 0.1, 100);
    const DEFAULT_CAMERA_POS = new THREE.Vector3(3.6, 2.6, 4.2);
    camera.position.copy(DEFAULT_CAMERA_POS);

    // OrbitControls
    let controls = null;
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
        controls.enableZoom = true;
        controls.minDistance = 1.8;
        controls.maxDistance = 9.0;
        controls.enablePan = false;
        controls.target.set(0, 0, 0);
    }

    // Студійне освітлення
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
    keyLight.position.set(6, 9, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdcd6f0, 0.6);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    // Фірмове акцентне світло коледжу (#6453A3)
    const rimLight = new THREE.PointLight(0x6453A3, 1.4, 15);
    rimLight.position.set(2, 4, -4);
    scene.add(rimLight);

    // Координатна сітка підлоги
    const gridHelper = new THREE.GridHelper(6, 24, 0x6453A3, 0xd0cce0);
    gridHelper.position.y = -1.45;
    gridHelper.material.opacity = 0.35;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Стан переглядача
    let currentIndex = 0;
    let geometryCache = {};
    let activeModelGroup = null;

    // Стан анімації 3D-слайдера
    let activeSlide = null;

    // Суцільний твердотільний матеріал (без прозорості)
    const cadMaterial = new THREE.MeshStandardMaterial({
        color: 0xded8f6,
        metalness: 0.84,
        roughness: 0.28
    });

    const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x483a80,
        transparent: true,
        opacity: 0.45
    });

    // Оновлення інформації в правому сайдбарі
    function updateSidebarInfo(model, direction) {
        const detailsContainer = document.getElementById('cad-active-details');
        const titleEl = document.getElementById('cad-active-title');
        const catEl = document.getElementById('cad-active-category');
        const descEl = document.getElementById('cad-active-desc');
        const headerNameEl = document.getElementById('cad-active-header-name');
        const counterEl = document.getElementById('cad-model-counter');

        // Оновлюємо активну кнопку в сітці
        const buttons = document.querySelectorAll('.cad-model-btn');
        buttons.forEach((btn, idx) => {
            if (idx === (model.id - 1)) {
                btn.classList.add('cad-model-btn--active');
            } else {
                btn.classList.remove('cad-model-btn--active');
            }
        });

        if (counterEl) counterEl.textContent = '0' + model.id + ' / 0' + CAD_MODELS.length;

        // Плавна спрямована анімація тексту (відповідає напрямку 3D-слайдера)
        if (detailsContainer) {
            const slideClass = (direction >= 0) ? 'cad-details--slide-left' : 'cad-details--slide-right';
            detailsContainer.classList.add(slideClass);

            setTimeout(() => {
                if (titleEl) titleEl.textContent = model.name;
                if (catEl) catEl.textContent = model.category;
                if (descEl) descEl.textContent = model.desc;
                if (headerNameEl) {
                    headerNameEl.textContent = '3D МОДЕЛЬ 0' + model.id + ' • ' + model.category.toUpperCase();
                }
                detailsContainer.classList.remove(slideClass);
            }, 120);
        } else {
            if (titleEl) titleEl.textContent = model.name;
            if (catEl) catEl.textContent = model.category;
            if (descEl) descEl.textContent = model.desc;
            if (headerNameEl) headerNameEl.textContent = '3D МОДЕЛЬ 0' + model.id + ' • ' + model.category.toUpperCase();
        }
    }

    // Підготовка та корекція орієнтації моделі
    function prepareGeometry(geometry) {
        if (!geometry.userData.oriented) {
            geometry.rotateX(-Math.PI / 2);
            geometry.computeVertexNormals();
            geometry.center();
            geometry.userData.oriented = true;
        }
    }

    // Створення нової групи моделі (Mesh + Edges)
    function createModelGroup(geometry) {
        const group = new THREE.Group();

        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        const size = new THREE.Vector3();
        bbox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.6;
        const scale = targetSize / (maxDim || 1);

        const mesh = new THREE.Mesh(geometry, cadMaterial);
        mesh.scale.set(scale, scale, scale);

        const edgesGeom = new THREE.EdgesGeometry(geometry, 26);
        const edges = new THREE.LineSegments(edgesGeom, edgesMaterial);
        mesh.add(edges);

        group.add(mesh);
        group.userData = {
            size: size,
            scale: scale,
            gridY: - (size.y * scale) / 2 - 0.02
        };

        return group;
    }

    // Відображення геометрії з 3D-слайдером
    function displayGeometry(geometry, model, direction = 1) {
        prepareGeometry(geometry);

        const newGroup = createModelGroup(geometry);

        // Якщо це перший запуск (або немає попередньої моделі) — показуємо одразу в центрі
        if (!activeModelGroup || direction === 0) {
            if (activeModelGroup) scene.remove(activeModelGroup);
            newGroup.position.set(0, 0, 0);
            scene.add(newGroup);
            activeModelGroup = newGroup;
            gridHelper.position.y = newGroup.userData.gridY;
            updateSidebarInfo(model, 0);

            const loadingOverlay = document.getElementById('cad-loading');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            return;
        }

        // Якщо попередня анімація ще триває — миттєво завершуємо її
        if (activeSlide) {
            if (activeSlide.outgoingGroup) scene.remove(activeSlide.outgoingGroup);
            activeSlide.incomingGroup.position.set(0, 0, 0);
            activeSlide = null;
        }

        // Розраховуємо вектор зміщення вздовж горизонтальної осі огляду камери
        // Завдяки цьому нова модель ЗАВЖДИ виїжджає справа наліво або зліва направо
        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
        camRight.y = 0;
        camRight.normalize();

        const slideDistance = 5.2; // відстань для повного виїзду за межі сцени
        const offsetVec = camRight.clone().multiplyScalar(slideDistance * direction);

        // Початкова позиція нової моделі: за межами сцени з потрібного боку
        newGroup.position.copy(offsetVec);
        scene.add(newGroup);

        const outgoing = activeModelGroup;
        const incoming = newGroup;
        activeModelGroup = incoming;

        // Запуск плавного 3D-слайдера
        activeSlide = {
            startTime: performance.now(),
            duration: 440,
            outgoingGroup: outgoing,
            outgoingStart: outgoing.position.clone(),
            outgoingEnd: offsetVec.clone().negate(),
            incomingGroup: incoming,
            incomingStart: incoming.position.clone(),
            incomingEnd: new THREE.Vector3(0, 0, 0),
            startGridY: gridHelper.position.y,
            endGridY: incoming.userData.gridY
        };

        updateSidebarInfo(model, direction);

        const loadingOverlay = document.getElementById('cad-loading');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }

    // Завантаження моделі за індексом
    function loadModelByIndex(index, forceDirection) {
        if (index === currentIndex && activeModelGroup) return;

        // Визначаємо напрямок слайдера
        let direction = 1;
        if (forceDirection !== undefined) {
            direction = forceDirection;
        } else {
            // Круговий перехід (1 -> 8 або 8 -> 1)
            if (currentIndex === CAD_MODELS.length - 1 && index === 0) {
                direction = 1;
            } else if (currentIndex === 0 && index === CAD_MODELS.length - 1) {
                direction = -1;
            } else {
                direction = (index >= currentIndex) ? 1 : -1;
            }
        }

        if (index < 0) index = CAD_MODELS.length - 1;
        if (index >= CAD_MODELS.length) index = 0;
        currentIndex = index;

        const model = CAD_MODELS[currentIndex];
        const loadingOverlay = document.getElementById('cad-loading');
        const loadingText = document.getElementById('cad-loading-text');

        if (loadingOverlay && !geometryCache[model.file]) {
            loadingOverlay.style.display = 'flex';
            if (loadingText) loadingText.textContent = 'Завантаження: ' + model.shortName + '...';
        }

        if (geometryCache[model.file]) {
            displayGeometry(geometryCache[model.file], model, direction);
            return;
        }

        if (typeof THREE.STLLoader === 'undefined') {
            console.error('STLLoader не знайдено.');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            return;
        }

        const loader = new THREE.STLLoader();
        loader.load(
            model.file,
            function (geometry) {
                geometryCache[model.file] = geometry;
                displayGeometry(geometry, model, direction);
            },
            function (xhr) {
                if (xhr.lengthComputable && loadingText) {
                    const percent = Math.round((xhr.loaded / xhr.total) * 100);
                    loadingText.textContent = 'Завантаження: ' + model.shortName + ' (' + percent + '%)...';
                }
            },
            function (err) {
                console.error('Помилка завантаження ' + model.file + ':', err);
                if (loadingOverlay) loadingOverlay.style.display = 'none';
            }
        );
    }

    // Генерація 8 кнопок моделей у правій панелі
    function renderModelButtons() {
        const grid = document.getElementById('cad-models-grid');
        if (!grid) return;

        grid.innerHTML = '';
        CAD_MODELS.forEach((m, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cad-model-btn' + (idx === 0 ? ' cad-model-btn--active' : '');
            btn.dataset.index = idx;
            btn.innerHTML = `
                <span class="cad-model-btn__num">0${m.id}</span>
                <span class="cad-model-btn__name">${m.shortName}</span>
            `;
            btn.addEventListener('click', function () {
                loadModelByIndex(idx);
            });
            grid.appendChild(btn);
        });
    }

    renderModelButtons();

    // Кнопки навігації: Попередня / Наступна зі збереженням напрямку
    const prevBtn = document.getElementById('cad-prev-btn');
    const nextBtn = document.getElementById('cad-next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            loadModelByIndex(currentIndex - 1, -1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            loadModelByIndex(currentIndex + 1, 1);
        });
    }

    // Скидання ракурсу подвійним кліком
    canvas.addEventListener('dblclick', function () {
        camera.position.copy(DEFAULT_CAMERA_POS);
        if (controls) controls.target.set(0, 0, 0);
    });

    // Навігація клавіатурою
    window.addEventListener('keydown', function (e) {
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        if (e.key === 'ArrowRight') {
            loadModelByIndex(currentIndex + 1, 1);
        } else if (e.key === 'ArrowLeft') {
            loadModelByIndex(currentIndex - 1, -1);
        } else if (e.key === ' ') {
            if (controls) controls.autoRotate = !controls.autoRotate;
            e.preventDefault();
        }
    });

    // Ресайз
    function onResize() {
        const s = getContainerSize();
        if (s.w === 0 || s.h === 0) return;
        camera.aspect = s.w / s.h;
        camera.updateProjectionMatrix();
        renderer.setSize(s.w, s.h);
    }
    window.addEventListener('resize', onResize);

    // Анімаційний цикл: рендер, обертання та плавне переміщення 3D-слайдера
    function animate() {
        requestAnimationFrame(animate);

        // Обробка 3D-слайдера
        if (activeSlide) {
            const elapsed = performance.now() - activeSlide.startTime;
            const t = Math.min(1.0, elapsed / activeSlide.duration);
            // easeOutCubic (плавне плавне гальмування наприкінці)
            const p = 1 - Math.pow(1 - t, 3);

            // Виїзд старої моделі за межі сцени
            if (activeSlide.outgoingGroup) {
                activeSlide.outgoingGroup.position.lerpVectors(
                    activeSlide.outgoingStart,
                    activeSlide.outgoingEnd,
                    p
                );
            }

            // Заїзд нової моделі на сцену
            activeSlide.incomingGroup.position.lerpVectors(
                activeSlide.incomingStart,
                activeSlide.incomingEnd,
                p
            );

            // Плавне ковзання сітки підлоги
            gridHelper.position.y = activeSlide.startGridY + (activeSlide.endGridY - activeSlide.startGridY) * p;

            if (t >= 1.0) {
                // Завершення слайду
                if (activeSlide.outgoingGroup) {
                    scene.remove(activeSlide.outgoingGroup);
                }
                activeSlide.incomingGroup.position.set(0, 0, 0);
                gridHelper.position.y = activeSlide.endGridY;
                activeSlide = null;
            }
        }

        if (controls) controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Початкове завантаження (без зміщення, по центру)
    loadModelByIndex(0, 0);
})();
