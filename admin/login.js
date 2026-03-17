document.addEventListener("DOMContentLoaded", () => {
  // Inicializa os ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  const loginForm = document.getElementById("login-form");
  const btnLogin = document.getElementById("btn-login");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Impede a página de recarregar

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Muda o botão para estado de carregamento
      const textoOriginal = btnLogin.innerText;
      btnLogin.innerText = "Entrando...";
      btnLogin.disabled = true;
      btnLogin.style.opacity = "0.7";

      // Simula o tempo de resposta de um servidor (800ms)
      setTimeout(() => {
        if (email === "admin@barbearia.com" && password === "admin123") {
          // Salva a autorização no cache do navegador
          localStorage.setItem("adminAuth", "true");

          alert("Login realizado com sucesso!");
          // Redireciona para a página do painel (você precisará criar um admin.html depois)
          window.location.href = "admin.html";
        } else {
          alert("Email ou senha incorretos.");

          // Restaura o botão em caso de erro
          btnLogin.innerText = textoOriginal;
          btnLogin.disabled = false;
          btnLogin.style.opacity = "1";
        }
      }, 800);
    });
  }
});
