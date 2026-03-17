// Variável para guardar qual ID será apagado
let idParaExcluir = null;

document.addEventListener("DOMContentLoaded", () => {
  carregarAgendamentos();
});

function carregarAgendamentos() {
  const listContainer = document.getElementById("bookings-list");
  const emptyState = document.getElementById("empty-state");

  // Puxa do localStorage (se não tiver nada, retorna array vazio [])
  const agendamentosSalvos = JSON.parse(localStorage.getItem("bookings")) || [];

  // Mostra vazio ou mostra lista
  if (agendamentosSalvos.length === 0) {
    emptyState.classList.remove("hidden");
    listContainer.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    listContainer.classList.remove("hidden");

    // Renderiza os cards]
    const titulo = `<h3 class="section-title">Meus Agendamentos</h3>`;

    const cardsHTML = agendamentosSalvos
      .map(
        (agendamento) => `
        <div class="booking-card">
            <div class="booking-header">
                <div>
                    <div class="booking-date-title">
                        <i data-lucide="calendar" style="width: 18px; color:#737373;"></i>
                        ${agendamento.date}
                    </div>
                    <div class="booking-time">${agendamento.time}</div>
                </div>
                <span class="status-badge">Confirmado</span>
            </div>

            <div class="booking-info-row">
                <div class="booking-info-item">
                    <i data-lucide="user"></i>
                    <span>${agendamento.barber}</span>
                </div>
                <button class="btn-icon-danger" onclick="abrirModalExclusao('${agendamento.id}')">
                    <i data-lucide="trash-2" style="width: 18px;"></i>
                </button>
            </div>

            <div class="booking-info-row" style="margin-bottom: 0;">
                <div class="booking-info-item">
                    <i data-lucide="scissors"></i>
                    <span>${agendamento.service}</span>
                </div>
            </div>

            <div class="booking-client">
                <div class="booking-client-label">Cliente</div>
                <div class="booking-client-name">${agendamento.clientName}</div>
                <div class="booking-client-phone">${agendamento.clientPhone}</div>
            </div>
        </div>
    `,
      )
      .join("");

    listContainer.innerHTML = titulo + cardsHTML;
  }

  // Renderiza os ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ---- Funções do Modal de Exclusão ----

function abrirModalExclusao(id) {
  idParaExcluir = id;
  document.getElementById("delete-modal").classList.remove("hidden");
}

function fecharModal() {
  idParaExcluir = null;
  document.getElementById("delete-modal").classList.add("hidden");
}

function confirmarCancelamento() {
  if (!idParaExcluir) return;

  // Pega a lista atual
  let agendamentos = JSON.parse(localStorage.getItem("bookings")) || [];

  // Filtra removendo o que tem o ID selecionado
  agendamentos = agendamentos.filter((b) => b.id !== idParaExcluir);

  // Salva novamente no LocalStorage
  localStorage.setItem("bookings", JSON.stringify(agendamentos));

  // Fecha modal e recarrega a tela
  fecharModal();
  carregarAgendamentos();
}
