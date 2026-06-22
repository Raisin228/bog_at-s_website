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
