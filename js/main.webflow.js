/* ============================================================
   IVOX — Main JavaScript (Webflow version)
   Cole este conteúdo em: Project Settings > Custom Code > Footer
   ============================================================ */

(function () {
  'use strict';

  /* ── Logo URL ─────────────────────────────────────────────
     Após fazer upload da logo no Webflow Assets, substitua
     a URL abaixo pela URL gerada pelo Webflow CDN.
  ─────────────────────────────────────────────────────────── */
  var LOGO_URL = 'COLE_AQUI_A_URL_DA_LOGO_DO_WEBFLOW_CDN';

  /* ── Shared HTML builders ─────────────────────────────── */
  function buildNav() {
    return `
<nav class="navbar" id="navbar">
  <div class="container">
    <a href="/" class="navbar-logo">
      <img src="${LOGO_URL}" alt="IVOX" class="logo-img">
    </a>
    <button class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-menu" id="nav-menu">
      <ul class="nav-links">
        <li data-page="home"><a href="/">Home</a></li>
        <li class="has-dropdown" data-page="solucoes">
          <a href="/solucoes">
            Soluções
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown">
            <a href="/solucoes/cobrancas">Cobrança</a>
            <a href="/solucoes/atendimento-online-presencial">Atendimento Online e Presencial</a>
            <a href="/solucoes/ouvidoria">Ouvidoria</a>
            <a href="/solucoes/sac-atendimento-cliente">SAC – Atendimento ao Cliente</a>
          </div>
        </li>
        <li class="has-dropdown" data-page="segmentos">
          <a href="/segmentos">
            Segmentos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="dropdown">
            <a href="/segmentos/saude">Saúde</a>
            <a href="/segmentos/educacao">Educação</a>
            <a href="/segmentos/financeiro">Financeiro</a>
            <a href="/segmentos/seguros">Seguros</a>
            <a href="/segmentos/saneamento">Saneamento</a>
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
        <a href="/" class="footer-logo-link">
          <img src="${LOGO_URL}" alt="IVOX" class="footer-logo-img">
        </a>
        <p>Inteligência estratégica para transformar seu atendimento em performance com controle, tecnologia e resultados.</p>
      </div>
      <div class="footer-col">
        <h5>Soluções</h5>
        <a href="/solucoes/cobrancas">Cobrança</a>
        <a href="/solucoes/atendimento-online-presencial">Atendimento Online e Presencial</a>
        <a href="/solucoes/ouvidoria">Ouvidoria</a>
        <a href="/solucoes/sac-atendimento-cliente">SAC</a>
      </div>
      <div class="footer-col">
        <h5>Segmentos</h5>
        <a href="/segmentos/saude">Saúde</a>
        <a href="/segmentos/educacao">Educação</a>
        <a href="/segmentos/financeiro">Financeiro</a>
        <a href="/segmentos/seguros">Seguros</a>
        <a href="/segmentos/saneamento">Saneamento</a>
      </div>
      <div class="footer-col">
        <h5>Empresa</h5>
        <a href="/">Home</a>
        <a href="/solucoes">Nossas Soluções</a>
        <a href="/segmentos">Segmentos Atendidos</a>
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
    var navEl  = document.getElementById('navbar-placeholder');
    var footEl = document.getElementById('footer-placeholder');
    if (navEl)  navEl.innerHTML  = buildNav();
    if (footEl) footEl.innerHTML = buildFooter();
  }

  /* ── Active nav state ─────────────────────────────────── */
  function setActiveNav() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav-links li[data-page]');
    links.forEach(function(li) {
      var page = li.dataset.page;
      if (page === 'home' && path === '/') {
        li.classList.add('active');
      } else if (page === 'solucoes' && path.startsWith('/solucoes')) {
        li.classList.add('active');
      } else if (page === 'segmentos' && path.startsWith('/segmentos')) {
        li.classList.add('active');
      }
    });
  }

  /* ── Mobile menu ──────────────────────────────────────── */
  function initMobileMenu() {
    var btn  = document.getElementById('hamburger');
    var menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function() {
      var isOpen = menu.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.has-dropdown > a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          var li = a.closest('.has-dropdown');
          li.classList.toggle('open');
        }
      });
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar')) {
        menu.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  /* ── Navbar scroll shadow ─────────────────────────────── */
  function initNavScroll() {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    var update = function() { nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Scroll reveal ────────────────────────────────────── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function(el) { obs.observe(el); });
  }

  /* ── Counter animation ────────────────────────────────── */
  function animateCounter(el) {
    var raw    = el.dataset.target || el.textContent;
    var prefix = raw.match(/^[^0-9]*/)[0];
    var suffix = raw.match(/[^0-9]*$/)[0];
    var num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || raw.includes('/')) return;

    var duration = 1800;
    var start    = performance.now();
    var isFloat  = num % 1 !== 0;

    function tick(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var current  = num * eased;
      var display  = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('pt-BR');
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var els = document.querySelectorAll('.big-num-value');
    if (!els.length) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.dataset.target = el.textContent;
          animateCounter(el);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(function(el) { obs.observe(el); });
  }

  /* ── Testimonials carousel ────────────────────────────── */
  function initTestimonials() {
    var track   = document.querySelector('.testimonials-track');
    var dotsEl  = document.querySelector('.testimonials-dots');
    var prevBtn = document.querySelector('.testimonials-btn.prev');
    var nextBtn = document.querySelector('.testimonials-btn.next');
    if (!track) return;

    var slides  = track.querySelectorAll('.testimonial-slide');
    var current = 0;
    var timer;

    var dots = Array.from({ length: slides.length }, function(_, i) {
      var d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Depoimento ' + (i + 1));
      d.addEventListener('click', function() { goTo(i); });
      return d;
    });
    if (dotsEl) dots.forEach(function(d) { dotsEl.appendChild(d); });

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    function startAuto() { timer = setInterval(next, 5500); }
    function stopAuto()  { clearInterval(timer); }
    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

    var startX = 0;
    track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    });

    startAuto();
  }

  /* ── FAQ accordion ────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var answer = btn.nextElementSibling;
        var isOpen = btn.classList.contains('open');

        document.querySelectorAll('.faq-toggle.open').forEach(function(b) {
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

  /* ── Tabs + Slides ────────────────────────────────────── */
  function initTabsSlides() {
    document.querySelectorAll('.tabs-slides-section').forEach(function(section) {
      var tabs   = section.querySelectorAll('.ts-tab');
      var panels = section.querySelectorAll('.ts-panel');

      tabs.forEach(function(tab, i) {
        tab.addEventListener('click', function() {
          tabs.forEach(function(t) { t.classList.remove('active'); });
          panels.forEach(function(p) { p.classList.remove('active'); });
          tab.classList.add('active');
          panels[i].classList.add('active');
        });
      });

      panels.forEach(function(panel) {
        var slides  = panel.querySelectorAll('.ts-slide');
        var counter = panel.querySelector('.ts-counter');
        var prev    = panel.querySelector('.ts-arrow.prev');
        var next    = panel.querySelector('.ts-arrow.next');
        var cur     = 0;

        function go(n) {
          cur = (n + slides.length) % slides.length;
          slides.forEach(function(s, i) { s.classList.toggle('active', i === cur); });
          if (counter) counter.textContent = (cur + 1) + '/' + slides.length;
        }

        if (prev) prev.addEventListener('click', function() { go(cur - 1); });
        if (next) next.addEventListener('click', function() { go(cur + 1); });
        go(0);
      });
    });
  }

  /* ── Bootstrap ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    injectComponents();
    setActiveNav();
    initMobileMenu();
    initNavScroll();
    initReveal();
    initCounters();
    initTestimonials();
    initFAQ();
    initTabsSlides();
  });

})();
