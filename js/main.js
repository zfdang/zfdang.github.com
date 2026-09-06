/* main.js — Zhengfa DANG personal homepage */

(function () {
  'use strict';

  function init() {
    const nav = document.querySelector('.nav');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    function updateNavScrolled() {
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 16);
    }
    updateNavScrolled();
    window.addEventListener('scroll', updateNavScrolled, { passive: true });

    if (nav && hamburger && navLinks) {
      function setMenuOpen(open) {
        navLinks.classList.toggle('is-open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      }

      hamburger.addEventListener('click', function () {
        setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
      });

      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          setMenuOpen(false);
        });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
          setMenuOpen(false);
          hamburger.focus();
        }
      });
      document.addEventListener('click', function (event) {
        if (!nav.contains(event.target)) setMenuOpen(false);
      });
      window.matchMedia('(max-width: 700px)').addEventListener('change', function () {
        setMenuOpen(false);
      });

      // Collapse navigation only after its controls are ready.
      nav.classList.add('has-menu');
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.fade-in').forEach(function (element) {
        observer.observe(element);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

}());
