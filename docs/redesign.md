# Редизайн: общая дизайн-система личного сайта и сайта агентства

**Дата:** 2026-06-24
**Стек:** HTML / CSS / JS (без фреймворков)
**Применяется к:** личный сайт-визитка + сайт агентства

---

## 1. Цель

Привести оба сайта к единому визуальному языку: строгий, профессиональный, content-first. Убрать «конфетность» текущего личного сайта (4 цветных blob'а, glassmorphism, синие кнопки-pill). Добавить тёплый янтарный акцент как личную подпись, не нарушающую деловой тон.

**Принцип:** выразительность через типографику и компоновку, цвет — только в деталях.

---

## 2. Цветовая система

### 2.1 Общие токены (оба сайта)

```css
:root {
  --bg:           #faf9f7;              /* тёплый почти-белый, фон страницы */
  --surface:      #ffffff;              /* карточки, панели */
  --border:       #e8e4dc;              /* обводка в спокойном состоянии */
  --text:         #111010;              /* основной текст */
  --text-muted:   #8c8880;              /* вспомогательный, подписи */
  --radius:       16px;
  --radius-sm:    10px;
  --font:         'Inter', sans-serif;
}
```

### 2.2 Акцентные токены (только личный сайт)

```css
:root {
  --amber:        #C96A00;              /* hover-обводка, micro-лейблы */
  --amber-glow:   rgba(201,106,0,0.07); /* фон при hover */
  --amber-blob:   rgba(251,191,36,0.12);/* blob в hero */
}
```

### 2.3 Правило использования amber

- Обводка карточки при hover: `border-color: var(--amber)`
- Box-shadow при hover: `0 0 0 3px var(--amber-glow)`
- Micro-лейблы секций: `color: var(--amber)`
- Текущая нода Journey: постоянный `border-color: var(--amber)`
- Cursor glow: `rgba(201,106,0,0.07)`
- **Нигде как заливка** — только линия и свечение

---

## 3. Фон и текстура

### 3.1 Тонкая сетка в hero-зоне

CSS-сетка только в верхней части страницы, растворяется вниз:

```css
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 75%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}
```

Ячейки 48×48px. Линии `rgba(0,0,0,0.045)` — едва видны на `#faf9f7`.

### 3.2 Янтарный blob

Один медленно вращающийся эллипс в правом верхнем углу:

```css
.amber-blob {
  position: fixed;
  width: 900px;
  height: 580px;
  border-radius: 50%;
  background: radial-gradient(ellipse, var(--amber-blob) 0%, transparent 65%);
  top: -220px;
  right: -250px;
  pointer-events: none;
  z-index: 0;
  animation: amber-rotate 50s linear infinite;
}

@keyframes amber-rotate {
  0%   { transform: rotate(0deg)   scale(1); }
  33%  { transform: rotate(120deg) scale(1.04); }
  66%  { transform: rotate(240deg) scale(0.97); }
  100% { transform: rotate(360deg) scale(1); }
}
```

50 секунд на полный оборот. Эллипс (не круг) делает вращение визуально заметным — едва, но живым.

### 3.3 Cursor glow

```css
.cursor-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,106,0,0.07) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  transition: left 0.08s linear, top 0.08s linear;
  left: -9999px;
  top: -9999px;
}
```

---

## 4. Типографика

### 4.1 Шрифт

Inter (Google Fonts), weights: 400, 500, 600. Один шрифт, вся выразительность через вес и размер.

### 4.2 Шкала

| Роль | Размер | Вес | Применение |
|------|--------|-----|------------|
| Display | `clamp(48px, 6vw, 64px)` | 600 | Hero-имя |
| H1 | `clamp(36px, 4.5vw, 48px)` | 600 | Заголовки секций |
| H2 | `clamp(24px, 3vw, 32px)` | 500 | Подзаголовки |
| Body | `16px` | 400 | Основной текст, `line-height: 1.65` |
| Small | `14px` | 400 | Подписи, теги |
| Micro | `11px` | 600 | Лейблы секций, `letter-spacing: 0.1em`, uppercase |

### 4.3 Двухтональный заголовок

Главный типографический приём — первая часть заголовка серая и лёгкая, вторая тёмная и жирная:

```html
<h1>
  <span class="text-muted">IT-предприниматель.</span>
  Строю продукты и команды.
</h1>
```

```css
h1 .text-muted {
  color: var(--text-muted);
  font-weight: 400;
}
```

Серая часть — контекст. Чёрная — суть. Одна мысль, два уровня веса.

### 4.4 Micro-лейблы секций

```css
.section-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 16px;
}
```

Примеры: `ОПЫТ`, `ПРОЕКТЫ`, `КОНТАКТ`. Единственное место amber в тексте.

---

## 5. Компоненты

### 5.1 Карточка

Glassmorphism убран полностью. Белая карточка на тёплом фоне:

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--amber);
  box-shadow: 0 0 0 3px var(--amber-glow),
              0 4px 24px rgba(0,0,0,0.06);
}
```

**Убрано:** `backdrop-filter`, `rgba(255,255,255,0.55)`, macOS chrome (три цветных кружка).

### 5.2 Кнопки

```css
/* Primary — чёрная */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--text);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-primary:hover { background: #2a2a2a; }

/* Secondary — outline */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.btn-secondary:hover {
  border-color: var(--amber);
  color: var(--amber);
}
```

Текст кнопок с `→` префиксом: `→ Telegram`, `→ Email`.

### 5.3 Иконка-контейнер

```css
.icon-box {
  width: 40px;
  height: 40px;
  background: #f3f2ef;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.card:hover .icon-box {
  background: rgba(201,106,0,0.06);
  border-color: rgba(201,106,0,0.3);
}
```

Иконки: Lucide или Phosphor, stroke-only, 20px, `color: var(--text-muted)`.

### 5.4 Header

```css
.glass-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,249,247,0.95);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

Lang switcher — текстовые кнопки `RU / EN`, без pill-обёртки:
```css
.lang-btn        { color: var(--text-muted); font-weight: 500; }
.lang-btn.active { color: var(--text); }
.lang-btn:hover  { color: var(--amber); }
```

---

## 6. Анимации

### 6.1 Появление при скролле (единый класс)

```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

IntersectionObserver, threshold 0.15, `unobserve` после первого срабатывания. Применяется ко всем секциям.

### 6.2 Bar chart (без изменений в логике)

`scaleY(0 → 1)` при появлении в viewport, счётчик через `requestAnimationFrame`. Цвет столбцов: `var(--text)` вместо синего.

### 6.3 Journey nodes

Появление с задержкой `i * 0.15s` через `.fade-up`. Стрелки между нодами убраны. Активная нода: постоянный `border-color: var(--amber)`.

### 6.4 Что убрано

- 4 blob'а с drift-анимациями → заменены одним вращающимся эллипсом
- Фиолетовый cursor glow → янтарный
- `translateX` для Journey-стрелок

---

## 7. Структура страниц — изменения по секциям

### Личный сайт

| Секция | Изменение |
|--------|-----------|
| Header | Убран glass-эффект, lang switcher упрощён |
| Hero | Убрана glass-card, контент на фоне, двухтональный заголовок, micro-лейбл |
| About/Stats | Glass → white card, столбцы bar chart `#111010` |
| YouTube | Glass → white card, amber border on hover |
| Journey | Убраны стрелки и macOS chrome, активная нода с amber border |
| Projects | Icon-box вверху каждой карточки, amber on hover |
| Contact | Без карточки-обёртки, двухтональный заголовок, `→` кнопки |

### Сайт агентства (будущая доработка)

Использует все токены из раздела 2.1 (`--bg`, `--surface`, `--border`, `--text`, `--text-muted`). Янтарные токены не применяются. Micro-лейблы и двухтональные заголовки — те же приёмы, единый язык.

---

## 8. Что удалено из старого дизайна

- `backdrop-filter` / glassmorphism карточки
- 4 цветных blob'а (лаванда, мята, розовый, голубой)
- macOS chrome (три цветных кружка) на всех карточках
- Синий акцент `#2563EB` как основной цвет
- `.glass-pill`, `.glass-btn` компоненты
- Фон `#f5f4ff`
- Фиолетовый cursor glow
