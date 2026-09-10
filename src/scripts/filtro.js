document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dynamic-pet-list");
  const formFiltro = document.getElementById("form-search-animal");
  const inputBusca = document.getElementById("busca-animal");
  const selectEspecie = document.getElementById("filtro-especie");
  const selectSexo = document.getElementById("filtro-sexo");
  const petCounter = document.getElementById("pet-counter");

  if (!container || typeof animais === "undefined") return;

  function aplicarFiltros() {
    const termoBusca = (inputBusca?.value || "").toLowerCase().trim();
    const especie = (selectEspecie?.value || "todos").toLowerCase();
    const sexo = (selectSexo?.value || "todos").toLowerCase();

    const filtrados = animais.filter((animal) => {
      // Filtro por nome
      const matchNome = !termoBusca || animal.nome.toLowerCase().includes(termoBusca);

      // Filtro por espécie (cachorro / gato)
      const matchEspecie =
        especie === "todos" || (animal.classe && animal.classe.toLowerCase() === especie);

      // Filtro por sexo (macho / fêmea)
      const animalSexo = (animal.tipo || "").toLowerCase();
      let matchSexo = true;
      if (sexo === "macho") {
        matchSexo = animalSexo.includes("macho");
      } else if (sexo === "femea") {
        matchSexo = animalSexo.includes("fêm") || animalSexo.includes("fem");
      }

      return matchNome && matchEspecie && matchSexo;
    });

    // Atualiza contador se disponível
    if (petCounter) {
      petCounter.textContent = `${filtrados.length} Animais esperando por um lar`;
    }

    // Renderiza cards filtrados
    if (filtrados.length === 0) {
      container.innerHTML = `
        <div class="container-fluid" style="padding: 4rem 1rem; width: 100%; text-align: center;">
          <span class="material-symbols-outlined" style="font-size: 4rem; color: var(--secondary-color); margin-bottom: 1rem;">pets</span>
          <h3 class="subtitle">Nenhum animal encontrado</h3>
          <p class="text">Tente ajustar a busca ou as opções de filtro para encontrar outros amiguinhos.</p>
        </div>
      `;
    } else {
      let html = "";
      filtrados.forEach((animal, index) => {
        html += criarCardAnimal({
          ...animal,
          delay: 100 * (index % 6) + 200,
        });
      });
      container.innerHTML = html;
    }

    // Atualiza AOS se disponível
    if (window.AOS) {
      window.AOS.refresh();
    }
  }

  // Event Listeners
  if (inputBusca) inputBusca.addEventListener("input", aplicarFiltros);
  if (selectEspecie) selectEspecie.addEventListener("change", aplicarFiltros);
  if (selectSexo) selectSexo.addEventListener("change", aplicarFiltros);
  if (formFiltro) {
    formFiltro.addEventListener("submit", (e) => {
      e.preventDefault();
      aplicarFiltros();
    });
  }
});