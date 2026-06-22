# Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Собрать личный сайт-визитку Богдана Атрошенко — Liquid Glass / Glassmorphism на светлом фоне, one-page, двуязычный ru/en, деплой на GitHub Pages.

**Architecture:** Чистый HTML/CSS/JS без фреймворков. Все стили разбиты на 4 CSS-файла (reset, base, glass, sections). JS разбит на 4 модуля (cursor, lang, charts, journey). Build step = `cp src/ → dist/`.

**Tech Stack:** HTML5, CSS3 (custom properties, backdrop-filter, @keyframes), vanilla JS (IntersectionObserver, requestAnimationFrame), Inter via Google Fonts CDN, GitHub Actions → GitHub Pages.

## Global Constraints

- Без npm-зависимостей — только `package.json` + `package-lock.json` для CI
- Inter подключается через `<link>` CDN в `<head>`, не локально
- `backdrop-filter` требует `-webkit-` префикс для Safari
- Все тексты страницы имеют `data-ru` и `data-en` атрибуты
- `dist/` в `.gitignore`, CI генерирует его сам
- Проверка в браузере: `python3 -m http.server 8080 --directory src`
- Один коммит на задачу, формат: `feat: <описание>`

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `src/index.html` (пустой скелет)
- Create: `src/css/reset.css`, `src/css/base.css`, `src/css/glass.css`, `src/css/sections.css`
- Create: `src/js/cursor.js`, `src/js/lang.js`, `src/js/charts.js`, `src/js/journey.js`

**Interfaces:**
- Produces: рабочий `npm run build`, структура `src/` для всех последующих задач

- [ ] **Step 1: Создать `package.json`**

```json
{
  "name": "bog-at-s-website",
  "version": "1.0.0",
  "scripts": {
    "build": "mkdir -p dist && cp -r src/. dist/"
  },
  "dependencies": {}
}
```

- [ ] **Step 2: Создать `package-lock.json`**

```json
{
  "name": "bog-at-s-website",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "bog-at-s-website",
      "version": "1.0.0"
    }
  }
}
```

- [ ] **Step 3: Создать пустые CSS и JS файлы**

```bash
mkdir -p src/css src/js src/assets/video
touch src/css/reset.css src/css/base.css src/css/glass.css src/css/sections.css
touch src/js/cursor.js src/js/lang.js src/js/charts.js src/js/journey.js
```

- [ ] **Step 4: Создать `src/index.html` — базовый скелет**

```html
<!DOCTYPE html>
<html lang="ru" data-lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bogdan Atrosenko</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/base.css" />
  <link rel="stylesheet" href="css/glass.css" />
  <link rel="stylesheet" href="css/sections.css" />
</head>
<body>
  <!-- Blobs background -->
  <div class="blob-layer" aria-hidden="true">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
  </div>

  <!-- Cursor glow -->
  <div class="cursor-glow" aria-hidden="true"></div>

  <!-- Content -->
  <div class="content">
    <!-- будет заполнено в следующих задачах -->
  </div>

  <script src="js/cursor.js"></script>
  <script src="js/lang.js"></script>
  <script src="js/charts.js"></script>
  <script src="js/journey.js"></script>
</body>
</html>
```

- [ ] **Step 5: Проверить `npm run build`**

```bash
npm run build
ls dist/
```

Ожидаемый вывод: `assets  css  index.html  js`

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/
git commit -m "feat: project scaffold — src structure, package.json, empty CSS/JS files"
```

---

### Task 2: CSS Foundation — Reset + Base + Blobs

**Files:**
- Modify: `src/css/reset.css`
- Modify: `src/css/base.css`

**Interfaces:**
- Produces: CSS-переменные `--bg`, `--text`, `--text-muted`, `--accent`, `--glass-*`, `--blob-*`, `--font`, `--radius`; анимированные блобы на фоне; типографика Inter

- [ ] **Step 1: Написать `reset.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, video {
  display: block;
  max-width: 100%;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
}

a {
  text-decoration: none;
  color: inherit;
}
```

- [ ] **Step 2: Написать `base.css` — переменные, тело, типографика**

```css
:root {
  --bg: #f5f4ff;
  --text: #1a1a2e;
  --text-muted: rgba(26, 26, 46, 0.55);
  --accent: #2563eb;

  --glass-bg: rgba(255, 255, 255, 0.55);
  --glass-border: rgba(255, 255, 255, 0.85);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  --blob-1: #c9b3ff;
  --blob-2: #9ff5e0;
  --blob-3: #ffb8d9;
  --blob-4: #b3d8ff;

  --font: 'Inter', sans-serif;
  --radius: 20px;
  --radius-sm: 12px;
}

body {
  font-family: var(--font);
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  position: relative;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}
```

- [ ] **Step 3: Добавить в `base.css` — блобы и их анимации**

```css
/* --- Blob Layer --- */

.blob-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}

.blob-1 {
  width: 600px;
  height: 600px;
  background: var(--blob-1);
  box-shadow: 0 0 120px 60px rgba(180, 130, 255, 0.5);
  top: -150px;
  left: -150px;
  animation: drift-1 12s ease-in-out infinite;
}

.blob-2 {
  width: 500px;
  height: 500px;
  background: var(--blob-2);
  box-shadow: 0 0 120px 60px rgba(100, 230, 200, 0.4);
  top: 35%;
  right: -80px;
  animation: drift-2 10s ease-in-out infinite;
}

.blob-3 {
  width: 420px;
  height: 420px;
  background: var(--blob-3);
  box-shadow: 0 0 120px 60px rgba(255, 150, 200, 0.35);
  bottom: 25%;
  left: 25%;
  animation: drift-3 14s ease-in-out infinite;
}

.blob-4 {
  width: 460px;
  height: 460px;
  background: var(--blob-4);
  box-shadow: 0 0 120px 60px rgba(120, 180, 255, 0.4);
  bottom: -120px;
  right: 15%;
  animation: drift-4 11s ease-in-out infinite;
}

@keyframes drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(40px, 60px) scale(1.05); }
  66%       { transform: translate(-20px, 30px) scale(0.95); }
}

@keyframes drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-50px, -30px) scale(1.08); }
}

@keyframes drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(30px, -40px) scale(1.03); }
  80%       { transform: translate(-40px, 20px) scale(0.97); }
}

@keyframes drift-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  60%       { transform: translate(20px, -50px) scale(1.06); }
}

/* --- Cursor Glow --- */

.cursor-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(160, 100, 255, 0.12) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  transition: left 0.08s linear, top 0.08s linear;
  left: -9999px;
  top: -9999px;
}
```

- [ ] **Step 4: Открыть в браузере и проверить**

```bash
python3 -m http.server 8080 --directory src
```

Открыть `http://localhost:8080`. Должны быть видны 4 цветных светящихся блоба на светло-лавандовом фоне с анимацией.

- [ ] **Step 5: Commit**

```bash
git add src/css/reset.css src/css/base.css
git commit -m "feat: CSS foundation — variables, blobs, cursor glow layer"
```

---

### Task 3: Glass Components CSS

**Files:**
- Modify: `src/css/glass.css`

**Interfaces:**
- Produces: классы `.glass-card`, `.macos-chrome`, `.glass-btn`, `.glass-pill`, `.glass-header` — используются во всех секциях

- [ ] **Step 1: Написать `glass.css`**

```css
/* --- Glass Card --- */

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 1);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12), 0 0 20px rgba(160, 100, 255, 0.15);
}

/* --- macOS Chrome Dots --- */

.macos-chrome {
  display: flex;
  gap: 6px;
  padding: 16px 20px 0;
}

.macos-chrome span {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.macos-chrome .dot-red    { background: #ff5f57; }
.macos-chrome .dot-yellow { background: #febc2e; }
.macos-chrome .dot-green  { background: #28c840; }

/* --- Glass Button --- */

.glass-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
  transform: translateY(-1px);
}

/* --- Glass Pill (lang switcher, tags) --- */

.glass-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
}

/* --- Sticky Header --- */

.glass-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}
```

- [ ] **Step 2: Проверить что классы не вызывают ошибок в консоли**

```bash
python3 -m http.server 8080 --directory src
```

Открыть DevTools → Console. Ошибок быть не должно. Страница по-прежнему показывает только блобы (контент ещё пустой).

- [ ] **Step 3: Commit**

```bash
git add src/css/glass.css
git commit -m "feat: glass component CSS — card, button, pill, header, macOS chrome"
```

---

### Task 4: Header + Hero HTML и CSS

**Files:**
- Modify: `src/index.html`
- Modify: `src/css/sections.css`

**Interfaces:**
- Consumes: `.glass-card`, `.glass-btn`, `.glass-pill`, `.glass-header`, `.macos-chrome` из `glass.css`; `--text`, `--text-muted`, `--accent` из `base.css`
- Produces: видимые Header и Hero секции; HTML-атрибуты `data-ru`/`data-en` для lang.js; `.lang-btn[data-lang]` кнопки для lang.js

- [ ] **Step 1: Добавить Header и Hero в `index.html`**

Заменить `<div class="content"><!-- будет заполнено --></div>` на:

```html
  <div class="content">

    <!-- HEADER -->
    <header class="glass-header site-header">
      <div class="header-inner">
        <a href="#" class="site-logo">bogdan</a>
        <div class="lang-switcher glass-pill">
          <button class="lang-btn active" data-lang="ru">ru 🇷🇺</button>
          <span class="lang-divider">/</span>
          <button class="lang-btn" data-lang="en">en 🇬🇧</button>
        </div>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero-section">
      <div class="glass-card hero-card">
        <div class="macos-chrome">
          <span class="dot-red"></span>
          <span class="dot-yellow"></span>
          <span class="dot-green"></span>
        </div>
        <div class="hero-body">
          <h1 class="hero-name">bogdan atrosenko</h1>
          <p class="hero-role">
            <span data-ru="ai предприниматель / инженер" data-en="ai entrepreneur / engineer">ai предприниматель / инженер</span>
          </p>
          <p class="hero-tagline">
            <span data-ru="строю продукты на AI" data-en="building AI-driven products">строю продукты на AI</span>
          </p>
          <div class="hero-cta">
            <a href="https://t.me/PLACEHOLDER" class="glass-btn" target="_blank" rel="noopener">
              → <span data-ru="telegram" data-en="telegram">telegram</span>
            </a>
            <a href="mailto:PLACEHOLDER@email.com" class="glass-btn">
              → <span data-ru="email" data-en="email">email</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
```

- [ ] **Step 2: Добавить стили Header и Hero в `sections.css`**

```css
/* === HEADER === */

.site-header {
  margin-bottom: 0;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.site-logo {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.02em;
}

.lang-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
}

.lang-btn {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.lang-btn.active {
  color: var(--text);
  font-weight: 600;
}

.lang-divider {
  color: var(--text-muted);
  font-size: 0.75rem;
}

/* === HERO === */

.hero-section {
  padding: 80px 0 60px;
}

.hero-card {
  padding: 0 0 40px;
  max-width: 680px;
}

.hero-body {
  padding: 28px 36px 0;
}

.hero-name {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text);
  margin-bottom: 8px;
}

.hero-role {
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.hero-tagline {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 32px;
}

.hero-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
```

- [ ] **Step 3: Открыть в браузере и проверить Header + Hero**

```bash
python3 -m http.server 8080 --directory src
```

Должны быть видны: sticky-хедер с "bogdan" и переключателем языка, Hero-карточка с macOS-chrome, именем, ролью и двумя кнопками. Блобы просвечивают сквозь карточку.

- [ ] **Step 4: Commit**

```bash
git add src/index.html src/css/sections.css
git commit -m "feat: header and hero section — glass card, macOS chrome, CTA buttons"
```

---

### Task 5: About + Media + Bar Charts HTML и CSS

**Files:**
- Modify: `src/index.html`
- Modify: `src/css/sections.css`

**Interfaces:**
- Consumes: `.glass-card` из `glass.css`
- Produces: секция `#about` с двухколоночным layout; элементы `.stat-bar[style="--height: X%"]` и `.stat-number[data-target][data-suffix]` для `charts.js`; `#stats` как target для IntersectionObserver

- [ ] **Step 1: Добавить About-секцию после Hero в `index.html`**

```html
    <!-- ABOUT + MEDIA -->
    <section class="about-section" id="about">
      <div class="about-grid">

        <!-- Левая колонка: медиа -->
        <div class="about-media">
          <div class="glass-card media-card">
            <div class="video-placeholder">
              <span data-ru="видео скоро" data-en="video coming soon">видео скоро</span>
            </div>
          </div>
        </div>

        <!-- Правая колонка: текст + stats -->
        <div class="about-text">
          <p class="about-bio">
            <span data-ru="привет, я богдан — IT-предприниматель из москвы. в прошлом backend-разработчик, затем AI-инженер, сейчас строю собственные продукты и помогаю бизнесу внедрять ИИ."
                  data-en="hey, i'm bogdan — an IT entrepreneur from moscow. formerly a backend developer, then an AI engineer, now building my own products and helping businesses implement AI.">
              привет, я богдан — IT-предприниматель из москвы. в прошлом backend-разработчик, затем AI-инженер, сейчас строю собственные продукты и помогаю бизнесу внедрять ИИ.
            </span>
          </p>

          <!-- Bar Charts Stats -->
          <div class="stats-grid glass-card" id="stats">
            <div class="stat-item">
              <span class="stat-number" data-target="2" data-suffix="">0</span>
              <div class="stat-bar-wrap">
                <div class="stat-bar" style="--height: 10%"></div>
              </div>
              <span class="stat-label" data-ru="года опыта" data-en="years of exp.">года опыта</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="8" data-suffix="+">0</span>
              <div class="stat-bar-wrap">
                <div class="stat-bar" style="--height: 40%"></div>
              </div>
              <span class="stat-label" data-ru="проектов" data-en="projects">проектов</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="3" data-suffix="">0</span>
              <div class="stat-bar-wrap">
                <div class="stat-bar" style="--height: 15%"></div>
              </div>
              <span class="stat-label" data-ru="стека" data-en="stacks">стека</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="20" data-suffix="">0</span>
              <div class="stat-bar-wrap">
                <div class="stat-bar" style="--height: 100%"></div>
              </div>
              <span class="stat-label" data-ru="лет" data-en="years old">лет</span>
            </div>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Добавить CSS для About в `sections.css`**

```css
/* === ABOUT === */

.about-section {
  padding: 40px 0 60px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.media-card {
  padding: 12px;
}

.video-placeholder {
  aspect-ratio: 16 / 9;
  background: rgba(26, 26, 46, 0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.about-bio {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 28px;
}

/* Stats grid */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1;
}

.stat-bar-wrap {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-end;
}

.stat-bar {
  width: 100%;
  height: var(--height);
  background: rgba(37, 99, 235, 0.7);
  border-radius: 4px 4px 0 0;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
}
```

- [ ] **Step 3: Проверить About секцию в браузере**

```bash
python3 -m http.server 8080 --directory src
```

Должны быть видны: двухколоночный layout, серый placeholder слева, bio текст и карточка со stats справа. Столбики пока не анимированы (это будет в Task 8).

- [ ] **Step 4: Commit**

```bash
git add src/index.html src/css/sections.css
git commit -m "feat: about section — two-column layout, video placeholder, stats grid HTML"
```

---

### Task 6: YouTube Block HTML и CSS

**Files:**
- Modify: `src/index.html`
- Modify: `src/css/sections.css`

**Interfaces:**
- Consumes: `.glass-card` из `glass.css`
- Produces: секция с YouTube-thumbnail, ссылка на видео (заглушка `#`)

- [ ] **Step 1: Добавить YouTube-секцию после About в `index.html`**

```html
    <!-- YOUTUBE -->
    <section class="youtube-section">
      <h2 class="section-label" data-ru="смотреть" data-en="watch">смотреть</h2>
      <a href="#" target="_blank" rel="noopener" class="glass-card yt-card">
        <div class="yt-thumbnail">
          <!-- заменить src на реальный thumbnail URL -->
          <div class="yt-thumb-placeholder"></div>
          <div class="yt-play-btn" aria-label="Play">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)"/>
              <polygon points="26,20 50,32 26,44" fill="white"/>
            </svg>
          </div>
        </div>
        <p class="yt-title" data-ru="моё видео на YouTube" data-en="my YouTube video">моё видео на YouTube</p>
      </a>
    </section>
```

- [ ] **Step 2: Добавить CSS для YouTube в `sections.css`**

```css
/* === YOUTUBE === */

.youtube-section {
  padding: 40px 0 60px;
}

.section-label {
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.yt-card {
  display: block;
  max-width: 720px;
  padding: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.yt-card:hover {
  transform: translateY(-2px);
}

.yt-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
}

.yt-thumb-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 46, 0.08);
}

.yt-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}

.yt-card:hover .yt-play-btn {
  transform: translate(-50%, -50%) scale(1.1);
}

.yt-title {
  font-size: 0.95rem;
  color: var(--text-muted);
  padding: 0 4px 4px;
}
```

- [ ] **Step 3: Проверить в браузере**

YouTube-секция с заголовком "смотреть", серым placeholder и иконкой play должна быть видна. Карточка должна немного подниматься при наведении.

- [ ] **Step 4: Commit**

```bash
git add src/index.html src/css/sections.css
git commit -m "feat: youtube section — thumbnail placeholder, play button, hover lift"
```

---

### Task 7: Journey Section HTML и CSS

**Files:**
- Modify: `src/index.html`
- Modify: `src/css/sections.css`

**Interfaces:**
- Consumes: `.glass-card`, `.macos-chrome` из `glass.css`
- Produces: `.journey-nodes` как target для IntersectionObserver в `journey.js`; элементы `.journey-node` с CSS-классом `visible` который добавляет `journey.js`

- [ ] **Step 1: Добавить Journey-секцию после YouTube в `index.html`**

```html
    <!-- JOURNEY -->
    <section class="journey-section">
      <h2 class="section-label" data-ru="путь" data-en="journey">путь</h2>
      <div class="glass-card journey-card">
        <div class="macos-chrome">
          <span class="dot-red"></span>
          <span class="dot-yellow"></span>
          <span class="dot-green"></span>
        </div>
        <div class="journey-nodes">
          <div class="journey-node">
            <div class="journey-icon">🧑‍💻</div>
            <h3 class="journey-title" data-ru="разработчик" data-en="developer">разработчик</h3>
            <p class="journey-sub" data-ru="Python · Backend" data-en="Python · Backend">Python · Backend</p>
            <p class="journey-period" data-ru="2 года в найме" data-en="2 years employed">2 года в найме</p>
          </div>

          <div class="journey-arrow" aria-hidden="true">→</div>

          <div class="journey-node">
            <div class="journey-icon">⚙️</div>
            <h3 class="journey-title" data-ru="инженер" data-en="engineer">инженер</h3>
            <p class="journey-sub" data-ru="AI Agents" data-en="AI Agents">AI Agents</p>
            <p class="journey-period" data-ru="системная работа" data-en="systems work">системная работа</p>
          </div>

          <div class="journey-arrow" aria-hidden="true">→</div>

          <div class="journey-node journey-node--active">
            <div class="journey-icon">🚀</div>
            <h3 class="journey-title" data-ru="предприниматель" data-en="entrepreneur">предприниматель</h3>
            <p class="journey-sub" data-ru="свои проекты" data-en="own projects">свои проекты</p>
            <p class="journey-period" data-ru="сейчас" data-en="now">сейчас</p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Добавить CSS для Journey в `sections.css`**

```css
/* === JOURNEY === */

.journey-section {
  padding: 40px 0 60px;
}

.journey-card {
  padding: 0 0 32px;
}

.journey-nodes {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 24px 36px;
}

.journey-node {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.7);
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.5s ease, transform 0.5s ease,
              border-color 0.3s ease, box-shadow 0.3s ease;
}

.journey-node.visible {
  opacity: 1;
  transform: translateX(0);
}

.journey-node--active {
  border-color: rgba(37, 99, 235, 0.4);
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.12);
}

.journey-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.journey-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.journey-sub {
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: 4px;
}

.journey-period {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.journey-arrow {
  font-size: 1.4rem;
  color: var(--text-muted);
  padding: 0 12px;
  flex-shrink: 0;
}
```

- [ ] **Step 3: Проверить в браузере**

Journey-карточка должна быть видна (узлы изначально прозрачные, станут видны после скролла когда подключим journey.js в Task 9). Временно добавить класс `visible` к `.journey-node` вручную в DevTools чтобы проверить внешний вид.

- [ ] **Step 4: Commit**

```bash
git add src/index.html src/css/sections.css
git commit -m "feat: journey section — three-node flow, macOS chrome, active node styling"
```

---

### Task 8: Achievements & Projects + Contact HTML и CSS

**Files:**
- Modify: `src/index.html`
- Modify: `src/css/sections.css`

**Interfaces:**
- Consumes: `.glass-card`, `.glass-pill` из `glass.css`
- Produces: полная страница с 6 секциями; Contact с Telegram + email CTA

- [ ] **Step 1: Добавить Achievements и Contact в `index.html`**

```html
    <!-- ACHIEVEMENTS & PROJECTS -->
    <section class="projects-section">
      <h2 class="section-label" data-ru="достижения и проекты" data-en="achievements & projects">достижения и проекты</h2>
      <div class="projects-grid">

        <div class="glass-card project-card">
          <div class="project-icon">🤖</div>
          <h3 class="project-name" data-ru="AI-агент (заглушка)" data-en="AI Agent (placeholder)">AI-агент (заглушка)</h3>
          <p class="project-desc" data-ru="краткое описание проекта появится здесь" data-en="short project description will appear here">краткое описание проекта появится здесь</p>
          <div class="project-tags">
            <span class="glass-pill">Python</span>
            <span class="glass-pill">AI</span>
          </div>
        </div>

        <div class="glass-card project-card">
          <div class="project-icon">⚡</div>
          <h3 class="project-name" data-ru="достижение (заглушка)" data-en="achievement (placeholder)">достижение (заглушка)</h3>
          <p class="project-desc" data-ru="краткое описание появится здесь" data-en="short description will appear here">краткое описание появится здесь</p>
          <div class="project-tags">
            <span class="glass-pill">FastAPI</span>
          </div>
        </div>

        <div class="glass-card project-card">
          <div class="project-icon">🌐</div>
          <h3 class="project-name" data-ru="проект (заглушка)" data-en="project (placeholder)">проект (заглушка)</h3>
          <p class="project-desc" data-ru="краткое описание появится здесь" data-en="short description will appear here">краткое описание появится здесь</p>
          <div class="project-tags">
            <span class="glass-pill">LLM</span>
            <span class="glass-pill">Python</span>
          </div>
        </div>

        <div class="glass-card project-card">
          <div class="project-icon">🏆</div>
          <h3 class="project-name" data-ru="достижение (заглушка)" data-en="achievement (placeholder)">достижение (заглушка)</h3>
          <p class="project-desc" data-ru="краткое описание появится здесь" data-en="short description will appear here">краткое описание появится здесь</p>
          <div class="project-tags">
            <span class="glass-pill">Agents</span>
          </div>
        </div>

      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact-section">
      <div class="glass-card contact-card">
        <h2 class="contact-title" data-ru="поговорим" data-en="let's talk">поговорим</h2>
        <p class="contact-sub" data-ru="напишите мне — отвечаю быстро" data-en="message me — i reply fast">напишите мне — отвечаю быстро</p>
        <div class="contact-cta">
          <a href="https://t.me/PLACEHOLDER" class="glass-btn" target="_blank" rel="noopener">
            → telegram
          </a>
          <a href="mailto:PLACEHOLDER@email.com" class="glass-btn">
            → email
          </a>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Добавить CSS для Projects и Contact в `sections.css`**

```css
/* === ACHIEVEMENTS & PROJECTS === */

.projects-section {
  padding: 40px 0 60px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.project-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-icon {
  font-size: 1.8rem;
}

.project-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.project-card .glass-pill {
  font-size: 0.72rem;
  padding: 3px 10px;
}

/* === CONTACT === */

.contact-section {
  padding: 40px 0 100px;
}

.contact-card {
  padding: 56px 48px;
  text-align: center;
}

.contact-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 12px;
}

.contact-sub {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 36px;
}

.contact-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
```

- [ ] **Step 3: Проверить полную страницу в браузере**

Прокрутить всю страницу. Должны быть видны все 6 секций: Header, Hero, About+Media, YouTube, Journey, Projects, Contact. Блобы должны быть `position: fixed` и не скроллиться.

- [ ] **Step 4: Commit**

```bash
git add src/index.html src/css/sections.css
git commit -m "feat: projects and contact sections — glass cards grid, CTA"
```

---

### Task 9: JS — cursor.js + lang.js

**Files:**
- Modify: `src/js/cursor.js`
- Modify: `src/js/lang.js`

**Interfaces:**
- `cursor.js` Consumes: `.cursor-glow` элемент из DOM
- `lang.js` Consumes: `.lang-btn[data-lang]` кнопки; `[data-ru]`/`[data-en]` атрибуты на всех текстах
- `lang.js` Produces: функция `setLang(lang)` (вызывается только внутри модуля)

- [ ] **Step 1: Написать `cursor.js`**

```js
(function () {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  document.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();
```

- [ ] **Step 2: Написать `lang.js`**

```js
(function () {
  var STORAGE_KEY = 'lang';
  var DEFAULT = 'ru';

  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-ru]').forEach(function (el) {
      el.textContent = el.dataset[lang] || el.dataset.ru;
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.lang);
    });
  });

  setLang(localStorage.getItem(STORAGE_KEY) || DEFAULT);
})();
```

- [ ] **Step 3: Проверить cursor glow**

Открыть `http://localhost:8080`, двигать мышь — фиолетовое свечение должно следовать за курсором.

- [ ] **Step 4: Проверить переключатель языка**

Нажать `en 🇬🇧` в хедере. Все тексты должны переключиться на английский. Нажать `ru 🇷🇺` — вернуться на русский. Обновить страницу — язык должен сохраниться (localStorage).

- [ ] **Step 5: Commit**

```bash
git add src/js/cursor.js src/js/lang.js
git commit -m "feat: cursor glow effect and bilingual lang switcher with localStorage"
```

---

### Task 10: JS — charts.js + journey.js

**Files:**
- Modify: `src/js/charts.js`
- Modify: `src/js/journey.js`

**Interfaces:**
- `charts.js` Consumes: `#stats` элемент; `.stat-bar` элементы с CSS-переменной `--height`; `.stat-number[data-target][data-suffix]`
- `journey.js` Consumes: `.journey-nodes` элемент; `.journey-node` элементы

- [ ] **Step 1: Написать `charts.js`**

```js
(function () {
  var statsEl = document.getElementById('stats');
  if (!statsEl) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var value = Math.round(easeOutCubic(progress) * target);
      el.textContent = value + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function animateBars() {
    statsEl.querySelectorAll('.stat-bar').forEach(function (bar) {
      bar.style.transform = 'scaleY(1)';
    });
    statsEl.querySelectorAll('.stat-number').forEach(animateCounter);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsEl);
})();
```

- [ ] **Step 2: Написать `journey.js`**

```js
(function () {
  var nodesContainer = document.querySelector('.journey-nodes');
  if (!nodesContainer) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var nodes = entry.target.querySelectorAll('.journey-node');
        nodes.forEach(function (node, i) {
          node.style.transitionDelay = (i * 0.2) + 's';
          node.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(nodesContainer);
})();
```

- [ ] **Step 3: Проверить bar charts**

Прокрутить до секции About. При попадании в viewport столбики должны вырасти снизу (1.2s), цифры посчитаться от 0 до целевого значения. Перезагрузить страницу и прокрутить снова — анимация должна сработать ровно один раз.

- [ ] **Step 4: Проверить Journey анимацию**

Прокрутить до секции Journey. Три узла должны появиться слева направо с задержкой 0 / 0.2 / 0.4 секунды.

- [ ] **Step 5: Commit**

```bash
git add src/js/charts.js src/js/journey.js
git commit -m "feat: bar chart and journey animations via IntersectionObserver"
```

---

### Task 11: Responsive CSS

**Files:**
- Modify: `src/css/sections.css`

**Interfaces:**
- Consumes: все секции из предыдущих задач
- Produces: корректный layout на 3 breakpoints (≥1024px, 768–1023px, <768px)

- [ ] **Step 1: Добавить media queries в конец `sections.css`**

```css
/* === RESPONSIVE === */

@media (max-width: 1023px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .content {
    padding: 0 16px;
  }

  .hero-section {
    padding: 40px 0 40px;
  }

  .hero-body {
    padding: 20px 20px 0;
  }

  .hero-card {
    padding: 0 0 28px;
  }

  .hero-cta {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  /* Journey: vertical on mobile */
  .journey-nodes {
    flex-direction: column;
    padding: 20px;
    gap: 8px;
  }

  .journey-arrow {
    transform: rotate(90deg);
    padding: 4px 0;
  }

  .journey-node {
    width: 100%;
  }

  .contact-card {
    padding: 40px 24px;
  }

  .contact-cta {
    flex-direction: column;
    align-items: center;
  }
}
```

- [ ] **Step 2: Проверить на мобильном viewport**

В DevTools → Toggle device toolbar → выбрать `iPhone 14` (390×844).

Проверить:
- Hero текст не обрезается
- About блок — одна колонка
- Stats — 2×2 сетка (4 элемента в 2 строки)
- Journey — вертикальный стек со стрелками вниз
- Projects — одна колонка
- Contact кнопки — вертикально

- [ ] **Step 3: Проверить на планшете** (768px width в DevTools)

About и Projects должны быть в одну колонку, Journey горизонтально.

- [ ] **Step 4: Commit**

```bash
git add src/css/sections.css
git commit -m "feat: responsive CSS — mobile one-column, vertical journey on small screens"
```

---

### Task 12: Build + Deploy Check

**Files:**
- Verify: `npm run build` → `dist/`
- Verify: CI workflow `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: все файлы из `src/`
- Produces: `dist/` идентичный `src/`; подтверждение что CI пройдёт

- [ ] **Step 1: Запустить build и проверить output**

```bash
npm run build
ls dist/
```

Ожидаемый вывод:
```
assets  css  index.html  js
```

- [ ] **Step 2: Проверить build через браузер**

```bash
python3 -m http.server 8081 --directory dist
```

Открыть `http://localhost:8081`. Сайт должен работать идентично `src/`.

- [ ] **Step 3: Проверить что `.claude/` не попадает в git**

```bash
git status
```

`.claude/` не должен фигурировать в изменениях (`.gitignore` добавлен в Task 1 scaffold).

- [ ] **Step 4: Смержить ветку в main**

```bash
# Из корня основного репозитория:
git checkout main
git merge worktree-personal-site-design-doc
git push origin main
```

- [ ] **Step 5: Проверить CI на GitHub**

Перейти в `Actions` на GitHub. Workflow `Deploy to GitHub Pages` должен завершиться успешно (зелёная галочка).

- [ ] **Step 6: Финальная проверка на GitHub Pages**

Открыть `https://<username>.github.io/bog_at-s_website/` в браузере.

Проверить:
- Блобы анимируются
- Cursor glow работает
- Переключатель языка работает
- Bar charts анимируются при скролле
- Journey появляется при скролле
- Все ссылки (Telegram, email) кликабельны

- [ ] **Step 7: Commit (если остались незакоммиченные изменения)**

```bash
git add -A
git commit -m "chore: final build verification, merge to main"
```
