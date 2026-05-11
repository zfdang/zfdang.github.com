/* main.js — Zhengfa DANG personal homepage */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');

  /* ── Shrink nav on scroll ─────────────────────────────────── */
  function updateNavScrolled() {
    if (!nav) return;
    if (window.scrollY > 16) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  updateNavScrolled();
  window.addEventListener('scroll', updateNavScrolled, { passive: true });

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Mobile nav ────────────────────────────────────────── */
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks  = document.getElementById('nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        const open = navLinks.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String(open));
      });

      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinks.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ── Close mobile nav on scroll ────────────────────────── */
    document.addEventListener('scroll', function () {
      if (navLinks && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    }, { passive: true });

    /* ── Intersection Observer: fade-in on scroll ──────────── */
    const fadeEls = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window && fadeEls.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      fadeEls.forEach(function (el) { observer.observe(el); });
    } else {
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ── Back to top ───────────────────────────────────────── */
    const backTop = document.getElementById('back-to-top');
    if (backTop) {
      backTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ── Smooth scroll for anchor links ────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const navH = nav ? nav.offsetHeight : 64;
          const top  = target.getBoundingClientRect().top + window.scrollY - navH;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

  });

}());
