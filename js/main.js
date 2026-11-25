// YESOA Multi Service — interactions légères (sans dépendance)
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu');

  // Ombre de l'en-tête au scroll
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Ouvrir le menu');
    nav?.classList.remove('is-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
    nav.classList.toggle('is-open', !open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Année du copyright
  const year = document.getElementById('annee');
  if (year) year.textContent = new Date().getFullYear();

  // Apparition au scroll
  const targets = document.querySelectorAll('.ba, .testimonial, .service-card, .steps li, .why-list li, .section-head, .contact-form');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(el => io.observe(el));
  }

  // Curseurs avant / après
  document.querySelectorAll('.ba-frame').forEach(frame => {
    const range = frame.querySelector('.ba-range');
    const update = () => frame.style.setProperty('--pos', `${range.value}%`);
    range.addEventListener('input', update);
    update();
  });

  // Formulaire de contact (Web3Forms ou repli mailto)
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const setStatus = (msg, cls) => { status.textContent = msg; status.className = `form-status ${cls}`; };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      const ok = input.checkValidity() && input.value.trim() !== '';
      input.closest('.field')?.classList.toggle('has-error', !ok);
      if (!ok) valid = false;
    });
    if (!valid) { setStatus('Merci de compléter les champs indiqués.', 'err'); return; }

    const data = new FormData(form);

    // Web3Forms pas encore configuré : on ouvre le client mail
    if (data.get('access_key') === 'VOTRE_CLE_WEB3FORMS') {
      const body = [...data.entries()]
        .filter(([k]) => !['access_key', 'subject', 'from_name', 'botcheck'].includes(k))
        .map(([k, v]) => `${k} : ${v}`).join('\n');
      window.location.href = `mailto:contact@yesoa.pro?subject=${encodeURIComponent('Demande de devis - ' + data.get('service'))}&body=${encodeURIComponent(body)}`;
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    setStatus('Envoi en cours…', '');
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
      form.reset();
      setStatus('Merci ! Votre demande a bien été envoyée. Nous vous répondons sous 48 h.', 'ok');
    } catch {
      setStatus("Une erreur est survenue. Appelez-nous ou écrivez-nous sur WhatsApp.", 'err');
    } finally {
      btn.disabled = false;
    }
  });
})();
