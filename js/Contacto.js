//Consulta WSP
document.addEventListener("DOMContentLoaded", function() {
    const wspButton = document.getElementById('wsp');
    
    wspButton.addEventListener('click', function() {
        const phoneNumber = '3003554331';  // Reemplaza con el número de teléfono correcto
        const message = 'Hola,%20me%20interesa%20más%20información%20sobre%20su%20hotel.';
      
        const url = 'https://wa.me/' + phoneNumber + '?text=' + message;
  
        window.open(url, '_blank');
    });
  });
