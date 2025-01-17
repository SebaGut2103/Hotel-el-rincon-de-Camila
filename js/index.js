//Funcionalidad del Carrusel o Slider
currentSlideID = 1;
sliderElement = document.getElementById("slider");
totalSlides = sliderElement.childElementCount;

function showSlide() {
  // Ocultar todas las diapositivas
  for (let i = 0; i < totalSlides; i++) {
    sliderElement.children[i].style.display = "none";
  }

  // Mostrar la diapositiva actual
  sliderElement.children[currentSlideID - 1].style.display = "block";
}

function next() {
  if (currentSlideID < totalSlides) {
    currentSlideID++;
  } else {
    currentSlideID = 1; // Volver a la primera diapositiva
  }
  showSlide();
}

function prev(){
  if(currentSlideID > 1){
    currentSlideID--;{
      showSlide()
    }
  }
}
// Iniciar el slider automático
setInterval(next, 4000); // Cambiar cada 3 segundos

// Inicializar la primera diapositiva
showSlide();

function showSlide() {
  slide = document.getElementById("slider").getElementsByTagName("li");
  for (let index = 0; index < totalSlides; index++) {
    const element = slide[index];
    if (currentSlideID === index + 1) {
      element.classList.remove("hidden")
    } else {
      element.classList.add("hidden")
    }
  }
}



//Funcionalidad que muestre las habitaciones (api)

function createRoomCard(room) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md overflow-hidden';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'relative h-48';

  const image = document.createElement('img');
  image.src = room.img;
  image.alt = room.nombre;
  image.className = 'absolute h-full w-full object-cover';

  const content = document.createElement('div');
  content.className = 'p-4';

  const title = document.createElement('h3');
  title.className = 'text-lg font-semibold text-gray-800';
  title.textContent = room.nombre;

  const price = document.createElement('p');
  price.className = 'text-gray-600 mt-2';
  price.textContent = `Precio por noche: ${room.preciopornoche}`;

  imageContainer.appendChild(image);
  content.appendChild(title);
  content.appendChild(price);
  card.appendChild(imageContainer);
  card.appendChild(content);

  return card;
}

// Función para cargar y mostrar las habitaciones
function loadRooms() {
  const roomsContainer = document.getElementById('rooms-container');
  
  // Mostrar un mensaje de carga
  roomsContainer.innerHTML = '<p class="text-white">Cargando habitaciones...</p>';

  // Hacer la petición a la API
  fetch('http://localhost:3000/posts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(rooms => {
      // Limpiar el contenedor
      roomsContainer.innerHTML = '';

      // Procesar los datos y crear las tarjetas
      rooms.forEach(room => {
        const card = createRoomCard(room);
        roomsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      roomsContainer.innerHTML = '<p class="text-white">Error al cargar las habitaciones. Por favor, intente más tarde.</p>';
    });
}

// Cargar las habitaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadRooms);


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


//Login
// Modal de login
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeBtn");
const loginForm = document.getElementById("loginForm");

// Abrir el modal cuando se hace clic en el botón
loginBtn.onclick = function() {
    loginModal.classList.remove("hidden");
    loginModal.classList.add("flex");
}

// Cerrar el modal cuando se hace clic en el botón de cerrar (x)
closeBtn.onclick = function() {
    loginModal.classList.remove("flex");
    loginModal.classList.add("hidden");
}

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.classList.remove("flex");
        loginModal.classList.add("hidden");
    }
}

// Manejo del formulario de login
loginForm.onsubmit = function(event) {
    event.preventDefault(); // Evitar el envío convencional del formulario

    const username = document.getElementById("username").value;
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("pssword").value;

    // Enviar los datos al servidor con fetch (POST o GET)
    fetch('http://localhost:3000/Registerlogin', {
        method: 'POST', // O 'GET' si es el caso
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email: mail, password }) // Enviamos los datos en formato JSON
    })
    .then(response => response.json()) // Procesar la respuesta
    .then(data => {
        if (data.success) {
            alert("¡Bienvenido, " + username + "!");
            loginModal.classList.remove("flex");
            loginModal.classList.add("hidden");
        } else {
            alert("Usuario o correo incorrectos.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al intentar iniciar sesión.');
    });
};


//Funcionamiento del registro 

registrationForm.onsubmit = function(event) {
  event.preventDefault(); // Evitar el envío convencional del formulario

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const comments = document.getElementById("comments").value;

  // Crear el objeto de datos que vamos a enviar
  const userData = {
      fullname: fullname,
      email: email,
      password: password,
      comments: comments
  };

  // Enviar los datos al servidor con fetch (POST)
  fetch('http://localhost:3000/Registerlogin', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData) // Convertimos el objeto en JSON
  })
  .then(response => response.json()) // Procesamos la respuesta JSON
  .then(data => {
      if (data.success) {
          alert('¡Registro exitoso!');
      } else {
          alert('Hubo un problema con el registro.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
};
