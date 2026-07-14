// ============================================================
// GP.Network — script partagé
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---- navigation mobile ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  if (toggle && navMobile) {
    toggle.addEventListener('click', () => {
      const open = navMobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- reveal on scroll ---- */
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- formulaire de contact : validation légère ---- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        const status = document.querySelector('#form-status');
        if (status) status.textContent = 'Merci de remplir tous les champs obligatoires.';
      }
    });
  }

  /* ---- catalogue : filtres simples côté client ---- */
  const catalogue = document.querySelector('#catalogue-grid');
  if (catalogue) {
    const cards = Array.from(catalogue.querySelectorAll('.prod-card'));
    const catInputs = document.querySelectorAll('input[name="filter-cat"]');
    const brandInputs = document.querySelectorAll('input[name="filter-brand"]');
    const priceMin = document.querySelector('#price-min');
    const priceMax = document.querySelector('#price-max');
    const sortSelect = document.querySelector('#sort-select');
    const resultsCount = document.querySelector('#results-count');

    function applyFilters() {
      const activeCats = Array.from(catInputs).filter(i => i.checked).map(i => i.value);
      const activeBrands = Array.from(brandInputs).filter(i => i.checked).map(i => i.value);
      const min = parseFloat(priceMin?.value) || 0;
      const max = parseFloat(priceMax?.value) || Infinity;

      let visibleCount = 0;
      cards.forEach(card => {
        const cat = card.dataset.cat;
        const brand = card.dataset.brand;
        const price = parseFloat(card.dataset.price);
        const catOk = activeCats.length === 0 || activeCats.includes(cat);
        const brandOk = activeBrands.length === 0 || activeBrands.includes(brand);
        const priceOk = price >= min && price <= max;
        const show = catOk && brandOk && priceOk;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (resultsCount) resultsCount.textContent = visibleCount;
    }

    function applySort() {
      const value = sortSelect.value;
      const sorted = [...cards].sort((a, b) => {
        if (value === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        if (value === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        if (value === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        return 0;
      });
      sorted.forEach(card => catalogue.appendChild(card));
    }

    [...catInputs, ...brandInputs].forEach(i => i.addEventListener('change', applyFilters));
    [priceMin, priceMax].forEach(i => i && i.addEventListener('input', applyFilters));
    if (sortSelect) sortSelect.addEventListener('change', applySort);

    applyFilters();
  }
});
