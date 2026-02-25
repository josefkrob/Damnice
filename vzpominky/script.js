
(() => {
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.getElementById('navlinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target && e.target.matches('a')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section highlighting
  const links = Array.from(document.querySelectorAll('.nav__links a'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 140;
    let activeId = null;
    for (const s of sections) {
      if (s.offsetTop <= y) activeId = s.id;
    }
    links.forEach(a => {
      const id = (a.getAttribute('href') || '').replace('#', '');
      a.classList.toggle('active', id && id === activeId);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCap');

  const openLB = (src, cap) => {
    if (!lb || !lbImg || !lbCap) return;
    lbImg.src = src;
    lbImg.alt = cap || '';
    lbCap.textContent = cap || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLB = () => {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.imgbtn');
    if (btn) {
      const src = btn.getAttribute('data-full');
      const cap = btn.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || '';
      if (src) openLB(src, cap);
      return;
    }
    if (e.target && e.target.closest('[data-close="1"]')) closeLB();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLB();
  });

  // Back to top
  const toTop = document.getElementById('toTop');
  const refreshTop = () => {
    if (!toTop) return;
    toTop.classList.toggle('is-on', window.scrollY > 700);
  };
  window.addEventListener('scroll', refreshTop, { passive: true });
  refreshTop();
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();
