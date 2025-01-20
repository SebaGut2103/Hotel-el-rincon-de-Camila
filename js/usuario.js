//Funcionamiento del registro 

  const formulario = document.getElementById("registration");

  formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();

      const nombre = document.getElementById("fullname").value;
      const correo = document.getElementById("email").value;
      const contraseña = document.getElementById("password").value;

      try {
          const url = 'http://localhost:3000/Usuarios';
          const response = await fetch(url, {
              method: 'POST',
              body: JSON.stringify({ nombre, correo, contraseña }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (!response.ok) {
              console.log("h")
          }
      } catch (error) {
          console.log(error);
      }
  });

//login 

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const loginBtn = document.getElementById('loginBtn');
    
    if (usuarioActual) {
        const usuario = JSON.parse(usuarioActual);
        // Si existe un usuario en localStorage, actualizar el botón con su nombre
        actualizarBotonLogin(usuario.nombre);
    } else {
        // Si no hay usuario, asegurarse de que el botón diga "Iniciar sesión"
        loginBtn.value = 'Iniciar-Sesión';
    }
});

// Función para actualizar el botón después de iniciar sesión
function actualizarBotonLogin(nombreUsuario) {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.value = nombreUsuario;
    loginBtn.classList.add('bg-green-500', 'text-white');
    
    // Cambiar el evento click para manejar el cierre de sesión
    loginBtn.onclick = mostrarMenuUsuario;
}

// Función para el menú de usuario y cierre de sesión
function mostrarMenuUsuario() {
    if (confirm('¿Desea cerrar sesión?')) {
        localStorage.removeItem('usuarioActual');
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.value = 'Iniciar-Sesión';
        loginBtn.classList.remove('bg-green-500', 'text-white');
        loginBtn.onclick = () => loginModal.classList.remove('hidden');

        // Redirigir a la página principal si es necesario, o actualizar el estado en la página actual
        window.location.reload(); // Si deseas recargar la página al cerrar sesión
    }
}


// Obtener elementos del DOM
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.getElementById('closeBtn');
const loginForm = document.getElementById('loginForm');

// Mostrar modal
loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
    loginModal.classList.add('hidden');
    loginForm.reset();
});

// Función de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('mail').value;
    const password = document.getElementById('pssword').value;
    
    try {
        // Obtener usuarios del JSON Server
        const response = await fetch('http://localhost:3000/Usuarios');
        const usuarios = await response.json();
        
        // Buscar usuario que coincida
        const usuarioEncontrado = usuarios.find(usuario =>
            usuario.nombre === username &&
            usuario.correo === email &&
            usuario.contraseña === password
        );
        
        if (usuarioEncontrado) {
            // Inicio de sesión exitoso
            alert('¡Inicio de sesión exitoso!');
            loginModal.classList.add('hidden');
            
            // Guardar datos del usuario en localStorage
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
            
            // Actualizar botón de inicio de sesión
            actualizarBotonLogin(usuarioEncontrado.nombre);
            
            loginForm.reset();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al conectar con el servidor');
    }
});




