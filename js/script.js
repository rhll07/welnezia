document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme Toggle ── */
  const themeBtn = document.getElementById('theme-toggle');
  const html     = document.documentElement;
  const saved    = localStorage.getItem('welnezia-theme') || 'light';

  const moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const sunSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('welnezia-theme', theme);
    if (themeBtn) themeBtn.innerHTML = theme === 'light' ? moonSVG : sunSVG;
  }

  applyTheme(saved);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  /* ── Hamburger Menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  const openSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  const closeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  if (hamburger && mobileMenu) {
    hamburger.innerHTML = openSVG;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.innerHTML = isOpen ? closeSVG : openSVG;
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = openSVG;
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = openSVG;
      }
    });
  }

  /* ── Canvas – Mental Wellness Page ── */
  const canvas = document.getElementById('wellnessCanvas');
  if (canvas) {
    const ctx    = canvas.getContext('2d');
    const isDark = html.getAttribute('data-theme') === 'dark';
    const size   = Math.min(canvas.parentElement.clientWidth, 400);
    canvas.width  = size;
    canvas.height = Math.round(size * 0.65);

    const cx   = canvas.width  / 2;
    const cy   = canvas.height / 2;
    const maxR = Math.round(Math.min(cx, cy) * 0.85);

    [
      { r: maxR,                    color: 'rgba(45,122,79,0.12)' },
      { r: Math.round(maxR * 0.72), color: 'rgba(45,122,79,0.22)' },
      { r: Math.round(maxR * 0.44), color: 'rgba(45,122,79,0.42)' },
    ].forEach(ring => {
      ctx.beginPath();
      ctx.arc(cx, cy - 12, ring.r, 0, 2 * Math.PI);
      ctx.fillStyle = ring.color;
      ctx.fill();
    });

    ctx.font      = 'bold ' + Math.round(size * 0.048) + 'px Nova Round, sans-serif';
    ctx.fillStyle = isDark ? '#e8f5ee' : '#0d2b1a';
    ctx.textAlign = 'center';
    ctx.fillText('Breathe In. Breathe Out.', cx, cy - 4);

    ctx.font      = Math.round(size * 0.034) + 'px Nova Mono, monospace';
    ctx.fillStyle = isDark ? '#8aab8a' : '#4a6e57';
    ctx.fillText('Focus on the present moment', cx, cy + Math.round(size * 0.058));
  }

  /* ── BMR Calculator – Nutrition Page ── */
  const bmrForm   = document.getElementById('bmrForm');
  const bmrResult = document.getElementById('bmrResult');

  if (bmrForm && bmrResult) {
    bmrForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var weight   = parseFloat(document.getElementById('weight').value);
      var height   = parseFloat(document.getElementById('height').value);
      var age      = parseFloat(document.getElementById('age').value);
      var gender   = document.getElementById('gender').value;
      var activity = parseFloat(document.getElementById('activity').value);

      if (!weight || !height || !age || !gender || !activity) {
        bmrResult.innerHTML = '<p style="color:var(--error)">Please fill in all fields.</p>';
        return;
      }

      var bmr = gender === 'male'
        ? (10 * weight + 6.25 * height - 5 * age + 5)
        : (10 * weight + 6.25 * height - 5 * age - 161);

      var tdee = Math.round(bmr * activity);
      bmr = Math.round(bmr);

      bmrResult.innerHTML =
        '<p><strong>BMR:</strong> ' + bmr + ' kcal/day</p>' +
        '<p><strong>Daily Calorie Needs (TDEE):</strong> ' + tdee + ' kcal/day</p>' +
        '<p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;">BMR = calories at rest. TDEE = BMR × activity multiplier.</p>';
    });
  }

  /* ── Geolocation – Contact Page ── */
  const geoBtn    = document.getElementById('geoBtn');
  const geoResult = document.getElementById('geoResult');

  if (geoBtn) {
    geoBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        geoResult.textContent = 'Geolocation not supported by your browser.';
        return;
      }
      geoResult.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(
        function(p) { geoResult.textContent = '📍 Lat: ' + p.coords.latitude.toFixed(4) + ', Lng: ' + p.coords.longitude.toFixed(4); },
        function()  { geoResult.textContent = 'Location access denied.'; }
      );
    });
  }

  /* ── Form Validation – Contact Page ── */
  const form = document.getElementById('contactForm');

  if (form) {
    var showError = function(id, msg) {
      var el = document.getElementById(id + 'Err');
      if (el) { el.textContent = msg; el.style.display = msg ? 'block' : 'none'; }
    };

    var nameInput  = document.getElementById('name');
    var emailInput = document.getElementById('email');

    if (nameInput) {
      nameInput.addEventListener('input', function() {
        showError('name', /^[A-Za-z\s]{2,}$/.test(nameInput.value) ? '' : 'Enter a valid name (letters only, min 2 chars).');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', function() {
        showError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) ? '' : 'Enter a valid email address.');
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var ok = true;
      if (!nameInput  || !/^[A-Za-z\s]{2,}$/.test(nameInput.value)) { showError('name',  'Enter a valid name.');  ok = false; }
      if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { showError('email', 'Enter a valid email.'); ok = false; }
      if (ok) {
        form.innerHTML =
          '<div style="text-align:center;padding:2rem;">' +
          '<div style="font-size:3rem;">✅</div>' +
          '<h2 style="margin:1rem 0 0.5rem;">Message Sent!</h2>' +
          '<p style="color:var(--text-muted);">We’ll get back to you soon.</p>' +
          '</div>';
      }
    });
  }

  /* ── Scroll-reveal cards ── */
  var cards = document.querySelectorAll('.card');
  if ('IntersectionObserver' in window && cards.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function(card) {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

});