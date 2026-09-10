// Importação de todos os scripts necessários

import './open-menu.js';
import './sticky-navbar.js';
import './theme.js';
import './accordion.js';
import '../libs/aos-animate.js';
import '../libs/swiper.js';
import '../libs/active-section.js';

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
      alert('Obrigado pelo seu interesse em ser voluntário! Redirecionando para o WhatsApp oficial da ONG GARRA para concluir seu cadastro.');
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

        alert(`Obrigado por se inscrever! O e-mail "${emailVal}" foi cadastrado para receber novidades da ONG GARRA.`);
        form.reset();
      }
    });
  });
});

