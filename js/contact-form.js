/* Contactformulier: client-side validatie + verzenden naar Formspree.
   Statusmeldingen via aria-live zodat ook screenreaders ze horen. */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  function setError(field, message) {
    const wrapper = field.closest('.field');
    const error = wrapper.querySelector('.field-error');
    wrapper.classList.toggle('has-error', Boolean(message));
    error.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(field) {
    const value = field.value.trim();

    if (field.required && !value) {
      setError(field, 'Dit veld is verplicht.');
      return false;
    }

    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(field, 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.');
      return false;
    }

    setError(field, '');
    return true;
  }

  // Foutpreventie: valideer zodra een veld verlaten wordt
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.field').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = Array.from(form.querySelectorAll('input, textarea'));
    const allValid = fields.map((f) => validateField(f)).every(Boolean);

    if (!allValid) {
      status.className = 'form-status is-error';
      status.textContent = 'Controleer de rood gemarkeerde velden en probeer het opnieuw.';
      fields.find((f) => f.closest('.field').classList.contains('has-error'))?.focus();
      return;
    }

    submitBtn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Versturen…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        status.className = 'form-status is-success';
        status.textContent = 'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.';
        form.reset();
      } else {
        throw new Error('Formspree gaf een foutmelding');
      }
    } catch {
      status.className = 'form-status is-error';
      status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of mail me direct.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
