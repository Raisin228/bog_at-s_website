# bog_at-s_website

Личный сайт-визитка Богдана Атрошенко (Python AI/ML Engineer, GitHub: Raisin228).

## Стек
- Astro 5 (static output) → GitHub Pages
- Деплой: `.github/workflows/deploy.yml` (withastro/action@v3 + actions/deploy-pages@v4)
- Шрифты: @fontsource/syne + @fontsource/inter (self-hosted, надёжнее Google CDN из РФ)
- Никакого бэкенда — только статика

## Темы
- `data-theme="dark|light"` на `<html>`
- Inline-скрипт в `<head>` читает localStorage → prefers-color-scheme (без FOUC)
- Все цвета через CSS custom properties в `src/styles/global.css`

## Структура компонентов
- `src/layouts/Base.astro` — shell: head, шрифты, скрипт темы
- `src/components/Header.astro` — nav + theme toggle
- `src/components/Hero.astro` — первый экран
- `src/components/About.astro` — bio + skills
- `src/components/Projects.astro` — карточки проектов
- `src/components/Contacts.astro` — ссылки
- `src/components/Footer.astro` — подвал
- `src/pages/index.astro` — единственная страница

## Контент
Весь текст захардкожен прямо в компонентах (на русском).
Для смены контента — редактировать компоненты напрямую.
Заглушки: public/resume.pdf, фото-плейсхолдеры в About.

## Правила разработки
- Mobile-first, breakpoint 768px
- Анимации только через CSS + IntersectionObserver (без GSAP, без WebGL)
- prefers-reduced-motion: убирать все transition/animation
- Не добавлять i18n без явного запроса
- Не добавлять backend/serverless без явного запроса
