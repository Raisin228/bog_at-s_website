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
