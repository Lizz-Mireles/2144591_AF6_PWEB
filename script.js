// ---------- Menú móvil ----------
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mainNav.classList.remove('open'))
);

// ---------- Pestañas de empresas ----------
const tabs = document.querySelectorAll('.tab');
const companies = document.querySelectorAll('.company');

function showCompany(id) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
  companies.forEach(c => c.classList.toggle('active', c.id === id));
}
tabs.forEach(tab => tab.addEventListener('click', () => showCompany(tab.dataset.target)));

// ---------- Tarjetas desplegables ----------
document.querySelectorAll('.card-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const body = card.querySelector('.card-body');
    const isOpen = card.classList.toggle('open');
    body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : 0;
  });
});

// ---------- Filtros por categoría ----------
document.querySelectorAll('.filters').forEach(group => {
  const company = group.closest('.company');
  group.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      company.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });
});

// ---------- Animación al hacer scroll ----------
const revealEls = document.querySelectorAll('.section-title, .section-sub, .tabs, .company, .table-wrap, .note');
revealEls.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ---------- Enlace activo según la sección ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));

  // Botón volver arriba
  document.getElementById('toTop').classList.toggle('show', window.scrollY > 500);
});
document.getElementById('toTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ---------- Alerta al abrir un sitio externo ----------
document.querySelectorAll('a[data-alert]').forEach(link => {
  link.addEventListener('click', () => alert(link.dataset.alert));
});
