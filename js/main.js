// ── PFALCON REALTY — Main JS ──────────────────────────────────────────────

// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(6.5px) rotate(45deg)' : '';
    spans[1].style.transform = isOpen ? 'translateY(-6.5px) rotate(-45deg)' : '';
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// Trigger visible for above-fold elements immediately
window.addEventListener('load', () => {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');
    btn.textContent = 'SENDING...';
    btn.disabled = true;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        success.classList.add('visible');
        form.reset();
      } else {
        btn.textContent = 'ERROR — TRY AGAIN';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'ERROR — TRY AGAIN';
      btn.disabled = false;
    }
    btn.textContent = 'SEND MESSAGE →';
    btn.disabled = false;
  });
}
