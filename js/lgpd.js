$(function () {
  $("body")
    .append(
      '<div class="lgpd"><p>Nossa plataforma utiliza cookies para garantir que vocÃª tenha a melhor experÃªncia. Para saber mais, Acesse <a href="https://dealerequitysystem.com/politica-de-privacidade.html" target="_blank">PolÃ­tica de Privacidade.</a> e <a href="https://dealerequitysystem.com/politica-de-cookies.html" target="_blank">PolÃ­tica de Cookies.</a> </p> <button>Entendido</button></div>'
    )
    .html();
  $(".lgpd").css({
    border: "1px solid #fff",
    "font-family": "sans-serif",
    position: "fixed",
    "z-index": "9999",
    background: "linear-gradient(90deg, rgb(40 6 93) 0%, rgb(125 77 215) 100%)",
    bottom: "15px",
    left: "15px",
    right: "15px",
    padding: "15px",
    "border-radius": "10px",
  });
  $(".lgpd p").css({
    "margin-bottom": "0",
    float: "left",
    "font-size": "14px",
    color: "#fff",
    "line-height": "20px",
    "margin-top": "4px",
  });
  $(".lgpd button").css({
    border: "0",
    "font-size": "14px",
    float: "right",
    padding: "6px 40px",
    background: "#fff",
    color: "#1F2227",
    "font-weight": "700",
    border: "1px solid #9e9e9e",
    "text-transform": "uppercase",
    "border-radius": "8px",
  });
  $(".lgpd a").css({ "text-decoration": "underline", color: "#fff" });
  $(".lgpd button").click(function () {
    $(".lgpd").remove();
    window.localStorage.setItem("usuario", "aceitou");
    var usuario = window.localStorage.getItem("usuario");
  });
  if (window.localStorage.getItem("usuario") == "aceitou") {
    $(".lgpd").remove();
  }
});
