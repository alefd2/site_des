function initializeContent() {
  const contents = document.querySelectorAll(".content-item");
  const cards = document.querySelectorAll(".filter-card");

  contents[0].style.display = "block";
  contents[0].classList.add("active");
  cards[0].classList.add("active");
}

function changeContent(index) {
  const contents = document.querySelectorAll(".content-item");
  const cards = document.querySelectorAll(".filter-card");

  contents.forEach((content, i) => {
    content.style.display = i === index ? "block" : "none";
    content.classList.toggle("active", i === index);
  });

  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

document.addEventListener("DOMContentLoaded", initializeContent);
