# Архітектурна документація проєкту: Дніпровський політехнічний фаховий коледж

> **Спеціальність:** 122 «Комп’ютерні науки»  
> **Освітньо-професійні програми:** «Комп’ютерний дизайн» (КД) та «Обслуговування програмних систем і комплексів» (ПР)  
> **Базовий лейаут:** Фіксований презентаційний екран 1920×1080 (Canvas System)  
> **Архітектурний підхід:** Модульна компонентно-блочна архітектура (10 логічних секцій + закріплена навігаційна шапка)

---

## 1. Дерево файлової структури проєкту

```
E:\Коледж\Сайт\
│
├── .vscode/                               # Налаштування робочого простору VS Code
│   └── settings.json                      # Конфігурація Live Server (порт 5501)
│
├── img/                                   # Графічні асети сайту
│   ├── Figma/                             # Макети веб-проєктів для Секції 03
│   │   └── frames/                        # Оптимізовані WebP-кадри макетів (1_1.webp - 6_3.webp)
│   ├── practice/                          # Фотографії та ілюстрації практики (Секція 05)
│   ├── Teacher/                           # Фотопортрети викладацького складу (Секція 06)
│   ├── logo.svg                           # Векторний логотип коледжу
│   ├── Коледж.jpg                         # Головна світлина кампусу коледжу
│   ├── hero_design_illustration.png       # 3D-ілюстрація напряму «Комп’ютерний дизайн»
│   └── hero_software_illustration.png     # 3D-ілюстрація напряму «Програмні системи»
│
├── models/                                # 3D STL моделі для Three.js переглядача (Секція 07)
│   ├── 1.stl - 8.stl                      # 8 студентських робіт у форматі STL
│
├── styles/                                # Модульна система стилів CSS
│   ├── base/                              # Базовий шар (токени, скидання, сітка, типографіка)
│   │   ├── variables.css                  # CSS Custom Properties (кольори, розміри, тіні, транзиції)
│   │   ├── reset.css                      # Скидання та нормалізація браузерних стилів
│   │   ├── typography.css                 # Загальна типографіка, заголовки, підзаголовки
│   │   └── layout.css                     # Каркас полотна (1920×1080), контейнери секцій
│   ├── components/                        # Глобальні інтерфейсні компоненти
│   │   ├── header.css                     # Закріплена уніфікована шапка #site-header з навігацією 01-10
│   │   └── tags.css                       # Бейджі програм, мітки спеціальностей, кнопки CTA
│   ├── sections/                          # Стилі окремих 10 логічних блоків сайту
│   │   ├── 01-hero.css                    # Секція 01: Головний екран (Hero)
│   │   ├── 02-programs.css                # Секція 02: Знайомство з програмами (КД та ПР)
│   │   ├── 03-web-showcase.css            # Секція 03: Шоурум веб-проєктів Figma та модальне вікно
│   │   ├── 04-tech-lab.css                # Секція 04: Інтерактивна лабораторія (Tech Lab)
│   │   ├── 05-practice.css                # Секція 05: Слайдер 20 кейсів практики та модалка
│   │   ├── 06-teachers.css                # Секція 06: Команда викладачів (Spotlight + сітка + модалка)
│   │   ├── 07-cad-viewer.css              # Секція 07: 3D CAD Showroom на Three.js
│   │   ├── 08-careers.css                 # Секція 08: Ким можна стати після коледжу
│   │   ├── 09-work-spheres.css            # Секція 09: Сфери роботи та працевлаштування
│   │   └── 10-admission.css               # Секція 10: Освіта, вступ та фінальний CTA
│   └── main.css                           # Головна точка входу для CSS (@import шарів)
│
├── scripts/                               # Модульна система скриптів ES Modules
│   ├── utils/                             # Спільні утиліти та допоміжні функції
│   │   └── dom.js                         # Хелпери для вибірки DOM, подій та безпечних маніпуляцій
│   ├── modules/                           # Модулі для кожного блоку та шапки
│   │   ├── site-header.js                 # Логіка фіксованої шапки (скрол-шпигун, пігулки 01-10, переходи)
│   │   ├── 01-hero.js                     # Логіка Секції 01
│   │   ├── 02-programs.js                 # Логіка Секції 02
│   │   ├── 03-web-showcase.js             # 3D-каскад карток Figma, анімація перемикання, лайтбокс
│   │   ├── 04-tech-lab.js                 # Лабораторія: алгоритми (QuickSort, Dijkstra, BST, A*), ER-моделі, AI
│   │   ├── 05-practice.js                 # Безкінечний слайдер 20 кейсів практики, скрол, драг, модалка
│   │   ├── 06-teachers.js                 # Spotlight голови ЦК, рендер 9 викладачів, детальне досьє
│   │   ├── 07-cad-viewer.js               # WebGL Three.js сцена, STL Loader, плавний 3D-слайдер моделей
│   │   ├── 08-careers.js                  # Логіка Секції 08
│   │   ├── 09-work-spheres.js             # Логіка Секції 09
│   │   └── 10-admission.js                # Логіка Секції 10
│   └── main.js                            # Головна точка входу ES-модулів
│
├── ARCHITECTURE.md                        # Цей документ: архітектура та інструкція для ШІ
└── index.html                             # Головний HTML-документ сайту
```

---

## 2. Мапінг 10 блоків сайту

| № | Назва блоку | HTML-контейнер / Селектор | Файл стилів | Файл скрипта | Інтерактивні елементи / Модалки |
|---|---|---|---|---|---|
| **NAV** | Закріплена шапка сайту | `<header id="site-header" class="site-header">` | `styles/components/header.css` | `scripts/modules/site-header.js` | Пігулки 01-10, індикатор поточного розділу, кнопка «↓/↑», плавний скрол |
| **01** | Головний екран (Hero) | `<section id="section-1" class="screen-section screen-section--hero screen-section--cream">` | `styles/sections/01-hero.css` | `scripts/modules/01-hero.js` | Типографіка з градієнтом, картка кампусу, переходи до програм |
| **02** | Знайомство з програмами | `<section id="section-2" class="screen-section screen-section--cream">` | `styles/sections/02-programs.css` | `scripts/modules/02-programs.js` | Картки ОПП КД та ПР, стек технологій, кар'єрні чіпи, метрики навчання |
| **03** | Дизайн і веб (Showcase) | `<section id="section-3" class="screen-section screen-section--white">` | `styles/sections/03-web-showcase.css` | `scripts/modules/03-web-showcase.js` | 3D-каскад 3 карток макета, вибір 6 проєктів, `#showcase-modal` (лайтбокс із зумом) |
| **04** | Код і системи (Tech Lab) | `<section id="section-4" class="screen-section screen-section--cream">` | `styles/sections/04-tech-lab.css` | `scripts/modules/04-tech-lab.js` | Таби 3 лабораторій: 4 інтерактивні алгоритми, інтерактивна ER-схема бази даних, покроковий симулятор K-Means AI |
| **05** | Практична підготовка | `<section id="section-5" class="screen-section screen-section--white">` | `styles/sections/05-practice.css` | `scripts/modules/05-practice.js` | Безкінечний слайдер 20 кейсів, drag/wheel скрол, прогресбар, `#practice-detail-modal` |
| **06** | Команда викладачів | `<section id="section-6" class="screen-section screen-section--cream">` | `styles/sections/06-teachers.css` | `scripts/modules/06-teachers.js` | Скляний Spotlight Голови комісії, сітка 9 викладачів, `#teacher-detail-modal` |
| **07** | 3D-моделювання (CAD) | `<section id="section-7" class="screen-section screen-section--white screen-section--cad">` | `styles/sections/07-cad-viewer.css` | `scripts/modules/07-cad-viewer.js` | WebGL Canvas 1060px, Three.js OrbitControls, 8 STL моделей, 3D горизонтальний слайдер |
| **08** | Професії випускників | `<section id="section-8" class="screen-section screen-section--cream">` | `styles/sections/08-careers.css` | `scripts/modules/08-careers.js` | Спискові картки професій за напрямами КД та ПР, блок спільних ролей |
| **09** | Де працювати | `<section id="section-9" class="screen-section screen-section--white">` | `styles/sections/09-work-spheres.css` | `scripts/modules/09-work-spheres.js` | Порівняльна таблиця галузей (ІТ, реклама, GameDev, технічні відділи, держустанови, фриланс) |
| **10** | Освіта та вступ | `<section id="section-10" class="screen-section screen-section--cream">` | `styles/sections/10-admission.css` | `scripts/modules/10-admission.js` | Бакалаврат за скороченою програмою, споріднені спеціальності, CTA-банер із посиланням на сайт коледжу |

---

## 3. Правила проєкту та інструкції для ШІ-асистентів

### 3.1. Конвенція іменування (Naming Conventions)
1. **Файли та папки:** Тільки `kebab-case` у нижньому регістрі (наприклад: `01-hero.css`, `site-header.js`, `dom.js`).
2. **Префікси секцій:** Файли у `styles/sections/` та `scripts/modules/` нумеруються від `01-` до `10-` для збереження чіткого зв'язку з екранами сайту.
3. **CSS класи:** Семантичний BEM-подібний підхід (`block__element--modifier`). Заборонено змінювати або видаляти класи, які мають прив'язку до JS-селекторів.
4. **JS функції та змінні:** `camelCase` для функцій та змінних, `UPPER_SNAKE_CASE` для конфігураційних констант і масивів даних.

### 3.2. Як додавати або змінювати стилі
1. **Глобальні змінні:** Всі нові кольори, відступи, розміри шрифтів обов'язково оголошуються у `styles/base/variables.css`.
2. **Стилі секції:** Зміни, що стосуються конкретного блоку (наприклад, Блоку 04), вносяться виключно у відповідний файл у `styles/sections/` (`styles/sections/04-tech-lab.css`).
3. **Підключення:** Нові файли стилів імпортуються у `styles/main.css`. В `index.html` підключається виключно `styles/main.css`.
4. **Фіксований лейаут:** Пам'ятайте, що висота секції зафіксована: `1080px` (`min-height: 1080px; max-height: 1080px; overflow: hidden`). Усі внутрішні елементи повинні адаптувати свою геометрію під це полотно без появи зайвого скролбару всередині секції.

### 3.3. Як додавати або змінювати JS-скрипти
1. **Модульний принцип (ES Modules):** Кожен файл у `scripts/modules/` інкапсулює логіку своєї секції та експортує функцію ініціалізації (наприклад, `export function initTechLab() { ... }`).
2. **Точка входу:** `scripts/main.js` імпортує ці функції та викликає їх під час події `DOMContentLoaded`.
3. **Спільні утиліти:** Робота з DOM, вибірка селекторів, таймери та математичні перетворення виносяться у `scripts/utils/dom.js`.
4. **Глобальні залежності:** Бібліотека Three.js та її завантажувачі підключаються через CDN перед скриптом `scripts/main.js`. Всі модулі перевіряють наявність глобального об'єкта `window.THREE` перед зверненням.

### 3.4. Запобігання втраті динамічних класів (Safety Rules)
Перед рефакторингом CSS завжди перевіряти наявність класів у JS:
- `site-header--scrolled`, `site-header__pill--active`
- `deck-card--slot-front`, `deck-card--slot-mid`, `deck-card--slot-back`, `deck-card--active`, `deck-card--hop-to-front`, `deck-card--fan-${i}`
- `tech-lab-tab--active`, `algo-nav-card--active`, `db-scenario-card--active`, `ai-step-card--active`
- `wave-card--active`, `is-open` (для модальних вікон)
- `cad-model-btn--active`, `cad-details--slide-left`, `cad-details--slide-right`

