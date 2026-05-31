// Shared nav + footer injector. Include on every page.
// Usage: <script src="nav.js" data-page="home"></script>
(function () {
  const self = document.currentScript;
  const page = (self && self.dataset.page) || '';

  const isLocalFile = window.location.protocol === 'file:';
  const links = [
    { id: 'home',    href: 'index.html',   label: 'Home' },
    { id: 'about',   href: isLocalFile ? 'about.html' : 'about-professional',   label: 'About' },
    { id: 'work',    href: 'work.html',    label: 'Work' },
    { id: 'resume',  href: 'resume.html',  label: 'Resume' },
    { id: 'contact', href: 'contact.html', label: 'Contact' },
  ];

  const navHtml = `
    <header class="nav">
      <div class="nav__inner">
        <a class="brand" href="index.html" aria-label="Enric S Neelamkavil — home">
          <span class="brand__dot">E</span>
          <span class="brand__name"><b>Enric S Neelamkavil</b></span>
        </a>
        <nav class="nav__links" aria-label="Primary">
          ${links.map(l => `
            <a class="nav__link" href="${l.href}" ${page === l.id ? 'aria-current="page"' : ''}>
              <span>${l.label}</span>
            </a>
          `).join('')}
        </nav>
        <span class="nav__spacer" aria-hidden="true"></span>
      </div>
    </header>
  `;

  const footHtml = `
    <footer class="footer">
      <div class="footer__inner">
        <h2 class="footer__big">Let's build<br/><em>something real.</em></h2>
        <div class="footer__grid">
          <div>
            <h4>Enric S Neelamkavil</h4>
            <p class="subtle" style="margin:0;max-width:34ch;">
              Product designer crafting calm, considered interfaces for teams that ship.
              Based in Bangalore. Working worldwide.
            </p>
            <div style="margin-top:18px; display:flex; gap:10px;">
              <a class="btn btn--dark" href="contact.html">
                Start a project
                <span class="arrow"><svg viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg></span>
              </a>
            </div>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="${isLocalFile ? 'about.html' : 'about-professional'}">About</a></li>
              <li><a href="work.html">Work</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="#">Read.cv ↗</a></li>
              <li><a href="#">LinkedIn ↗</a></li>
              <li><a href="#">Dribbble ↗</a></li>
              <li><a href="#">Medium ↗</a></li>
              <li><a href="#">YouTube ↗</a></li>
            </ul>
          </div>
          <div>
            <h4>Reach out</h4>
            <ul>
              <li><a href="mailto:hello@enric.design">hello@enric.design</a></li>
              <li><a href="tel:+919999999999">+91 99999 99999</a></li>
              <li class="subtle">Mon — Fri · 10–7 IST</li>
            </ul>
          </div>
        </div>
        <div class="footer__meta">
          <span>© 2026 Enric S Neelamkavil · All rights reserved</span>
          <span class="footer__version" id="timeWarp" title="Hmm…" role="button" tabindex="0">
            v 4.0 · Built with care &amp; coffee
            <span class="footer__rewind" aria-hidden="true">↺</span>
          </span>
        </div>
      </div>
    </footer>
  `;

  // Inject nav at the very top of body, footer at the end
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', navHtml);
    document.body.insertAdjacentHTML('beforeend', footHtml);

    // Easter egg: time-warp to the old portfolio (2022)
    // Hidden in the footer version number — click the "v 4.0 ·" text.
    const tw = document.getElementById('timeWarp');
    tw?.addEventListener('click', triggerTimeWarp);
    tw?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerTimeWarp(); }
    });

    function triggerTimeWarp() {
      const overlay = document.createElement('div');
      overlay.className = 'timewarp-overlay';
      overlay.innerHTML = `
        <div class="timewarp-overlay__inner">
          <div class="timewarp-overlay__year">2026</div>
          <div class="timewarp-overlay__bars">
            <span></span><span></span><span></span>
          </div>
          <div class="timewarp-overlay__msg">Rewinding to 2022 …</div>
        </div>
      `;
      document.body.appendChild(overlay);
      setTimeout(() => {
        const yr = overlay.querySelector('.timewarp-overlay__year');
        if (yr) yr.textContent = '2022';
      }, 900);
      setTimeout(() => {
        location.href = 'old-portfolio.html';
      }, 1800);
    }
  });
})();
