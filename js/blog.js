document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-blog");

  function createCard(post) {
    const card = document.createElement("div");
    card.classList.add("cards-blog");

    // Adiciona o link ao card
    card.addEventListener("click", () => {
      window.location.href = post.link;
    });

    const cardContent = document.createElement("div");
    cardContent.classList.add("cards-blog-content");

    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("cards-blog-title");
    cardTitle.textContent = post.title.rendered;

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("cards-blog-description");
    cardDescription.innerHTML = post.excerpt.rendered;

    const cardDate = document.createElement("p");
    cardDate.classList.add("cards-blog-date");
    cardDate.textContent = `Publicado em: ${new Date(
      post.date
    ).toLocaleDateString()}`;

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(cardDate);
    card.appendChild(cardContent);

    return card;
  }

  fetch("https://dealerequitysystem.com/wp-json/wp/v2/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const filteredData = data.filter(
        (post) =>
          post.status === "publish" && post.content.rendered.trim() !== ""
      );

      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

      const limitedData = filteredData.slice(0, 3);

      limitedData.forEach((post) => {
        const card = createCard(post);
        cardsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados:", error);
    });
});
