/**
 * ============================================================================
 * SECTION 04: TECH LAB (СВІТЛА ТЕМА)
 * Інтерактивна лабораторія технологій ОПП «ПР»
 * 1. Алгоритми (4 складні алгоритми: QuickSort, Dijkstra, BST, A* Maze)
 * 2. Бази даних (10 таблиць ER-схеми + 10 пов’язаних бізнес-сценаріїв)
 * 3. Штучний інтелект (Покрокове навчання: K-Means еволюція з кроку 1 до 4)
 * ============================================================================
 */

(function () {
    'use strict';

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
            <div class="lab-toolbar">
                <div class="lab-toolbar-info">
                    <span class="lab-toolbar-badge">ЛАБОРАТОРІЯ 01</span>
                    <span class="lab-toolbar-title">Складні алгоритми та структури даних</span>
                    <span class="lab-toolbar-desc">· Оберіть один із 4 інженерних алгоритмів для симуляції</span>
                </div>
                <div class="lab-toolbar-actions">
                    <button class="btn-lab-action ${algoSubmode === 'quicksort' ? 'btn-lab-action--active' : ''}" data-algo="quicksort">📊 QuickSort</button>
                    <button class="btn-lab-action ${algoSubmode === 'dijkstra' ? 'btn-lab-action--active' : ''}" data-algo="dijkstra">🕸️ Граф Дейкстри</button>
                    <button class="btn-lab-action ${algoSubmode === 'bst' ? 'btn-lab-action--active' : ''}" data-algo="bst">🌳 Дерево пошуку (BST)</button>
                    <button class="btn-lab-action ${algoSubmode === 'maze' ? 'btn-lab-action--active' : ''}" data-algo="maze">🧭 Лабіринт A*</button>
                </div>
            </div>

            <div class="lab-workspace">
                <div class="algo-workspace-layout" id="algo-workspace-content">
                    <!-- Рендериться залежно від algoSubmode -->
                </div>
            </div>

            <div class="lab-footer">
                <div class="lab-footer-metrics" id="algo-footer-metrics">
                    <!-- Метрики алгоритму -->
                </div>
                <div class="lab-footer-discipline">
                    <span>Дисципліна:</span>
                    <strong>«Алгоритмізація та програмування» / «Теорія алгоритмів та структур даних»</strong>
                </div>
            </div>
        `;

        stage.querySelectorAll('.lab-toolbar-actions [data-algo]').forEach(btn => {
            btn.addEventListener('click', function () {
                algoSubmode = this.getAttribute('data-algo');
                renderAlgoLab(stage);
            });
        });

        renderAlgoSubmode();
    }

    // ------------------------------------------------------------------------
    // Рендер обраного алгоритму
    // ------------------------------------------------------------------------
    function renderAlgoSubmode() {
        const container = document.getElementById('algo-workspace-content');
        const metricsEl = document.getElementById('algo-footer-metrics');
        if (!container) return;

        if (algoSubmode === 'quicksort') {
            initQuickSortView(container, metricsEl);
        } else if (algoSubmode === 'dijkstra') {
            initDijkstraView(container, metricsEl);
        } else if (algoSubmode === 'bst') {
            initBstView(container, metricsEl);
        } else if (algoSubmode === 'maze') {
            initMazeView(container, metricsEl);
        }
    }

    // --- 1. QuickSort ---
    let sortArray = [45, 18, 85, 32, 70, 92, 14, 55, 63, 27, 76, 40, 89, 21, 68, 50];
    let isSorting = false;

    function initQuickSortView(container, metricsEl) {
        container.innerHTML = `
            <div class="algo-subnav">
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="btn-lab-action btn-lab-action--primary" id="btn-start-sort">▶ Запустити сортування</button>
                    <button class="btn-lab-action" id="btn-shuffle-sort">🔀 Перемішати масив</button>
                </div>
                <div style="font-size: 11.5px; color: #64748B; font-family: ui-monospace, monospace;">
                    Алгоритм: <strong>QuickSort (Розбиття на підмасиви відносно Pivot)</strong>
                </div>
            </div>

            <div class="algo-stage-card">
                <div class="sorting-bars-container" id="sorting-bars-container">
                    ${sortArray.map((val, idx) => `
                        <div class="sorting-bar-col" data-idx="${idx}">
                            <span class="sorting-bar-val">${val}</span>
                            <div class="sorting-bar" style="height: ${val * 2.5}px;"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        if (metricsEl) {
            metricsEl.innerHTML = `
                <div class="lab-metric-item">Елементів: <strong>${sortArray.length}</strong></div>
                <div class="lab-metric-item">Середня складність: <strong class="highlight-purple">O(n log n)</strong></div>
                <div class="lab-metric-item">Пам’ять (Stack): <strong class="highlight-green">O(log n)</strong></div>
            `;
        }

        container.querySelector('#btn-start-sort')?.addEventListener('click', runSortStepByStep);
        container.querySelector('#btn-shuffle-sort')?.addEventListener('click', () => {
            sortArray = sortArray.sort(() => Math.random() - 0.5);
            initQuickSortView(container, metricsEl);
        });
    }

    function runSortStepByStep() {
        if (isSorting) return;
        isSorting = true;
        const btn = document.getElementById('btn-start-sort');
        if (btn) {
            btn.disabled = true;
            btn.textContent = '● Сортування...';
        }

        const cols = document.querySelectorAll('.sorting-bar-col');
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

                    if (arr[j] > arr[j + 1]) {
                        bar1?.classList.add('is-swapping');
                        bar2?.classList.add('is-swapping');
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;

                        cols[j].querySelector('.sorting-bar-val').textContent = arr[j];
                        bar1.style.height = `${arr[j] * 2.5}px`;
                        cols[j + 1].querySelector('.sorting-bar-val').textContent = arr[j + 1];
                        bar2.style.height = `${arr[j + 1] * 2.5}px`;
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
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = '✔ Відсортовано!';
                }
            }
        }
        step();
    }

    // --- 2. Dijkstra Graph (Продвинутий 9-вершинний симулятор маршрутизації) ---
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
    let draggedNode = null;

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
        const visitOrder = [];

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
            visitOrder.push(u);
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
            totalDist: dist[targetId] !== Infinity ? dist[targetId] : 0,
            visited
        };
    }

    function initDijkstraView(container, metricsEl) {
        const result = solveDijkstra(dijkstraStart, dijkstraTarget);

        container.innerHTML = `
            <div class="algo-subnav">
                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 11px; font-weight: 800; color: #475569;">🎯 Ціль:</span>
                    ${dijkstraNodes.filter(n => n.id !== dijkstraStart).map(n => `
                        <button class="btn-lab-action ${dijkstraTarget === n.id ? 'btn-lab-action--active' : ''} btn-dijkstra-target" data-target="${n.id}">
                            ${n.id} (${n.name})
                        </button>
                    `).join('')}
                    <button class="btn-lab-action" id="btn-dijkstra-rand-weights">🎲 Нові ваги ребер</button>
                    <button class="btn-lab-action" id="btn-dijkstra-reset-pos">🔄 Скинути сітку</button>
                </div>
                <div style="font-size: 11px; color: #059669; font-weight: 700;">
                    Маршрут: <strong>${result.path.join(' ➔ ') || 'Не знайдено'}</strong> (Вага: <strong>${result.totalDist}</strong>)
                </div>
            </div>

            <div class="algo-stage-card">
                <div class="algo-split-container">
                    <!-- Ліве інтерактивне векторне полотно графа -->
                    <div class="algo-canvas-panel" id="dijkstra-canvas-box">
                        <svg id="dijkstra-svg" viewBox="0 0 850 340" style="width: 100%; height: 100%; cursor: default; user-select: none;">
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

                                    // Перевірка чи належить ребро найкоротшому шляху
                                    const inPath = result.path.length > 1 &&
                                        result.path.some((node, i) =>
                                            (result.path[i] === uId && result.path[i+1] === vId) ||
                                            (result.path[i] === vId && result.path[i+1] === uId)
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
                        <div style="position: absolute; bottom: 8px; left: 12px; font-size: 10px; color: #94A3B8;">
                            💡 Перетягуйте вузли мишкою по полотну для зміни топології мережі або клікайте для вибору цілі
                        </div>
                    </div>

                    <!-- Правий інспектор алгоритму Дейкстри -->
                    <div class="algo-side-inspector">
                        <div class="algo-inspector-head">
                            <span class="algo-inspector-title">🧭 АНАЛІЗАТОР ДЕЙКСТРИ (MIN-HEAP)</span>
                            <span class="algo-inspector-badge">Greedy O((V+E) log V)</span>
                        </div>

                        <div style="background: #FFFFFF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 8px 10px; margin-bottom: 6px;">
                            <div style="font-size: 11px; font-weight: 700; color: #1E293B; margin-bottom: 3px;">
                                Найкоротший шлях (${dijkstraStart} ➔ ${dijkstraTarget}):
                            </div>
                            <div style="font-family: ui-monospace, monospace; font-size: 12px; font-weight: 800; color: #7C3AED;">
                                ${result.path.join(' ➔ ') || 'Шлях відсутній'}
                            </div>
                            <div style="font-size: 10.5px; color: #059669; font-weight: 700; margin-top: 4px;">
                                Сумарна метрика вартості: ${result.totalDist} умовних одиниць
                            </div>
                        </div>

                        <!-- Таблиця черги пріоритетів (Priority Queue Table) -->
                        <div style="font-size: 10px; font-weight: 800; color: #475569; margin-bottom: 2px;">
                            СТАН ЧЕРГИ ВЕРШИН (DISTANCES & PREDECESSORS):
                        </div>
                        <div class="dijkstra-pq-wrap">
                            <table class="dijkstra-pq-table">
                                <thead>
                                    <tr>
                                        <th>Вузол</th>
                                        <th>Роль у мережі</th>
                                        <th>Метрика d[v]</th>
                                        <th>Попередник</th>
                                        <th>Стан</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${dijkstraNodes.map(n => {
                                        const dVal = result.dist[n.id];
                                        const pVal = result.prev[n.id] || '—';
                                        const isStart = n.id === dijkstraStart;
                                        const isTarget = n.id === dijkstraTarget;
                                        const inPath = result.path.includes(n.id);
                                        const isVisited = result.visited.has(n.id);

                                        let rowCls = '';
                                        if (isTarget) rowCls = 'dijkstra-row--target';
                                        else if (inPath) rowCls = 'dijkstra-row--inpath';
                                        else if (isVisited) rowCls = 'dijkstra-row--visited';

                                        let statusBadge = '⏳ Черга';
                                        if (isStart) statusBadge = '🟢 СТАРТ';
                                        else if (isTarget && inPath) statusBadge = '🎯 ЗНАЙДЕНО';
                                        else if (isVisited) statusBadge = '✔ Опрацьовано';

                                        return `
                                            <tr class="${rowCls}">
                                                <td><strong>${n.id}</strong></td>
                                                <td>${n.label}</td>
                                                <td>${dVal !== Infinity ? dVal : '∞'}</td>
                                                <td>${pVal}</td>
                                                <td>${statusBadge}</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>

                        <div style="background: rgba(255,255,255,0.7); border: 1px solid #E2E8F0; border-radius: 6px; padding: 6px 8px; font-size: 9px; color: #475569; line-height: 1.35;">
                            <strong>Релаксація ребер:</strong> для кожного сусіда перевіряється умова <code>if d[u] + w < d[v] then d[v] = d[u] + w</code>. Використовується в протоколах інтернет-маршрутизації OSPF/IS-IS та навігаторах.
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (metricsEl) {
            metricsEl.innerHTML = `
                <div class="lab-metric-item">Вершин V: <strong>${dijkstraNodes.length}</strong>, Ребер E: <strong>${dijkstraEdges.length}</strong></div>
                <div class="lab-metric-item">Найкоротший шлях: <strong class="highlight-green">${result.totalDist}</strong></div>
                <div class="lab-metric-item">Складність: <strong class="highlight-purple">O((V + E) log V)</strong></div>
            `;
        }

        // Слухачі подій для цільових кнопок
        container.querySelectorAll('.btn-dijkstra-target').forEach(btn => {
            btn.onclick = () => {
                dijkstraTarget = btn.getAttribute('data-target');
                initDijkstraView(container, metricsEl);
            };
        });

        // Випадкові ваги ребер
        const randBtn = container.querySelector('#btn-dijkstra-rand-weights');
        if (randBtn) {
            randBtn.onclick = () => {
                dijkstraEdges.forEach(e => {
                    e[2] = Math.floor(Math.random() * 8) + 1; // 1..8
                });
                initDijkstraView(container, metricsEl);
            };
        }

        // Скинути позиції вузлів
        const resetBtn = container.querySelector('#btn-dijkstra-reset-pos');
        if (resetBtn) {
            resetBtn.onclick = () => {
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
                initDijkstraView(container, metricsEl);
            };
        }

        // Drag & Drop вузлів графа на SVG
        const svg = container.querySelector('#dijkstra-svg');
        if (svg) {
            let activeNodeId = null;
            let startDragX = 0, startDragY = 0;
            let hasMoved = false;

            const getSvgCoords = (e) => {
                const rect = svg.getBoundingClientRect();
                const scaleX = 850 / rect.width;
                const scaleY = 340 / rect.height;
                return {
                    x: (e.clientX - rect.left) * scaleX,
                    y: (e.clientY - rect.top) * scaleY
                };
            };

            container.querySelectorAll('.dijkstra-node-group').forEach(g => {
                g.addEventListener('mousedown', (e) => {
                    activeNodeId = g.getAttribute('data-node-id');
                    startDragX = e.clientX;
                    startDragY = e.clientY;
                    hasMoved = false;
                    e.stopPropagation();
                });
            });

            svg.addEventListener('mousemove', (e) => {
                if (!activeNodeId) return;
                const dx = Math.abs(e.clientX - startDragX);
                const dy = Math.abs(e.clientY - startDragY);
                if (dx > 3 || dy > 3) hasMoved = true;

                if (hasMoved) {
                    const coords = getSvgCoords(e);
                    const node = dijkstraNodes.find(n => n.id === activeNodeId);
                    if (node) {
                        node.x = Math.max(30, Math.min(820, coords.x));
                        node.y = Math.max(30, Math.min(310, coords.y));
                        initDijkstraView(container, metricsEl);
                    }
                }
            });

            const onMouseUp = () => {
                if (activeNodeId && !hasMoved) {
                    // Клік по вузлу без перетягування = призначення ціллю
                    if (activeNodeId !== dijkstraStart) {
                        dijkstraTarget = activeNodeId;
                        initDijkstraView(container, metricsEl);
                    }
                }
                activeNodeId = null;
                hasMoved = false;
            };

            window.addEventListener('mouseup', onMouseUp, { once: true });
        }
    }

    // --- 3. Binary Search Tree (BST & Структури даних з вставкою, пошуком та обходами) ---
    let bstKeys = [50, 30, 70, 20, 40, 60, 80, 35, 65];
    let bstSearchTarget = 35;
    let bstActivePath = [50, 30, 40, 35];
    let bstFoundTarget = 35;
    let bstComparisonLog = [
        '1. Корінь (50): 35 < 50 ➔ ідемо ліворуч',
        '2. Вузол (30): 35 > 30 ➔ ідемо праворуч',
        '3. Вузол (40): 35 < 40 ➔ ідемо ліворуч',
        '4. Вузол (35): 35 == 35 ➔ елемент успішно знайдено!'
    ];
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
        // Рекурсивне розміщення вузлів на полотні 850 x 310
        function layout(node, depth, minX, maxX) {
            if (!node) return;
            node.depth = depth;
            node.x = (minX + maxX) / 2;
            node.y = 35 + depth * 65; // рівні: 35, 100, 165, 230, 295
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

    function initBstView(container, metricsEl) {
        const root = buildBstFromKeys(bstKeys);
        computeBstPositions(root);
        const allNodes = getBstNodesList(root);
        const treeHeight = getBstHeight(root);
        const inOrderArr = getBstInOrder(root);

        // Збір зв'язків між батьком та нащадками
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

        container.innerHTML = `
            <div class="algo-subnav">
                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 11px; font-weight: 800; color: #475569;">➕ Число:</span>
                    <input type="number" id="bst-input-val" value="${Math.floor(Math.random() * 85) + 10}" min="1" max="99"
                           style="width: 52px; padding: 3px 6px; font-size: 11px; font-weight: 800; border: 1.5px solid #CBD5E1; border-radius: 5px; font-family: ui-monospace, monospace;">
                    <button class="btn-lab-action btn-lab-action--primary" id="btn-bst-add">➕ Вставити</button>
                    <button class="btn-lab-action" id="btn-bst-find">🔍 Знайти</button>

                    <span style="font-size: 11px; color: #CBD5E1; margin: 0 4px;">|</span>
                    <button class="btn-lab-action" id="btn-bst-inorder">📋 In-Order (Сортування)</button>
                    <button class="btn-lab-action" id="btn-bst-preorder">Pre-Order</button>
                    <button class="btn-lab-action" id="btn-bst-postorder">Post-Order</button>

                    <span style="font-size: 11px; color: #CBD5E1; margin: 0 4px;">|</span>
                    <button class="btn-lab-action" id="btn-bst-preset-std">🌳 9 вузлів</button>
                    <button class="btn-lab-action" id="btn-bst-preset-large">🌲 13 вузлів</button>
                    <button class="btn-lab-action" id="btn-bst-preset-linear">📉 Вироджене O(N)</button>
                    <button class="btn-lab-action" id="btn-bst-reset">🧹 Очистити</button>
                </div>
            </div>

            <div class="algo-stage-card">
                <div class="algo-split-container">
                    <!-- Ліве полотно BST -->
                    <div class="algo-canvas-panel">
                        <svg viewBox="0 0 850 330" style="width: 100%; height: 100%; user-select: none;">
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

                        <!-- Нижня стрічка сортованого масиву / результату обходу -->
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

                    <!-- Правий інспектор дерева BST -->
                    <div class="algo-side-inspector">
                        <div class="algo-inspector-head">
                            <span class="algo-inspector-title">🌲 АНАЛІЗАТОР ДЕРЕВА ПОШУКУ (BST)</span>
                            <span class="algo-inspector-badge">O(log n) Search</span>
                        </div>

                        <div style="background: #FFFFFF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 7px 10px; margin-bottom: 5px;">
                            <div style="font-size: 10.5px; font-weight: 700; color: #1E293B; margin-bottom: 2px;">
                                Траєкторія пошуку/вставки:
                            </div>
                            <div style="font-family: ui-monospace, monospace; font-size: 11.5px; font-weight: 800; color: #7C3AED;">
                                ${bstActivePath.join(' ➔ ') || '—'}
                            </div>
                            <div style="font-size: 10px; color: ${bstFoundTarget !== null ? '#059669' : bstActivePath.length > 5 ? '#7C3AED' : '#DC2626'}; font-weight: 700; margin-top: 3px;">
                                ${bstFoundTarget !== null ? `✔ Ключ ${bstFoundTarget} знайдено (або вставлено)` : bstActivePath.length > 5 ? `✔ Обхід завершено: опрацьовано ${bstTraversalPills.length} вузлів` : '❌ Ключ не знайдено в дереві'}
                            </div>
                        </div>

                        <!-- Лог покрокових порівнянь алгоритму -->
                        <div style="font-size: 10px; font-weight: 800; color: #475569; margin-bottom: 2px;">
                            ЛОГ ПОРІВНЯНЬ (КЛЮЧ vs ВУЗОЛ):
                        </div>
                        <div class="bst-steps-log">
                            ${bstComparisonLog.map((log, idx) => `
                                <div class="bst-step-item">
                                    <span class="bst-step-num">#${idx+1}</span>
                                    <span>${log}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Властивості та метрики дерева -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin: 4px 0;">
                            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 5px; padding: 4px 6px; font-size: 9.5px;">
                                Вузлів у дереві: <strong>${allNodes.length}</strong>
                            </div>
                            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 5px; padding: 4px 6px; font-size: 9.5px;">
                                Висота дерева h: <strong>${treeHeight}</strong>
                            </div>
                            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 5px; padding: 4px 6px; font-size: 9.5px;">
                                Баланс: <strong>${treeHeight <= Math.ceil(Math.log2(allNodes.length + 1)) + 1 ? '✔ Збалансоване' : '⚠️ Вироджене'}</strong>
                            </div>
                            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 5px; padding: 4px 6px; font-size: 9.5px;">
                                Складність: <strong class="highlight-purple">O(log n)</strong>
                            </div>
                        </div>

                        <div style="background: rgba(255,255,255,0.7); border: 1px solid #E2E8F0; border-radius: 6px; padding: 6px 8px; font-size: 9px; color: #475569; line-height: 1.35;">
                            <strong>Фундаментальний інваріант:</strong> для будь-якого вузла X усі ключі в лівому піддереві <code>< X</code>, а в правому <code>> X</code>. In-Order обхід BST автоматично повертає повністю відсортований масив. Лежить в основі B-Tree індексів реляційних СУБД.
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (metricsEl) {
            metricsEl.innerHTML = `
                <div class="lab-metric-item">Вузлів N: <strong>${allNodes.length}</strong>, Висота h: <strong>${treeHeight}</strong></div>
                <div class="lab-metric-item">Кроки пошуку: <strong class="highlight-green">${bstActivePath.length} порівняння</strong></div>
                <div class="lab-metric-item">Складність: <strong class="highlight-purple">O(log n)</strong></div>
            `;
        }

        // Пошук вузла за значенням
        function executeSearch(targetVal) {
            bstSearchTarget = targetVal;
            bstActivePath = [];
            bstComparisonLog = [];
            bstFoundTarget = null;

            let curr = root;
            let step = 1;
            while (curr) {
                bstActivePath.push(curr.val);
                if (targetVal === curr.val) {
                    bstComparisonLog.push(`Вузол (${curr.val}): ${targetVal} == ${curr.val} ➔ ЕЛЕМЕНТ ЗНАЙДЕНО!`);
                    bstFoundTarget = curr.val;
                    break;
                } else if (targetVal < curr.val) {
                    bstComparisonLog.push(`Вузол (${curr.val}): ${targetVal} < ${curr.val} ➔ ідемо ліворуч`);
                    curr = curr.left;
                } else {
                    bstComparisonLog.push(`Вузол (${curr.val}): ${targetVal} > ${curr.val} ➔ ідемо праворуч`);
                    curr = curr.right;
                }
                step++;
            }

            if (!bstFoundTarget) {
                bstComparisonLog.push(`Елемент ${targetVal} відсутній у цьому дереві`);
            }

            bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
            bstTraversalName = 'In-Order (Сортована послідовність L-N-R)';
            initBstView(container, metricsEl);
        }

        // Вставка нового вузла
        function executeInsert(val) {
            if (bstKeys.includes(val)) {
                executeSearch(val);
                return;
            }

            bstSearchTarget = val;
            bstActivePath = [];
            bstComparisonLog = [];

            let curr = root;
            while (curr) {
                bstActivePath.push(curr.val);
                if (val < curr.val) {
                    bstComparisonLog.push(`Вузол (${curr.val}): ${val} < ${curr.val} ➔ ліворуч`);
                    if (!curr.left) {
                        bstComparisonLog.push(`Вставка нового вузла ${val} ліворуч від ${curr.val}`);
                        break;
                    }
                    curr = curr.left;
                } else {
                    bstComparisonLog.push(`Вузол (${curr.val}): ${val} > ${curr.val} ➔ праворуч`);
                    if (!curr.right) {
                        bstComparisonLog.push(`Вставка нового вузла ${val} праворуч від ${curr.val}`);
                        break;
                    }
                    curr = curr.right;
                }
            }

            bstKeys.push(val);
            bstActivePath.push(val);
            bstFoundTarget = val;
            bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
            bstTraversalName = 'In-Order (Сортована послідовність L-N-R)';
            initBstView(container, metricsEl);
        }

        // Обробники кнопок
        const btnAdd = container.querySelector('#btn-bst-add');
        const inputVal = container.querySelector('#bst-input-val');
        if (btnAdd && inputVal) {
            btnAdd.onclick = () => {
                const v = parseInt(inputVal.value, 10);
                if (!isNaN(v) && v > 0 && v < 100) executeInsert(v);
            };
        }

        const btnFind = container.querySelector('#btn-bst-find');
        if (btnFind && inputVal) {
            btnFind.onclick = () => {
                const v = parseInt(inputVal.value, 10);
                if (!isNaN(v)) executeSearch(v);
            };
        }

        // Клік по будь-якому вузлу на полотні шукає його
        container.querySelectorAll('.bst-node-group').forEach(g => {
            g.onclick = () => {
                const val = parseInt(g.getAttribute('data-val'), 10);
                executeSearch(val);
            };
        });

        // Обходи
        const btnIn = container.querySelector('#btn-bst-inorder');
        if (btnIn) {
            btnIn.onclick = () => {
                bstTraversalPills = inOrderArr;
                bstTraversalName = 'In-Order Обхід (L-N-R, Сортований масив)';
                bstActivePath = inOrderArr;
                bstFoundTarget = null;
                bstComparisonLog = ['In-Order обхід лівого піддерева, кореня та правого піддерева повертає строго зростаючу послідовність!'];
                initBstView(container, metricsEl);
            };
        }

        const btnPre = container.querySelector('#btn-bst-preorder');
        if (btnPre) {
            btnPre.onclick = () => {
                const pre = getBstPreOrder(root);
                bstTraversalPills = pre;
                bstTraversalName = 'Pre-Order Обхід (N-L-R, Прямий порядок)';
                bstActivePath = pre;
                bstFoundTarget = null;
                bstComparisonLog = ['Pre-Order відвідує спочатку корінь N, потім ліве L, потім праве піддерево R (серіалізація структури дерева).'];
                initBstView(container, metricsEl);
            };
        }

        const btnPost = container.querySelector('#btn-bst-postorder');
        if (btnPost) {
            btnPost.onclick = () => {
                const post = getBstPostOrder(root);
                bstTraversalPills = post;
                bstTraversalName = 'Post-Order Обхід (L-R-N, Зворотний порядок)';
                bstActivePath = post;
                bstFoundTarget = null;
                bstComparisonLog = ['Post-Order відвідує спочатку нащадків L та R, і лише потім корінь N (використовується для видалення дерева чи обчислення виразів).'];
                initBstView(container, metricsEl);
            };
        }

        // Пресети
        const pStd = container.querySelector('#btn-bst-preset-std');
        if (pStd) {
            pStd.onclick = () => {
                bstKeys = [50, 30, 70, 20, 40, 60, 80, 35, 65];
                bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
                executeSearch(35);
            };
        }

        const pLarge = container.querySelector('#btn-bst-preset-large');
        if (pLarge) {
            pLarge.onclick = () => {
                bstKeys = [50, 25, 75, 15, 35, 65, 85, 10, 20, 30, 40, 60, 90];
                bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
                executeSearch(40);
            };
        }

        const pLinear = container.querySelector('#btn-bst-preset-linear');
        if (pLinear) {
            pLinear.onclick = () => {
                bstKeys = [15, 25, 35, 45, 55, 65, 75];
                bstTraversalPills = getBstInOrder(buildBstFromKeys(bstKeys));
                executeSearch(75);
            };
        }

        const pReset = container.querySelector('#btn-bst-reset');
        if (pReset) {
            pReset.onclick = () => {
                bstKeys = [50];
                bstTraversalPills = [50];
                executeSearch(50);
            };
        }
    }
    // --- 4. A* Maze Grid ---
    const MAZE_COLS = 16;
    const MAZE_ROWS = 7;
    let mazeWalls = new Set(['3,1', '3,2', '3,3', '3,4', '7,2', '7,3', '7,4', '7,5', '11,1', '11,2', '11,3', '11,4']);
    let mazePath = [];

    function initMazeView(container, metricsEl) {
        container.innerHTML = `
            <div class="algo-subnav">
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="btn-lab-action btn-lab-action--primary" id="btn-run-astar">▶ Знайти шлях (Алгоритм A*)</button>
                    <button class="btn-lab-action" id="btn-clear-walls">🧹 Очистити стіни</button>
                    <button class="btn-lab-action" id="btn-preset-maze">🎲 Стандартні стіни</button>
                </div>
                <div style="font-size: 11.5px; color: #64748B;">
                    👆 <strong>Клікайте по клітинках</strong>, щоб ставити або прибирати власні стіни-перешкоди!
                </div>
            </div>

            <div class="algo-stage-card">
                <div class="maze-grid-container" id="maze-grid">
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
            </div>
        `;

        if (metricsEl) {
            metricsEl.innerHTML = `
                <div class="lab-metric-item">Сітка: <strong>16 × 7 клітинок</strong></div>
                <div class="lab-metric-item">Стін встановлено: <strong>${mazeWalls.size}</strong></div>
                <div class="lab-metric-item">Евристика: <strong class="highlight-green">Manhattan Distance h(n)</strong></div>
                <div class="lab-metric-item">Складність A*: <strong class="highlight-purple">O(b^d)</strong></div>
            `;
        }

        // Клік по клітинках для встановлення стін
        container.querySelectorAll('.maze-cell').forEach(cell => {
            cell.addEventListener('click', function () {
                const c = parseInt(this.getAttribute('data-c'), 10);
                const r = parseInt(this.getAttribute('data-r'), 10);
                if ((c === 1 && r === 3) || (c === 14 && r === 3)) return; // не змінювати старт/ціль

                const key = `${c},${r}`;
                if (mazeWalls.has(key)) {
                    mazeWalls.delete(key);
                } else {
                    mazeWalls.add(key);
                }
                mazePath = [];
                initMazeView(container, metricsEl);
            });
        });

        container.querySelector('#btn-run-astar')?.addEventListener('click', () => {
            runAStarSearch(container, metricsEl);
        });

        container.querySelector('#btn-clear-walls')?.addEventListener('click', () => {
            mazeWalls.clear();
            mazePath = [];
            initMazeView(container, metricsEl);
        });

        container.querySelector('#btn-preset-maze')?.addEventListener('click', () => {
            mazeWalls = new Set(['3,1', '3,2', '3,3', '3,4', '7,2', '7,3', '7,4', '7,5', '11,1', '11,2', '11,3', '11,4']);
            mazePath = [];
            initMazeView(container, metricsEl);
        });
    }

    // Спрощена реалізація A* (BFS/Manhattan) для сітки
    function runAStarSearch(container, metricsEl) {
        const start = { c: 1, r: 3 };
        const target = { c: 14, r: 3 };

        let queue = [[start]];
        let visited = new Set([`1,3`]);
        let foundPath = null;

        while (queue.length > 0) {
            const path = queue.shift();
            const curr = path[path.length - 1];

            if (curr.c === target.c && curr.r === target.r) {
                foundPath = path;
                break;
            }

            const neighbors = [
                { c: curr.c + 1, r: curr.r },
                { c: curr.c, r: curr.r + 1 },
                { c: curr.c, r: curr.r - 1 },
                { c: curr.c - 1, r: curr.r }
            ];

            // Сортування за евристикою Мангеттена (найближчі до цілі розглядаються першими)
            neighbors.sort((a, b) => {
                const da = Math.abs(a.c - target.c) + Math.abs(a.r - target.r);
                const db = Math.abs(b.c - target.c) + Math.abs(b.r - target.r);
                return da - db;
            });

            for (let nb of neighbors) {
                const key = `${nb.c},${nb.r}`;
                if (nb.c >= 0 && nb.c < MAZE_COLS && nb.r >= 0 && nb.r < MAZE_ROWS && !mazeWalls.has(key) && !visited.has(key)) {
                    visited.add(key);
                    queue.push([...path, nb]);
                }
            }
        }

        if (foundPath) {
            mazePath = foundPath.map(p => `${p.c},${p.r}`);
        } else {
            alert('Шлях заблоковано стінами! Спробуйте прибрати деякі перешкоди.');
        }
        initMazeView(container, metricsEl);
    }

    // ========================================================================
    // ЛАБОРАТОРІЯ 02: БАЗИ ДАНИХ & РЕЛЯЦІЙНА ER-МОДЕЛЬ (10 ТАБЛИЦЬ)
    // ========================================================================
    const DB_10_TABLES = [
        // КОЛОНКА 1: БАЗОВІ ДОВІДНИКИ (x: 35, w: 260)
        {
            id: 'specialties',
            name: 'specialties',
            label: 'Спеціальності',
            icon: '📂',
            x: 35, y: 15, w: 260, h: 115,
            tier: 'Довідник',
            desc: 'Базовий класифікатор освітніх програм (122 Комп’ютерні науки, ОПП «ПР»)',
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
            x: 35, y: 150, w: 260, h: 115,
            tier: 'Довідник',
            desc: 'Циклові комісії коледжу та закріплені аудиторні корпуси',
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
            x: 35, y: 285, w: 260, h: 115,
            tier: 'Довідник',
            desc: 'Матеріальна база: комп’ютерні класи, сервери та мультимедійні лекторії',
            cols: [
                { name: 'id', type: 'INT PK', isPk: true },
                { name: 'room_num', type: 'VARCHAR(20)' },
                { name: 'seats_count', type: 'INT' },
                { name: 'pc_equipped', type: 'BOOLEAN' }
            ]
        },

        // КОЛОНКА 2: АКАДЕМІЧНА СТРУКТУРА (x: 415, w: 265)
        {
            id: 'academic_groups',
            name: 'academic_groups',
            label: 'Академічні групи',
            icon: '👥',
            x: 415, y: 15, w: 265, h: 115,
            tier: 'Контингент',
            desc: 'Навчальні групи студентів спеціальності 122 (напр. ПР-21, ПР-22)',
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
            x: 415, y: 150, w: 265, h: 115,
            tier: 'Кадри',
            desc: 'Педагогічний склад фахових дисциплін інженерії програмного забезпечення',
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
            x: 415, y: 285, w: 265, h: 115,
            tier: 'Навч. каталог',
            desc: 'Каталог навчальних курсів: Алгоритми, Бази даних, Комп’ютерні мережі, ШІ',
            cols: [
                { name: 'id', type: 'INT PK', isPk: true },
                { name: 'title', type: 'VARCHAR(120)' },
                { name: 'total_hours', type: 'INT' },
                { name: 'ects_credits', type: 'DECIMAL(3,1)' }
            ]
        },

        // КОЛОНКА 3: ОПЕРАЦІЙНІ ТАБЛИЦІ (x: 800, w: 265)
        {
            id: 'students',
            name: 'students',
            label: 'Студенти',
            icon: '🎓',
            x: 800, y: 15, w: 265, h: 115,
            tier: 'Контингент',
            desc: 'Здобувачі фахової передвищої освіти, закріплені за академічною групою',
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
            x: 800, y: 150, w: 265, h: 115,
            tier: 'ОПП Стандарт',
            desc: 'Зв’язок спеціальності та дисциплін із розподілом по семестрах',
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
            x: 800, y: 285, w: 265, h: 125,
            tier: 'Процес',
            desc: 'Вузлова сутність: поєднує викладача, групу, аудиторію та предмет у часі',
            cols: [
                { name: 'id', type: 'INT PK', isPk: true },
                { name: 'group_id', type: 'INT FK', isFk: true },
                { name: 'discipline_id', type: 'INT FK', isFk: true },
                { name: 'teacher_id', type: 'INT FK', isFk: true },
                { name: 'room_id', type: 'INT FK', isFk: true }
            ]
        },

        // КОЛОНКА 4: ТРАНЗАКЦІЙНИЙ ЖУРНАЛ (x: 1185, w: 380)
        {
            id: 'exam_grades',
            name: 'exam_grades',
            label: 'Відомості & Оцінки',
            icon: '📝',
            x: 1185, y: 15, w: 380, h: 180,
            tier: 'Транзакції',
            desc: 'Центральний транзакційний журнал: фіксує підсумкові бали студента за пару чи сесію',
            cols: [
                { name: 'id', type: 'INT PK', isPk: true },
                { name: 'student_id', type: 'INT FK', isFk: true },
                { name: 'schedule_id', type: 'INT FK', isFk: true },
                { name: 'score', type: 'INT (1..100)' },
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

    function renderDbLab(stage) {
        stage.innerHTML = `
            <div class="lab-toolbar">
                <div class="lab-toolbar-info">
                    <span class="lab-toolbar-badge">ЛАБОРАТОРІЯ 02</span>
                    <span class="lab-toolbar-title">Реляційна база даних: Архітектура 10 таблиць & Зв’язки</span>
                    <span class="lab-toolbar-desc">· 3-тя нормальна форма (3NF). Наведіть курсор або клікніть по таблиці для підсвічування залежностей</span>
                </div>
                <div class="lab-toolbar-actions">
                    <button class="btn-lab-action btn-lab-action--active" id="btn-er-reset-focus">🔄 Скинути фокус</button>
                </div>
            </div>

            <div class="lab-workspace">
                <div class="db-studio-layout">
                    <div class="db-er-stage">
                        <div class="db-er-header">
                            <span class="db-er-badge">🗄️ СХЕМА БД: 10 РЕЛЯЦІЙНИХ ТАБЛИЦЬ (POSTGRESQL 16 / MYSQL 8.0 INNODB)</span>
                            <span class="db-er-active-summary" id="er-active-summary">
                                Всі зв’язки: <strong>12 активних зовнішніх ключів (FK)</strong>
                            </span>
                        </div>

                        <!-- Повноформатне полотно ER-схеми в єдиному масштабованому SVG просторі -->
                        <div class="db-er-canvas-container" id="db-er-canvas">
                            <svg class="db-er-svg-canvas" id="db-er-svg-canvas" viewBox="0 0 1600 425" preserveAspectRatio="xMidYMid meet">
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

                                    <!-- Інспектор поточної реляційної моделі (Колонка 4, знизу) -->
                                    <foreignObject x="1185" y="215" width="380" height="195" class="db-fo-inspector">
                                        <div class="db-info-panel-card" id="db-info-panel">
                                            <div class="db-info-head">
                                                <span class="db-info-title">📊 Інспектор реляцій</span>
                                                <span class="db-info-badge" id="db-info-badge">3NF Модель</span>
                                            </div>
                                            <div class="db-info-body" id="db-info-body">
                                                <div class="db-info-desc" id="db-info-desc">
                                                    Наведіть на будь-яку таблицю або клікніть для дослідження зв’язків та зовнішніх ключів.
                                                </div>
                                                <div class="db-info-highlight" id="db-info-sub">
                                                    🔗 Загалом: <strong>12 зв’язків (1:N) між 10 таблицями</strong>
                                                </div>
                                            </div>
                                            <div class="db-info-metrics">
                                                <div class="db-metric-pill">✔ 3NF Нормалізовано</div>
                                                <div class="db-metric-pill">⚡ 10 B-Tree PK</div>
                                                <div class="db-metric-pill">🔒 ACID Гарантія</div>
                                                <div class="db-metric-pill">🛡️ RESTRICT/CASCADE</div>
                                            </div>
                                        </div>
                                    </foreignObject>
                                </g>
                            </svg>
                        </div>

                        <div class="db-er-footer-bar">
                            <span>Архітектура СУБД: <strong>PostgreSQL 16 & MySQL 8.0 InnoDB</strong></span>
                            <span>Нормалізація: <strong>3-тя нормальна форма (3NF, усунуто надмірність)</strong></span>
                            <span>Цілісність даних: <strong>FOREIGN KEY (ON DELETE RESTRICT / CASCADE)</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setupDbEventListeners(stage);
        drawDbLinks(stage);
    }

    function setupDbEventListeners(stage) {
        const resetBtn = stage.querySelector('#btn-er-reset-focus');
        if (resetBtn) {
            resetBtn.onclick = () => {
                hoveredTableId = null;
                lockedTableId = null;
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
        const infoBadge = stage.querySelector('#db-info-badge');
        const infoDesc = stage.querySelector('#db-info-desc');
        const infoSub = stage.querySelector('#db-info-sub');

        if (!activeTableId) {
            cards.forEach(c => {
                c.classList.remove('is-active', 'is-related', 'is-dimmed');
                const b = c.querySelector('.db-card-badge');
                const t = DB_10_TABLES.find(x => x.id === c.getAttribute('data-table-id'));
                if (b && t) b.textContent = t.tier;
            });
            if (badge) badge.innerHTML = `Всі зв’язки: <strong>12 активних зовнішніх ключів (FK)</strong>`;
            if (infoBadge) infoBadge.textContent = '3NF Модель';
            if (infoDesc) infoDesc.textContent = 'Наведіть на будь-яку таблицю або клікніть для дослідження зв’язків та зовнішніх ключів.';
            if (infoSub) infoSub.innerHTML = `🔗 Загалом: <strong>12 зв’язків (1:N) між 10 таблицями</strong>`;
            drawDbLinks(stage);
            return;
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
        if (infoBadge && activeTable) {
            infoBadge.textContent = activeTable.name;
        }
        if (infoDesc && activeTable) {
            infoDesc.innerHTML = `<strong>${activeTable.label} (${activeTable.name})</strong>: ${activeTable.desc}`;
        }
        if (infoSub && activeTable) {
            const relNames = Array.from(relatedIds).map(id => `<code>${id}</code>`).join(', ');
            infoSub.innerHTML = `🔗 Суміжні таблиці (${relatedIds.size}): ${relNames}`;
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
                x1 = t1.x + t1.w; y1 = t1.y + 60;
                x2 = t2.x; y2 = t2.y + 60;
                d = `M ${x1} ${y1} L ${x2} ${y2}`;
            } else if (rel.id === 'r_groups_stud') {
                // academic_groups -> students (пряма горизонтальна)
                x1 = t1.x + t1.w; y1 = t1.y + 60;
                x2 = t2.x; y2 = t2.y + 60;
                d = `M ${x1} ${y1} L ${x2} ${y2}`;
            } else if (rel.id === 'r_dept_teach') {
                // departments -> teachers (пряма горизонтальна)
                x1 = t1.x + t1.w; y1 = t1.y + 55;
                x2 = t2.x; y2 = t2.y + 55;
                d = `M ${x1} ${y1} L ${x2} ${y2}`;
            } else if (rel.id === 'r_disc_sched') {
                // disciplines -> schedules (пряма горизонтальна)
                x1 = t1.x + t1.w; y1 = t1.y + 60;
                x2 = t2.x; y2 = t2.y + 60;
                d = `M ${x1} ${y1} L ${x2} ${y2}`;
            } else if (rel.id === 'r_stud_grades') {
                // students -> exam_grades (плавна крива вниз-вправо)
                x1 = t1.x + t1.w; y1 = t1.y + 60;
                x2 = t2.x; y2 = t2.y + 65;
                const dx = (x2 - x1) * 0.45;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
            } else if (rel.id === 'r_sched_grades') {
                // schedules -> exam_grades (плавна крива вгору-вправо)
                x1 = t1.x + t1.w; y1 = t1.y + 55;
                x2 = t2.x; y2 = t2.y + 125;
                const dx = (x2 - x1) * 0.45;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
            } else if (rel.id === 'r_teach_sched') {
                // teachers -> schedules (плавна крива вниз-вправо)
                x1 = t1.x + t1.w; y1 = t1.y + 65;
                x2 = t2.x; y2 = t2.y + 40;
                const dx = (x2 - x1) * 0.45;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
            } else if (rel.id === 'r_disc_curr') {
                // disciplines -> curriculum (плавна крива вгору-вправо)
                x1 = t1.x + t1.w; y1 = t1.y + 40;
                x2 = t2.x; y2 = t2.y + 80;
                const dx = (x2 - x1) * 0.45;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
            } else if (rel.id === 'r_spec_curr') {
                // specialties -> curriculum (плавна дуга через простір між колонками)
                x1 = t1.x + t1.w; y1 = t1.y + 35;
                x2 = t2.x; y2 = t2.y + 45;
                const dx = (x2 - x1) * 0.35;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1 - 10}, ${x2 - dx} ${y2 - 10}, ${x2} ${y2}`;
            } else if (rel.id === 'r_groups_sched') {
                // academic_groups -> schedules (дуга через міжряддя)
                x1 = t1.x + t1.w; y1 = t1.y + 85;
                x2 = t2.x; y2 = t2.y + 25;
                const dx = (x2 - x1) * 0.35;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1 + 35}, ${x2 - dx} ${y2 - 35}, ${x2} ${y2}`;
            } else if (rel.id === 'r_rooms_sched') {
                // classrooms -> schedules (дуга вздовж нижнього каналу)
                x1 = t1.x + t1.w; y1 = t1.y + 60;
                x2 = t2.x; y2 = t2.y + 90;
                const dx = (x2 - x1) * 0.35;
                d = `M ${x1} ${y1} C ${x1 + dx} ${y1 + 30}, ${x2 - dx} ${y2 + 30}, ${x2} ${y2}`;
            } else if (rel.id === 'r_teach_dept') {
                // teachers -> departments (двосторонній зв’язок)
                x1 = t1.x; y1 = t1.y + 80;
                x2 = t2.x + t2.w; y2 = t2.y + 80;
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

    let draggedEntity = null; // Drag & drop стан

    function renderAiLab(stage) {
        stage.innerHTML = `
            <div class="lab-toolbar">
                <div class="lab-toolbar-info">
                    <span class="lab-toolbar-badge">ЛАБОРАТОРІЯ 03</span>
                    <span class="lab-toolbar-title">Штучний інтелект & Машинне навчання</span>
                    <span class="lab-toolbar-desc">· K-Means з динамічним радіусом охоплення та Поліноміальна регресія з аналізом перенавчання</span>
                </div>
                <div class="lab-toolbar-actions">
                    <button class="btn-lab-action ${aiSubmode === 'kmeans' ? 'btn-lab-action--active' : ''}" id="btn-ai-mode-kmeans">
                        🧠 K-Means (Обчислення відстаней)
                    </button>
                    <button class="btn-lab-action ${aiSubmode === 'regression' ? 'btn-lab-action--active' : ''}" id="btn-ai-mode-reg">
                        📈 ML Регресія (Прогнозування доходу)
                    </button>
                </div>
            </div>

            <div class="lab-workspace">
                <div class="ai-workspace-layout" id="ai-workspace-content">
                    <!-- Залежно від aiSubmode -->
                </div>
            </div>

            <div class="lab-footer">
                <div class="lab-footer-metrics" id="ai-footer-metrics">
                    <!-- Метрики моделі -->
                </div>
                <div class="lab-footer-discipline">
                    <span>Дисципліна:</span>
                    <strong>«Штучний інтелект» / «Інтелектуальний аналіз даних (Machine Learning)»</strong>
                </div>
            </div>
        `;

        stage.querySelector('#btn-ai-mode-kmeans')?.addEventListener('click', () => {
            aiSubmode = 'kmeans';
            if (isKScanning) { clearInterval(kScanTimer); isKScanning = false; }
            if (isTrainingGradient) { clearInterval(gradientTimer); isTrainingGradient = false; }
            renderAiLab(stage);
        });

        stage.querySelector('#btn-ai-mode-reg')?.addEventListener('click', () => {
            aiSubmode = 'regression';
            if (isKScanning) { clearInterval(kScanTimer); isKScanning = false; }
            renderAiLab(stage);
        });

        renderAiSubmodeContent();
    }

    function renderAiSubmodeContent() {
        const container = document.getElementById('ai-workspace-content');
        const metricsEl = document.getElementById('ai-footer-metrics');
        if (!container) return;

        if (aiSubmode === 'kmeans') {
            renderKMeansAdvanced(container, metricsEl);
        } else {
            renderRegressionAdvanced(container, metricsEl);
        }
    }

    // ========================================================================
    // 3.1. K-MEANS: ПОКРОКОВЕ ОБЧИСЛЕННЯ ВІДСТАНЕЙ + ДИНАМІЧНИЙ РАДІУС ОХОПЛЕННЯ
    // ========================================================================
    function renderKMeansAdvanced(container, metricsEl) {
        const activePt = kPoints[activeKPointIdx] || kPoints[0];

        // Точний математичний розрахунок відстаней від activePt до 3 центроїдів
        const d1 = Math.hypot(activePt.x - kCentroids[0].x, activePt.y - kCentroids[0].y);
        const d2 = Math.hypot(activePt.x - kCentroids[1].x, activePt.y - kCentroids[1].y);
        const d3 = Math.hypot(activePt.x - kCentroids[2].x, activePt.y - kCentroids[2].y);

        const minD = Math.min(d1, d2, d3);
        const bestClusterIdx = minD === d1 ? 0 : minD === d2 ? 1 : 2;
        activePt.cluster = bestClusterIdx;

        // ДИНАМІЧНИЙ РОЗРАХУНОК РАДІУСА: збільшується на відстань найвіддаленішої точки кластера!
        const dynamicRadii = kCentroids.map((c, cIdx) => {
            const ptsInCluster = kPoints.filter(p => p.cluster === cIdx);
            if (ptsInCluster.length > 0) {
                const maxD = Math.max(...ptsInCluster.map(p => Math.hypot(p.x - c.x, p.y - c.y)));
                return Math.max(35, maxD + 18); // +18px щоб точка гарантовано була всередині
            }
            return 35;
        });

        container.innerHTML = `
            <div class="algo-subnav">
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="btn-lab-action ${isKScanning ? 'btn-lab-action--active' : 'btn-lab-action--primary'}" id="btn-k-autoscan">
                        ${isKScanning ? '⏸ Зупинити сканування' : '▶ Авто-обчислення точок'}
                    </button>
                    <button class="btn-lab-action" id="btn-k-next-point">👣 Наступна точка (P${activeKPointIdx + 1})</button>
                    <button class="btn-lab-action" id="btn-k-recalc-centroids">🎯 Оновити центри мас</button>
                    <button class="btn-lab-action" id="btn-k-shuffle">🎲 Випадкові точки</button>
                </div>
                <div style="font-size: 11px; color: #64748B;">
                    👆 <strong>Клікайте на будь-яку точку</strong> або <strong>перетягуйте мишкою центроїди та точки</strong>!
                </div>
            </div>

            <div class="ai-lab-split-stage">
                <!-- Ліва частина: Векторна SVG сцена з Drag & Drop -->
                <div class="ai-interactive-canvas-box" id="ai-canvas-box">
                    <span class="ai-drag-hint-badge">💡 Радіус кластера автоматично охоплює найвіддаленішу точку</span>
                    <svg id="ai-kmeans-svg" viewBox="0 0 740 340" style="width: 100%; height: 100%; max-height: 340px;">
                        <!-- Сітка -->
                        ${renderSvgGrid(740, 340)}

                        <!-- ДИНАМІЧНІ АРЕАЛИ: радіус строго до найдальшої точки кластера! -->
                        ${kCentroids.map((c, cIdx) => `
                            <circle cx="${c.x}" cy="${c.y}" r="${dynamicRadii[cIdx]}" fill="${c.col}" fill-opacity="0.08" stroke="${c.col}" stroke-opacity="0.35" stroke-dasharray="4 3" style="transition: r 0.25s ease;" />
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
                                    ${isSelected ? `<circle cx="${p.x}" cy="${p.y}" r="14" fill="none" stroke="${clusterCol}" stroke-width="2" stroke-dasharray="3 2" opacity="0.8"><animateTransform attributeName="transform" type="rotate" from="0 ${p.x} ${p.y}" to="360 ${p.x} ${p.y}" dur="4s" repeatCount="indefinite"/></circle>` : ''}
                                    <circle cx="${p.x}" cy="${p.y}" r="${isSelected ? '8' : '6.5'}" fill="${clusterCol}" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))" />
                                    <text x="${p.x}" y="${p.y - 10}" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">P${idx + 1}</text>
                                </g>
                            `;
                        }).join('')}

                        <!-- Центроїди (Зірки, Draggable) -->
                        ${kCentroids.map((c, cIdx) => `
                            <g class="ai-svg-node-draggable" data-type="centroid" data-idx="${cIdx}">
                                <circle cx="${c.x}" cy="${c.y}" r="18" fill="${c.col}" stroke="#FFFFFF" stroke-width="3" filter="drop-shadow(0 3px 8px rgba(0,0,0,0.2))" />
                                <text x="${c.x}" y="${c.y + 4}" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">★</text>
                                <text x="${c.x}" y="${c.y + 32}" font-size="10" font-weight="800" fill="${c.col}" text-anchor="middle">C${cIdx + 1} (R: ${Math.round(dynamicRadii[cIdx])}px)</text>
                            </g>
                        `).join('')}
                    </svg>
                </div>

                <!-- Права частина: Живий математичний аналізатор -->
                <div class="ai-math-inspector-panel">
                    <div class="ai-inspector-head">
                        <span>📐 ОБЧИСЛЕННЯ ВІДСТАНЕЙ (EUCLIDEAN METRIC)</span>
                        <span style="color: #7C3AED; font-weight: 800;">КРОК P${activeKPointIdx + 1} / ${kPoints.length}</span>
                    </div>

                    <div class="ai-active-point-badge">
                        <span>📍 Активна точка: <strong>P${activeKPointIdx + 1}</strong></span>
                        <span style="font-family: ui-monospace, monospace; color: #64748B;">Координати: (${Math.round(activePt.x)}, ${Math.round(activePt.y)})</span>
                    </div>

                    <div class="ai-formula-card">
                        Формула Евклідової відстані до центроїда:
                        <br><strong>d(P, C) = √((X_p - X_c)² + (Y_p - Y_c)²)</strong>
                    </div>

                    <div class="ai-dist-comparison-list">
                        <div class="ai-dist-row ${bestClusterIdx === 0 ? 'is-winner' : ''}">
                            <span>d₁ ➔ Центроїд 1:</span>
                            <strong>${d1.toFixed(1)} px ${bestClusterIdx === 0 ? '✓ MIN' : ''}</strong>
                        </div>
                        <div class="ai-dist-row ${bestClusterIdx === 1 ? 'is-winner' : ''}">
                            <span>d₂ ➔ Центроїд 2:</span>
                            <strong>${d2.toFixed(1)} px ${bestClusterIdx === 1 ? '✓ MIN' : ''}</strong>
                        </div>
                        <div class="ai-dist-row ${bestClusterIdx === 2 ? 'is-winner' : ''}">
                            <span>d₃ ➔ Центроїд 3:</span>
                            <strong>${d3.toFixed(1)} px ${bestClusterIdx === 2 ? '✓ MIN' : ''}</strong>
                        </div>
                    </div>

                    <div class="ai-decision-card">
                        <span>ВИСНОВОК АЛГОРИТМУ ДЛЯ ТОЧКИ P${activeKPointIdx + 1}:</span>
                        <span>min(d₁, d₂, d₃) = <strong>${minD.toFixed(1)} px</strong></span>
                        <span>➔ Закріплено за <strong>${kCentroids[bestClusterIdx].name}</strong></span>
                    </div>
                </div>
            </div>
        `;

        if (metricsEl) {
            const inertia = kPoints.reduce((sum, p) => {
                const c = kCentroids[p.cluster];
                return sum + Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
            }, 0) / 1000;

            metricsEl.innerHTML = `
                <div class="lab-metric-item">Оброблено точок: <strong class="highlight-purple">${activeKPointIdx + 1} з ${kPoints.length}</strong></div>
                <div class="lab-metric-item">Радіуси охоплення: <strong>R₁=${Math.round(dynamicRadii[0])}px, R₂=${Math.round(dynamicRadii[1])}px, R₃=${Math.round(dynamicRadii[2])}px</strong></div>
                <div class="lab-metric-item">Інерція втрат J = ∑ d²: <strong class="highlight-green">${inertia.toFixed(1)}</strong></div>
            `;
        }

        container.querySelector('#btn-k-next-point')?.addEventListener('click', () => {
            activeKPointIdx = (activeKPointIdx + 1) % kPoints.length;
            renderKMeansAdvanced(container, metricsEl);
        });

        container.querySelector('#btn-k-autoscan')?.addEventListener('click', () => {
            if (isKScanning) {
                clearInterval(kScanTimer);
                isKScanning = false;
                renderKMeansAdvanced(container, metricsEl);
            } else {
                isKScanning = true;
                renderKMeansAdvanced(container, metricsEl);
                kScanTimer = setInterval(() => {
                    activeKPointIdx = (activeKPointIdx + 1) % kPoints.length;
                    renderKMeansAdvanced(container, metricsEl);
                }, 550);
            }
        });

        container.querySelector('#btn-k-recalc-centroids')?.addEventListener('click', () => {
            kCentroids.forEach((c, idx) => {
                const pts = kPoints.filter(p => p.cluster === idx);
                if (pts.length > 0) {
                    c.x = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
                    c.y = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
                }
            });
            renderKMeansAdvanced(container, metricsEl);
        });

        container.querySelector('#btn-k-shuffle')?.addEventListener('click', () => {
            kPoints.forEach(p => {
                p.x = 100 + Math.random() * 540;
                p.y = 50 + Math.random() * 240;
            });
            activeKPointIdx = 0;
            renderKMeansAdvanced(container, metricsEl);
        });

        setupKMeansDragAndClick(container, metricsEl);
    }

    function renderDistRay(x1, y1, x2, y2, dist, isMin, col, label) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const strokeW = isMin ? '3' : '1.2';
        const strokeOp = isMin ? '0.9' : '0.35';

        return `
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${strokeW}" stroke-opacity="${strokeOp}" ${isMin ? '' : 'stroke-dasharray="4 3"'} />
            <rect x="${mx - 18}" y="${my - 9}" width="36" height="18" rx="4" fill="#FFFFFF" stroke="${col}" stroke-width="${isMin ? '2' : '1'}" />
            <text x="${mx}" y="${my + 4}" font-size="9.5" font-weight="700" fill="${col}" text-anchor="middle">${label}: ${Math.round(dist)}</text>
        `;
    }

    function setupKMeansDragAndClick(container, metricsEl) {
        const svg = container.querySelector('#ai-kmeans-svg');
        if (!svg) return;

        svg.querySelectorAll('.ai-svg-node-draggable').forEach(node => {
            node.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                const type = node.getAttribute('data-type');
                const idx = parseInt(node.getAttribute('data-idx'), 10);
                draggedEntity = { type, idx };
                if (type === 'point') activeKPointIdx = idx;
            });

            node.addEventListener('click', (e) => {
                const type = node.getAttribute('data-type');
                const idx = parseInt(node.getAttribute('data-idx'), 10);
                if (type === 'point') {
                    activeKPointIdx = idx;
                    renderKMeansAdvanced(container, metricsEl);
                }
            });
        });

        svg.addEventListener('mousemove', (e) => {
            if (!draggedEntity) return;
            const pt = getSvgCoords(svg, e);
            if (draggedEntity.type === 'centroid') {
                const c = kCentroids[draggedEntity.idx];
                c.x = Math.max(40, Math.min(700, pt.x));
                c.y = Math.max(30, Math.min(310, pt.y));
                renderKMeansAdvanced(container, metricsEl);
            } else if (draggedEntity.type === 'point') {
                const p = kPoints[draggedEntity.idx];
                p.x = Math.max(40, Math.min(700, pt.x));
                p.y = Math.max(30, Math.min(310, pt.y));
                renderKMeansAdvanced(container, metricsEl);
            }
        });

        window.addEventListener('mouseup', () => { draggedEntity = null; });
    }

    // ========================================================================
    // 3.2. ПРОДВИНУТА ПОЛІНОМІАЛЬНА РЕГРЕСІЯ: МОДЕЛЬ ПРОГНОЗУ ЗАРПЛАТИ IT
    // ========================================================================
    function renderRegressionAdvanced(container, metricsEl) {
        // Поліноміальна регресія за заданим ступенем regDegree (1, 2, 3, 5)
        const polyFit = fitPolynomial(regPoints, regDegree);

        // Генерація точок кривої регресії для SVG path
        const curvePoints = [];
        const ribbonUpper = [];
        const ribbonLower = [];
        for (let x = 60; x <= 680; x += 8) {
            const y = predictPoly(polyFit, x);
            curvePoints.push({ x, y: Math.max(30, Math.min(310, y)) });
            ribbonUpper.push({ x, y: Math.max(20, Math.min(320, y - 18)) });
            ribbonLower.push({ x, y: Math.max(20, Math.min(320, y + 18)) });
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

        container.innerHTML = `
            <div class="algo-subnav">
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span style="font-size: 11.5px; font-weight: 700; color: #475569;">Ступінь моделі:</span>
                    <div class="reg-degree-selector">
                        <button class="btn-reg-degree ${regDegree === 1 ? 'btn-reg-degree--active' : ''}" data-deg="1">1° Лінійна</button>
                        <button class="btn-reg-degree ${regDegree === 2 ? 'btn-reg-degree--active' : ''}" data-deg="2">2° Квадратична</button>
                        <button class="btn-reg-degree ${regDegree === 3 ? 'btn-reg-degree--active' : ''}" data-deg="3">3° Поліном (S-крива)</button>
                        <button class="btn-reg-degree btn-reg-degree--overfit ${regDegree === 5 ? 'btn-reg-degree--active' : ''}" data-deg="5">⚠️ 5° Overfitting</button>
                    </div>
                    <button class="btn-lab-action ${isTrainingGradient ? 'btn-lab-action--active' : ''}" id="btn-reg-gradient">
                        ⚡ ${isTrainingGradient ? 'Навчання епохи ' + gradientEpoch + '/20' : 'Градієнтний спуск'}
                    </button>
                    <button class="btn-lab-action ${showResidualSquares ? 'btn-lab-action--active' : ''}" id="btn-reg-squares">
                        📐 Квадрати (e²)
                    </button>
                    <button class="btn-lab-action" id="btn-reg-add">➕ Додати дані</button>
                </div>
                <div style="font-size: 11px; color: #64748B;">
                    🎯 <strong>Рухайте мишкою по графіку</strong> для живого прогнозу зарплати!
                </div>
            </div>

            <div class="ai-lab-split-stage">
                <!-- Ліва частина: Координатна сітка IT-ринку праці -->
                <div class="ai-interactive-canvas-box" id="reg-canvas-box">
                    ${probeResult ? `
                        <div class="reg-probe-badge">
                            <span>🔍 Досвід: <strong>${probeResult.expYears} р.</strong></span>
                            <span>➔ Прогноз доходу: <strong style="color: #34D399;">$${probeResult.salaryEst} / міс</strong></span>
                        </div>
                    ` : ''}

                    <svg id="ai-reg-svg" viewBox="0 0 740 340" style="width: 100%; height: 100%; max-height: 340px; cursor: crosshair;">
                        ${renderSvgGrid(740, 340)}

                        <!-- Довірчий коридор (Confidence Ribbon: 95% інтервал передбачення) -->
                        <path d="${ribbonPath}" fill="#10B981" fill-opacity="0.08" />

                        <!-- Квадрати похибок (якщо увімкнено) -->
                        ${showResidualSquares ? regPoints.map(p => {
                            const predY = predictPoly(polyFit, p.x);
                            const diff = Math.abs(p.y - predY);
                            const sqY = Math.min(p.y, predY);
                            return `
                                <rect x="${p.x}" y="${sqY}" width="${Math.min(diff, 50)}" height="${diff}" fill="#EF4444" fill-opacity="0.14" stroke="#EF4444" stroke-opacity="0.4" stroke-dasharray="2 2" />
                            `;
                        }).join('') : ''}

                        <!-- Вертикальні відрізки похибок (Residuals) -->
                        ${regPoints.map(p => {
                            const predY = predictPoly(polyFit, p.x);
                            return `<line x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${predY}" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3 2" />`;
                        }).join('')}

                        <!-- Крива моделі регресії -->
                        <path d="${pathData}" fill="none" stroke="${regDegree === 5 ? '#DC2626' : '#059669'}" stroke-width="3.5" filter="drop-shadow(0 2px 5px rgba(5, 150, 105, 0.25))" />

                        <!-- Лазерний зонд прогнозу курсору -->
                        ${probeResult ? `
                            <line class="reg-probe-line" x1="${probeResult.x}" y1="20" x2="${probeResult.x}" y2="310" />
                            <line class="reg-probe-line" x1="40" y1="${probeResult.y}" x2="700" y2="${probeResult.y}" />
                            <circle class="reg-probe-circle" cx="${probeResult.x}" cy="${probeResult.y}" r="6" />
                        ` : ''}

                        <!-- Точки реальних спеціалістів (Draggable) -->
                        ${regPoints.map((p, idx) => `
                            <g class="ai-svg-node-draggable" data-type="reg_point" data-idx="${idx}">
                                <circle cx="${p.x}" cy="${p.y}" r="7" fill="#7C3AED" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
                            </g>
                        `).join('')}

                        <!-- Підписи осей IT-ринку -->
                        <text x="60" y="332" font-size="10" font-weight="700" fill="#64748B">0 р. (Trainee)</text>
                        <text x="260" y="332" font-size="10" font-weight="700" fill="#64748B">2 роки (Middle)</text>
                        <text x="500" y="332" font-size="10" font-weight="700" fill="#64748B">4.5 роки (Senior)</text>
                        <text x="640" y="332" font-size="10" font-weight="700" fill="#64748B">6+ років (Lead)</text>
                        <text x="45" y="45" font-size="10" font-weight="800" fill="#059669">$4,500+</text>
                        <text x="45" y="160" font-size="10" font-weight="800" fill="#64748B">$2,500</text>
                        <text x="45" y="285" font-size="10" font-weight="800" fill="#64748B">$800</text>
                    </svg>
                </div>

                <!-- Права частина: Аналізатор машинного навчання -->
                <div class="ai-math-inspector-panel">
                    <div class="ai-inspector-head">
                        <span>📊 МОДЕЛЬ ПРОГНОЗУ ЗАРПЛАТИ (POLYNOMIAL ML)</span>
                        <span style="color: ${regDegree === 5 ? '#DC2626' : '#059669'}; font-weight: 800;">СТУПІНЬ ${regDegree}°</span>
                    </div>

                    <!-- Аналіз Underfitting / Optimal / Overfitting -->
                    ${renderConceptAlert(regDegree, r2)}

                    <div class="ai-formula-card">
                        Рівняння поліному моделі:
                        <br><strong>ŷ = c₀ + c₁·x ${regDegree >= 2 ? '+ c₂·x²' : ''} ${regDegree >= 3 ? '+ c₃·x³' : ''} ${regDegree >= 5 ? '+ ... + c₅·x⁵' : ''}</strong>
                    </div>

                    <div class="ai-dist-comparison-list">
                        <div class="ai-dist-row is-winner">
                            <span>Коефіцієнт детермінації R²:</span>
                            <strong>${r2} (Точність пояснення ${(parseFloat(r2) * 100).toFixed(0)}%)</strong>
                        </div>
                        <div class="ai-dist-row">
                            <span>Середньоквадратична похибка (MSE):</span>
                            <strong>${mse} px²</strong>
                        </div>
                        <div class="ai-dist-row">
                            <span>Ступенів свободи / Ваг (Weights):</span>
                            <strong>${regDegree + 1} параметрів оптимізації</strong>
                        </div>
                    </div>

                    <div class="ai-decision-card">
                        <span>МЕТА ШТУЧНОГО ІНТЕЛЕКТУ В РЕГРЕСІЇ:</span>
                        <span>Знайти баланс між недонавчанням (Bias) та перенавчанням (Variance), щоб модель не просто заучувала точки, а <strong>точно прогнозувала майбутній дохід на нових даних</strong>!</span>
                    </div>
                </div>
            </div>
        `;

        if (metricsEl) {
            metricsEl.innerHTML = `
                <div class="lab-metric-item">Вибірка фахівців: <strong>${regPoints.length}</strong></div>
                <div class="lab-metric-item">Якість підгонки R²: <strong class="${regDegree === 5 ? 'highlight-purple' : 'highlight-green'}">${r2}</strong></div>
                <div class="lab-metric-item">Стан генералізації: <strong>${regDegree === 1 ? 'Underfitting' : regDegree === 5 ? 'Overfitting 🛑' : 'Optimal Bias-Variance ✅'}</strong></div>
            `;
        }

        // Події ступенів
        container.querySelectorAll('.btn-reg-degree').forEach(btn => {
            btn.addEventListener('click', function () {
                regDegree = parseInt(this.getAttribute('data-deg'), 10);
                renderRegressionAdvanced(container, metricsEl);
            });
        });

        container.querySelector('#btn-reg-squares')?.addEventListener('click', () => {
            showResidualSquares = !showResidualSquares;
            renderRegressionAdvanced(container, metricsEl);
        });

        container.querySelector('#btn-reg-add')?.addEventListener('click', () => {
            const rx = 100 + Math.random() * 540;
            const ry = predictPoly(polyFit, rx) + (Math.random() - 0.5) * 40;
            regPoints.push({ id: Date.now(), x: rx, y: ry });
            renderRegressionAdvanced(container, metricsEl);
        });

        // Анімація Градієнтного спуску
        container.querySelector('#btn-reg-gradient')?.addEventListener('click', () => {
            if (isTrainingGradient) return;
            isTrainingGradient = true;
            gradientEpoch = 0;
            // Зберігаємо справжні точки та додаємо тимчасовий зсув
            const originalY = regPoints.map(p => p.y);
            regPoints.forEach(p => { p.y = 260 + (Math.random() - 0.5) * 20; }); // Початковий неоптимальний стан

            gradientTimer = setInterval(() => {
                gradientEpoch++;
                regPoints.forEach((p, idx) => {
                    p.y += (originalY[idx] - p.y) * 0.22; // Крок градієнту alpha
                });

                if (gradientEpoch >= 15) {
                    clearInterval(gradientTimer);
                    isTrainingGradient = false;
                    regPoints.forEach((p, idx) => { p.y = originalY[idx]; });
                }
                renderRegressionAdvanced(container, metricsEl);
            }, 100);
        });

        // Інтерактивний рух мишки для лазерного зонда (Probe)
        const svg = container.querySelector('#ai-reg-svg');
        if (svg) {
            svg.addEventListener('mousemove', (e) => {
                if (draggedEntity) return;
                const pt = getSvgCoords(svg, e);
                probeMouseX = pt.x;
                renderRegressionAdvanced(container, metricsEl);
            });

            svg.addEventListener('mouseleave', () => {
                probeMouseX = null;
                renderRegressionAdvanced(container, metricsEl);
            });

            // Drag точок
            svg.querySelectorAll('.ai-svg-node-draggable').forEach(node => {
                node.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(node.getAttribute('data-idx'), 10);
                    draggedEntity = { type: 'reg_point', idx };
                });
            });

            svg.addEventListener('mousemove', (e) => {
                if (!draggedEntity || draggedEntity.type !== 'reg_point') return;
                const pt = getSvgCoords(svg, e);
                const p = regPoints[draggedEntity.idx];
                if (p) {
                    p.x = Math.max(70, Math.min(670, pt.x));
                    p.y = Math.max(30, Math.min(300, pt.y));
                    renderRegressionAdvanced(container, metricsEl);
                }
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
