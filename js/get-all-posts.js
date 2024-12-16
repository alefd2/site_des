document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-blog");
  const loadMoreButton = document.getElementById("load-more");

  let posts = [];
  let currentIndex = 0;
  const postsPerPage = 20;

  async function createCard(post) {
    const card = document.createElement("div");
    card.classList.add("cards-blog");

    card.addEventListener("click", () => {
      window.location.href = `post.html?id=${post.id}`;
    });

    const imageUrl = await getImgUrl(post._links["wp:featuredmedia"]);

    const cardImage = document.createElement("img");
    cardImage.src = imageUrl;
    cardImage.alt = post.title.rendered;

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
    const postDate = new Date(post.modified);
    cardDate.textContent = `Publicado em: ${postDate.toLocaleDateString()}`;

    card.appendChild(cardImage);
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(cardDate);
    card.appendChild(cardContent);

    return card;
  }

  async function loadPosts() {
    showLoadingIndicator();

    const postsToShow = posts.slice(currentIndex, currentIndex + postsPerPage);

    for (let i = 0; i < postsToShow.length; i++) {
      const post = postsToShow[i];
      const card = await createCard(post);
      cardsContainer.appendChild(card);
    }

    currentIndex += postsPerPage;
    hideLoadingIndicator();

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

      loadPosts(); // Carrega os primeiros 10 posts

      if (posts.length > postsPerPage) {
        loadMoreButton.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados:", error);
    });

  async function getImgUrl(featuredmedia) {
    try {
      const linkImage = featuredmedia?.[0]?.href;
      if (linkImage) {
        const response = await fetch(linkImage);
        if (!response.ok) {
          throw new Error("Erro ao buscar imagem: " + response.statusText);
        }
        const media = await response.json();
        return media.source_url;
      }
    } catch (error) {
      console.error("Erro ao buscar a imagem do post:", error);
      return "fallback-image.jpg";
    }
  }

  loadMoreButton.addEventListener("click", () => {
    loadPosts();
  });

  function showLoadingIndicator() {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "loading-indicator";
    loadingIndicator.textContent = "Carregando...";
    cardsContainer.appendChild(loadingIndicator);
  }

  function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
});
