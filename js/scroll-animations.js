/* "Groei"-concept: scroll-reveals, procesvulling en groeilijn.
   Bij prefers-reduced-motion doen we niets — CSS toont dan alles direct. */

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function initReveals() {
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Ook direct tonen wat al boven de viewport ligt (bv. na anchor-sprong)
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* Procesconnector vult zich en stappen worden één voor één actief */
function initProcess() {
  const process = document.querySelector('[data-process]');
  if (!process) return;

  const fill = process.querySelector('.connector-fill');
  const steps = process.querySelectorAll('.process-step');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (fill) fill.style.width = '100%';
        steps.forEach((step, i) => {
          setTimeout(() => step.classList.add('is-active'), 300 + i * 450);
        });
        observer.disconnect();
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(process);
}

/* Groeilijn: vult mee met de scroll-voortgang binnen z'n sectie */
function initGrowthLines() {
  const lines = document.querySelectorAll('.growth-line');
  if (!lines.length) return;

  let ticking = false;

  function update() {
    lines.forEach((line) => {
      const parent = line.parentElement;
      const rect = parent.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewH * 0.8 - rect.top) / (rect.height + viewH * 0.3))
      );
      line.style.setProperty('--growth', progress.toFixed(3));
    });
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  update();
}

document.addEventListener('DOMContentLoaded', () => {
  if (prefersReducedMotion) {
    // Procesmarkers wel meteen actief tonen (eindstatus zonder animatie)
    document
      .querySelectorAll('.process-step')
      .forEach((step) => step.classList.add('is-active'));
    const fill = document.querySelector('.connector-fill');
    if (fill) fill.style.width = '100%';
    return;
  }

  initReveals();
  initProcess();
  initGrowthLines();
});
