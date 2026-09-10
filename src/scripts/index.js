// Importação de todos os scripts necessários

import './open-menu.js';
import './sticky-navbar.js';
import './theme.js';
import './accordion.js';
import '../libs/aos-animate.js';
import '../libs/swiper.js';
import '../libs/active-section.js';

// Sistema Global de Notificações Toast
window.showToast = function (message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;

  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  const iconColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : 'var(--secondary-color)';

  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color: ${iconColor}; font-size: 22px;">${iconName}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// Manipulação do Formulário de Voluntariado
document.addEventListener('DOMContentLoaded', () => {
  const volunteerForm = document.querySelector('.volunteer-form');
  if (volunteerForm) {
    // Máscara para WhatsApp
    const whatsappInput = volunteerForm.querySelector('#whatsapp');
    if (whatsappInput) {
      whatsappInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 11) val = val.slice(0, 11);
        if (val.length > 6) {
          val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
        } else if (val.length > 2) {
          val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
        } else if (val.length > 0) {
          val = `(${val}`;
        }
        e.target.value = val;
      });
    }

    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = volunteerForm.querySelector('#nome')?.value?.trim() || '';
      const email = volunteerForm.querySelector('#email')?.value?.trim() || '';
      const whatsapp = volunteerForm.querySelector('#whatsapp')?.value?.trim() || '';
      const area = volunteerForm.querySelector('#area')?.value?.trim() || '';

      const msg =
        `*Nova Inscrição de Voluntário - ONG GARRA*\n\n` +
        `*Nome:* ${nome}\n` +
        `*E-mail:* ${email}\n` +
        `*WhatsApp:* ${whatsapp}\n` +
        `*Área de Interesse:* ${area || 'Geral'}`;

      const whatsappUrl = `https://wa.me/5514998277874?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
      volunteerForm.reset();
      window.showToast('Inscrição enviada! Redirecionando para o WhatsApp oficial.', 'success');
    });
  }

  // Manipulação de todos os formulários de Newsletter (presentes em todas as páginas)
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const emailVal = emailInput?.value?.trim();

      if (emailVal) {
        try {
          const subscribers = JSON.parse(localStorage.getItem('garra_newsletter_subscribers') || '[]');
          if (!subscribers.includes(emailVal)) {
            subscribers.push(emailVal);
            localStorage.setItem('garra_newsletter_subscribers', JSON.stringify(subscribers));
          }
        } catch (err) {
          console.error('Erro ao salvar assinante:', err);
        }

        window.showToast(`Inscrição realizada com sucesso para "${emailVal}"!`, 'success');
        form.reset();
      }
    });
  });
});

