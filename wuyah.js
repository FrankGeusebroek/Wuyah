/* ═══════════════════════════════════════════════════════════
   WUYAH · interaction layer
   Calm by default. Every motion respects prefers-reduced-motion.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll reveals ───────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ── Sofia thread: messages arrive one at a time (her rhythm) ── */
  var thread = document.querySelector('.sofia-thread');
  if (thread) {
    var bubbles = thread.querySelectorAll('.sofia-bubble');
    if (reduced || !('IntersectionObserver' in window)) {
      bubbles.forEach(function (b) { b.classList.add('in'); });
    } else {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            bubbles.forEach(function (b, i) {
              setTimeout(function () { b.classList.add('in'); }, 280 * i + 200);
            });
            so.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      so.observe(thread);
    }
  }

  /* ── Header: zero chrome over the hero, quiet glass bar after ── */
  var header = document.querySelector('.wy-header');
  var hero = document.querySelector('.hero, .doc-hero');
  if (header && !reduced) {
    var trigger = hero ? hero.offsetHeight * 0.72 : 480;
    var onScrollHeader = function () {
      if (window.scrollY > trigger) header.classList.add('is-visible');
      else header.classList.remove('is-visible');
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* ── Dawn warming: the page deepens from cool to warm as you descend ── */
  var dawn = document.querySelector('.dawn');
  if (dawn && !reduced) {
    var onScrollDawn = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      dawn.style.opacity = (p * 0.9).toFixed(3);
    };
    window.addEventListener('scroll', onScrollDawn, { passive: true });
    onScrollDawn();
  }

  /* ── Smooth anchor scrolling for in-page links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (t) {
        ev.preventDefault();
        t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        var field = t.querySelector('input');
        if (field) setTimeout(function () { field.focus(); }, reduced ? 0 : 600);
      }
    });
  });

  /* ── Newsletter: calm inline confirmation (prototype, no backend) ── */
  var form = document.querySelector('[data-newsletter]');
  if (form) {
    var input = form.querySelector('input');
    var note = form.parentElement.querySelector('.form-note');
    var submit = function () {
      var v = (input.value || '').trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!note) return;
      if (ok) {
        note.textContent = 'You are on the list. We will be in touch when the doors open.';
        note.classList.add('ok');
        input.value = '';
      } else {
        note.textContent = 'Please enter a valid email address.';
        note.classList.remove('ok');
      }
    };
    form.querySelector('button').addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
  }
})();
