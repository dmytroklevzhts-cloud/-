/**
 * ============================================================================
 * SECTION 04: TECH LAB (СВІТЛА ТЕМА)
 * Інтерактивна лабораторія технологій ОПП «ПР»
 * 1. Алгоритми (4 складні алгоритми: QuickSort, Dijkstra, BST, A* Maze)
 * 2. Бази даних (10 таблиць ER-схеми + 10 пов’язаних бізнес-сценаріїв)
 * 3. Штучний інтелект (Покрокове навчання: K-Means еволюція з кроку 1 до 4)
 * ============================================================================
 */

/** Module 04: Tech Lab */

let currentLab = 'algo'; // 'algo' | 'db' | 'ai'

// ========================================================================
// 1. ІНІЦІАЛІЗАЦІЯ
// ========================================================================
function init() {
    const tabs = document.querySelectorAll('.tech-lab-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const lab = this.getAttribute('data-lab');
            if (lab && lab !== currentLab) {
                switchLab(lab);
            }
        });
    });

    renderLab(currentLab);
}

function switchLab(lab) {
    currentLab = lab;
    document.querySelectorAll('.tech-lab-tab').forEach(t => {
        const isActive = t.getAttribute('data-lab') === lab;
        t.classList.toggle('tech-lab-tab--active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    renderLab(lab);
}

function renderLab(lab) {
    const stage = document.getElementById('tech-lab-stage');
    if (!stage) return;

    if (lab === 'algo') {
        renderAlgoLab(stage);
    } else if (lab === 'db') {
        renderDbLab(stage);
    } else if (lab === 'ai') {
        renderAiLab(stage);
    }
}

// ========================================================================
// ЛАБОРАТОРІЯ 01: 4 СКЛАДНІ АЛГОРИТМИ
// ========================================================================
let algoSubmode = 'quicksort'; // 'quicksort' | 'dijkstra' | 'bst' | 'maze'

function renderAlgoLab(stage) {
    stage.innerHTML = `
            <div class="tech-lab-layout">
                <!-- Ліва колонка: вибір алгоритму та керування ним -->
                <aside class="lab-sidebar-tools">
                    <div class="lab-sidebar-section">
                        
                        <div class="lab-sidebar-nav">
                            <button class="lab-tool-btn ${algoSubmode === 'quicksort' ? 'lab-tool-btn--active' : ''}" data-algo="quicksort">
                                <span class="lab-tool-btn__icon">📊</span>
                                <div class="lab-tool-btn__body">
                                    <span class="lab-tool-btn__title">QuickSort</span>
                                    <span class="lab-tool-btn__desc">Швидке сортування</span>
                                </div>
                            </button>
                            <button class="lab-tool-btn ${algoSubmode === 'dijkstra' ? 'lab-tool-btn--active' : ''}" data-algo="dijkstra">
                                <span class="lab-tool-btn__icon">🕸️</span>
                                <div class="lab-tool-btn__body">
                                    <span class="lab-tool-btn__title">Граф Дейкстри</span>
                                    <span class="lab-tool-btn__desc">Найкоротший шлях</span>
                                </div>
                            </button>
                            <button class="lab-tool-btn ${algoSubmode === 'bst' ? 'lab-tool-btn--active' : ''}" data-algo="bst">
                                <span class="lab-tool-btn__icon">🌳</span>
                                <div class="lab-tool-btn__body">
                                    <span class="lab-tool-btn__title">Дерево пошуку (BST)</span>
                                    <span class="lab-tool-btn__desc">Ієрархічні індекси</span>
                                </div>
                            </button>
                            <button class="lab-tool-btn ${algoSubmode === 'maze' ? 'lab-tool-btn--active' : ''}" data-algo="maze">
                                <span class="lab-tool-btn__icon">🧭</span>
                                <div class="lab-tool-btn__body">
                                    <span class="lab-tool-btn__title">Лабіринт A*</span>
                                    <span class="lab-tool-btn__desc">Евристичний пошук</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div class="lab-sidebar-section" id="algo-sidebar-actions">
                        <!-- Динамічно рендеряться інструменти керування -->
                    </div>
                </aside>

                <!-- Основне робоче полотно та аналізатор -->
                <div class="lab-content-stage" id="algo-workspace-content">
                    <!-- Динамічно рендериться активний алгоритм -->
                </div>
            </div>
        `;

    stage.querySelectorAll('.lab-tool-btn[data-algo]').forEach(btn => {
        btn.addEventListener('click', function () {
            algoSubmode = this.getAttribute('data-algo');
            renderAlgoLab(stage);
        });
    });

    renderAlgoSubmode();
}

function renderAlgoSubmode() {
    const container = document.getElementById('algo-workspace-content');
    if (!container) return;

    if (algoSubmode === 'quicksort') {
        initQuickSortView(container);
    } else if (algoSubmode === 'dijkstra') {
        initDijkstraView(container);
    } else if (algoSubmode === 'bst') {
        initBstView(container);
    } else if (algoSubmode === 'maze') {
        initMazeView(container);
    }
}

// ========================================================================
// 1. QUICKSORT (ШВИДКЕ СОРТУВАННЯ МАСИВІВ)
// ========================================================================
let sortArray = [45, 18, 85, 32, 70, 92, 14, 55, 63, 27, 76, 40, 89, 21, 68, 50];
let isSorting = false;
let sortCompCount = 0;
let sortSwapCount = 0;
let sortStatusText = 'Очікує запуску';

function initQuickSortView(container) {
    const actionsEl = document.getElementById('algo-sidebar-actions');
    if (actionsEl) {
        actionsEl.innerHTML = `
                <span class="lab-sidebar-title">⚙️ КЕРУВАННЯ </span>
                <div class="lab-action-vgroup">
                    <button class="btn-lab-action" id="btn-start-sort">
                        ▶ Запустити сортування
                    </button>
                    <button class="btn-lab-action" id="btn-shuffle-sort">
                        🔀 Перемішати масив
                    </button>
                </div>
            `;

        actionsEl.querySelector('#btn-start-sort')?.addEventListener('click', () => runSort(container));
        actionsEl.querySelector('#btn-shuffle-sort')?.addEventListener('click', () => {
            if (isSorting) return;
            sortArray = sortArray.sort(() => Math.random() - 0.5);
            sortCompCount = 0;
            sortSwapCount = 0;
            sortStatusText = 'Очікує запуску (перемішано)';
            initQuickSortView(container);
        });
    }

    container.innerHTML = `
            <div class="algo-split-container">
                <!-- Ліва панель: інтерактивна симуляція сортування -->
                <div class="algo-canvas-panel">

                    <div class="algo-canvas-box" style="flex: 1; width: 100%;">
                        <div class="sorting-bars-container" id="sorting-bars-container" style="width: 100%; height: 100%; display: flex; align-items: flex-end; justify-content: center; gap: 8px;">
                            ${sortArray.map((val, idx) => `
                                <div class="sorting-bar-col" data-idx="${idx}">
                                    <span class="sorting-bar-val">${val}</span>
                                    <div class="sorting-bar" style="height: ${val * 2.3}px;"></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>

                <!-- Права панель: інженерний інспектор QuickSort -->
                <div class="algo-side-inspector">
                    <div class="algo-inspector-head">
                        <span class="algo-inspector-title">📊 АНАЛІЗАТОР QUICKSORT</span>
                        <span class="algo-inspector-badge">Divide & Conquer</span>
                    </div>

                    <!-- Результат сортування -->
                    <div class="algo-result-card">
                        <div class="algo-result-label">Поточний стан масиву:</div>
                        <div class="algo-result-val" id="sort-result-status">${sortStatusText}</div>
                        <div class="algo-result-sub">Швидкість: <strong>O(n log n)</strong> | Стек: <strong>O(log n)</strong> | Елементів: <strong>16</strong></div>
                    </div>

                    <div class="db-sidebar-stat-card" style="margin-top: 4px;">
                        <span class="db-stat-icon">📊</span>
                        <div class="db-stat-info">
                            <strong>${sortArray.length} елементів масиву</strong>
                            <span>Порівнянь: <b id="sort-comps-val">${sortCompCount}</b> · Обмінів: <b id="sort-swaps-val">${sortSwapCount}</b></span>
                        </div>
                    </div>

                    <!-- Характеристики алгоритму -->
                    <div class="algo-guide-box">
                        <div class="algo-guide-title">⚡ Теоретичні метрики складності</div>
                        <div class="algo-guide-text">
                            • Найкращий час: <code>Ω(n log n)</code><br>
                            • Середній час: <code>Θ(n log n)</code><br>
                            • Найгірший час: <code>O(n²)</code> (вироджений випадок)<br>
                            • Просторова складність: <code>O(log n)</code> додаткової пам'яті під стек.
                        </div>
                    </div>
                    
                    <!-- Розвантажені інформаційні картки на вільних полях знизу полотна -->

                    <div class="ai-margin-card">
                        <div class="ai-margin-card__header">
                            <span class="ai-margin-card__icon">📖</span>
                            <span class="ai-margin-card__title">Принцип роботи та кольори полотна</span>
                        </div>
                        <div class="ai-margin-card__body">
                            <strong>QuickSort (Швидке сортування)</strong> працює за принципом <em>«Розділяй і володарюй»</em>: обирає опорний елемент (<strong>Pivot</strong>), ділить масив на дві половини (менші та більші) і рекурсивно їх впорядковує.
                        </div>
                    </div>


                    <div class="ai-inspector-quick-card">
                        <div class="ai-inspector-quick-title">💡 Живе сортування</div>
                        <div class="ai-inspector-quick-desc">
                            Натисніть «▶ Запустити сортування» в лівій колонці для спостереження покрокового розбиття масиву на піддіапазони наживо.
                        </div>
                    </div>
                </div>
            </div>
        `;
}

function runSort(container) {
    if (isSorting) return;
    isSorting = true;
    sortCompCount = 0;
    sortSwapCount = 0;

    const btn = document.getElementById('btn-start-sort');
    const statusEl = container.querySelector('#sort-result-status');
    const compsEl = document.getElementById('sort-comps-val');
    const swapsEl = document.getElementById('sort-swaps-val');

    if (btn) {
        btn.disabled = true;
        btn.textContent = '● Сортування...';
    }
    if (statusEl) statusEl.textContent = '● Процес порівняння та розбиття...';

    const cols = container.querySelectorAll('.sorting-bar-col');
    let arr = [...sortArray];
    let i = 0, j = 0;

    function step() {
        if (i < arr.length) {
            if (j < arr.length - i - 1) {
                cols.forEach(c => c.querySelector('.sorting-bar')?.classList.remove('is-comparing', 'is-swapping'));
                const bar1 = cols[j]?.querySelector('.sorting-bar');
                const bar2 = cols[j + 1]?.querySelector('.sorting-bar');
                bar1?.classList.add('is-comparing');
                bar2?.classList.add('is-comparing');
                sortCompCount++;
                if (compsEl) compsEl.textContent = sortCompCount;

                if (arr[j] > arr[j + 1]) {
                    bar1?.classList.add('is-swapping');
                    bar2?.classList.add('is-swapping');
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    sortSwapCount++;
                    if (swapsEl) swapsEl.textContent = sortSwapCount;

                    cols[j].querySelector('.sorting-bar-val').textContent = arr[j];
                    bar1.style.height = `${arr[j] * 2.3}px`;
                    cols[j + 1].querySelector('.sorting-bar-val').textContent = arr[j + 1];
                    bar2.style.height = `${arr[j + 1] * 2.3}px`;
                }
                j++;
                setTimeout(step, 45);
            } else {
                cols[arr.length - i - 1]?.querySelector('.sorting-bar')?.classList.add('is-sorted');
                j = 0;
                i++;
                setTimeout(step, 30);
            }
        } else {
            cols.forEach(c => c.querySelector('.sorting-bar').className = 'sorting-bar is-sorted');
            isSorting = false;
            sortStatusText = `✔ Масив відсортовано!`;
            if (statusEl) statusEl.textContent = sortStatusText;
            if (btn) {
                btn.disabled = false;
                btn.textContent = '✔ Відсортовано!';
            }
        }
    }
    step();
}

// ========================================================================
// 2. DIJKSTRA GRAPH (СПРОЩЕНА ПАНЕЛЬ РЕЗУЛЬТАТУ + ПОВНЕ ПОЯСНЕННЯ)
// ========================================================================
let dijkstraNodes = [
    { id: 'A', name: 'A', label: 'Сервер (A)', x: 70, y: 175, isStart: true },
    { id: 'B', name: 'B', label: 'Шлюз ЦК (B)', x: 210, y: 75 },
    { id: 'C', name: 'C', label: 'Комутатор 1 (C)', x: 210, y: 275 },
    { id: 'D', name: 'D', label: 'Маршрутизатор (D)', x: 400, y: 65 },
    { id: 'E', name: 'E', label: 'Проксі (E)', x: 400, y: 175 },
    { id: 'F', name: 'F', label: 'Комутатор 2 (F)', x: 400, y: 285 },
    { id: 'G', name: 'G', label: 'Хмара (G)', x: 590, y: 95 },
    { id: 'H', name: 'H', label: 'База даних (H)', x: 590, y: 255 },
    { id: 'T', name: 'T', label: 'IT-Лаб (T)', x: 770, y: 175, isTarget: true }
];

let dijkstraEdges = [
    ['A', 'B', 3], ['A', 'C', 5],
    ['B', 'D', 4], ['B', 'E', 2],
    ['C', 'E', 6], ['C', 'F', 3],
    ['D', 'G', 4], ['E', 'D', 2],
    ['E', 'G', 5], ['E', 'H', 3],
    ['F', 'H', 4], ['G', 'T', 3],
    ['H', 'T', 2], ['D', 'T', 7]
];

let dijkstraTarget = 'T';
let dijkstraStart = 'A';
let dijkstraDraggedNodeId = null;
let dijkstraStartDragX = 0;
let dijkstraStartDragY = 0;
let dijkstraHasMoved = false;

function solveDijkstra(startId, targetId) {
    const nodeIds = dijkstraNodes.map(n => n.id);
    const adj = {};
    nodeIds.forEach(id => { adj[id] = []; });
    dijkstraEdges.forEach(([u, v, w]) => {
        if (adj[u] && adj[v]) {
            adj[u].push({ to: v, weight: w });
            adj[v].push({ to: u, weight: w });
        }
    });

    const dist = {};
    const prev = {};
    const visited = new Set();

    nodeIds.forEach(id => {
        dist[id] = Infinity;
        prev[id] = null;
    });
    dist[startId] = 0;

    while (visited.size < nodeIds.length) {
        let u = null;
        let minDist = Infinity;
        for (const id of nodeIds) {
            if (!visited.has(id) && dist[id] < minDist) {
                minDist = dist[id];
                u = id;
            }
        }

        if (!u || minDist === Infinity) break;
        visited.add(u);
        if (u === targetId) break;

        for (const edge of adj[u]) {
            if (!visited.has(edge.to)) {
                const alt = dist[u] + edge.weight;
                if (alt < dist[edge.to]) {
                    dist[edge.to] = alt;
                    prev[edge.to] = u;
                }
            }
        }
    }

    const path = [];
    let curr = targetId;
    while (curr) {
        path.unshift(curr);
        curr = prev[curr];
    }
    if (path.length && path[0] !== startId) path.length = 0;

    return {
        dist,
        prev,
        path,
        totalDist: dist[targetId] !== Infinity ? dist[targetId] : 0
    };
}

function initDijkstraView(container) {
    const result = solveDijkstra(dijkstraStart, dijkstraTarget);
    const targetNode = dijkstraNodes.find(n => n.id === dijkstraTarget);

    const actionsEl = document.getElementById('algo-sidebar-actions');
    if (actionsEl) {
        actionsEl.innerHTML = `
                <span class="lab-sidebar-title">🎯 ЦІЛЬОВИЙ ВУЗОЛ</span>
                <div class="dijkstra-target-grid">
                    ${dijkstraNodes.filter(n => n.id !== dijkstraStart).map(n => `
                        <button class="btn-lab-action ${dijkstraTarget === n.id ? 'btn-lab-action--active' : ''} btn-dijkstra-target" data-target="${n.id}">
                            ${n.id}
                        </button>
                    `).join('')}
                </div>
                <span class="lab-sidebar-title" style="margin-top: 8px;">⚙️ МЕРЕЖА</span>
                <div class="lab-action-vgroup">
                    <button class="btn-lab-action" id="btn-dijkstra-rand-weights">🎲 Нові ваги ребер</button>
                    <button class="btn-lab-action" id="btn-dijkstra-reset-pos">🔄 Скинути сітку</button>
                </div>
                <div class="db-sidebar-stat-card" style="margin-top: 4px;">
                    <span class="db-stat-icon">🕸️</span>
                    <div class="db-stat-info">
                        <strong>Ціль: ${targetNode ? targetNode.label : dijkstraTarget}</strong>
                        <span>Шлях: <b>${result.totalDist} од.</b> (${Math.max(0, result.path.length - 1)} кр.)</span>
                    </div>
                </div>
            `;

        actionsEl.querySelectorAll('.btn-dijkstra-target').forEach(btn => {
            btn.onclick = () => {
                dijkstraTarget = btn.getAttribute('data-target');
                initDijkstraView(container);
            };
        });

        actionsEl.querySelector('#btn-dijkstra-rand-weights')?.addEventListener('click', () => {
            dijkstraEdges.forEach(e => {
                e[2] = Math.floor(Math.random() * 8) + 1;
            });
            initDijkstraView(container);
        });

        actionsEl.querySelector('#btn-dijkstra-reset-pos')?.addEventListener('click', () => {
            dijkstraNodes = [
                { id: 'A', name: 'A', label: 'Сервер (A)', x: 70, y: 175, isStart: true },
                { id: 'B', name: 'B', label: 'Шлюз ЦК (B)', x: 210, y: 75 },
                { id: 'C', name: 'C', label: 'Комутатор 1 (C)', x: 210, y: 275 },
                { id: 'D', name: 'D', label: 'Маршрутизатор (D)', x: 400, y: 65 },
                { id: 'E', name: 'E', label: 'Проксі (E)', x: 400, y: 175 },
                { id: 'F', name: 'F', label: 'Комутатор 2 (F)', x: 400, y: 285 },
                { id: 'G', name: 'G', label: 'Хмара (G)', x: 590, y: 95 },
                { id: 'H', name: 'H', label: 'База даних (H)', x: 590, y: 255 },
                { id: 'T', name: 'T', label: 'IT-Лаб (T)', x: 770, y: 175, isTarget: true }
            ];
            initDijkstraView(container);
        });
    }

    container.innerHTML = `
            <div class="algo-split-container">
                <!-- Ліва панель: інтерактивний граф мережі -->
                <div class="algo-canvas-panel">
                    <div class="tech-lab-canvas-top-bar">
                        <div class="tech-lab-canvas-title">
                            <span class="tech-lab-canvas-dot"></span>
                            <span>Топологія графа мережі (Алгоритм Дейкстри)</span>
                        </div>
                        <div class="tech-lab-canvas-metrics">
                            Ціль: <strong>${dijkstraTarget}</strong> | Довжина: <strong>${result.totalDist} од.</strong> | Переходів: <strong>${Math.max(0, result.path.length - 1)}</strong>
                        </div>
                    </div>

                    <div class="algo-canvas-box" style="flex: 1; width: 100%;">
                        <svg id="dijkstra-svg" viewBox="0 0 850 330" style="width: 100%; height: 100%; cursor: default; user-select: none; flex: 1;">
                            <defs>
                                <filter id="dijkstra-glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <!-- Ребра графа -->
                            <g id="dijkstra-edges-group">
                                ${dijkstraEdges.map(([uId, vId, w]) => {
        const u = dijkstraNodes.find(n => n.id === uId);
        const v = dijkstraNodes.find(n => n.id === vId);
        if (!u || !v) return '';

        const inPath = result.path.length > 1 &&
            result.path.some((node, i) =>
                (result.path[i] === uId && result.path[i + 1] === vId) ||
                (result.path[i] === vId && result.path[i + 1] === uId)
            );

        const mx = (u.x + v.x) / 2;
        const my = (u.y + v.y) / 2;

        return `
                                        <g class="dijkstra-edge-item">
                                            ${inPath ? `
                                                <line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}"
                                                      stroke="#DDD6FE" stroke-width="8" stroke-linecap="round" filter="url(#dijkstra-glow)" />
                                            ` : ''}
                                            <line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}"
                                                  stroke="${inPath ? '#7C3AED' : '#CBD5E1'}"
                                                  stroke-width="${inPath ? '3.5' : '2'}"
                                                  ${inPath ? 'stroke-dasharray="8 5" style="animation: dbFlowDash 0.8s linear infinite;"' : ''} />
                                            <rect x="${mx - 11}" y="${my - 9}" width="22" height="18" rx="4"
                                                  fill="#FFFFFF" stroke="${inPath ? '#7C3AED' : '#CBD5E1'}" stroke-width="1.5" />
                                            <text x="${mx}" y="${my + 4}" font-size="10" font-weight="800"
                                                  fill="${inPath ? '#7C3AED' : '#475569'}" text-anchor="middle">${w}</text>
                                        </g>
                                    `;
    }).join('')}
                            </g>

                            <!-- Вершини графа -->
                            <g id="dijkstra-nodes-group">
                                ${dijkstraNodes.map(n => {
        const isStart = n.id === dijkstraStart;
        const isTarget = n.id === dijkstraTarget;
        const inPath = result.path.includes(n.id);
        const distVal = result.dist[n.id] !== Infinity ? result.dist[n.id] : '∞';

        let fill = '#FFFFFF';
        let stroke = '#94A3B8';
        let tf = '#0F172A';

        if (isStart) {
            fill = '#10B981'; stroke = '#059669'; tf = '#FFFFFF';
        } else if (isTarget) {
            fill = '#EF4444'; stroke = '#DC2626'; tf = '#FFFFFF';
        } else if (inPath) {
            fill = '#7C3AED'; stroke = '#6D28D9'; tf = '#FFFFFF';
        }

        return `
                                        <g class="dijkstra-node-group" data-node-id="${n.id}" style="cursor: grab;">
                                            <circle cx="${n.x}" cy="${n.y}" r="21"
                                                    fill="${fill}" stroke="${stroke}" stroke-width="${inPath || isStart || isTarget ? '3' : '2'}"
                                                    filter="drop-shadow(0 2px 5px rgba(0,0,0,0.1))" />
                                            <text x="${n.x}" y="${n.y + 4.5}" font-size="12.5" font-weight="900"
                                                  fill="${tf}" text-anchor="middle" pointer-events="none">${n.name}</text>
                                            <rect x="${n.x - 28}" y="${n.y + 24}" width="56" height="15" rx="3"
                                                  fill="${inPath ? '#F5F3FF' : '#FFFFFF'}" stroke="${inPath ? '#7C3AED' : '#E2E8F0'}" stroke-width="1" />
                                            <text x="${n.x}" y="${n.y + 34.5}" font-size="8.5" font-weight="800"
                                                  fill="${inPath ? '#7C3AED' : '#64748B'}" text-anchor="middle" pointer-events="none">
                                                ${isStart ? 'СТАРТ (0)' : isTarget ? `ЦІЛЬ (${distVal})` : `d: ${distVal}`}
                                            </text>
                                        </g>
                                    `;
    }).join('')}
                            </g>
                        </svg>
                    </div>

                    <!-- Розвантажені інформаційні картки на вільних полях знизу полотна -->
                    <div class="tech-lab-margin-info">
                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">📖</span>
                                <span class="ai-margin-card__title">Принцип роботи та ваги ребер</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <strong>Алгоритм Дейкстри</strong> знаходить оптимальний маршрут у зваженому графі, жадібно обираючи найближчі невідвідані вузли та гарантуючи мінімальну суму ваг ребер.
                                <div class="algo-legend-row" style="margin-top: 6px;">
                                    <span class="algo-legend-pill">🟢 <strong>A:</strong> старт</span>
                                    <span class="algo-legend-pill">🔴 <strong>${dijkstraTarget}:</strong> ціль</span>
                                    <span class="algo-legend-pill">🟣 <strong>Лінія:</strong> шлях</span>
                                    <span class="algo-legend-pill">🔢 <strong>Числа:</strong> ваги</span>
                                </div>
                            </div>
                        </div>

                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">🚀</span>
                                <span class="ai-margin-card__title">Застосування в IT-індустрії</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <ul class="ai-margin-list">
                                    <li><strong>Мережева інфраструктура:</strong> маршрутизація <strong>OSPF та IS-IS</strong> у Cisco / Juniper.</li>
                                    <li><strong>Гео-сервіси:</strong> розрахунок авто-маршрутів у Google Maps, Waze та OpenStreetMap.</li>
                                    <li><strong>Ігрові рушії:</strong> побудова навігаційних сіток для ботів (Unreal Engine, Unity).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Права панель: інженерний інспектор Дейкстри -->
                <div class="algo-side-inspector">
                    <div class="algo-inspector-head">
                        <span class="algo-inspector-title">🕸️ АНАЛІЗАТОР ДЕЙКСТРИ</span>
                        <span class="algo-inspector-badge">Shortest Path</span>
                    </div>

                    <!-- Результат розрахунку -->
                    <div class="algo-result-card">
                        <div class="algo-result-label">Найкоротший шлях (${dijkstraStart} ➔ ${dijkstraTarget}):</div>
                        <div class="algo-result-val">${result.path.join(' ➔ ') || 'Не знайдено'}</div>
                        <div class="algo-result-sub">
                            Сумарна довжина (вага): <strong>${result.totalDist} од.</strong> | Переходів: <strong>${Math.max(0, result.path.length - 1)}</strong>
                        </div>
                    </div>

                    <!-- Покрокова таблиця відстаней -->
                    <div class="algo-guide-box">
                        <div class="algo-guide-title">📊 Найкоротші відстані від Server (A)</div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 4px;">
                            ${Object.entries(result.dist).filter(([k]) => k !== 'A').map(([node, d]) => `
                                <div style="padding: 3px 6px; background: #FFFFFF; border: 1px solid ${result.path.includes(node) ? '#7C3AED' : '#E2E8F0'}; border-radius: 5px; font-size: 11px; text-align: center;">
                                    <strong>${node}:</strong> ${d !== Infinity ? d : '∞'}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="ai-inspector-quick-card">
                        <div class="ai-inspector-quick-title">💡 Інтерактивна топологія</div>
                        <div class="ai-inspector-quick-desc">
                            Перетягуйте вершини мишкою по полотну або клікайте на вузли в лівій колонці для миттєвого перерахунку найкоротшого шляху.
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Drag & Drop вузлів графа
    const svg = container.querySelector('#dijkstra-svg');
    if (svg) {
        container.querySelectorAll('.dijkstra-node-group').forEach(g => {
            g.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dijkstraDraggedNodeId = g.getAttribute('data-node-id');
                dijkstraStartDragX = e.clientX;
                dijkstraStartDragY = e.clientY;
                dijkstraHasMoved = false;
            });
        });

        if (!window._dijkstraDragListenersAttached) {
            window._dijkstraDragListenersAttached = true;

            window.addEventListener('mousemove', (e) => {
                if (!dijkstraDraggedNodeId) return;
                const dSvg = document.getElementById('dijkstra-svg');
                if (!dSvg) return;

                const dx = Math.abs(e.clientX - dijkstraStartDragX);
                const dy = Math.abs(e.clientY - dijkstraStartDragY);
                if (dx > 3 || dy > 3) dijkstraHasMoved = true;

                if (dijkstraHasMoved) {
                    const rect = dSvg.getBoundingClientRect();
                    const scaleX = 850 / rect.width;
                    const scaleY = 330 / rect.height;
                    const x = (e.clientX - rect.left) * scaleX;
                    const y = (e.clientY - rect.top) * scaleY;

                    const node = dijkstraNodes.find(n => n.id === dijkstraDraggedNodeId);
                    if (node) {
                        node.x = Math.max(35, Math.min(815, x));
                        node.y = Math.max(30, Math.min(295, y));
                        const host = document.getElementById('algo-workspace-content');
                        if (host) initDijkstraView(host);
                    }
                }
            });

            window.addEventListener('mouseup', () => {
                if (!dijkstraDraggedNodeId) return;
                if (!dijkstraHasMoved) {
                    // Звичайний клік по вершині: обираємо як нову ціль
                    if (dijkstraDraggedNodeId !== dijkstraStart) {
                        dijkstraTarget = dijkstraDraggedNodeId;
                        const host = document.getElementById('algo-workspace-content');
                        if (host) initDijkstraView(host);
                    }
                }
                dijkstraDraggedNodeId = null;
                dijkstraHasMoved = false;
            });
        }
    }
}

// ========================================================================
// 3. BINARY SEARCH TREE (BST — ДЕРЕВО БІНАРНОГО ПОШУКУ)
// ========================================================================
let bstKeys = [50, 30, 70, 20, 40, 60, 80, 35, 65];
let bstSearchTarget = 35;
let bstActivePath = [50, 30, 40, 35];
let bstFoundTarget = 35;
let bstTraversalPills = [20, 30, 35, 40, 50, 60, 65, 70, 80];
let bstTraversalName = 'In-Order (Сортована послідовність L-N-R)';

class BstNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
        this.depth = 0;
    }
}

function buildBstFromKeys(keys) {
    let root = null;
    function insertNode(curr, val) {
        if (!curr) return new BstNode(val);
        if (val < curr.val) curr.left = insertNode(curr.left, val);
        else if (val > curr.val) curr.right = insertNode(curr.right, val);
        return curr;
    }
    keys.forEach(k => { root = insertNode(root, k); });
    return root;
}

function computeBstPositions(root) {
    if (!root) return;
    function layout(node, depth, minX, maxX) {
        if (!node) return;
        node.depth = depth;
        node.x = (minX + maxX) / 2;
        node.y = 35 + depth * 62;
        layout(node.left, depth + 1, minX, node.x);
        layout(node.right, depth + 1, node.x, maxX);
    }
    layout(root, 0, 40, 810);
}

function getBstHeight(root) {
    if (!root) return 0;
    return 1 + Math.max(getBstHeight(root.left), getBstHeight(root.right));
}

function getBstNodesList(root) {
    const list = [];
    function dfs(node) {
        if (!node) return;
        list.push(node);
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return list;
}

function getBstInOrder(root) {
    const res = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        res.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return res;
}

function getBstPreOrder(root) {
    const res = [];
    function traverse(node) {
        if (!node) return;
        res.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return res;
}

function getBstPostOrder(root) {
    const res = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        res.push(node.val);
    }
    traverse(root);
    return res;
}

function initBstView(container) {
    const root = buildBstFromKeys(bstKeys);
    computeBstPositions(root);
    const allNodes = getBstNodesList(root);
    const treeHeight = getBstHeight(root);
    const inOrderArr = getBstInOrder(root);

    const edges = [];
    function collectEdges(node) {
        if (!node) return;
        if (node.left) {
            edges.push({ p: node, c: node.left, dir: '<' });
            collectEdges(node.left);
        }
        if (node.right) {
            edges.push({ p: node, c: node.right, dir: '>' });
            collectEdges(node.right);
        }
    }
    collectEdges(root);

    const actionsEl = document.getElementById('algo-sidebar-actions');
    if (actionsEl) {
        actionsEl.innerHTML = `
                <span class="lab-sidebar-title">➕ ОПЕРАЦІЇ З ДЕРЕВОМ</span>
                <div style="display: flex; gap: 4px; margin-bottom: 4px;">
                    <input type="number" id="bst-input-val" value="${Math.floor(Math.random() * 85) + 10}" min="1" max="99"
                           style="width: 48px; padding: 4px 6px; font-size: 11px; font-weight: 800; border: 1.5px solid #CBD5E1; border-radius: 6px; font-family: ui-monospace, monospace; text-align: center;">
                    <button class="btn-lab-action btn-lab-action--primary" id="btn-bst-add" style="flex: 1; padding: 0 6px; font-size: 11px;">➕ Вставити</button>
                    <button class="btn-lab-action" id="btn-bst-find" style="flex: 1; padding: 0 6px; font-size: 11px;">🔍 Знайти</button>
                </div>
                <span class="lab-sidebar-title" style="margin-top: 6px;">📋 ОБХІД ДЕРЕВА</span>
                <div style="display: flex; gap: 4px; margin-bottom: 4px;">
                    <button class="btn-lab-action" id="btn-bst-inorder" style="flex: 1; padding: 0 4px; font-size: 10.5px; justify-content: center;">In-Order</button>
                    <button class="btn-lab-action" id="btn-bst-preorder" style="flex: 1; padding: 0 4px; font-size: 10.5px; justify-content: center;">Pre-Order</button>
                    <button class="btn-lab-action" id="btn-bst-postorder" style="flex: 1; padding: 0 4px; font-size: 10.5px; justify-content: center;">Post-Order</button>
                </div>
                <span class="lab-sidebar-title" style="margin-top: 6px;">🌲 ПРЕСЕТИ ДАНИХ</span>
                <div class="lab-action-vgroup">
                    <button class="btn-lab-action" id="btn-bst-preset-std">🌳 Збалансоване (9 вузлів)</button>
                    <button class="btn-lab-action" id="btn-bst-preset-large">🌲 Велике (13 вузлів)</button>
                    <button class="btn-lab-action" id="btn-bst-preset-linear">📉 Вироджене (Linear O(n))</button>
                    <button class="btn-lab-action" id="btn-bst-reset">🧹 Очистити дерево</button>
                </div>
                <div class="db-sidebar-stat-card" style="margin-top: 4px;">
                    <span class="db-stat-icon">🌳</span>
                    <div class="db-stat-info">
                        <strong>${allNodes.length} вузлів · Висота ${treeHeight}</strong>
                        <span>Пошук: <b>O(log n)</b> кроків</span>
                    </div>
                </div>
            `;

        const btnAdd = actionsEl.querySelector('#btn-bst-add');
        const inputVal = actionsEl.querySelector('#bst-input-val');
        if (btnAdd && inputVal) {
            btnAdd.onclick = () => {
                const v = parseInt(inputVal.value, 10);
                if (!isNaN(v) && v > 0 && v < 100) executeInsert(v);
            };
        }

        const btnFind = actionsEl.querySelector('#btn-bst-find');
        if (btnFind && inputVal) {
            btnFind.onclick = () => {
                const v = parseInt(inputVal.value, 10);
                if (!isNaN(v)) executeSearch(v);
            };
        }

        actionsEl.querySelector('#btn-bst-inorder')?.addEventListener('click', () => {
            bstTraversalPills = inOrderArr;
            bstTraversalName = 'In-Order Обхід (L-N-R, Сортований ряд)';
            bstActivePath = inOrderArr;
            bstFoundTarget = null;
            initBstView(container);
        });

        actionsEl.querySelector('#btn-bst-preorder')?.addEventListener('click', () => {
            const pre = getBstPreOrder(root);
            bstTraversalPills = pre;
            bstTraversalName = 'Pre-Order Обхід (N-L-R, Прямий порядок)';
            bstActivePath = pre;
            bstFoundTarget = null;
            initBstView(container);
        });

        actionsEl.querySelector('#btn-bst-postorder')?.addEventListener('click', () => {
            const post = getBstPostOrder(root);
            bstTraversalPills = post;
            bstTraversalName = 'Post-Order Обхід (L-R-N, Зворотний порядок)';
            bstActivePath = post;
            bstFoundTarget = null;
            initBstView(container);
        });

        actionsEl.querySelector('#btn-bst-preset-std')?.addEventListener('click', () => {
            bstKeys = [50, 30, 70, 20, 40, 60, 80, 35, 65];
            executeSearch(35);
        });

        actionsEl.querySelector('#btn-bst-preset-large')?.addEventListener('click', () => {
            bstKeys = [50, 25, 75, 15, 35, 65, 85, 10, 20, 30, 40, 60, 90];
            executeSearch(40);
        });

        actionsEl.querySelector('#btn-bst-preset-linear')?.addEventListener('click', () => {
            bstKeys = [15, 25, 35, 45, 55, 65, 75];
            executeSearch(75);
        });

        actionsEl.querySelector('#btn-bst-reset')?.addEventListener('click', () => {
            bstKeys = [50];
            executeSearch(50);
        });
    }

    container.innerHTML = `
            <div class="algo-split-container">
                <!-- Ліва панель: інтерактивне бінарне дерево -->
                <div class="algo-canvas-panel">
                    <div class="tech-lab-canvas-top-bar">
                        <div class="tech-lab-canvas-title">
                            <span class="tech-lab-canvas-dot"></span>
                            <span>Ієрархічне бінарне дерево пошуку (BST)</span>
                        </div>
                        <div class="tech-lab-canvas-metrics">
                            Висота h: <strong>${treeHeight}</strong> | Вузлів n: <strong>${allNodes.length}</strong>
                        </div>
                    </div>

                    <div class="algo-canvas-box" style="flex: 1; width: 100%;">
                        <svg viewBox="0 0 850 280" style="width: 100%; height: 100%; user-select: none; flex: 1;">
                            <defs>
                                <filter id="bst-glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <!-- Гілки дерева -->
                            <g>
                                ${edges.map(e => {
        const inPath = bstActivePath.includes(e.p.val) && bstActivePath.includes(e.c.val);
        const mx = (e.p.x + e.c.x) / 2;
        const my = (e.p.y + e.c.y) / 2;

        return `
                                        <g>
                                            ${inPath ? `
                                                <line x1="${e.p.x}" y1="${e.p.y + 18}" x2="${e.c.x}" y2="${e.c.y - 18}"
                                                      stroke="#DDD6FE" stroke-width="7" stroke-linecap="round" filter="url(#bst-glow)" />
                                            ` : ''}
                                            <line x1="${e.p.x}" y1="${e.p.y + 18}" x2="${e.c.x}" y2="${e.c.y - 18}"
                                                  stroke="${inPath ? '#7C3AED' : '#CBD5E1'}"
                                                  stroke-width="${inPath ? '3.5' : '2'}" />
                                            <rect x="${mx - 8}" y="${my - 8}" width="16" height="15" rx="3"
                                                  fill="#FFFFFF" stroke="${inPath ? '#7C3AED' : '#CBD5E1'}" stroke-width="1" />
                                            <text x="${mx}" y="${my + 3}" font-size="9" font-weight="800"
                                                  fill="${inPath ? '#7C3AED' : '#64748B'}" text-anchor="middle">${e.dir}</text>
                                        </g>
                                    `;
    }).join('')}
                            </g>

                            <!-- Вузли дерева -->
                            <g>
                                ${allNodes.map(node => {
        const inPath = bstActivePath.includes(node.val);
        const isFound = bstFoundTarget === node.val;
        const isRoot = node === root;

        let fill = '#FFFFFF';
        let stroke = '#94A3B8';
        let tf = '#0F172A';

        if (isFound) {
            fill = '#10B981'; stroke = '#059669'; tf = '#FFFFFF';
        } else if (inPath) {
            fill = '#7C3AED'; stroke = '#6D28D9'; tf = '#FFFFFF';
        }

        return `
                                        <g class="bst-node-group" data-val="${node.val}" style="cursor: pointer;">
                                            <circle cx="${node.x}" cy="${node.y}" r="19"
                                                    fill="${fill}" stroke="${stroke}" stroke-width="${isFound || inPath ? '3' : '2'}"
                                                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
                                            <text x="${node.x}" y="${node.y + 4.5}" font-size="11.5" font-weight="900"
                                                  fill="${tf}" text-anchor="middle" pointer-events="none">${node.val}</text>
                                            ${isRoot ? `
                                                <rect x="${node.x - 24}" y="${node.y - 32}" width="48" height="13" rx="3" fill="#EDE9FE" />
                                                <text x="${node.x}" y="${node.y - 23}" font-size="8" font-weight="800" fill="#7C3AED" text-anchor="middle">КОРІНЬ</text>
                                            ` : ''}
                                        </g>
                                    `;
    }).join('')}
                            </g>
                        </svg>

                        <!-- Нижня стрічка сортованого масиву -->
                        <div class="bst-traversal-bar">
                            <span style="font-size: 10px; font-weight: 800; color: #475569; white-space: nowrap;">
                                ${bstTraversalName}:
                            </span>
                            ${bstTraversalPills.map(val => `
                                <span class="bst-strip-pill ${bstFoundTarget === val ? 'bst-strip-pill--found' : bstActivePath.includes(val) ? 'bst-strip-pill--active' : ''}">
                                    ${val}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Розвантажені інформаційні картки на вільних полях знизу полотна -->
                    <div class="tech-lab-margin-info">
                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">📖</span>
                                <span class="ai-margin-card__title">Принцип роботи бінарного дерева</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <strong>BST</strong> зберігає ключі впорядковано: ліві нащадки менші, праві — більші. Це скорочує пошук до <strong>O(log n)</strong>, відсікаючи 50% даних на кожному кроці.
                                <div class="algo-legend-row" style="margin-top: 6px;">
                                    <span class="algo-legend-pill">🟣 <strong>Фіолетовий:</strong> шлях пошуку</span>
                                    <span class="algo-legend-pill">🟢 <strong>Зелений:</strong> знайдений</span>
                                    <span class="algo-legend-pill">📋 <strong>Стрічка:</strong> In-Order ряд</span>
                                </div>
                            </div>
                        </div>

                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">🚀</span>
                                <span class="ai-margin-card__title">Застосування в IT-індустрії</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <ul class="ai-margin-list">
                                    <li><strong>Індекси СУБД:</strong> B-Tree індексація у PostgreSQL, MySQL InnoDB.</li>
                                    <li><strong>Компілятори:</strong> абстрактні синтаксичні дерева (AST) у Babel, TypeScript, LLVM.</li>
                                    <li><strong>Файлові системи:</strong> швидке деревоподібне дерево каталогів у NTFS, Ext4, APFS.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Права панель: інженерний інспектор BST -->
                <div class="algo-side-inspector">
                    <div class="algo-inspector-head">
                        <span class="algo-inspector-title">🌳 АНАЛІЗАТОР ДЕРЕВА ПОШУКУ</span>
                        <span class="algo-inspector-badge">O(log n) Search</span>
                    </div>

                    <!-- Результат пошуку -->
                    <div class="algo-result-card">
                        <div class="algo-result-label">Траєкторія порівнянь:</div>
                        <div class="algo-result-val">${bstActivePath.join(' ➔ ') || '—'}</div>
                        <div class="algo-result-sub">
                            ${bstFoundTarget !== null ? `✔ Ключ ${bstFoundTarget} знайдено` : `✔ Повний обхід: ${bstTraversalPills.length} вузлів`} | Порівнянь: <strong>${bstActivePath.length}</strong>
                        </div>
                    </div>

                    <!-- Теоретична складність -->
                    <div class="algo-guide-box">
                        <div class="algo-guide-title">⚡ Складність операцій BST</div>
                        <div class="algo-guide-text">
                            • Пошук у збалансованому дереві: <code>O(log n)</code><br>
                            • Вставка нового елемента: <code>O(log n)</code><br>
                            • Найгірший випадок (вироджене дерево): <code>O(n)</code> (потребує балансування AVL / Red-Black).
                        </div>
                    </div>

                    <div class="ai-inspector-quick-card">
                        <div class="ai-inspector-quick-title">💡 Інтерактивне дерево</div>
                        <div class="ai-inspector-quick-desc">
                            Клікайте по будь-якому вузлу або введіть число ліворуч, щоб спостерігати шлях спусків ліворуч/праворуч наживо.
                        </div>
                    </div>
                </div>
            </div>
        `;

    function executeSearch(targetVal) {
        bstSearchTarget = targetVal;
        bstActivePath = [];
        bstFoundTarget = null;

        let curr = root;
        while (curr) {
            bstActivePath.push(curr.val);
            if (targetVal === curr.val) {
                bstFoundTarget = curr.val;
                break;
            } else if (targetVal < curr.val) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
        bstTraversalName = 'In-Order (Сортована послідовність L-N-R)';
        initBstView(container);
    }

    function executeInsert(val) {
        if (bstKeys.includes(val)) {
            executeSearch(val);
            return;
        }

        bstSearchTarget = val;
        bstActivePath = [];

        let curr = root;
        while (curr) {
            bstActivePath.push(curr.val);
            if (val < curr.val) {
                if (!curr.left) break;
                curr = curr.left;
            } else {
                if (!curr.right) break;
                curr = curr.right;
            }
        }

        bstKeys.push(val);
        bstActivePath.push(val);
        bstFoundTarget = val;
        bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
        bstTraversalName = 'In-Order (Сортована послідовність L-N-R)';
        initBstView(container);
    }

    container.querySelectorAll('.bst-node-group').forEach(g => {
        g.onclick = () => {
            const val = parseInt(g.getAttribute('data-val'), 10);
            executeSearch(val);
        };
    });
}

// ========================================================================
// 4. A* MAZE GRID (ЛАБІРИНТ ТА ЕВРИСТИЧНИЙ ПОШУК A-STAR)
// ========================================================================
const MAZE_COLS = 16;
const MAZE_ROWS = 7;
let mazeWalls = new Set(['3,1', '3,2', '3,3', '3,4', '7,2', '7,3', '7,4', '7,5', '11,1', '11,2', '11,3', '11,4']);
let mazePath = [];
let mazeStatusText = 'Очікує запуску пошуку';

function initMazeView(container) {
    const actionsEl = document.getElementById('algo-sidebar-actions');
    if (actionsEl) {
        actionsEl.innerHTML = `
                <span class="lab-sidebar-title">🧭 ДІЇ НАВІГАЦІЇ A*</span>
                <div class="lab-action-vgroup">
                    <button class="btn-lab-action btn-lab-action--primary" id="btn-run-astar">
                        ▶ Знайти шлях (A*)
                    </button>
                    <button class="btn-lab-action" id="btn-preset-maze">
                        🎲 Стандартний лабіринт
                    </button>
                    <button class="btn-lab-action" id="btn-clear-walls">
                        🧹 Очистити стіни
                    </button>
                </div>
                <div class="db-sidebar-stat-card" style="margin-top: 4px;">
                    <span class="db-stat-icon">🧭</span>
                    <div class="db-stat-info">
                        <strong>Стін: ${mazeWalls.size} | Шлях: ${mazePath.length ? mazePath.length + ' кр.' : '—'}</strong>
                        <span>Евристика: <b>Manhattan h(n)</b></span>
                    </div>
                </div>
            `;

        actionsEl.querySelector('#btn-clear-walls')?.addEventListener('click', () => {
            mazeWalls.clear();
            mazePath = [];
            mazeStatusText = 'Стіни очищено';
            initMazeView(container);
        });

        actionsEl.querySelector('#btn-preset-maze')?.addEventListener('click', () => {
            mazeWalls = new Set(['3,1', '3,2', '3,3', '3,4', '7,2', '7,3', '7,4', '7,5', '11,1', '11,2', '11,3', '11,4']);
            mazePath = [];
            mazeStatusText = 'Встановлено стандартні перешкоди';
            initMazeView(container);
        });

        actionsEl.querySelector('#btn-run-astar')?.addEventListener('click', () => runAStar(container));
    }

    container.innerHTML = `
            <div class="algo-split-container">
                <!-- Ліва панель: інтерактивна сітка лабіринту -->
                <div class="algo-canvas-panel">
                    <div class="tech-lab-canvas-top-bar">
                        <div class="tech-lab-canvas-title">
                            <span class="tech-lab-canvas-dot"></span>
                            <span>Евристичний пошук A* на сітці лабіринту</span>
                        </div>
                        <div class="tech-lab-canvas-metrics">
                            Стін-перешкод: <strong>${mazeWalls.size}</strong> | Маршрут: <strong>${mazePath.length ? mazePath.length + ' кроків' : '—'}</strong>
                        </div>
                    </div>

                    <div class="algo-canvas-box" style="flex: 1; width: 100%; display: flex; flex-direction: column;">
                        <div class="maze-grid-container" id="maze-grid" style="flex: 1;">
                            ${Array.from({ length: MAZE_ROWS }).map((_, r) => `
                                <div class="maze-row">
                                    ${Array.from({ length: MAZE_COLS }).map((_, c) => {
        const key = `${c},${r}`;
        const isStart = c === 1 && r === 3;
        const isTarget = c === 14 && r === 3;
        const isWall = mazeWalls.has(key);
        const isPath = mazePath.includes(key) && !isStart && !isTarget;

        let cls = 'maze-cell';
        let text = '';
        if (isStart) { cls += ' maze-cell--start'; text = 'A'; }
        else if (isTarget) { cls += ' maze-cell--target'; text = 'B'; }
        else if (isWall) { cls += ' maze-cell--wall'; }
        else if (isPath) { cls += ' maze-cell--path'; }

        return `<div class="${cls}" data-c="${c}" data-r="${r}">${text}</div>`;
    }).join('')}
                                </div>
                            `).join('')}
                        </div>
                        <div style="font-size: 10px; color: #94A3B8; text-align: center; padding: 4px 0 2px;">
                            👆 Клікайте мишкою по клітинках сітки, щоб будувати чи видаляти власні стіни-перешкоди!
                        </div>
                    </div>

                    <!-- Розвантажені інформаційні картки на вільних полях знизу полотна -->
                    <div class="tech-lab-margin-info">
                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">📖</span>
                                <span class="ai-margin-card__title">Принцип роботи та евристика A*</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <strong>Алгоритм A* (A-Star)</strong> знаходить найкоротший шлях, комбінуючи пройдену вартість <code>g(n)</code> та оцінку до цілі <code>h(n)</code>.
                                <div class="algo-legend-row" style="margin-top: 6px;">
                                    <span class="algo-legend-pill">🟢 <strong>A:</strong> старт</span>
                                    <span class="algo-legend-pill">🔴 <strong>B:</strong> фініш</span>
                                    <span class="algo-legend-pill">🟣 <strong>Шлях:</strong> оптимум</span>
                                    <span class="algo-legend-pill">⬛ <strong>Блоки:</strong> стіни</span>
                                </div>
                            </div>
                        </div>

                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">🚀</span>
                                <span class="ai-margin-card__title">Застосування в IT-індустрії</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <ul class="ai-margin-list">
                                    <li><strong>Ігровий ШІ:</strong> навігація юнітів та NPC у StarCraft, GTA, Cyberpunk.</li>
                                    <li><strong>Робототехніка:</strong> планування траєкторій складських роботів Amazon Kiva.</li>
                                    <li><strong>Гео-маршрути:</strong> карти та GPS навігація у міських мережах доріг.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Права панель: інженерний інспектор A* -->
                <div class="algo-side-inspector">
                    <div class="algo-inspector-head">
                        <span class="algo-inspector-title">🧭 АНАЛІЗАТОР ЛАБІРИНТУ (A*)</span>
                        <span class="algo-inspector-badge">Heuristic Pathfinding</span>
                    </div>

                    <!-- Результат пошуку -->
                    <div class="algo-result-card">
                        <div class="algo-result-label">Результат пошуку шляху:</div>
                        <div class="algo-result-val">${mazePath.length ? `Шлях знайдено (${mazePath.length} кроків)` : mazeStatusText}</div>
                        <div class="algo-result-sub">
                            Евристика: <strong>Manhattan h(n)</strong> | Вартість: <strong>f(n) = g(n) + h(n)</strong>
                        </div>
                    </div>

                    <!-- Оціночна функція -->
                    <div class="algo-guide-box">
                        <div class="algo-guide-title">⚡ Евристична оцінка вартості f(n)</div>
                        <div class="algo-guide-text">
                            • <code>g(n)</code> — точна вартість шляху від старту <strong>A</strong> до клітинки <code>n</code>.<br>
                            • <code>h(n)</code> — евристична відстань Мангеттена <code>|Δx| + |Δy|</code> до фінішу <strong>B</strong>.<br>
                            • <code>f(n) = g(n) + h(n)</code> — загальний пріоритет у черзі обходу.
                        </div>
                    </div>

                    <div class="ai-inspector-quick-card">
                        <div class="ai-inspector-quick-title">💡 Інтерактивні стіни</div>
                        <div class="ai-inspector-quick-desc">
                            Клікайте мишкою по клітинках сітки для додавання стін, або оберіть готовий пресет у панелі дій ліворуч.
                        </div>
                    </div>
                </div>
            </div>
        `;

    container.querySelectorAll('.maze-cell').forEach(cell => {
        cell.addEventListener('click', function () {
            const c = parseInt(this.getAttribute('data-c'), 10);
            const r = parseInt(this.getAttribute('data-r'), 10);
            if ((c === 1 && r === 3) || (c === 14 && r === 3)) return;

            const key = `${c},${r}`;
            if (mazeWalls.has(key)) {
                mazeWalls.delete(key);
            } else {
                mazeWalls.add(key);
            }
            mazePath = [];
            mazeStatusText = 'Стіни змінено (натисніть «Знайти шлях»)';
            initMazeView(container);
        });
    });
}

function runAStar(container) {
    const start = { c: 1, r: 3 };
    const target = { c: 14, r: 3 };

    function heuristic(a, b) {
        return Math.abs(a.c - b.c) + Math.abs(a.r - b.r);
    }

    const openSet = [{ ...start, g: 0, f: heuristic(start, target) }];
    const cameFrom = {};
    const gScore = {};
    gScore[`${start.c},${start.r}`] = 0;

    const closedSet = new Set();
    let found = false;

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();
        const currKey = `${current.c},${current.r}`;

        if (current.c === target.c && current.r === target.r) {
            found = true;
            break;
        }

        closedSet.add(currKey);

        const neighbors = [
            { c: current.c + 1, r: current.r },
            { c: current.c - 1, r: current.r },
            { c: current.c, r: current.r + 1 },
            { c: current.c, r: current.r - 1 }
        ];

        for (const n of neighbors) {
            if (n.c < 0 || n.c >= MAZE_COLS || n.r < 0 || n.r >= MAZE_ROWS) continue;
            const nKey = `${n.c},${n.r}`;
            if (mazeWalls.has(nKey) || closedSet.has(nKey)) continue;

            const tentativeG = gScore[currKey] + 1;
            if (tentativeG < (gScore[nKey] !== undefined ? gScore[nKey] : Infinity)) {
                cameFrom[nKey] = current;
                gScore[nKey] = tentativeG;
                const f = tentativeG + heuristic(n, target);
                if (!openSet.some(o => o.c === n.c && o.r === n.r)) {
                    openSet.push({ ...n, g: tentativeG, f });
                }
            }
        }
    }

    if (found) {
        mazePath = [];
        let curr = target;
        while (curr && !(curr.c === start.c && curr.r === start.r)) {
            mazePath.unshift(`${curr.c},${curr.r}`);
            curr = cameFrom[`${curr.c},${curr.r}`];
        }
        mazeStatusText = `✔ Оптимальний маршрут знайдено (${mazePath.length} кроків)`;
    } else {
        mazePath = [];
        mazeStatusText = '❌ Шлях заблоковано стінами! Спробуйте прибрати зайві блоки.';
    }
    initMazeView(container);
}
// ========================================================================
// ЛАБОРАТОРІЯ 02: БАЗИ ДАНИХ & РЕЛЯЦІЙНА ER-МОДЕЛЬ (10 ТАБЛИЦЬ)
// ========================================================================
const DB_10_TABLES = [
    // КОЛОНКА 1: БАЗОВІ ДОВІДНИКИ (x: 25, w: 275)
    {
        id: 'specialties',
        name: 'specialties',
        label: 'Спеціальності',
        icon: '📂',
        category: 'catalogs',
        x: 25, y: 15, w: 275, h: 135,
        tier: 'Довідник',
        desc: 'Базовий класифікатор освітніх програм коледжу. Регламентує стандарти підготовки фахових молодших бакалаврів.',
        dataDesc: 'Код спеціальності, офіційна назва, освітня кваліфікація.',
        relDesc: 'Батьківська таблиця (1:N) для академічних груп та навчального плану.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'code', type: 'VARCHAR(10)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'qualification', type: 'VARCHAR(60)' }
        ]
    },
    {
        id: 'departments',
        name: 'departments',
        label: 'Кафедри & ЦК',
        icon: '🏛️',
        category: 'catalogs',
        x: 25, y: 175, w: 275, h: 135,
        tier: 'Довідник',
        desc: 'Обліковує випускові циклові комісії та кафедри коледжу, відповідальні за навчально-методичний процес.',
        dataDesc: 'Назва ЦК, ID голови комісії та закріплені кабінети.',
        relDesc: 'Зв’язок 1:1 з головою комісії та 1:N до викладачів.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'name', type: 'VARCHAR(150)' },
            { name: 'head_teacher_id', type: 'INT FK', isFk: true },
            { name: 'building_room', type: 'VARCHAR(30)' }
        ]
    },
    {
        id: 'classrooms',
        name: 'classrooms',
        label: 'Аудиторії & Лаб.',
        icon: '🖥️',
        category: 'catalogs',
        x: 25, y: 335, w: 275, h: 135,
        tier: 'Довідник',
        desc: 'Матеріальна база: спеціалізовані комп’ютерні класи, мережеві лабораторії та мультимедійні лекторії.',
        dataDesc: 'Номер аудиторії, місткість місць та прапорець ПК.',
        relDesc: 'Постачає доступні аудиторії у розклад занять для уникнення накладок при плануванні пар.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'room_num', type: 'VARCHAR(20)' },
            { name: 'seats_count', type: 'INT' },
            { name: 'pc_equipped', type: 'BOOLEAN' }
        ]
    },

    // КОЛОНКА 2: АКАДЕМІЧНА СТРУКТУРА (x: 415, w: 275)
    {
        id: 'academic_groups',
        name: 'academic_groups',
        label: 'Академічні групи',
        icon: '👥',
        category: 'academic',
        x: 415, y: 15, w: 275, h: 135,
        tier: 'Контингент',
        desc: 'Формує навчальні колективи студентів за фахом та роком вступу.',
        dataDesc: 'Шифр групи, номер курсу та зовнішній ключ спеціальності.',
        relDesc: 'Належить спеціальності; є батьківською для студентів та розкладу.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'specialty_id', type: 'INT FK', isFk: true },
            { name: 'group_code', type: 'VARCHAR(20)' },
            { name: 'study_year', type: 'INT' }
        ]
    },
    {
        id: 'teachers',
        name: 'teachers',
        label: 'Викладачі ЦК',
        icon: '👨‍🏫',
        category: 'academic',
        x: 415, y: 175, w: 275, h: 135,
        tier: 'Кадри',
        desc: 'Штат викладачів комп’ютерних дисциплін. Забезпечує проведення лекцій, лабораторних практикумів та сесій.',
        dataDesc: 'ПІБ викладача, педагогічна категорія / вчене звання (academic_rank) та зв’язок із ЦК.',
        relDesc: 'Належить до ЦК; призначається на пари у розкладі; очолює ЦК.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'department_id', type: 'INT FK', isFk: true },
            { name: 'full_name', type: 'VARCHAR(100)' },
            { name: 'academic_rank', type: 'VARCHAR(50)' }
        ]
    },
    {
        id: 'disciplines',
        name: 'disciplines',
        label: 'Дисципліни',
        icon: '📚',
        category: 'academic',
        x: 415, y: 335, w: 275, h: 135,
        tier: 'Навч. каталог',
        desc: 'Каталог фахових освітніх компонентів: Алгоритми, Бази даних, Комп’ютерні мережі, ШІ та Data Science.',
        dataDesc: 'Назва дисципліни, аудиторний обсяг годин та кредити ECTS.',
        relDesc: 'Включається у навчальний план та є основою для формування розкладу занять.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'title', type: 'VARCHAR(120)' },
            { name: 'total_hours', type: 'INT' },
            { name: 'ects_credits', type: 'DECIMAL(3,1)' }
        ]
    },

    // КОЛОНКА 3: ОПЕРАЦІЙНІ ТАБЛИЦІ (x: 805, w: 275)
    {
        id: 'students',
        name: 'students',
        label: 'Студенти',
        icon: '🎓',
        category: 'process',
        x: 805, y: 15, w: 275, h: 135,
        tier: 'Контингент',
        desc: 'Персональний облік контингенту здобувачів освіти коледжу, їхнього академічного рейтингу та груп.',
        dataDesc: 'Повне ПІБ студента, поточний рейтинговий бал успішності та ID групи.',
        relDesc: 'Входить до академічної групи; отримує оцінки в екзаменаційному журналі.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'group_id', type: 'INT FK', isFk: true },
            { name: 'full_name', type: 'VARCHAR(100)' },
            { name: 'rating_score', type: 'DECIMAL(4,2)' }
        ]
    },
    {
        id: 'curriculum',
        name: 'curriculum',
        label: 'Навчальний план',
        icon: '📋',
        category: 'process',
        x: 805, y: 175, w: 275, h: 135,
        tier: 'ОПП Стандарт',
        desc: 'Регламентує навчальну траєкторію: встановлює, які дисципліни вивчаються на спеціальності за семестрами.',
        dataDesc: 'Номер навчального семестру (1..8), зовнішні ключі спеціальності та дисципліни.',
        relDesc: 'Асоціативна таблиця 3NF: розв’язує зв’язок Many-to-Many між спеціальностями та дисциплінами без надмірності.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'specialty_id', type: 'INT FK', isFk: true },
            { name: 'discipline_id', type: 'INT FK', isFk: true },
            { name: 'semester', type: 'INT' }
        ]
    },
    {
        id: 'schedules',
        name: 'schedules',
        label: 'Розклад пар',
        icon: '🗓️',
        category: 'process',
        x: 805, y: 330, w: 275, h: 146,
        tier: 'Процес',
        desc: 'Диспетчер занять: координує пару викладача, студентську групу, предмет та аудиторію.',
        dataDesc: 'Зовнішні ключі group_id, discipline_id, teacher_id, room_id та номер пари в розкладі.',
        relDesc: 'Координує 4 довідники (група, викладач, предмет, аудиторія) та є джерелом занять для журналу оцінок.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'group_id', type: 'INT FK', isFk: true },
            { name: 'discipline_id', type: 'INT FK', isFk: true },
            { name: 'teacher_id', type: 'INT FK', isFk: true },
            { name: 'room_id', type: 'INT FK', isFk: true }
        ]
    },

    // КОЛОНКА 4: ТРАНЗАКЦІЙНИЙ ЖУРНАЛ (x: 1195, w: 380)
    {
        id: 'exam_grades',
        name: 'exam_grades',
        label: 'Відомості & Оцінки',
        icon: '📝',
        category: 'process',
        x: 1195, y: 15, w: 380, h: 178,
        tier: 'Транзакції',
        desc: 'Центральний транзакційний журнал: фіксує підсумкові бали студентів за екзамени, заліки та захисти проєктів.',
        dataDesc: 'ID студента, заняття, бал за 5-бальною шкалою та дата.',
        relDesc: 'Транзакційно поєднує студента та подію в розкладі з повною ACID-гарантією цілісності.',
        cols: [
            { name: 'id', type: 'INT PK', isPk: true },
            { name: 'student_id', type: 'INT FK', isFk: true },
            { name: 'schedule_id', type: 'INT FK', isFk: true },
            { name: 'score', type: 'INT (1..5)' },
            { name: 'exam_date', type: 'TIMESTAMP DEFAULT NOW()' }
        ]
    }
];

// 12 реляційних зв'язків (FK ➔ PK)
const DB_RELATIONS = [
    { id: 'r_spec_groups', from: 'specialties', to: 'academic_groups', label: '1 : N (id ➔ specialty_id)' },
    { id: 'r_groups_stud', from: 'academic_groups', to: 'students', label: '1 : N (id ➔ group_id)' },
    { id: 'r_stud_grades', from: 'students', to: 'exam_grades', label: '1 : N (id ➔ student_id)' },
    { id: 'r_dept_teach', from: 'departments', to: 'teachers', label: '1 : N (id ➔ department_id)' },
    { id: 'r_teach_dept', from: 'teachers', to: 'departments', label: '1 : 1 (id ➔ head_teacher_id)' },
    { id: 'r_teach_sched', from: 'teachers', to: 'schedules', label: '1 : N (id ➔ teacher_id)' },
    { id: 'r_disc_sched', from: 'disciplines', to: 'schedules', label: '1 : N (id ➔ discipline_id)' },
    { id: 'r_rooms_sched', from: 'classrooms', to: 'schedules', label: '1 : N (id ➔ room_id)' },
    { id: 'r_spec_curr', from: 'specialties', to: 'curriculum', label: '1 : N (id ➔ specialty_id)' },
    { id: 'r_disc_curr', from: 'disciplines', to: 'curriculum', label: '1 : N (id ➔ discipline_id)' },
    { id: 'r_groups_sched', from: 'academic_groups', to: 'schedules', label: '1 : N (id ➔ group_id)' },
    { id: 'r_sched_grades', from: 'schedules', to: 'exam_grades', label: '1 : N (id ➔ schedule_id)' }
];

let hoveredTableId = null;
let lockedTableId = null;
let dbCategoryFilter = 'all'; // 'all' | 'catalogs' | 'academic' | 'process'

function renderDbLab(stage) {
    stage.innerHTML = `
            <div class="tech-lab-layout">


                <!-- Основна ER-сцена -->
                <div class="lab-content-stage" style="flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; overflow: hidden; padding: 6px 10px;">
                    <div class="db-er-stage" style="height: 100%; border-radius: 12px; display: flex; flex-direction: column;">


                        <!-- Повноформатне полотно ER-схеми в масштабованому SVG просторі -->
                        <div class="db-er-canvas-container" id="db-er-canvas" style="flex: 1;">
                            <svg class="db-er-svg-canvas" id="db-er-svg-canvas" viewBox="0 0 1600 485" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <filter id="er-glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                <!-- Шар зв'язків між таблицями -->
                                <g id="db-svg-links-layer"></g>

                                <!-- Шар таблиць (foreignObject всередині SVG = ідеальне співпадіння координат) -->
                                <g id="db-svg-tables-layer">
                                    ${DB_10_TABLES.map(t => `
                                        <foreignObject x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" class="db-fo-table" data-table-id="${t.id}">
                                            <div class="db-table-card" data-table-id="${t.id}">
                                                <div class="db-card-header">
                                                    <div class="db-card-title-wrap">
                                                        <span class="db-card-icon">${t.icon}</span>
                                                        <span class="db-card-name">${t.name}</span>
                                                    </div>
                                                    <span class="db-card-badge">${t.tier}</span>
                                                </div>
                                                <div class="db-card-cols">
                                                    ${t.cols.map(c => `
                                                        <div class="db-col-row ${c.isPk ? 'db-col-pk' : c.isFk ? 'db-col-fk' : ''}">
                                                            <span class="db-col-left">
                                                                <span class="db-col-icon">${c.isPk ? '🔑' : c.isFk ? '🔗' : '▫️'}</span>
                                                                <span class="db-col-name">${c.name}</span>
                                                            </span>
                                                            <span class="db-col-type">${c.type}</span>
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </foreignObject>
                                    `).join('')}

                                    <!-- Інформаційне вікно опису структури та ролі таблиці (Колонка 4, знизу) -->
                                    <foreignObject x="1195" y="206" width="380" height="270" class="db-fo-inspector">
                                        <div class="db-info-panel-card" id="db-info-panel">
                                            <!-- Рендериться динамічно -->
                                        </div>
                                    </foreignObject>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;

    setupDbEventListeners(stage);
    updateDbFocus(stage);
    drawDbLinks(stage);
}

function setupDbEventListeners(stage) {
    stage.querySelectorAll('.lab-tool-btn[data-dbcat]').forEach(btn => {
        btn.addEventListener('click', () => {
            dbCategoryFilter = btn.getAttribute('data-dbcat');
            hoveredTableId = null;
            lockedTableId = null;
            stage.querySelectorAll('.lab-tool-btn[data-dbcat]').forEach(b => {
                b.classList.toggle('lab-tool-btn--active', b.getAttribute('data-dbcat') === dbCategoryFilter);
            });
            updateDbFocus(stage);
        });
    });

    const resetBtn = stage.querySelector('#btn-er-reset-focus');
    if (resetBtn) {
        resetBtn.onclick = () => {
            hoveredTableId = null;
            lockedTableId = null;
            dbCategoryFilter = 'all';
            stage.querySelectorAll('.lab-tool-btn[data-dbcat]').forEach(b => {
                b.classList.toggle('lab-tool-btn--active', b.getAttribute('data-dbcat') === 'all');
            });
            updateDbFocus(stage);
        };
    }

    const cards = stage.querySelectorAll('.db-table-card');
    cards.forEach(card => {
        const tableId = card.getAttribute('data-table-id');

        card.addEventListener('mouseenter', () => {
            if (!lockedTableId) {
                hoveredTableId = tableId;
                updateDbFocus(stage);
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!lockedTableId) {
                hoveredTableId = null;
                updateDbFocus(stage);
            }
        });

        card.addEventListener('click', (e) => {
            e.stopPropagation();
            if (lockedTableId === tableId) {
                lockedTableId = null;
                hoveredTableId = null;
            } else {
                lockedTableId = tableId;
                hoveredTableId = tableId;
            }
            updateDbFocus(stage);
        });
    });

    const stageBg = stage.querySelector('.db-er-canvas-container');
    if (stageBg) {
        stageBg.addEventListener('click', () => {
            lockedTableId = null;
            hoveredTableId = null;
            updateDbFocus(stage);
        });
    }
}

function updateDbFocus(stage) {
    const activeTableId = lockedTableId || hoveredTableId;
    const cards = stage.querySelectorAll('.db-table-card');
    const badge = stage.querySelector('#er-active-summary');
    const infoPanel = stage.querySelector('#db-info-panel');

    if (!activeTableId) {
        if (dbCategoryFilter === 'all') {
            cards.forEach(c => {
                c.classList.remove('is-active', 'is-related', 'is-dimmed');
                const b = c.querySelector('.db-card-badge');
                const t = DB_10_TABLES.find(x => x.id === c.getAttribute('data-table-id'));
                if (b && t) b.textContent = t.tier;
            });
            if (badge) badge.innerHTML = `Всі зв’язки: <strong>12 активних зовнішніх ключів (FK)</strong>`;

            if (infoPanel) {
                infoPanel.innerHTML = `
                        <div class="db-info-head">
                            <span class="db-info-title">🗄️ Опис структури таблиць БД</span>
                        </div>
                        <div class="db-info-body">
                            <div class="db-info-desc">
                                Наведіть курсор або клікніть на будь-яку з 10 таблиць, щоб дослідити:
                            </div>
                            <ul class="db-info-list">
                                <li>🎯 <strong>Призначення:</strong> яку бізнес-роль таблиця виконує в системі коледжу;</li>
                                <li>💾 <strong>Збережені дані:</strong> які саме атрибути, поля та типи в ній фіксуються;</li>
                                <li>🔗 <strong>Реляційні зв’язки:</strong> зовнішні ключі (FK), батьківські та дочірні таблиці.</li>
                            </ul>
                            <div class="db-info-highlight">
                                💡 Архітектура: <strong>10 реляційних таблиць</strong> та <strong>12 зв'язків</strong>
                            </div>
                        </div>
                    `;
            }

            drawDbLinks(stage);
            return;
        } else {
            // Фільтр за категорією
            const matchingTables = DB_10_TABLES.filter(t => t.category === dbCategoryFilter);
            const matchingIds = new Set(matchingTables.map(t => t.id));
            const activeRelIds = [];

            DB_RELATIONS.forEach(rel => {
                if (matchingIds.has(rel.from) && matchingIds.has(rel.to)) {
                    activeRelIds.push(rel.id);
                }
            });

            cards.forEach(c => {
                const tid = c.getAttribute('data-table-id');
                c.classList.remove('is-active', 'is-related', 'is-dimmed');
                const b = c.querySelector('.db-card-badge');
                const t = DB_10_TABLES.find(x => x.id === tid);

                if (matchingIds.has(tid)) {
                    if (b && t) b.textContent = t.tier;
                } else {
                    c.classList.add('is-dimmed');
                    if (b && t) b.textContent = t.tier;
                }
            });

            const catTitles = {
                catalogs: 'Довідники & База (3 таблиці)',
                academic: 'Академічна структура (3 таблиці)',
                process: 'Навчальний процес & Сесія (4 таблиці)'
            };

            if (badge) {
                badge.innerHTML = `Фільтр: <strong>${catTitles[dbCategoryFilter] || dbCategoryFilter}</strong>`;
            }

            if (infoPanel) {
                infoPanel.innerHTML = `
                        <div class="db-info-head">
                            <span class="db-info-title">📁 ${catTitles[dbCategoryFilter]}</span>
                            <span class="db-info-badge">Фільтр</span>
                        </div>
                        <div class="db-info-body">
                            <div class="db-info-desc">
                                У цій категорії виділено таблиці схеми:
                            </div>
                            <ul class="db-info-list">
                                ${matchingTables.map(t => `<li><strong>${t.icon} ${t.name}:</strong> ${t.label} (${t.cols.length} полів)</li>`).join('')}
                            </ul>
                            <div class="db-info-highlight">
                                💡 Клікніть по будь-якій таблиці, щоб побачити її зв'язки.
                            </div>
                        </div>
                    `;
            }

            drawDbLinks(stage, activeRelIds.length > 0 ? activeRelIds : null);
            return;
        }
    }

    const relatedIds = new Set();
    const activeRelIds = [];

    DB_RELATIONS.forEach(rel => {
        if (rel.from === activeTableId) {
            relatedIds.add(rel.to);
            activeRelIds.push(rel.id);
        } else if (rel.to === activeTableId) {
            relatedIds.add(rel.from);
            activeRelIds.push(rel.id);
        }
    });

    cards.forEach(c => {
        const tid = c.getAttribute('data-table-id');
        c.classList.remove('is-active', 'is-related', 'is-dimmed');
        const b = c.querySelector('.db-card-badge');
        const t = DB_10_TABLES.find(x => x.id === tid);

        if (tid === activeTableId) {
            c.classList.add('is-active');
            if (b) b.textContent = lockedTableId === tid ? '● ЗАКРІПЛЕНО' : '● ФОКУС';
        } else if (relatedIds.has(tid)) {
            c.classList.add('is-related');
            if (b) b.textContent = '● ЗВ’ЯЗОК';
        } else {
            c.classList.add('is-dimmed');
            if (b && t) b.textContent = t.tier;
        }
    });

    const activeTable = DB_10_TABLES.find(t => t.id === activeTableId);
    if (badge && activeTable) {
        badge.innerHTML = `Фокус: <strong>${activeTable.name} (${activeRelIds.length} зв’язків)</strong>`;
    }

    if (infoPanel && activeTable) {
        const isLocked = lockedTableId === activeTableId;
        const relBadges = Array.from(relatedIds).map(id => {
            const rt = DB_10_TABLES.find(x => x.id === id);
            return `<span class="db-info-rel-pill">${rt ? rt.icon : '🔗'} ${id}</span>`;
        }).join('');

        infoPanel.innerHTML = `
                <div class="db-info-head">
                    <span class="db-info-title">${activeTable.icon} <code>${activeTable.name}</code> (${activeTable.label})</span>
                    <span class="db-info-badge">${isLocked ? '📌' : activeTable.tier}</span>
                </div>
                <div class="db-info-body">
                    <div class="db-info-section">
                        <span class="db-info-section-title">🎯 Призначення:</span>
                        <div class="db-info-text">${activeTable.desc}</div>
                    </div>
                    <div class="db-info-section">
                        <span class="db-info-section-title">💾 Які дані зберігає:</span>
                        <div class="db-info-text">${activeTable.dataDesc}</div>
                    </div>
                    <div class="db-info-section">
                        <span class="db-info-section-title">🔗 Реляційні зв’язки (${relatedIds.size}):</span>
                        <div class="db-info-text" style="margin-bottom: 2px;">${activeTable.relDesc}</div>
                    </div>
                </div>
            `;
    }

    drawDbLinks(stage, activeRelIds);
}

function drawDbLinks(stage, activeRelIds = null) {
    const linksGroup = stage.querySelector('#db-svg-links-layer');
    if (!linksGroup) return;

    const tableMap = {};
    DB_10_TABLES.forEach(t => { tableMap[t.id] = t; });

    const linkElements = DB_RELATIONS.map(rel => {
        const t1 = tableMap[rel.from];
        const t2 = tableMap[rel.to];
        if (!t1 || !t2) return '';

        const isActive = activeRelIds ? activeRelIds.includes(rel.id) : false;
        const isDim = activeRelIds && !isActive;

        // Точні координати виходу (порт справа t1) та входу (порт зліва t2)
        let x1, y1, x2, y2, d;

        if (rel.id === 'r_spec_groups') {
            // specialties -> academic_groups (пряма горизонтальна)
            x1 = t1.x + t1.w; y1 = t1.y + 70;
            x2 = t2.x; y2 = t2.y + 70;
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else if (rel.id === 'r_groups_stud') {
            // academic_groups -> students (пряма горизонтальна)
            x1 = t1.x + t1.w; y1 = t1.y + 70;
            x2 = t2.x; y2 = t2.y + 70;
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else if (rel.id === 'r_dept_teach') {
            // departments -> teachers (пряма горизонтальна)
            x1 = t1.x + t1.w; y1 = t1.y + 65;
            x2 = t2.x; y2 = t2.y + 65;
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else if (rel.id === 'r_disc_sched') {
            // disciplines -> schedules (пряма горизонтальна)
            x1 = t1.x + t1.w; y1 = t1.y + 70;
            x2 = t2.x; y2 = t2.y + 75;
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else if (rel.id === 'r_stud_grades') {
            // students -> exam_grades (плавна крива вниз-вправо)
            x1 = t1.x + t1.w; y1 = t1.y + 70;
            x2 = t2.x; y2 = t2.y + 70;
            const dx = (x2 - x1) * 0.45;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        } else if (rel.id === 'r_sched_grades') {
            // schedules -> exam_grades (плавна крива вгору-вправо)
            x1 = t1.x + t1.w; y1 = t1.y + 65;
            x2 = t2.x; y2 = t2.y + 125;
            const dx = (x2 - x1) * 0.45;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        } else if (rel.id === 'r_teach_sched') {
            // teachers -> schedules (плавна крива вниз-вправо)
            x1 = t1.x + t1.w; y1 = t1.y + 70;
            x2 = t2.x; y2 = t2.y + 45;
            const dx = (x2 - x1) * 0.45;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        } else if (rel.id === 'r_disc_curr') {
            // disciplines -> curriculum (плавна крива вгору-вправо)
            x1 = t1.x + t1.w; y1 = t1.y + 45;
            x2 = t2.x; y2 = t2.y + 90;
            const dx = (x2 - x1) * 0.45;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        } else if (rel.id === 'r_spec_curr') {
            // specialties -> curriculum (плавна дуга через простір між колонками)
            x1 = t1.x + t1.w; y1 = t1.y + 45;
            x2 = t2.x; y2 = t2.y + 50;
            const dx = (x2 - x1) * 0.35;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1 - 10}, ${x2 - dx} ${y2 - 10}, ${x2} ${y2}`;
        } else if (rel.id === 'r_groups_sched') {
            // academic_groups -> schedules (дуга через міжряддя)
            x1 = t1.x + t1.w; y1 = t1.y + 95;
            x2 = t2.x; y2 = t2.y + 30;
            const dx = (x2 - x1) * 0.35;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1 + 35}, ${x2 - dx} ${y2 - 35}, ${x2} ${y2}`;
        } else if (rel.id === 'r_rooms_sched') {
            // classrooms -> schedules (дуга вздовж нижнього каналу)
            x1 = t1.x + t1.w; y1 = t1.y + 70;
            x2 = t2.x; y2 = t2.y + 115;
            const dx = (x2 - x1) * 0.35;
            d = `M ${x1} ${y1} C ${x1 + dx} ${y1 + 30}, ${x2 - dx} ${y2 + 30}, ${x2} ${y2}`;
        } else if (rel.id === 'r_teach_dept') {
            // teachers -> departments (двосторонній зв’язок)
            x1 = t1.x; y1 = t1.y + 90;
            x2 = t2.x + t2.w; y2 = t2.y + 90;
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        return `
                <g class="db-link-group ${isActive ? 'is-active' : ''} ${isDim ? 'is-dimmed' : ''}">
                    <!-- Фоновий ореол зв'язку -->
                    <path class="db-link-path-bg" d="${d}" />
                    <!-- Основна чітка векторна лінія -->
                    <path class="db-link-path-fg" d="${d}" />
                    <!-- Порт виходу (Primary Key) -->
                    <circle cx="${x1}" cy="${y1}" r="3.5" class="db-port-pk" />
                    <!-- Порт входу (Foreign Key) -->
                    <circle cx="${x2}" cy="${y2}" r="3.5" class="db-port-fk" />
                    <!-- Інформаційний бейдж при активному стані -->
                    ${isActive ? `
                        <rect class="db-link-badge-rect" x="${midX - 32}" y="${midY - 9}" width="64" height="18" rx="4" />
                        <text class="db-link-badge-text" x="${midX}" y="${midY}">1 : N</text>
                    ` : ''}
                </g>
            `;
    }).join('');

    linksGroup.innerHTML = linkElements;
}
// ========================================================================
// ЛАБОРАТОРІЯ 03: ШТУЧНИЙ ІНТЕЛЕКТ (ПРОДВИНУТА МАТЕМАТИКА ТА DRAG & DROP)
// ========================================================================
let aiSubmode = 'kmeans'; // 'kmeans' | 'regression'

// --- Дані K-Means ---
let kCentroids = [
    { id: 1, x: 190, y: 110, col: '#7C3AED', name: 'Центроїд 1 (Фіолетовий)' },
    { id: 2, x: 380, y: 240, col: '#10B981', name: 'Центроїд 2 (Смарагдовий)' },
    { id: 3, x: 580, y: 120, col: '#3B82F6', name: 'Центроїд 3 (Синій)' }
];

let kPoints = [
    // Кластер 1
    { id: 1, x: 130, y: 80, cluster: 0 }, { id: 2, x: 170, y: 60, cluster: 0 }, { id: 3, x: 210, y: 90, cluster: 0 },
    { id: 4, x: 150, y: 130, cluster: 0 }, { id: 5, x: 220, y: 140, cluster: 0 }, { id: 6, x: 180, y: 150, cluster: 0 },
    // Кластер 2
    { id: 7, x: 340, y: 220, cluster: 1 }, { id: 8, x: 390, y: 260, cluster: 1 }, { id: 9, x: 430, y: 210, cluster: 1 },
    { id: 10, x: 370, y: 280, cluster: 1 }, { id: 11, x: 420, y: 270, cluster: 1 }, { id: 12, x: 350, y: 250, cluster: 1 },
    // Кластер 3
    { id: 13, x: 540, y: 80, cluster: 2 }, { id: 14, x: 590, y: 60, cluster: 2 }, { id: 15, x: 630, y: 100, cluster: 2 },
    { id: 16, x: 560, y: 140, cluster: 2 }, { id: 17, x: 610, y: 150, cluster: 2 }, { id: 18, x: 650, y: 120, cluster: 2 }
];

let activeKPointIdx = 0;
let isKScanning = false;
let kScanTimer = null;

// --- Дані Регресії (IT Зарплатний датасет) ---
// X: досвід (роки, нормалізовані пікселі 80..660px = 0.5..6.5 років)
// Y: дохід ($, пікселі 290..50px = $600..$4,800/міс)
let regPoints = [

    { id: 1, x: 90, y: 275, exp: '0.6 р.', salary: '' },

    { id: 2, x: 140, y: 245, exp: '1.0 р.', salary: ',200' },

    { id: 3, x: 185, y: 265, exp: '1.4 р.', salary: '' },

    { id: 4, x: 235, y: 195, exp: '1.9 р.', salary: ',800' },

    { id: 5, x: 290, y: 220, exp: '2.5 р.', salary: ',650' },

    { id: 6, x: 350, y: 150, exp: '3.1 р.', salary: ',550' },

    { id: 7, x: 410, y: 175, exp: '3.7 р.', salary: ',300' },

    { id: 8, x: 470, y: 110, exp: '4.3 р.', salary: ',300' },

    { id: 9, x: 530, y: 130, exp: '4.9 р.', salary: ',050' },

    { id: 10, x: 585, y: 75, exp: '5.5 р.', salary: ',850' },

    { id: 11, x: 640, y: 60, exp: '6.0 р.', salary: ',100' }

];


let regDegree = 2; // 1: Лінійна, 2: Квадратична, 3: Поліноміальна, 5: Overfitting
let showResidualSquares = false;
let isTrainingGradient = false;
let gradientEpoch = 0;
let gradientTimer = null;
let probeMouseX = null; // Позиція мишки для лазерного інспектора прогнозу
let instantCalcDone = false; // Прапорець миттєвого прорахунку всіх точок

let draggedEntity = null; // Drag & drop стан

function renderAiLab(stage) {
    stage.innerHTML = `
            <div class="tech-lab-layout">
                <!-- Ліва колонка інструментів ML -->
                <div class="lab-sidebar-tools">
                    <div class="lab-sidebar-section">

                        <div class="lab-sidebar-nav">
                            <button class="lab-tool-btn ${aiSubmode === 'kmeans' ? 'lab-tool-btn--active' : ''}" data-aimode="kmeans">
                                <span class="lab-tool-btn__icon">🧠</span>
                                <div class="lab-tool-btn__body">
                                    <span class="lab-tool-btn__title">K-Means Кластеризація</span>

                                </div>
                            </button>
                            <button class="lab-tool-btn ${aiSubmode === 'regression' ? 'lab-tool-btn--active' : ''}" data-aimode="regression">
                                <span class="lab-tool-btn__icon">📈</span>
                                <div class="lab-tool-btn__body">
                                    <span class="lab-tool-btn__title">Поліноміальна регресія</span>

                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Контейнер дій активного режиму ШІ -->
                    <div class="lab-sidebar-section" id="ai-sidebar-actions" style="margin-top: 4px;">
                        <!-- Заповнюється динамічно -->
                    </div>
                </div>

                <!-- Робоча сцена активного режиму ШІ -->
                <div class="lab-content-stage" id="ai-workspace-content" style="flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; overflow: hidden; padding: 6px 10px;">
                    <!-- Вміст режиму -->
                </div>
            </div>
        `;

    stage.querySelectorAll('.lab-tool-btn[data-aimode]').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-aimode');
            if (mode && mode !== aiSubmode) {
                aiSubmode = mode;
                if (isKScanning) { clearInterval(kScanTimer); isKScanning = false; }
                if (isTrainingGradient) { clearInterval(gradientTimer); isTrainingGradient = false; }
                renderAiLab(stage);
            }
        });
    });

    renderAiSubmodeContent(stage);
}

function renderAiSubmodeContent(stage) {
    const container = stage ? stage.querySelector('#ai-workspace-content') : document.getElementById('ai-workspace-content');
    if (!container) return;

    if (aiSubmode === 'kmeans') {
        renderKMeansAdvanced(container);
    } else {
        renderRegressionAdvanced(container);
    }
}

// ========================================================================
// 3.1. K-MEANS: ПОКРОКОВЕ ОБЧИСЛЕННЯ ВІДСТАНЕЙ + ДИНАМІЧНИЙ РАДІУС ОХОПЛЕННЯ
// ========================================================================
function renderKMeansAdvanced(container) {
    const activePt = kPoints[activeKPointIdx] || kPoints[0];

    // Точний математичний розрахунок відстаней від activePt до 3 центроїдів
    const d1 = Math.hypot(activePt.x - kCentroids[0].x, activePt.y - kCentroids[0].y);
    const d2 = Math.hypot(activePt.x - kCentroids[1].x, activePt.y - kCentroids[1].y);
    const d3 = Math.hypot(activePt.x - kCentroids[2].x, activePt.y - kCentroids[2].y);

    const minD = Math.min(d1, d2, d3);
    const bestClusterIdx = minD === d1 ? 0 : minD === d2 ? 1 : 2;
    if (!instantCalcDone) {
        activePt.cluster = bestClusterIdx;
    }

    // ДИНАМІЧНИЙ РОЗРАХУНОК РАДІУСА: збільшується на відстань найвіддаленішої точки кластера!
    const dynamicRadii = kCentroids.map((c, cIdx) => {
        const ptsInCluster = kPoints.filter(p => p.cluster === cIdx);
        if (ptsInCluster.length > 0) {
            const maxD = Math.max(...ptsInCluster.map(p => Math.hypot(p.x - c.x, p.y - c.y)));
            return Math.max(38, maxD + 20); // +20px щоб точка гарантовано була всередині
        }
        return 38;
    });

    // Інерція втрат J = sum d^2
    const inertia = kPoints.reduce((sum, p) => {
        const c = kCentroids[p.cluster];
        return sum + Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
    }, 0) / 1000;

    const clusterCounts = [
        kPoints.filter(p => p.cluster === 0).length,
        kPoints.filter(p => p.cluster === 1).length,
        kPoints.filter(p => p.cluster === 2).length
    ];

    // Виносимо дії інструмента в ліву колонку
    const actionsEl = document.getElementById('ai-sidebar-actions');
    if (actionsEl) {
        actionsEl.innerHTML = `
                <span class="lab-sidebar-title">⚡ ДІЇ КЛАСТЕРИЗАЦІЇ</span>
                <div class="lab-action-vgroup">
                    <button class="btn-lab-action" id="btn-k-instant-calc" title="Миттєво закріпити всі точки за найближчими центроїдами">
                        ⚡ Прорахувати всі
                    </button>
                    <button class="btn-lab-action ${isKScanning ? 'btn-lab-action--active' : ''}" id="btn-k-autoscan">
                        ${isKScanning ? '⏸ Зупинити' : '▶ Авто-обчислення'}
                    </button>
                    <button class="btn-lab-action" id="btn-k-next-point">👣 Наступна (P${activeKPointIdx + 1})</button>
                    <button class="btn-lab-action" id="btn-k-recalc-centroids">🎯 Оновити центри мас</button>
                    <button class="btn-lab-action" id="btn-k-shuffle">🎲 Нова вибірка</button>
                </div>

            `;

        actionsEl.querySelector('#btn-k-instant-calc')?.addEventListener('click', () => {
            if (isKScanning) {
                clearInterval(kScanTimer);
                isKScanning = false;
            }
            kPoints.forEach(p => {
                const cd1 = Math.hypot(p.x - kCentroids[0].x, p.y - kCentroids[0].y);
                const cd2 = Math.hypot(p.x - kCentroids[1].x, p.y - kCentroids[1].y);
                const cd3 = Math.hypot(p.x - kCentroids[2].x, p.y - kCentroids[2].y);
                const cminD = Math.min(cd1, cd2, cd3);
                p.cluster = cminD === cd1 ? 0 : cminD === cd2 ? 1 : 2;
            });
            instantCalcDone = true;
            renderKMeansAdvanced(container);
        });

        actionsEl.querySelector('#btn-k-next-point')?.addEventListener('click', () => {
            instantCalcDone = false;
            activeKPointIdx = (activeKPointIdx + 1) % kPoints.length;
            renderKMeansAdvanced(container);
        });

        actionsEl.querySelector('#btn-k-autoscan')?.addEventListener('click', () => {
            instantCalcDone = false;
            if (isKScanning) {
                clearInterval(kScanTimer);
                isKScanning = false;
                renderKMeansAdvanced(container);
            } else {
                isKScanning = true;
                renderKMeansAdvanced(container);
                kScanTimer = setInterval(() => {
                    activeKPointIdx = (activeKPointIdx + 1) % kPoints.length;
                    renderKMeansAdvanced(container);
                }, 550);
            }
        });

        actionsEl.querySelector('#btn-k-recalc-centroids')?.addEventListener('click', () => {
            kCentroids.forEach((c, idx) => {
                const pts = kPoints.filter(p => p.cluster === idx);
                if (pts.length > 0) {
                    c.x = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
                    c.y = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
                }
            });
            renderKMeansAdvanced(container);
        });

        actionsEl.querySelector('#btn-k-shuffle')?.addEventListener('click', () => {
            kPoints.forEach(p => {
                p.x = 90 + Math.random() * 560;
                p.y = 50 + Math.random() * 250;
            });
            activeKPointIdx = 0;
            instantCalcDone = false;
            renderKMeansAdvanced(container);
        });
    }

    container.innerHTML = `
            <div class="ai-split-container">
                <!-- Ліва частина: Векторна SVG сцена з Drag & Drop -->
                <div class="ai-canvas-panel">
                    <div class="ai-interactive-canvas-box" id="ai-canvas-box" style="flex: 1;">
                        <span class="ai-drag-hint-badge">💡 Радіус кластера охоплює найвіддаленішу точку вибірки</span>
                        <svg id="ai-kmeans-svg" viewBox="0 0 740 330" style="width: 100%; height: 100%; max-height: 330px;">
                            <!-- Сітка -->
                            ${renderSvgGrid(740, 330)}

                            <!-- ДИНАМІЧНІ АРЕАЛИ: радіус строго до найдальшої точки кластера! -->
                            ${kCentroids.map((c, cIdx) => `
                                <circle cx="${c.x}" cy="${c.y}" r="${dynamicRadii[cIdx]}" fill="${c.col}" fill-opacity="0.08" stroke="${c.col}" stroke-opacity="0.38" stroke-dasharray="5 4" style="transition: r 0.25s ease;" />
                            `).join('')}

                            <!-- 3 Промені обчислення відстаней від активної точки до 3 центроїдів -->
                            ${renderDistRay(activePt.x, activePt.y, kCentroids[0].x, kCentroids[0].y, d1, d1 === minD, '#7C3AED', 'd₁')}
                            ${renderDistRay(activePt.x, activePt.y, kCentroids[1].x, kCentroids[1].y, d2, d2 === minD, '#10B981', 'd₂')}
                            ${renderDistRay(activePt.x, activePt.y, kCentroids[2].x, kCentroids[2].y, d3, d3 === minD, '#3B82F6', 'd₃')}

                            <!-- Точки вибірки даних (Draggable) -->
                            ${kPoints.map((p, idx) => {
        const isSelected = idx === activeKPointIdx;
        const clusterCol = p.cluster === 0 ? '#7C3AED' : p.cluster === 1 ? '#10B981' : '#3B82F6';
        return `
                                    <g class="ai-svg-node-draggable" data-type="point" data-idx="${idx}">
                                        ${isSelected ? `<circle cx="${p.x}" cy="${p.y}" r="16" fill="none" stroke="${clusterCol}" stroke-width="2.5" stroke-dasharray="4 3" opacity="0.85"><animateTransform attributeName="transform" type="rotate" from="0 ${p.x} ${p.y}" to="360 ${p.x} ${p.y}" dur="4s" repeatCount="indefinite"/></circle>` : ''}
                                        <circle cx="${p.x}" cy="${p.y}" r="${isSelected ? '9' : '7.5'}" fill="${clusterCol}" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.15))" />
                                        <text x="${p.x}" y="${p.y - 12}" font-size="11" font-weight="800" fill="#475569" text-anchor="middle">P${idx + 1}</text>
                                    </g>
                                `;
    }).join('')}

                            <!-- Центроїди (Зірки, Draggable) -->
                            ${kCentroids.map((c, cIdx) => `
                                <g class="ai-svg-node-draggable" data-type="centroid" data-idx="${cIdx}">
                                    <circle cx="${c.x}" cy="${c.y}" r="20" fill="${c.col}" stroke="#FFFFFF" stroke-width="3" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.22))" />
                                    <text x="${c.x}" y="${c.y + 5}" font-size="15" font-weight="900" fill="#FFFFFF" text-anchor="middle">★</text>
                                    <text x="${c.x}" y="${c.y + 35}" font-size="11.5" font-weight="800" fill="${c.col}" text-anchor="middle">C${cIdx + 1} (R: ${Math.round(dynamicRadii[cIdx])}px)</text>
                                </g>
                            `).join('')}
                        </svg>
                    </div>

                    <!-- Розвантажені інформаційні картки на вільних полях знизу полотна -->
                    <div class="tech-lab-margin-info">
                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">📖</span>
                                <span class="ai-margin-card__title">Принцип роботи та розрахунок відстаней</span>
                            </div>
                            <div class="ai-margin-card__body">
                                Алгоритм групує нерозмічені вектори у <strong>K=3</strong> кластери. Кожна точка закріплюється за найближчим центроїдом за Евклідовою метрикою:  <br><code>d = √((x - x_c)² + (y - y_c)²)</code>.
                            </div>
                        </div>

                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">🚀</span>
                                <span class="ai-margin-card__title">Застосування в IT-індустрії</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <ul class="ai-margin-list">
                                    <li><strong>Сегментація клієнтів:</strong> персоналізація пропозицій у CRM (HubSpot, Salesforce).</li>
                                    <li><strong>Рекомендаційні системи:</strong> вектори вподобань слухачів (Spotify, Netflix).</li>
                                    <li><strong>Комп'ютерний зір:</strong> квантування колірної палітри та стиснення зображень.</li>
                                    <li><strong>FinTech безпека:</strong> детекція фінансових аномалій (Fraud Detection).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Права частина: Інженерний аналізатор ШІ (ТІЛЬКИ чисті метрики БЕЗ тексту) -->
                <div class="ai-side-inspector">
                    <div class="ai-inspector-head">
                        <span class="ai-inspector-title">🧠 АНАЛІЗАТОР КЛАСТЕРИЗАЦІЇ K-MEANS</span>
                        <span class="ai-inspector-badge">Unsupervised ML</span>
                    </div>

                    <!-- Результат обчислення -->
                    <div class="algo-result-card">
                        ${instantCalcDone ? `
                            <div class="algo-result-label">Результат миттєвого прорахунку:</div>
                            <div class="algo-result-val">✔ Усі 18 точок вибірки кластеризовано!</div>
                            <div class="algo-result-sub">
                                Кластер 1: <strong>${clusterCounts[0]}</strong> | Кластер 2: <strong>${clusterCounts[1]}</strong> | Кластер 3: <strong>${clusterCounts[2]}</strong> | Інерція: <strong>${inertia.toFixed(1)}</strong>
                            </div>
                        ` : `
                            <div class="algo-result-label">Активна точка P${activeKPointIdx + 1} (${Math.round(activePt.x)}, ${Math.round(activePt.y)}):</div>
                            <div class="algo-result-val">min(d₁, d₂, d₃) = <strong>${minD.toFixed(1)} px</strong></div>
                            <div class="algo-result-sub">
                                ➔ Закріплено за: <strong>${kCentroids[bestClusterIdx].name}</strong> (R: ${Math.round(dynamicRadii[bestClusterIdx])}px)
                            </div>
                        `}
                    </div>

                    <!-- 3 Евклідові відстані (3-стовпчикова компактна сітка) -->
                    <div class="ai-dist-comparison-grid">
                        <div class="ai-dist-card ${bestClusterIdx === 0 ? 'is-winner' : ''}">
                            <div class="ai-dist-card__header">
                                <span>C₁ (Фіолет)</span>
                                ${bestClusterIdx === 0 ? '<span>✔ MIN</span>' : ''}
                            </div>
                            <div class="ai-dist-card__val">${d1.toFixed(1)} px</div>
                        </div>
                        <div class="ai-dist-card ${bestClusterIdx === 1 ? 'is-winner' : ''}">
                            <div class="ai-dist-card__header">
                                <span>C₂ (Зелений)</span>
                                ${bestClusterIdx === 1 ? '<span>✔ MIN</span>' : ''}
                            </div>
                            <div class="ai-dist-card__val">${d2.toFixed(1)} px</div>
                        </div>
                        <div class="ai-dist-card ${bestClusterIdx === 2 ? 'is-winner' : ''}">
                            <div class="ai-dist-card__header">
                                <span>C₃ (Синій)</span>
                                ${bestClusterIdx === 2 ? '<span>✔ MIN</span>' : ''}
                            </div>
                            <div class="ai-dist-card__val">${d3.toFixed(1)} px</div>
                        </div>
                    </div>

                    <div class="db-sidebar-stat-card" style="margin-top: 6px;">
                        <span class="db-stat-icon">📊</span>
                        <div class="db-stat-info">
                            <strong>Вибірка: ${kPoints.length} точок</strong>
                            <span>Інерція втрат J: <b>${inertia.toFixed(1)}</b></span>
                        </div>
                    </div>

                    <div class="algo-legend-row" style="margin-top: 6px;">
                        <span class="algo-legend-pill"> ★ <strong>Зірки (C₁..C₃):</strong> центроїди</span>
                        <span class="algo-legend-pill">🟣 <strong>Точки (P₁..P₁₈):</strong> дані вибірки</span>
                        <span class="algo-legend-pill">⭕ <strong>Пунктир:</strong> межі радіусів R</span>
                    </div>

                    <div class="ai-inspector-quick-card">
                        <div class="ai-inspector-quick-title">💡 Інтерактивне перетягування</div>
                        <div class="ai-inspector-quick-desc">
                            Перетягуйте мишкою зірки-центроїди або точки вибірки — радіуси охоплення та Евклідові промені оновлюються на сітці наживо.
                        </div>
                    </div>
                </div>
            </div>
        `;

    setupKMeansDragAndClick(container);
}

function renderDistRay(x1, y1, x2, y2, dist, isMin, col, label) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const strokeW = isMin ? '3.5' : '1.5';
    const strokeOp = isMin ? '0.95' : '0.4';

    return `
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${strokeW}" stroke-opacity="${strokeOp}" ${isMin ? '' : 'stroke-dasharray="5 4"'} />
            <rect x="${mx - 24}" y="${my - 11}" width="48" height="22" rx="5" fill="#FFFFFF" stroke="${col}" stroke-width="${isMin ? '2' : '1.2'}" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))" />
            <text x="${mx}" y="${my + 4.5}" font-size="11" font-weight="800" fill="${col}" text-anchor="middle">${label}: ${Math.round(dist)}</text>
        `;
}

function setupKMeansDragAndClick(container) {
    const svg = container.querySelector('#ai-kmeans-svg');
    if (!svg) return;

    svg.querySelectorAll('.ai-svg-node-draggable').forEach(node => {
        node.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            const type = node.getAttribute('data-type');
            const idx = parseInt(node.getAttribute('data-idx'), 10);
            draggedEntity = { type, idx };
            if (type === 'point') {
                activeKPointIdx = idx;
                instantCalcDone = false;
            }
        });

        node.addEventListener('click', (e) => {
            const type = node.getAttribute('data-type');
            const idx = parseInt(node.getAttribute('data-idx'), 10);
            if (type === 'point') {
                activeKPointIdx = idx;
                instantCalcDone = false;
                renderKMeansAdvanced(container);
            }
        });
    });

    svg.addEventListener('mousemove', (e) => {
        if (!draggedEntity) return;
        const pt = getSvgCoords(svg, e);
        if (draggedEntity.type === 'centroid') {
            const c = kCentroids[draggedEntity.idx];
            c.x = Math.max(40, Math.min(700, pt.x));
            c.y = Math.max(30, Math.min(320, pt.y));
            renderKMeansAdvanced(container);
        } else if (draggedEntity.type === 'point') {
            const p = kPoints[draggedEntity.idx];
            p.x = Math.max(40, Math.min(700, pt.x));
            p.y = Math.max(30, Math.min(320, pt.y));
            renderKMeansAdvanced(container);
        }
    });

    window.addEventListener('mouseup', () => { draggedEntity = null; });
}

// ========================================================================
// 3.2. ПРОДВИНУТА ПОЛІНОМІАЛЬНА РЕГРЕСІЯ: МОДЕЛЬ ПРОГНОЗУ ЗАРПЛАТИ IT
// ========================================================================
function renderRegressionAdvanced(container) {
    // Поліноміальна регресія за заданим ступенем regDegree (1, 2, 3, 5)
    const polyFit = fitPolynomial(regPoints, regDegree);

    // Генерація точок кривої регресії для SVG path
    const curvePoints = [];
    const ribbonUpper = [];
    const ribbonLower = [];
    for (let x = 60; x <= 680; x += 8) {
        const y = predictPoly(polyFit, x);
        curvePoints.push({ x, y: Math.max(30, Math.min(320, y)) });
        ribbonUpper.push({ x, y: Math.max(20, Math.min(330, y - 18)) });
        ribbonLower.push({ x, y: Math.max(20, Math.min(330, y + 18)) });
    }

    const pathData = 'M ' + curvePoints.map(p => `${p.x},${p.y}`).join(' L ');
    const ribbonPath = 'M ' + ribbonUpper.map(p => `${p.x},${p.y}`).join(' L ') +
        ' L ' + ribbonLower.reverse().map(p => `${p.x},${p.y}`).join(' L ') + ' Z';

    // Розрахунок R^2 та метрик якості
    const meanY = regPoints.reduce((sum, p) => sum + p.y, 0) / regPoints.length;
    let ssTot = 0, ssRes = 0;
    regPoints.forEach(p => {
        const predY = predictPoly(polyFit, p.x);
        ssTot += Math.pow(p.y - meanY, 2);
        ssRes += Math.pow(p.y - predY, 2);
    });
    const r2 = ssTot > 0 ? Math.max(0, 1 - (ssRes / ssTot)).toFixed(2) : '1.00';
    const mse = Math.round(ssRes / regPoints.length);

    // Розрахунок значення для зонда курсору (якщо мишка на графіку)
    let probeResult = null;
    if (probeMouseX !== null && probeMouseX >= 60 && probeMouseX <= 680) {
        const probeY = predictPoly(polyFit, probeMouseX);
        const expYears = ((probeMouseX - 60) / 100).toFixed(1);
        // Перетворення Y в долар зарплати: Y=290 -> $600, Y=50 -> $4,800
        const salaryEst = Math.round(600 + (300 - probeY) * 17);
        probeResult = { x: probeMouseX, y: probeY, expYears, salaryEst };
    }

    // Виносимо дії інструмента в ліву колонку
    const actionsEl = document.getElementById('ai-sidebar-actions');
    if (actionsEl) {
        actionsEl.innerHTML = `
                <span class="lab-sidebar-title">📐 СТУПІНЬ ПОЛІНОМА</span>
                <div class="lab-reg-degrees-grid">
                    <button class="btn-lab-action btn-reg-degree ${regDegree === 1 ? 'btn-lab-action--active' : ''}" data-deg="1">1° Лінійна</button>
                    <button class="btn-lab-action btn-reg-degree ${regDegree === 2 ? 'btn-lab-action--active' : ''}" data-deg="2">2° Квадрат.</button>
                    <button class="btn-lab-action btn-reg-degree ${regDegree === 3 ? 'btn-lab-action--active' : ''}" data-deg="3">3° Поліном</button>
                    <button class="btn-lab-action btn-reg-degree btn-reg-degree--overfit ${regDegree === 5 ? 'btn-lab-action--active' : ''}" data-deg="5">5° Overfit</button>
                </div>
                <span class="lab-sidebar-title" style="margin-top: 6px;">⚙️ КЕРУВАННЯ МОДЕЛЛЮ</span>
                <div class="lab-action-vgroup">
                    <button class="btn-lab-action ${showResidualSquares ? 'btn-lab-action--active' : ''}" id="btn-reg-squares">
                        📐 Квадрати помилок (e²)
                    </button>
                    <button class="btn-lab-action" id="btn-reg-add">➕ Додати фахівця</button>
                    <button class="btn-lab-action" id="btn-reg-reset" title="Відновити початкову вибірку">🔄 Скинути вибірку</button>
                </div>

            `;

        actionsEl.querySelectorAll('.btn-reg-degree').forEach(btn => {
            btn.addEventListener('click', function () {
                regDegree = parseInt(this.getAttribute('data-deg'), 10);
                renderRegressionAdvanced(container);
            });
        });

        actionsEl.querySelector('#btn-reg-squares')?.addEventListener('click', () => {
            showResidualSquares = !showResidualSquares;
            renderRegressionAdvanced(container);
        });

        actionsEl.querySelector('#btn-reg-add')?.addEventListener('click', () => {
            const rx = 100 + Math.random() * 540;
            const ry = predictPoly(polyFit, rx) + (Math.random() - 0.5) * 40;
            regPoints.push({ id: Date.now(), x: rx, y: ry });
            renderRegressionAdvanced(container);
        });

        actionsEl.querySelector('#btn-reg-reset')?.addEventListener('click', () => {
            regPoints = [
                { id: 1, x: 80, y: 285 },
                { id: 2, x: 130, y: 260 },
                { id: 3, x: 190, y: 235 },
                { id: 4, x: 230, y: 250 },
                { id: 5, x: 280, y: 200 },
                { id: 6, x: 330, y: 185 },
                { id: 7, x: 390, y: 165 },
                { id: 8, x: 450, y: 175 },
                { id: 9, x: 510, y: 130 },
                { id: 10, x: 570, y: 145 },
                { id: 11, x: 630, y: 95 }
            ];
            renderRegressionAdvanced(container);
        });
    }

    container.innerHTML = `
            <div class="ai-split-container">
                <!-- Ліва частина: Координатна сітка IT-ринку праці -->
                <div class="ai-canvas-panel">


                    <div class="ai-interactive-canvas-box" id="reg-canvas-box" style="flex: 1;">
                        ${probeResult ? `
                            <div class="reg-probe-badge">
                                <span>🔍 Досвід: <strong>${probeResult.expYears} р.</strong></span>
                                <span>➔ Прогноз доходу: <strong>$${probeResult.salaryEst} / міс</strong></span>
                            </div>
                        ` : ''}

                        <svg id="ai-reg-svg" viewBox="0 0 740 330" style="width: 100%; height: 100%; max-height: 330px; cursor: crosshair;">
                            ${renderSvgGrid(740, 330)}

                            <!-- Довірчий коридор (Confidence Ribbon: 95% інтервал передбачення) -->
                            <path d="${ribbonPath}" fill="#10B981" fill-opacity="0.07" />

                            <!-- Квадрати похибок (якщо увімкнено) -->
                            ${showResidualSquares ? regPoints.map(p => {
        const predY = predictPoly(polyFit, p.x);
        const diff = Math.abs(p.y - predY);
        const sqY = Math.min(p.y, predY);
        return `
                                    <rect x="${p.x}" y="${sqY}" width="${Math.min(diff, 50)}" height="${diff}" fill="#64748B" fill-opacity="0.08" stroke="#94A3B8" stroke-width="1" stroke-dasharray="2 2" />
                                `;
    }).join('') : ''}

                            <!-- Вертикальні відрізки похибок (Residuals) - спокійний графітовий колір -->
                            ${regPoints.map(p => {
        const predY = predictPoly(polyFit, p.x);
        return `<line x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${predY}" stroke="#94A3B8" stroke-width="1.3" stroke-dasharray="3 2" />`;
    }).join('')}

                            <!-- Крива моделі регресії -->
                            <path d="${pathData}" fill="none" stroke="${regDegree === 5 ? '#E11D48' : '#059669'}" stroke-width="3.2" />

                            <!-- Лазерний зонд прогнозу курсору: тонкі координатні штрихи + хрестик (+) -->
                            ${probeResult ? `
                                <line class="reg-probe-line" x1="${probeResult.x}" y1="20" x2="${probeResult.x}" y2="300" />
                                <line class="reg-probe-line" x1="40" y1="${probeResult.y}" x2="700" y2="${probeResult.y}" />
                                <g class="reg-probe-cross" transform="translate(${probeResult.x}, ${probeResult.y})">
                                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" />
                                    <line x1="0" y1="-8" x2="0" y2="8" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" />
                                    <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" stroke="#1E293B" stroke-width="1" />
                                </g>
                            ` : ''}

                            <!-- Точки реальних спеціалістів (Draggable) -->
                            ${regPoints.map((p, idx) => `
                                <g class="ai-svg-node-draggable" data-type="reg_point" data-idx="${idx}">
                                    <circle cx="${p.x}" cy="${p.y}" r="7.5" fill="#6366F1" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
                                </g>
                            `).join('')}

                            <!-- Підписи осей IT-ринку -->
                            <text x="60" y="325" font-size="11" font-weight="700" fill="#64748B">0 р. (Trainee)</text>
                            <text x="260" y="325" font-size="11" font-weight="700" fill="#64748B">2 роки (Middle)</text>
                            <text x="500" y="325" font-size="11" font-weight="700" fill="#64748B">4.5 роки (Senior)</text>
                            <text x="640" y="325" font-size="11" font-weight="700" fill="#64748B">6+ років (Lead)</text>
                            <text x="45" y="45" font-size="11.5" font-weight="800" fill="#059669">$4,500+</text>
                            <text x="45" y="165" font-size="11.5" font-weight="800" fill="#64748B">$2,500</text>
                            <text x="45" y="285" font-size="11.5" font-weight="800" fill="#64748B">$800</text>
                        </svg>
                    </div>

                    <!-- Розвантажені інформаційні картки на вільних полях знизу полотна -->
                    <div class="tech-lab-margin-info">
                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">📖</span>
                                <span class="ai-margin-card__title">Принцип регресії та аналіз IT-ринку</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <strong>Поліноміальна регресія</strong> моделює нелінійну криву доходу від стажу. На 1° лінія занадто проста (Underfitting). На 2°-3° утворюється реалістична модель ринку. На 5° виникає <strong>Overfitting</strong> — модель заучує шум вибірки замість узагальнення.
                            </div>
                        </div>

                        <div class="ai-margin-card">
                            <div class="ai-margin-card__header">
                                <span class="ai-margin-card__icon">🚀</span>
                                <span class="ai-margin-card__title">Застосування в IT-індустрії</span>
                            </div>
                            <div class="ai-margin-card__body">
                                <ul class="ai-margin-list">
                                    <li><strong>Cloud & DevOps:</strong> прогнозування пікового навантаження серверних кластерів.</li>
                                    <li><strong>FinTech:</strong> розрахунок кредитного ризику, автоматичний скоринг позичальників.</li>
                                    <li><strong>E-Commerce:</strong> алгоритми динамічного ціноутворення на основі попиту.</li>
                                    <li><strong>Аналітика продукту:</strong> моделювання LTV клієнтів та прогноз відтоку (Churn Rate).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Права частина: Інженерний аналізатор ШІ (ТІЛЬКИ чисті метрики БЕЗ тексту) -->
                <div class="ai-side-inspector">
                    <div class="ai-inspector-head">
                        <span class="ai-inspector-title">📈 АНАЛІЗАТОР РЕГРЕСІЇ ТА OVERFITTING</span>
                        <span class="ai-inspector-badge">Supervised ML</span>
                    </div>

                    <!-- Стан моделі та оцінка перенавчання -->
                    <div class="algo-result-card">
                        <div class="algo-result-label">Якість апроксимації (Ступінь ${regDegree}°):</div>
                        <div class="algo-result-val">
                            ${regDegree === 1 ? '⚠️ Underfitting (Недонавчання)' : regDegree === 5 ? '🛑 Overfitting (Перенавчання)' : '✔ Optimal Fit (Оптимальний баланс)'}
                        </div>
                        <div class="algo-result-sub">
                            R² = <strong>${r2} (${(parseFloat(r2) * 100).toFixed(0)}%)</strong> | MSE = <strong>${mse} px²</strong> | Ваг моделі: <strong>${regDegree + 1}</strong>
                        </div>
                    </div>

                    <!-- Формула та концепт (2-колонкова компактна сітка) -->
                    <div class="ai-reg-metrics-grid">
                        <div class="ai-reg-metric-box ${regDegree === 2 || regDegree === 3 ? 'is-optimal' : ''}">
                            <span class="ai-reg-metric-box__title">Рівняння моделі:</span>
                            <span class="ai-reg-metric-box__value">ŷ = c₀ + c₁·x ${regDegree >= 2 ? '+ c₂·x²' : ''} ${regDegree >= 3 ? '+ c₃·x³' : ''} ${regDegree >= 5 ? '+ ... + c₅·x⁵' : ''}</span>
                        </div>

                    </div>

                    <div class="db-sidebar-stat-card" style="margin-top: 6px;">
                        <span class="db-stat-icon">📈</span>
                        <div class="db-stat-info">
                            <strong>R²: ${r2} | MSE: ${mse} px²</strong>
                            <span>Вибірка: <b>${regPoints.length} фахівців</b></span>
                        </div>
                    </div>

                    <div class="algo-legend-row" style="margin-top: 6px;">
                        <span class="algo-legend-pill">🟣 <strong>Точки:</strong> IT-фахівці</span>
                        <span class="algo-legend-pill">🟢 <strong>Крива:</strong> лінія прогнозу</span>
                        <span class="algo-legend-pill">🟩 <strong>Коридор:</strong> 95% довіра</span>
                        <span class="algo-legend-pill">📏 <strong>Штрихи:</strong> похибки e = y - ŷ</span>
                    </div>

                    <div class="ai-inspector-quick-card">
                        <div class="ai-inspector-quick-title">💡 Зонд прогнозування доходу</div>
                        <div class="ai-inspector-quick-desc">
                            Рухайте мишкою по графіку — прицільний лазерний хрестик (+) миттєво обчислює прогнозовану заробітну плату за точним досвідом.
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Інтерактивний рух мишки для лазерного зонда (Probe) та Drag точок
    const svg = container.querySelector('#ai-reg-svg');
    if (svg) {
        svg.addEventListener('mousemove', (e) => {
            const pt = getSvgCoords(svg, e);
            if (draggedEntity && draggedEntity.type === 'reg_point') {
                const p = regPoints[draggedEntity.idx];
                if (p) {
                    p.x = Math.max(70, Math.min(670, pt.x));
                    p.y = Math.max(30, Math.min(300, pt.y));
                    renderRegressionAdvanced(container);
                }
            } else {
                probeMouseX = pt.x;
                renderRegressionAdvanced(container);
            }
        });

        svg.addEventListener('mouseleave', () => {
            probeMouseX = null;
            renderRegressionAdvanced(container);
        });

        svg.querySelectorAll('.ai-svg-node-draggable').forEach(node => {
            node.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                const idx = parseInt(node.getAttribute('data-idx'), 10);
                draggedEntity = { type: 'reg_point', idx };
            });
        });
    }
}

function renderConceptAlert(deg, r2) {
    if (deg === 1) {
        return `
                <div class="ai-ml-concept-alert ai-ml-concept-alert--underfit">
                    <strong>⚠️ Недонавчання (Underfitting):</strong>
                    Пряма лінія занадто жорстка, щоб передати нелінійний стрибок зарплати після переходу на рівень Senior. R² = ${r2}.
                </div>
            `;
    } else if (deg === 5) {
        return `
                <div class="ai-ml-concept-alert ai-ml-concept-alert--overfit">
                    <strong>🛑 Перенавчання (Overfitting):</strong>
                    Поліном 5-го ступеня звивається, щоб пройти крізь кожну випадкову точку. Модель зазубрила шум і даватиме абсурдні прогнози на нових резюме!
                </div>
            `;
    } else {
        return `
                <div class="ai-ml-concept-alert ai-ml-concept-alert--optimal">
                    <strong>✅ Оптимальний баланс (Bias-Variance Tradeoff):</strong>
                    Крива ${deg}° ступеня плавно відображає реальну траєкторію IT-ринку праці. Модель має найвищу здатність до генералізації (R² = ${r2})!
                </div>
            `;
    }
}

// Алгоритм поліноміальної регресії (МНК з нормалізацією)
function fitPolynomial(pts, degree) {
    const minX = 60, maxX = 680, scaleX = maxX - minX;
    const normPts = pts.map(p => ({ x: (p.x - minX) / scaleX, y: p.y }));
    const m = degree + 1;
    const A = Array.from({ length: m }, () => Array(m).fill(0));
    const B = Array(m).fill(0);

    normPts.forEach(p => {
        for (let i = 0; i < m; i++) {
            B[i] += p.y * Math.pow(p.x, i);
            for (let j = 0; j < m; j++) {
                A[i][j] += Math.pow(p.x, i + j);
            }
        }
    });

    // Метод Гауса
    for (let i = 0; i < m; i++) {
        let maxRow = i;
        for (let k = i + 1; k < m; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
        }
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [B[i], B[maxRow]] = [B[maxRow], B[i]];

        const pivot = A[i][i];
        if (Math.abs(pivot) < 1e-12) continue;
        for (let j = i; j < m; j++) A[i][j] /= pivot;
        B[i] /= pivot;

        for (let k = 0; k < m; k++) {
            if (k !== i) {
                const factor = A[k][i];
                for (let j = i; j < m; j++) A[k][j] -= factor * A[i][j];
                B[k] -= factor * B[i];
            }
        }
    }
    return { coeffs: B, minX, scaleX };
}

function predictPoly(model, x) {
    const nx = (x - model.minX) / model.scaleX;
    return model.coeffs.reduce((sum, c, i) => sum + c * Math.pow(nx, i), 0);
}

function getSvgCoords(svg, evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: cursorPt.x, y: cursorPt.y };
}

function renderSvgGrid(w, h) {
    let lines = '';
    for (let x = 40; x < w; x += 40) {
        lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#F1F5F9" stroke-width="1" />`;
    }
    for (let y = 30; y < h; y += 30) {
        lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#F1F5F9" stroke-width="1" />`;
    }
    return lines;
}

export function initTechLab() {
    init();
}
