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


//Funcionalidad de las habitaciones reservadas o por reservar

function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 duration-300';

    // Contenedor para la imagen
    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative h-48';

    // Imagen de la habitación
    const image = document.createElement('img');
    image.src = room.img;
    image.alt = room.nombre;
    image.className = 'absolute h-full w-full object-cover';

    // Contenedor del contenido
    const content = document.createElement('div');
    content.className = 'p-4';

    // Título de la habitación
    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold text-gray-800';
    title.textContent = room.nombre;

    // Precio por noche
    const price = document.createElement('p');
    price.className = 'text-gray-600 mt-2';
    price.textContent = `Precio por noche: ${room.preciopornoche}`;

    // Descripción de la habitación
    const description = document.createElement('p');
    description.className = 'text-gray-700 mt-2';
    description.textContent = room.descripcion;

    // Disponibilidad de la habitación
    const availability = document.createElement('p');
    availability.className = 'text-sm text-gray-500 mt-2';
    availability.textContent = `Disponible: ${room.disponibilidad ? 'Sí' : 'No'}`;

    // Añadir los elementos a la tarjeta
    imageContainer.appendChild(image);
    content.appendChild(title);
    content.appendChild(price);
    content.appendChild(description); 
    content.appendChild(availability);
    card.appendChild(imageContainer);
    card.appendChild(content);

    return card;
  }

  // Función para cargar las habitaciones
  function loadRooms() {
    const roomsContainer = document.getElementById('rooms-container');
    
    // Mostrar un mensaje de carga
    roomsContainer.innerHTML = '<p class="text-center text-white">Cargando habitaciones...</p>';

    // Hacer la petición a la API
    fetch('http://localhost:3000/Habitaciones') // Aquí se debe poner la URL de tu API
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
        roomsContainer.innerHTML = '<p class="text-center text-white">Error al cargar las habitaciones. Por favor, intente más tarde.</p>';
      });
  }

  // Cargar las habitaciones cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', loadRooms);