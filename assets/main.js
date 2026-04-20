// ── Dynamic year in footer ────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile nav toggle ─────────────────────────────────────────
const toggle    = document.getElementById('navToggle');
const mobileMenu = document.getElementById('navMobile');

toggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
});

// Exposed globally so inline onclick="closeMenu()" handlers work
function closeMenu() {
  mobileMenu.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger reveals within the same parent section
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--clr-accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));
