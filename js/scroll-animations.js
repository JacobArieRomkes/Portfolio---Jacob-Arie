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

/* Procesconnector vult zich en stappen worden één voor één actief.
   Bewust een scroll-check i.p.v. IntersectionObserver: die bleek in
   achtergrond-tabs callbacks te kunnen missen. */
function initProcess() {
  const process = document.querySelector('[data-process]');
  if (!process) return;

  const fill = process.querySelector('.connector-fill');
  const steps = process.querySelectorAll('.process-step');
  let done = false;

  function activate() {
    if (done) return;
    const rect = process.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.7 || rect.bottom < 0) return;

    done = true;
    if (fill) fill.style.width = '100%';
    steps.forEach((step, i) => {
      setTimeout(() => step.classList.add('is-active'), 300 + i * 450);
    });
    window.removeEventListener('scroll', activate);
  }

  window.addEventListener('scroll', activate, { passive: true });
  activate();
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
});
