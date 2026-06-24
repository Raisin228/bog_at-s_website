(function () {
  var heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  var spans = heroName.querySelectorAll('span[data-ru]');
  if (!spans.length) return;

  var lang = document.documentElement.getAttribute('data-lang') || 'ru';

  var texts = Array.from(spans).map(function (span) {
    return span.getAttribute('data-' + lang) || '';
  });

  spans.forEach(function (span) { span.textContent = ''; });

  var SPEED = 35;

  function typeSpan(i, j) {
    if (i >= spans.length) return;
    if (j <= texts[i].length) {
      spans[i].textContent = texts[i].slice(0, j);
      setTimeout(function () { typeSpan(i, j + 1); }, SPEED);
    } else {
      setTimeout(function () { typeSpan(i + 1, 0); }, 180);
    }
  }

  setTimeout(function () { typeSpan(0, 0); }, 400);
})();
