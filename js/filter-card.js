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

    // Reset the progress bar in the content that is being displayed
    if (i === index) {
      const progressBar = content.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.width = "0%";
      }
    }
  });

  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

let intervalId;
let progressBarIntervalId;

function autoChangeContent(interval) {
  const contents = document.querySelectorAll(".content-item");
  let currentIndex = 0;

  if (intervalId) {
    clearInterval(intervalId);
  }
  if (progressBarIntervalId) {
    clearInterval(progressBarIntervalId);
  }

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

  const interval = 5000; // Time to display each card
  autoChangeContent(interval);
});
