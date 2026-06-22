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
