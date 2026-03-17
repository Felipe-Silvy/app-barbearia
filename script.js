document.addEventListener("DOMContentLoaded", () => {
  // Dados
  const services = [
    { id: 1, name: "Corte de Cabelo", price: "R$ 45,00", duration: "45 min" },
    { id: 2, name: "Barba", price: "R$ 35,00", duration: "30 min" },
    { id: 3, name: "Corte + Barba", price: "R$ 70,00", duration: "75 min" },
    { id: 4, name: "Sobrancelha", price: "R$ 15,00", duration: "15 min" },
  ];

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1759134248487-e8baaf31e33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMTAxNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Interior da barbearia",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1769034260387-39fa07f0c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBjaGFpciUyMHNhbG9ufGVufDF8fHx8MTc3MzE5MDQ1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Cadeira de barbeiro",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1761931403759-c18a3647e82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwdG9vbHMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzczMTkwNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Ferramentas de barbeiro",
    },
  ];

  const portfolioImages = [
    {
      id: 1,
      url: "assets/foto1.png",
      alt: "Corte masculino moderno",
    },
    {
      id: 2,
      url: "assets/foto2.png",
      alt: "Fade haircut",
    },
    {
      id: 3,
      url: "assets/foto3.png",
      alt: "Pompadour",
    },
    {
      id: 4,
      url: "assets/foto4.png",
      alt: "Undercut",
    },
  ];

  // Renderizar Galeria (se o container existir na página)
  const galleryContainer = document.getElementById("gallery-container");
  if (galleryContainer) {
    galleryImages.forEach((img) => {
      galleryContainer.innerHTML += `<img src="${img.url}" alt="${img.alt}">`;
    });
  }

  // Renderizar Portfólio (se o container existir na página)
  const portfolioContainer = document.getElementById("portfolio-container");
  if (portfolioContainer) {
    portfolioImages.forEach((img) => {
      portfolioContainer.innerHTML += `<img src="${img.url}" alt="${img.alt}">`;
    });
  }

  // Renderizar Serviços (se o container existir na página)
  const servicesContainer = document.getElementById("services-container");
  if (servicesContainer) {
    services.forEach((service) => {
      servicesContainer.innerHTML += `
                <div class="card service-item">
                    <div class="service-info">
                        <div class="icon-box">
                            <i data-lucide="scissors" width="24" height="24"></i>
                        </div>
                        <div>
                            <div class="service-name">${service.name}</div>
                            <div class="service-duration">${service.duration}</div>
                        </div>
                    </div>
                    <div class="service-price">${service.price}</div>
                </div>
            `;
    });
  }

  // Inicializar ícones do Lucide
  lucide.createIcons();
});
