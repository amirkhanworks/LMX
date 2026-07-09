/* ============================================================
   LUMINOX AUTOMATION — main.js
   ============================================================ */

'use strict';

/* ── Nav scroll ── */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Active nav link ── */
(function () {
  const path = window.location.pathname.replace(/\/$/, '');
  const links = document.querySelectorAll('.nav-links a, .nav-overlay a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const hPath = href.replace(/^\.\//, '').replace(/\/$/, '');
    const isHome = (hPath === 'index.html' || hPath === '') &&
                   (path === '' || path.endsWith('index.html') || path === '/');
    const isMatch = !isHome && path.endsWith(hPath);
    if (isHome || isMatch) a.classList.add('active');
  });
})();

/* ── Mobile menu ── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('navOverlay');
  const closeBtn  = document.getElementById('navClose');
  if (!hamburger || !overlay) return;

  function open()  { overlay.classList.add('open');  document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  hamburger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
})();

/* ── Hex mark assembly animation ── */
(function () {
  const hexMarks = document.querySelectorAll('.hex-animate path');
  if (!hexMarks.length) return;
  hexMarks.forEach((path, i) => {
    const len = path.getTotalLength ? path.getTotalLength() : 80;
    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    path.style.transition = `stroke-dashoffset 0.5s ease ${i * 0.15}s, fill 0.4s ease ${i * 0.15 + 0.3}s`;
    path.style.fill = 'transparent';
    // Trigger
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = 0;
        path.style.fill = path.dataset.fill || '';
      });
    });
  });
})();

/* ── Projects filter ── */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(card => {
        const cats = card.dataset.category || '';
        if (cat === 'all' || cats.includes(cat)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ── Contact form ── */
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name  = form.querySelector('#fname');
    const email = form.querySelector('#femail');
    let valid = true;

    [name, email].forEach(field => {
      if (!field) return;
      if (!field.value.trim()) {
        field.style.borderColor = '#CC2222';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = '#CC2222';
      valid = false;
    }
    if (!valid) return;

    // Submit
    const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID'; // Replace before launch
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).catch(() => {}); // Fire-and-forget — always show success

    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
})();

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
