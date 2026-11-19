(() => {
  const landscape = document.querySelector('.landscape');
  const desktop = matchMedia('(min-width: 801px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  const update = () => {
    pending = false;
    const distance = desktop.matches && !reducedMotion.matches ? Math.min(window.scrollY, 1100) * -0.14 : 0;
    landscape.style.setProperty('--parallax', `${distance}px`);
  };
  const requestUpdate = () => {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener('change', requestUpdate);
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('is-pressed');
      setTimeout(() => button.classList.remove('is-pressed'), 260);
    });
  });
  update();
})();
