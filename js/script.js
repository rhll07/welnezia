document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme Toggle ── */
  const themeBtn = document.getElementById('theme-toggle');
  const html     = document.documentElement;
  const saved    = localStorage.getItem('welnezia-theme') || 'light';

  const moonSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunSVG  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('welnezia-theme', theme);
    if (themeBtn) themeBtn.innerHTML = theme === 'light' ? moonSVG : sunSVG;
  }

  applyTheme(saved);
  if (themeBtn) themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  /* ── Hamburger Menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const openSVG    = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  const closeSVG   = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

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
  }

  /* ── Canvas – Mental Wellness Page ── */
  const canvas = document.getElementById('wellnessCanvas');
  if (canvas) {
    const ctx    = canvas.getContext('2d');
    const isDark = html.getAttribute('data-theme') === 'dark';
    const rings  = [
      { r: 90, color: 'rgba(45,122,79,0.15)' },
      { r: 65, color: 'rgba(45,122,79,0.25)' },
      { r: 40, color: 'rgba(45,122,79,0.45)' },
    ];
    rings.forEach(ring => {
      ctx.beginPath();
      ctx.arc(200, 130, ring.r, 0, 2 * Math.PI);
      ctx.fillStyle = ring.color;
      ctx.fill();
    });
    ctx.font      = 'bold 18px Nova Round, sans-serif';
    ctx.fillStyle = isDark ? '#e8f5ee' : '#0d2b1a';
    ctx.textAlign = 'center';
    ctx.fillText('Breathe In. Breathe Out.', 200, 135);
    ctx.font      = '13px Nova Mono, monospace';
    ctx.fillStyle = isDark ? '#8aab8a' : '#4a6e57';
    ctx.fillText('Focus on the present moment', 200, 158);
  }

  /* ── Geolocation – Contact Page ── */
  const geoBtn    = document.getElementById('geoBtn');
  const geoResult = document.getElementById('geoResult');
  if (geoBtn) {
    geoBtn.addEventListener('click', () => {
      if (!navigator.geolocation) { geoResult.textContent = 'Geolocation not supported.'; return; }
      geoResult.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(
        p  => geoResult.textContent = `\uD83D\uDCCD Lat: ${p.coords.latitude.toFixed(4)}, Lng: ${p.coords.longitude.toFixed(4)}`,
        () => geoResult.textContent = 'Location access denied.'
      );
    });
  }

  /* ── Form Validation – Contact Page ── */
  const form = document.getElementById('contactForm');
  if (form) {
    const showError = (id, msg) => {
      const el = document.getElementById(id + 'Err');
      if (el) { el.textContent = msg; el.style.display = msg ? 'block' : 'none'; }
    };
    const nameInput  = document.getElementById('name');
    const emailInput = document.getElementById('email');

    nameInput && nameInput.addEventListener('input', () => {
      showError('name', /^[A-Za-z\s]{2,}$/.test(nameInput.value) ? '' : 'Enter a valid name (letters only, min 2 chars).');
    });
    emailInput && emailInput.addEventListener('input', () => {
      showError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) ? '' : 'Enter a valid email address.');
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      if (!nameInput || !/^[A-Za-z\s]{2,}$/.test(nameInput.value))         { showError('name',  'Enter a valid name.');  ok = false; }
      if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { showError('email', 'Enter a valid email.'); ok = false; }
      if (ok) {
        form.innerHTML = `<div style="text-align:center;padding:2rem;">
          <p style="font-size:1.5rem;color:var(--primary);font-family:var(--font-display)">&#10003; Message Sent!</p>
          <p style="margin-top:0.5rem;color:var(--text-muted)">We'll get back to you soon.</p>
        </div>`;
      }
    });
  }

  /* ── BMR Calorie Calculator – Nutrition Page ── */
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const age      = parseFloat(document.getElementById('calcAge').value);
      const weight   = parseFloat(document.getElementById('calcWeight').value);
      const height   = parseFloat(document.getElementById('calcHeight').value);
      const activity = parseFloat(document.getElementById('calcActivity').value);
      const gender   = document.querySelector('input[name="calcGender"]:checked').value;

      if (!age || !weight || !height || age < 10 || weight < 20 || height < 100) {
        alert('Please fill in all fields with valid values.'); return;
      }

      // Mifflin-St Jeor BMR formula
      let bmr = gender === 'male'
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

      const tdee    = Math.round(bmr * activity);
      const protein = Math.round((tdee * 0.30) / 4);
      const carbs   = Math.round((tdee * 0.45) / 4);
      const fat     = Math.round((tdee * 0.25) / 9);

      document.getElementById('tdeeVal').textContent    = tdee + ' kcal / day';
      document.getElementById('proteinVal').textContent = protein + 'g';
      document.getElementById('carbsVal').textContent   = carbs + 'g';
      document.getElementById('fatVal').textContent     = fat + 'g';

      const result = document.getElementById('calcResult');
      result.style.display = 'block';
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ── Scroll Reveal ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .hero, details, form, .calc-section').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
