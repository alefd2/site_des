document.querySelector(".menu-toggle").addEventListener("click", function () {
  var menuNav = document.querySelector(".menu-nav");
  var body = document.body;
  if (menuNav.classList.contains("active")) {
    menuNav.classList.remove("active");
    body.style.overflowY = "auto";
  } else {
    menuNav.classList.add("active");
    body.style.overflowY = "hidden";
  }
});

function handleScroll() {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.classList.add("translucent");
  } else {
    nav.classList.remove("translucent");
  }
}

window.addEventListener("scroll", handleScroll);

// Fecha o modal ao clicar em um item da navegação
document.querySelectorAll(".menu-nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    var menuNav = document.querySelector(".menu-nav");
    var body = document.body;

    menuNav.classList.remove("active");
    body.style.overflowY = "auto";
  });
});
