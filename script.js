 //Verifica o dispositivo e muda o banner
 document.addEventListener("DOMContentLoaded", function() {
     var banner = document.getElementById("banner");

     // Verifica se a largura da tela é menor que 768px
     if (window.innerWidth <= 768) {
         banner.src = "Banner Vertical.jpg"; // Imagem para dispositivos móveis
     }
 });