document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-blog");
  const loadMoreButton = document.getElementById("load-more");

  let posts = [];
  let currentIndex = 0;
  const postsPerPage = 3;

  function createCard(post) {
    const card = document.createElement("div");
    card.classList.add("cards-blog");

    // Adiciona o link ao card
    card.addEventListener("click", () => {
      window.location.href = `post.html?id=${post.id}`;
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

  function loadPosts() {
    const postsToShow = posts.slice(currentIndex, currentIndex + postsPerPage);
    postsToShow.forEach((post) => {
      const card = createCard(post);
      cardsContainer.appendChild(card);
    });
    currentIndex += postsPerPage;

    if (currentIndex >= posts.length) {
      loadMoreButton.style.display = "none";
    }
  }

  fetch("https://dealerequitysystem.com/wp-json/wp/v2/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      posts = data.filter(
        (post) =>
          post.status === "publish" && post.content.rendered.trim() !== ""
      );
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Inicialmente carrega 3 posts
      loadPosts();

      // Exibe o botão de "Carregar mais posts" se houver mais posts para carregar
      if (posts.length > postsPerPage) {
        loadMoreButton.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados:", error);
    });

  loadMoreButton.addEventListener("click", () => {
    loadPosts();
  });
});

function showLoadingIndicator() {
  // Adicione um indicador de carregamento
  const loadingIndicator = document.createElement("div");
  loadingIndicator.className = "loading-indicator";
  loadingIndicator.textContent = "Carregando...";
  cardsContainer.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
  // Remova o indicador de carregamento
  const loadingIndicator = document.querySelector(".loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

function loadPosts() {
  showLoadingIndicator();
  const postsToShow = posts.slice(currentIndex, currentIndex + postsPerPage);
  postsToShow.forEach((post) => {
    const card = createCard(post);
    cardsContainer.appendChild(card);
  });
  currentIndex += postsPerPage;
  hideLoadingIndicator();

  if (currentIndex >= posts.length) {
    loadMoreButton.style.display = "none";
  }
}
