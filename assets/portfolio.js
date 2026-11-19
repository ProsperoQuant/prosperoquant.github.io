(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (!toggle || !nav) return;
  document.documentElement.classList.add('js');
  toggle.hidden = false;
  const closeMenu = (returnFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const breakpoint = window.matchMedia('(min-width: 651px)');
  breakpoint.addEventListener('change', () => closeMenu());
})();

(() => {
  const feed = document.querySelector('.work-feed');
  const navigation = document.querySelector('[data-project-navigation]');
  if (!feed || !navigation) return;

  const cards = [...feed.querySelectorAll('.project')];
  const previous = navigation.querySelector('[data-project-previous]');
  const next = navigation.querySelector('[data-project-next]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const update = () => {
    const end = feed.scrollWidth - feed.clientWidth;
    navigation.hidden = end <= 2;
    previous.setAttribute('aria-disabled', String(feed.scrollLeft <= 2));
    next.setAttribute('aria-disabled', String(feed.scrollLeft >= end - 2));
  };

  const scroll = (button, direction) => {
    if (button.getAttribute('aria-disabled') === 'true') return;
    const edge = feed.getBoundingClientRect().left;
    const offsets = cards.map(card => card.getBoundingClientRect().left - edge);
    const target = direction > 0
      ? offsets.find(offset => offset > 3)
      : offsets.findLast(offset => offset < -3);
    if (target === undefined) return;
    feed.scrollBy({ left: target, behavior: motion.matches ? 'instant' : 'smooth' });
  };

  previous.addEventListener('click', () => scroll(previous, -1));
  next.addEventListener('click', () => scroll(next, 1));
  feed.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(feed);
  update();
})();
