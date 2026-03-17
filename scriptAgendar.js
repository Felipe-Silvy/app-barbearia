/* --- ESTADO GLOBAL DO AGENDAMENTO --- */
const dadosAgendamento = {
  servico: null,
  barbeiro: null,
  data: null,
  horario: null,
  cliente: {
    nome: "",
    telefone: "",
  },
};

/* --- DADOS PARA RENDERIZAÇÃO --- */
const servicesData = [
  { id: 1, name: "Corte de Cabelo", price: "R$ 45,00", time: "45 min" },
  { id: 2, name: "Barba", price: "R$ 35,00", time: "30 min" },
  { id: 3, name: "Corte + Barba", price: "R$ 70,00", time: "75 min" },
];

const barbersData = ["Carlos Silva", "Roberto Santos"];

/* --- INICIALIZAÇÃO --- */
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se estamos na página de agendamento
  if (document.getElementById("booking-flow")) {
    initBooking();
    initCalendar();
  }

  // Inicializa ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* --- FUNÇÕES PRINCIPAIS --- */

function initBooking() {
  const sList = document.getElementById("services-list");
  const bList = document.getElementById("barbers-list");
  const tGrid = document.getElementById("time-slots");

  // Renderiza Serviços com ícone de tesoura
  if (sList) {
    sList.innerHTML = servicesData
      .map(
        (s) => `
            <div class="radio-card" onclick="selectOption(this, 'servico', '${s.name}')">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <i data-lucide="scissors" style="width: 18px; color: #737373;"></i>
                    <div>
                        <div style="font-weight:600">${s.name}</div>
                        <div style="font-size:12px; color:gray">${s.time}</div>
                    </div>
                </div>
                <div style="font-weight:700">${s.price}</div>
            </div>
        `,
      )
      .join("");
  }

  // Renderiza Barbeiros com ícone de usuário
  if (bList) {
    bList.innerHTML = barbersData
      .map(
        (name) => `
            <div class="radio-card" onclick="selectOption(this, 'barbeiro', '${name}')">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <i data-lucide="user" style="width: 18px; color: #737373;"></i>
                    <div style="font-weight:600">${name}</div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  // Renderiza Horários com ícone de relógio
  if (tGrid) {
    const hours = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
    tGrid.innerHTML = hours
      .map(
        (h) => `
            <div class="time-slot" onclick="selectOption(this, 'horario', '${h}')">
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <i data-lucide="clock" style="width: 14px;"></i>
                    ${h}
                </div>
            </div>
        `,
      )
      .join("");
  }

  // CRITICO: Recarrega os ícones após inserir o HTML novo
  if (window.lucide) {
    lucide.createIcons();
  }
}

function initCalendar() {
  flatpickr("#calendario-inline", {
    inline: true,
    locale: "pt",
    minDate: "today",
    maxDate: new Date().fp_incr(45),  
    dateFormat: "d/m/Y",
    disableMobile: "true", // Evita que o celular abra o teclado nativo
    onChange: function (selectedDates, dateStr) {
      dadosAgendamento.data = dateStr;
      console.log("Data salva:", dadosAgendamento.data);
      // Aqui você pode disparar a função de carregar horários
    },
  });
}

/* --- SELEÇÃO E ESTADO --- */

function selectOption(el, tipo, valor) {
  // Interface: Remove 'selected' dos irmãos e adiciona ao clicado
  const parent = el.parentElement;
  parent
    .querySelectorAll(".radio-card, .time-slot")
    .forEach((item) => item.classList.remove("selected"));
  el.classList.add("selected");

  // Lógica: Salva no objeto global
  dadosAgendamento[tipo] = valor;
  console.log("Progresso:", dadosAgendamento);
}

/* --- NAVEGAÇÃO E VALIDAÇÃO --- */

function changeStep(step) {
  // Esconde todos os passos
  document
    .querySelectorAll(".booking-step")
    .forEach((s) => s.classList.add("hidden"));

  // Mostra o passo atual
  const targetStep = document.getElementById(`step-${step}`);
  if (targetStep) targetStep.classList.remove("hidden");

  // Atualiza o Stepper visual (1, 2, 3)
  document.querySelectorAll(".step").forEach((s, idx) => {
    if (idx < step) s.classList.add("active");
    else s.classList.remove("active");
  });
}

function verificarCampos(...ids) {
  let valido = true;

  ids.forEach((id) => {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    // Se for Input de texto
    if (elemento.tagName === "INPUT") {
      if (elemento.value.trim() === "") {
        valido = false;
      } else {
        // Salva os dados do cliente no objeto ao validar
        if (id === "input-name") dadosAgendamento.cliente.nome = elemento.value;
        if (id === "input-phone")
          dadosAgendamento.cliente.telefone = elemento.value;
      }
    }
    // Se for Container de seleção
    else {
      const temSelecao = elemento.querySelector(".selected");
      if (!temSelecao) {
        valido = false;
      }
    }
  });

  if (!valido) {
    showWarning();
    return false;
  }

  return true;
}

function verificarData() {
  if (dadosAgendamento.data == null) {
    showWarning();
    return false;
  }
  return true;
}

function finalizarAgendamento() {
  if (verificarCampos("input-name", "input-phone")) {
    // 1. Monta o objeto no formato exato que a página "Agenda" espera ler
    const novoAgendamento = {
      id: Date.now().toString(), // Cria um ID único usando a hora atual
      date: dadosAgendamento.data,
      time: dadosAgendamento.horario,
      barber: dadosAgendamento.barbeiro,
      service: dadosAgendamento.servico,
      clientName: dadosAgendamento.cliente.nome,
      clientPhone: dadosAgendamento.cliente.telefone,
      status: "Confirmado",
    };

    // 2. Puxa a lista de agendamentos que já está salva (ou cria uma lista vazia se for o primeiro)
    let agendamentosSalvos = JSON.parse(localStorage.getItem("bookings")) || [];

    // 3. Adiciona o novo agendamento na lista
    agendamentosSalvos.push(novoAgendamento);

    // 4. Salva a lista atualizada de volta no Local Storage
    localStorage.setItem("bookings", JSON.stringify(agendamentosSalvos));

    console.log("AGENDAMENTO FINALIZADO COM SUCESSO:", novoAgendamento);
    alert(
      `Obrigado, ${dadosAgendamento.cliente.nome}! Agendamento para ${dadosAgendamento.servico} confirmado.`,
    );

    // 5. Redireciona o usuário para a página de Agenda para ele ver o agendamento lá
    window.location.href = "agendamentos.html";
  }
}

function showWarning() {
  const toast = document.getElementById("toast-warning");
  if (!toast) return;

  toast.classList.remove("hidden");

  // Reinicializa o ícone do Lucide dentro do toast se necessário
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
