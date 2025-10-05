(function () {
  const themes = [
    'theme-pink', 'theme-teal', 'theme-cream', 'theme-dark',
    'theme-lavender', 'theme-sand', 'theme-coral', 'theme-mint',
    'theme-rosewood', 'theme-peach'
  ];

  const btn = document.getElementById('themeToggle');
  btn && btn.addEventListener('click', () => {
    const body = document.body;
    const cur = themes.find(t => body.classList.contains(t)) || themes[0];
    const next = themes[(themes.indexOf(cur) + 1) % themes.length];
    themes.forEach(t => body.classList.remove(t));
    body.classList.add(next);
  });
})();
