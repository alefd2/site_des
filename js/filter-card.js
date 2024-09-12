let intervalId;
let progressBarIntervalId;
let currentIndex = 0;

function initializeContent() {
  const contents = document.querySelectorAll(".content-item");
  const cards = document.querySelectorAll(".filter-card");

  contents[0].style.display = "block";
  contents[0].classList.add("active");
  cards[0].classList.add("active");
  currentIndex = 0; // Inicia com o índice 0
}

function changeContent(index) {
  const contents = document.querySelectorAll(".content-item");
  const cards = document.querySelectorAll(".filter-card");

  contents.forEach((content, i) => {
    content.style.display = i === index ? "block" : "none";
    content.classList.toggle("active", i === index);

    if (i === index) {
      const progressBar = content.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.width = "0%";
      }
    }
  });

  cards.forEach((card, i) => {
    if (i === index) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  currentIndex = index;
}

function restartAutoChangeContent(interval) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (progressBarIntervalId) {
    clearInterval(progressBarIntervalId);
  }

  autoChangeContent(interval);
}

function autoChangeContent(interval) {
  const contents = document.querySelectorAll(".content-item");

  intervalId = setInterval(() => {
    changeContent(currentIndex);
    currentIndex = (currentIndex + 1) % contents.length;
  }, interval);

  const progressBarUpdateInterval = 100;
  const progressBarMaxWidth = 100;

  progressBarIntervalId = setInterval(() => {
    const activeContent = document.querySelector(".content-item.active");
    if (activeContent) {
      const progressBar = activeContent.querySelector(".progress-bar");
      if (progressBar) {
        const currentWidth = parseFloat(progressBar.style.width) || 0;
        const progressIncrement =
          progressBarMaxWidth / (interval / progressBarUpdateInterval);

        if (currentWidth + progressIncrement >= progressBarMaxWidth) {
          progressBar.style.width = "0%";
        } else {
          progressBar.style.width = `${currentWidth + progressIncrement}%`;
        }
      }
    }
  }, progressBarUpdateInterval);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeContent();

  const interval = 6000;
  autoChangeContent(interval);

  document.querySelectorAll(".filter-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      changeContent(index);
      restartAutoChangeContent(interval);
    });
  });
});
