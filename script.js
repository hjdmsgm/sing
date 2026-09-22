document.querySelectorAll('[data-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.day-card').classList.toggle('open');
  });
});

document.querySelectorAll('.person-tab').forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    const person = tabBtn.dataset.person;
    document.querySelectorAll('.person-tab').forEach((t) => t.classList.toggle('active', t === tabBtn));
    document.querySelectorAll('.person-panel').forEach((p) => p.classList.toggle('active', p.dataset.person === person));
  });
});

const tabs = document.querySelectorAll('.tab-item');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.getElementById(tab.dataset.target);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

const sections = ['timeline', 'awards', 'quotes', 'qa', 'bucket']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const setActive = (id) => tabs.forEach((t) => t.classList.toggle('active', t.dataset.target === id));

try {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
} catch (e) {
  // IntersectionObserver unsupported: tab bar still works via click-to-scroll.
}
