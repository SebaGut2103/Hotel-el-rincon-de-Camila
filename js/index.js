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

//Login
const button = document.getElementById("bnt")



//Funcionalidad que muestre las habitaciones (api)
