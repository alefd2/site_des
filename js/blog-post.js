document.addEventListener("DOMContentLoaded", function () {
  const postContent = document.getElementById("post-content");
  const headerImage = document.getElementById("post-header-image");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    fetch(`https://dealerequitysystem.com/wp-json/wp/v2/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta da API: " + response.statusText);
        }
        return response.json();
      })
      .then((post) => {
        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title.rendered;

        const postDate = document.createElement("p");
        postDate.textContent = `Publicado em: ${new Date(
          post.date
        ).toLocaleDateString()}`;

        const postContentHtml = document.createElement("div");
        postContentHtml.innerHTML = post.content.rendered;

        // Adiciona o título do post ao título da página
        document.title = post.title.rendered + " - Dealer Equity System";

        // Adiciona a imagem destacada do post (featured image) com gradiente
        if (post.featured_media) {
          fetch(
            `https://dealerequitysystem.com/wp-json/wp/v2/media/${post.featured_media}`
          )
            .then((response) => response.json())
            .then((media) => {
              headerImage.style.backgroundImage = `linear-gradient(to top,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${media.source_url}')`;
            })
            .catch((error) => {
              console.error("Erro ao buscar a imagem do post:", error);
            });
        }

        // Adiciona o texto centralizado
        const headerText = document.createElement("div");
        headerText.className = "header-text";
        headerText.innerHTML = `
            <h2>${post.title.rendered}</h2>
            <p>Publicado em: ${new Date(post.date).toLocaleDateString()}</p>
          `;
        headerImage.appendChild(headerText);

        postContent.appendChild(postTitle);
        postContent.appendChild(postDate);
        postContent.appendChild(postContentHtml);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do post:", error);
      });
  } else {
    postContent.innerHTML = "<p>Post não encontrado.</p>";
  }
});
