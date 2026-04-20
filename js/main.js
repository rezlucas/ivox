/* ============================================================
   IVOX — Main JavaScript
   Handles: nav injection, footer, mobile menu, dropdowns,
            scroll animations, counters, testimonials, FAQ
   ============================================================ */

(function () {
  'use strict';

  /* ── Path helpers ─────────────────────────────────────── */
  function getBasePath() {
    const p = window.location.pathname.replace(/\\/g, '/');
    if (p.includes('/solucoes/') || p.includes('/segmentos/')) return '../';
    return './';
  }

  function b(path) { return getBasePath() + path; }

  /* ── Shared HTML builders ─────────────────────────────── */
  function buildNav() {
    return `
<nav class="navbar" id="navbar">
  <div class="container">
    <a href="${b('index.html')}" class="navbar-logo">
      <img src="${b('imagens/logos/logo-estendida.png')}" alt="IVOX" class="logo-img">
    </a>
    <button class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-menu" id="nav-menu">
      <ul class="nav-links">
        <li data-page="home"><a href="${b('index.html')}">Home</a></li>
        <li class="has-dropdown" data-page="solucoes">
          <a href="${b('solucoes/index.html')}">
            Soluções
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown">
            <a href="${b('solucoes/cobrancas.html')}">Cobrança</a>
            <a href="${b('solucoes/atendimento-online-presencial.html')}">Atendimento Online e Presencial</a>
            <a href="${b('solucoes/ouvidoria.html')}">Ouvidoria</a>
            <a href="${b('solucoes/sac-atendimento-cliente.html')}">SAC – Atendimento ao Cliente</a>
          </div>
        </li>
        <li class="has-dropdown" data-page="segmentos">
          <a href="${b('segmentos/index.html')}">
            Segmentos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown">
            <a href="${b('segmentos/saude.html')}">Saúde</a>
            <a href="${b('segmentos/educacao.html')}">Educação</a>
            <a href="${b('segmentos/financeiro.html')}">Financeiro</a>
            <a href="${b('segmentos/seguros.html')}">Seguros</a>
            <a href="${b('segmentos/saneamento.html')}">Saneamento</a>
          </div>
        </li>
      </ul>
      <a href="#contato" class="btn btn-primary nav-cta">Falar com especialista</a>
    </div>
  </div>
</nav>`;
  }

  function buildFooter() {
    return `
<footer class="footer" id="contato">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${b('index.html')}" class="footer-logo-link">
          <img src="${b('imagens/logos/logo-estendida.png')}" alt="IVOX" class="footer-logo-img">
        </a>
        <p>Inteligência estratégica para transformar seu atendimento em performance com controle, tecnologia e resultados.</p>
      </div>
      <div class="footer-col">
        <h5>Soluções</h5>
        <a href="${b('solucoes/cobrancas.html')}">Cobrança</a>
        <a href="${b('solucoes/atendimento-online-presencial.html')}">Atendimento Online e Presencial</a>
        <a href="${b('solucoes/ouvidoria.html')}">Ouvidoria</a>
        <a href="${b('solucoes/sac-atendimento-cliente.html')}">SAC</a>
      </div>
      <div class="footer-col">
        <h5>Segmentos</h5>
        <a href="${b('segmentos/saude.html')}">Saúde</a>
        <a href="${b('segmentos/educacao.html')}">Educação</a>
        <a href="${b('segmentos/financeiro.html')}">Financeiro</a>
        <a href="${b('segmentos/seguros.html')}">Seguros</a>
        <a href="${b('segmentos/saneamento.html')}">Saneamento</a>
      </div>
      <div class="footer-col">
        <h5>Empresa</h5>
        <a href="${b('index.html')}">Home</a>
        <a href="${b('solucoes/index.html')}">Nossas Soluções</a>
        <a href="${b('segmentos/index.html')}">Segmentos Atendidos</a>
        <a href="mailto:contato@ivox.com.br">contato@ivox.com.br</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} IVOX. Todos os direitos reservados.</p>
      <div class="footer-badge">LGPD Compliance</div>
    </div>
  </div>
</footer>`;
  }

  /* ── Inject shared components ─────────────────────────── */
  function injectComponents() {
    const navEl = document.getElementById('navbar-placeholder');
    const footEl = document.getElementById('footer-placeholder');
    if (navEl)  navEl.innerHTML  = buildNav();
    if (footEl) footEl.innerHTML = buildFooter();
  }

  /* ── Active nav state ─────────────────────────────────── */
  function setActiveNav() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const links = document.querySelectorAll('.nav-links li[data-page]');
    links.forEach(li => {
      const page = li.dataset.page;
      if (page === 'home' && (path.endsWith('/') || path.endsWith('index.html') && !path.includes('/solucoes/') && !path.includes('/segmentos/'))) {
        li.classList.add('active');
      } else if (page === 'solucoes' && path.includes('/solucoes/')) {
        li.classList.add('active');
      } else if (page === 'segmentos' && path.includes('/segmentos/')) {
        li.classList.add('active');
      }
    });
  }

  /* ── Mobile menu ──────────────────────────────────────── */
  function initMobileMenu() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });

    // Mobile dropdowns: tap to toggle
    document.querySelectorAll('.has-dropdown > a').forEach(a => {
      a.addEventListener('click', e => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const li = a.closest('.has-dropdown');
          li.classList.toggle('open');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.navbar')) {
        menu.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  /* ── Navbar scroll shadow ─────────────────────────────── */
  function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Scroll reveal ────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  /* ── Counter animation ────────────────────────────────── */
  function animateCounter(el) {
    const raw = el.dataset.target || el.textContent;
    const prefix = raw.match(/^[^0-9]*/)[0];
    const suffix = raw.match(/[^0-9]*$/)[0];
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return;

    const duration = 1800;
    const start = performance.now();
    const isFloat = num % 1 !== 0;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      const display = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('pt-BR');
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll('.big-num-value');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          el.dataset.target = el.textContent;
          animateCounter(el);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(el => obs.observe(el));
  }

  /* ── Testimonials carousel ────────────────────────────── */
  function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const dotsEl = document.querySelector('.testimonials-dots');
    const prevBtn = document.querySelector('.testimonials-btn.prev');
    const nextBtn = document.querySelector('.testimonials-btn.next');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    let current = 0;
    let timer;

    const dots = Array.from({ length: slides.length }, (_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Depoimento ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      return d;
    });
    if (dotsEl) dots.forEach(d => dotsEl.appendChild(d));

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    function startAuto() { timer = setInterval(next, 5500); }
    function stopAuto()  { clearInterval(timer); }
    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

    // Swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    });

    startAuto();
  }

  /* ── FAQ accordion ────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-toggle.open').forEach(b => {
          b.classList.remove('open');
          b.nextElementSibling.style.maxHeight = '0';
        });

        if (!isOpen) {
          btn.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ── Bootstrap ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectComponents();
    setActiveNav();
    initMobileMenu();
    initNavScroll();
    initReveal();
    initCounters();
    initTestimonials();
    initFAQ();
  });

})();
