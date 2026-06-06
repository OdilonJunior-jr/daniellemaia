const splash = document.querySelector("#introSplash");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("is-ready");
  }, 200);

  setTimeout(() => {
    if (splash) splash.classList.add("is-hidden");
    document.body.classList.remove("splash-active");
  }, 1450);

  setTimeout(() => {
    if (splash) splash.remove();
  }, 2100);
});

const whatsappLink = "https://wa.me/5534996967296?text=Ol%C3%A1%2C%20Dani%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os.";

const modal = document.querySelector("#caseModal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const closeButton = document.querySelector(".modal-close");
const modalBack = document.querySelector("#modalBack");

const portfolioItems = Array.isArray(window.portfolioItems) ? window.portfolioItems : [];

const categoryLabels = {
  radio: "Spots de rádio",
  videos: "Vídeos institucionais",
  roteiros: "Roteiros & campanhas",
  relatorios: "Relatórios sociais",
  materias: "Matérias jornalísticas"
};

const categoryDescriptions = {
  radio: "Spots, chamadas, locuções e peças audiovisuais de campanha/comunicação institucional.",
  videos: "Área reservada para vídeos institucionais. Os arquivos que tinham perfil de spot/chamada foram organizados em Spots de rádio.",
  roteiros: "Roteiros de vídeo, campanhas sazonais, vídeos institucionais e ações de comunicação.",
  relatorios: "Relatórios sociais e materiais institucionais com organização e produção de conteúdo.",
  materias: "Arquivos de matérias jornalísticas e conteúdos institucionais produzidos para diferentes unidades."
};

const categoryIcons = {
  radio: "▮▮▮",
  videos: "▷",
  roteiros: "✎",
  relatorios: "▤",
  materias: "◷"
};

const contentMap = {
  sobre: {
    title: "Sobre Danielle Maia",
    html: `<p><strong>Danielle Maia</strong> é jornalista formada em Comunicação Social, com mais de 15 anos de experiência em comunicação, marketing e produção de conteúdo.</p>
<p>Sua trajetória une jornalismo, educação, arte e comunicação estratégica, com um olhar criativo, sensível e voltado para transformar informação em conteúdo claro, relevante e humanizado.</p>

<div class="modal-highlight">
  <span>15+ anos de experiência</span>
  <span>Jornalismo</span>
  <span>Marketing digital</span>
  <span>Produção de conteúdo</span>
</div>

<h4>Atuação profissional</h4>
<ul>
  <li>Produção de conteúdo institucional e jornalístico.</li>
  <li>Planejamento de redes sociais e comunicação digital.</li>
  <li>Roteiros audiovisuais, locução, newsletters e webinars.</li>
  <li>Fotografia profissional, eventos e assessoria de comunicação.</li>
  <li>Edição de livros, revistas e relatórios institucionais.</li>
</ul>

<p>Com experiência em projetos educacionais, institucionais e criativos, Danielle desenvolve uma comunicação que conecta pessoas, marcas e ideias com estratégia, propósito e autenticidade.</p>`
  },
  servicos: {
    title: "Serviços",
    html: `<p>Serviços voltados para marcas, instituições e projetos que precisam se comunicar melhor, com estratégia, clareza e presença profissional.</p>

<div class="modal-highlight">
  <span>Conteúdo institucional</span>
  <span>Marketing digital</span>
  <span>Roteiros</span>
  <span>Locução</span>
  <span>Fotografia</span>
  <span>Relatórios sociais</span>
</div>

<h4>Principais frentes</h4>
<ul>
  <li>Produção textual para sites, redes sociais e materiais institucionais.</li>
  <li>Roteiros para vídeos, campanhas, webinars e conteúdos audiovisuais.</li>
  <li>Locução, edição de áudio e apoio em produção audiovisual.</li>
  <li>Fotografia profissional, fotojornalismo e cobertura de eventos.</li>
  <li>Relatórios sociais, matérias jornalísticas e comunicação empresarial.</li>
</ul>`
  },
  portfolio: {
    title: "Portfólio",
    html: `<p>Área criada para apresentar os trabalhos da Danielle Maia de forma profissional, organizada e visual.</p>

<div class="modal-highlight">
  <span>Spots</span>
  <span>Roteiros</span>
  <span>Campanhas</span>
  <span>Matérias</span>
</div>

<p>Os materiais completos podem ser atualizados manualmente conforme novos projetos forem enviados, mantendo a apresentação limpa e estratégica.</p>`
  },
  radio: {
    title: "Spots de rádio",
    category: "radio"
  },
  videos: {
    title: "Vídeos institucionais",
    category: "videos"
  },
  roteiro: {
    title: "Roteiros & campanhas",
    category: "roteiros"
  }
};

function formatBytes(bytes) {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;

  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }

  return `${size.toFixed(size >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function byCategory(category) {
  return portfolioItems
    .filter((item) => item.category === category)
    .sort((a, b) => formatTitle(a.title).localeCompare(formatTitle(b.title), "pt-BR"));
}

function formatTitle(title = "") {
  return title
    .replace(/SPOT["_]*/gi, "Spot ")
    .replace(/GERAL["_]*/gi, "Geral ")
    .replace(/["]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bCNEC\b/g, "CNEC");
}

function categoryActionLabel(type) {
  if (type === "audio") return "Baixar áudio";
  if (type === "video") return "Abrir vídeo";
  if (type === "pdf") return "Abrir PDF";
  if (type === "documento") return "Baixar documento";
  return "Abrir arquivo";
}

function renderMedia(item) {
  const url = encodeURI(item.url);

  if (item.type === "audio") {
    return `
      <div class="portfolio-player portfolio-player--audio">
        <audio controls preload="none" src="${url}"></audio>
        <a class="portfolio-link" href="${url}" download>${categoryActionLabel(item.type)}</a>
      </div>
    `;
  }

  if (item.type === "video") {
    return `
      <div class="portfolio-player portfolio-player--video">
        <video controls preload="metadata" src="${url}" playsinline></video>
        <a class="portfolio-link" href="${url}" target="_blank" rel="noopener noreferrer">${categoryActionLabel(item.type)}</a>
      </div>
    `;
  }

  return `<a class="portfolio-link" href="${url}" target="_blank" rel="noopener noreferrer">${categoryActionLabel(item.type)}</a>`;
}

function renderProjectList(category) {
  const items = byCategory(category);
  const label = categoryLabels[category] || "Projetos";
  const description = categoryDescriptions[category] || "Materiais do portfólio.";

  if (!items.length) {
    return `<p class="portfolio-lead">Nenhum material cadastrado nesta categoria ainda.</p>`;
  }

  const totalSize = items.reduce((sum, item) => sum + (item.size || 0), 0);

  return `
    <div class="portfolio-modal-header">
      <p class="portfolio-lead">${description}</p>
      <div class="portfolio-counter">
        <strong>${items.length}</strong>
        <span>${items.length === 1 ? "material disponível" : "materiais disponíveis"}</span>
        ${totalSize ? `<small>${formatBytes(totalSize)} no total</small>` : ""}
      </div>
    </div>

    <div class="portfolio-list portfolio-list--${category}">
      ${items.map((item, index) => `
        <article class="portfolio-item">
          <div class="portfolio-item__number">${String(index + 1).padStart(2, "0")}</div>

          <div class="portfolio-item__body">
            <div class="portfolio-item__head">
              <span>${label}</span>
              <small>${item.type.toUpperCase()} ${item.size ? `• ${formatBytes(item.size)}` : ""}</small>
            </div>

            <h4>${formatTitle(item.title)}</h4>

            ${category === "radio"
              ? `<p>Peça de áudio/locução para campanha, comunicação institucional ou chamada promocional.</p>`
              : `<p>${item.description || "Material disponível para visualização."}</p>`
            }

            <div class="portfolio-media">
              ${renderMedia(item)}
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderPortfolioOverview() {
  const cats = ["radio", "videos", "roteiros", "materias"];

  return `
    <p class="portfolio-lead">Materiais organizados por tipo de entrega, para facilitar a navegação pelo trabalho da Dani.</p>

    <div class="portfolio-overview">
      ${cats.map((cat) => {
        const count = byCategory(cat).length;
        return `
          <button type="button" class="portfolio-category-button" data-open-category="${cat}">
            <span>${categoryIcons[cat] || "•"}</span>
            <strong>${categoryLabels[cat]}</strong>
            <small>${count} ${count === 1 ? "arquivo" : "arquivos"}</small>
          </button>
        `;
      }).join("")}
    </div>

    <p class="portfolio-note">Clique em uma categoria acima para visualizar os materiais relacionados.</p>
  `;
}

document.querySelectorAll(".js-whatsapp").forEach((button) => {
  button.setAttribute("href", whatsappLink);
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");
});

document.querySelectorAll(".js-modal-trigger").forEach((item) => {
  const openModal = (event) => {
    if (event) event.preventDefault();

    const key = item.dataset.modal;
    const data = contentMap[key];
    if (!data) return;

    modalTitle.textContent = data.title;

    if (data.renderer) {
      modalText.innerHTML = data.renderer();
      if (modalBack) modalBack.hidden = true;
    } else if (data.category) {
      modalText.innerHTML = renderProjectList(data.category);
      if (modalBack) modalBack.hidden = false;
    } else {
      modalText.innerHTML = data.html || `<p>${data.text}</p>`;
      if (modalBack) modalBack.hidden = true;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  item.addEventListener("click", openModal);
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      openModal(event);
    }
  });
});

modalText.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-category]");
  if (!button) return;

  const category = button.dataset.openCategory;
  modalTitle.textContent = categoryLabels[category] || "Portfólio";
  modalText.innerHTML = renderProjectList(category);
  if (modalBack) modalBack.hidden = false;
});

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (modalBack) modalBack.hidden = true;
}

if (modalBack) {
  modalBack.addEventListener("click", () => {
    modalTitle.textContent = "Portfólio";
    modalText.innerHTML = renderPortfolioOverview();
    modalBack.hidden = true;
  });
}

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
