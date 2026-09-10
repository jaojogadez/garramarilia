document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("genericModal");
  if (!modal) return;
  const modalHeader = modal.querySelector(".modal-header");
  const modalBody = modal.querySelector(".modal-body");
  const closeButtons = modal.querySelectorAll(".close-button, #closeModalBtn");
  const allButtons = document.querySelectorAll(".container-pag-buttons button");

  const modalContent = {
    pagseguro: {
      title: `<h3 class="title"> <span class="material-symbols-outlined"> credit_card </span> Doar via PagSeguro </h3>`,
      body: `
                <p class="text">Para doar via PagSeguro, use nosso link oficial:</p>

                <div class="info-box">
                    <p>pagseguro.uol.com.br/checkout/doacao-ong-garra</p>
                    <button class="btn btn-secondary" style="width: 100%" onclick="copyToClipboard('pagseguro.uol.com.br/checkout/doacao-ong-garra')">
                        <i class="fas fa-copy"></i> Copiar link
                    </button>

                </div>
                <div class="toast">
                    <span>Como doar:</span>
                    <ol>
                        <li>Copie o link acima</li>
                        <li>Cole no seu navegador</li>
                        <li>Escolha o valor da doação</li>
                        <li>Finalize o pagamento no PagSeguro</li>
                    </ol>
                </div>
            `,
    },
    picpay: {
      title: `<h3 class="title"> <span class="material-symbols-outlined"> mobile </span> Doar via PicPay </h3>`,
      body: `
                <p class="text">Para doar via PicPay, use nosso usuário oficial:</p>
                <div class="info-box">
                    <p>@onggarra</p>
                    <button class="btn btn-secondary" style="width: 100%" onclick="copyToClipboard('@onggarra')">
                        <i class="fas fa-copy"></i> Copiar usuário
                    </button>
                </div>
                <div class="toast">
                    <span>Como doar:</span>
                    <ol>
                        <li>Abra o app PicPay</li>
                        <li>Busque por <span>@onggarra</span></li>
                        <li>Escolha o valor da doação</li>
                        <li>Confirme o pagamento</li>
                    </ol>
                </div>
            `,
    },
    transferencia: {
      title: `<h3 class="title"> <span class="material-symbols-outlined"> account_balance </span> Doar via Transferência Bancária </h3>`,
      body: `
                <p class="text">Faça sua doação por transferência bancária:</p>
                <div class="info-box bank-info-table">
                    <div><strong>Banco</strong> <span class="value">Banco do Brasil</span></div>
                    <div><strong>Agência</strong> <span class="value">1234-5</span></div>
                    <div><strong>Conta Corrente</strong> <span class="value">12345-6</span></div>
                    <div><strong>CNPJ</strong> <span class="value">20.661.830/0001-77</span></div>
                    <div><strong>Titular</strong> <span class="value">ONG Instituto Garra</span></div>
                    <button class="btn btn-secondary" style="width: 100%;" onclick="copyBankData()">
                        <i class="fas fa-copy"></i> Copiar dados
                    </button>
                </div>
                <div class="toast">
                    <p><span>Importante:</span> Após a transferência, envie o comprovante para nosso WhatsApp (14) 99827-7874 para receber seu certificado de doação.</p>
                </div>
            `,
    },
    cartao: {
      title: `<h3 class="title"> <span class="material-symbols-outlined"> credit_card </span> Doar via Cartão de Crédito </h3>`,
      body: `
                <p class="text">Para doar com cartão de crédito, entre em contato conosco via WhatsApp:</p>
                <div class="info-box">
                    <p style="font-size: 1.8rem;">(14) 99827-7874</p>
                    <button class="btn btn-secondary" style="width: 100%;" onclick="window.open('https://wa.me/5514998277874', '_blank')">
                        <i class="fab fa-whatsapp"></i> Abrir WhatsApp
                    </button>
                </div>
                <div class="toast">
                    Nossa equipe irá te orientar sobre as opções disponíveis para doação recorrente ou única com cartão de crédito.
                </div>
            `,
    },
  };

  // Função para abrir o modal com o conteúdo correto
  const openModal = (type) => {
    const content = modalContent[type];
    if (content) {
      if (modalHeader) modalHeader.innerHTML = content.title;
      if (modalBody) modalBody.innerHTML = content.body;
      modal.style.display = "block";
    }
  };

  // Adiciona evento de clique em todos os botões
  allButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalType = button.getAttribute("data-modal");
      openModal(modalType);
    });
  });

  // Função para fechar o modal
  const closeModal = () => {
    modal.style.display = "none";
  };

  // Adiciona evento de clique para fechar o modal
  closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));

  // Fechar modal ao clicar fora
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Funções de utilidade (copiar dados)
  window.copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (window.showToast) {
          window.showToast("Copiado para a área de transferência: " + text, "success");
        } else {
          alert("Copiado com sucesso: " + text);
        }
      })
      .catch((err) => {
        console.error("Falha ao copiar:", err);
      });
  };

  window.copyBankData = () => {
    const data =
      "Banco do Brasil, Agência: 1234-5, Conta Corrente: 12345-6, CNPJ: 20.661.830/0001-77, Titular: ONG Instituto Garra";
    navigator.clipboard.writeText(data).then(() => {
      if (window.showToast) {
        window.showToast("Dados bancários copiados! Envie o comprovante via WhatsApp: (14) 99827-7874", "success");
      } else {
        alert(
          "Dados Bancários copiados! Não se esqueça de enviar o comprovante via WhatsApp: (14) 99827-7874."
        );
      }
    });
  };

  window.copyPixCode = (button) => {
    const pixKey = "garra.marilia@gmail.com";
    navigator.clipboard
      .writeText(pixKey)
      .then(() => {
        if (button) {
          const originalContent = button.innerHTML;
          button.innerHTML = '<span class="material-symbols-outlined">done</span> Chave Pix Copiada!';
          button.classList.add("copied");
          setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove("copied");
          }, 2500);
        }
        if (window.showToast) {
          window.showToast("Chave Pix copiada com sucesso: " + pixKey, "success");
        } else {
          alert("Chave Pix copiada com sucesso: " + pixKey);
        }
      })
      .catch(() => {
        if (window.showToast) {
          window.showToast("Chave Pix: " + pixKey, "info");
        } else {
          alert("Chave Pix: " + pixKey);
        }
      });
  };
});
