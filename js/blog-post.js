document.addEventListener("DOMContentLoaded", function () {
  const postContent = document.getElementById("post-content");
  const headerImage = document.getElementById("post-header-image");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  // Função principal para buscar o post
  async function fetchPost(postId) {
    try {
      const response = await fetch(
        `https://dealerequitysystem.com/wp-json/wp/v2/posts/${postId}`
      );

      if (!response.ok) {
        throw new Error("Erro na resposta da API: " + response.statusText);
      }

      const post = await response.json();
      renderPost(post);
    } catch (error) {
      console.error("Erro ao buscar os dados do post:", error);
      postContent.innerHTML = "<p>Erro ao carregar o post.</p>";
    }
  }

  function renderPost(post) {
    postContent.innerHTML = "";

    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title.rendered;

    const postDate = document.createElement("p");
    postDate.textContent = `Publicado em: ${new Date(
      post.date
    ).toLocaleDateString()}`;

    const postContentHtml = document.createElement("div");
    postContentHtml.innerHTML = post.content.rendered;

    document.title = post.title.rendered + " - Dealer Equity System";

    if (post.featured_media) {
      fetchMedia(post.featured_media);
    }

    postContent.appendChild(postTitle);
    postContent.appendChild(postDate);
    postContent.appendChild(postContentHtml);
  }

  // Função para buscar e renderizar a imagem
  async function fetchMedia(mediaId) {
    try {
      const response = await fetch(
        `https://dealerequitysystem.com/wp-json/wp/v2/media/${mediaId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar imagem: " + response.statusText);
      }

      const media = await response.json();
      headerImage.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${media.source_url}')`;

      // Adiciona o texto centralizado na imagem
      const headerText = document.createElement("div");
      headerText.className = "header-text";
      headerText.innerHTML = `
        <h2>${media.title.rendered}</h2>
      `;
      headerImage.appendChild(headerText);
    } catch (error) {
      console.error("Erro ao buscar a imagem do post:", error);
    }
  }

  if (postId) {
    fetchPost(postId);
  } else {
    postContent.innerHTML = "<p>Post não encontrado.</p>";
  }
});
