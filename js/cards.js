var cardsData = [
  {
    id: "dab4b60a-e3b3-4d35-a662-0c8dcf19a8f1",
    title: "Plataforma Unificada",
    description: "União de várias plataformas em uma única ferramenta",
    link: "page/coaching-lideres/",
    bgImage: "./assets/icons/conect.png",
  },
  {
    id: "dab4b60a-e3b3-4d35-a662-0c8dcf19a8f1",
    title: "Negócios Diários",
    description: "Oportunidade real de novos negócios diariamente",
    link: "page/coaching-lideres/",
    bgImage: "./assets/icons/star Calendar.png",
  },
  {
    id: "dab4b60a-e3b3-4d35-a662-0c8dcf19a8f1",
    title: "Dashboard Dinâmico",
    description: "Dashboard dinâmico para fácil visualização de oportunidade",
    link: "page/coaching-lideres/",
    bgImage: "./assets/icons/dashboard.png",
  },
  {
    id: "dab4b60a-e3b3-4d35-a662-0c8dcf19a8f1",
    title: "Gestão Diária",
    description:
      "Fácil de planejar e gerenciar o resultado de sua equipe diariamente",
    link: "page/coaching-lideres/",
    bgImage: "./assets/icons/settings.png",
  },
];

function showCards() {
  var container = document.getElementById("cards-container");

  // Limpar o contêiner antes de adicionar os novos cards
  container.innerHTML = "";

  cardsData.forEach(function (card) {
    var cardElement = document.createElement("div");
    cardElement.className = "card";

    cardElement.innerHTML = `

        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <img src="${card.bgImage}" alt="Card Image" class="card-image">
                    <h4 class="card-title">${card.title}</h4>
                </div>
                <div class="divider"></div>
                <p class="card-description">${card.description}</p>
            </div>
        </div>
      `;

    container.appendChild(cardElement);
  });
}

showCards();
