/* ========================================
   SHUBHAM RAJU NAGPURE - PORTFOLIO JS
   ======================================== */

'use strict';

/* ── Scroll-Reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* ── Active Nav Link on Scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#mainNavbar .nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((sec) => sectionObserver.observe(sec));

/* ── Navbar shadow on scroll ── */
const navbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(78, 20, 131, 0.5)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(78, 20, 131, 0.3)';
  }
}, { passive: true });

/* ── Smooth mobile nav close on link click ── */
const navCollapse = document.getElementById('navMenu');
const bsCollapse = navCollapse
  ? new bootstrap.Collapse(navCollapse, { toggle: false })
  : null;

document.querySelectorAll('#navMenu .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});

/* ── Ripple effect on primary buttons ── */
function createRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diam = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diam / 2;
  const rect = btn.getBoundingClientRect();

  circle.style.cssText = `
    position: absolute;
    width: ${diam}px;
    height: ${diam}px;
    top: ${e.clientY - rect.top - radius}px;
    left: ${e.clientX - rect.left - radius}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0);
    pointer-events: none;
    animation: ripple 0.55s linear;
  `;

  btn.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

/* Inject ripple keyframe */
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(style);

document.querySelectorAll('.btn-hero, .btn-hero-outline, .btn-project, .btn-contact').forEach((btn) => {
  btn.style.overflow = 'hidden';
  btn.style.position = 'relative';
  btn.addEventListener('click', createRipple);
});

/* ── Hackathon list item entrance animation ── */
const hackathonItems = document.querySelectorAll('.hackathon-list li');
const hackathonObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, i * 120);
        });
        hackathonObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const hackList = document.querySelector('.hackathon-list');
if (hackList) {
  hackList.querySelectorAll('li').forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-25px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  hackathonObserver.observe(hackList);
}
