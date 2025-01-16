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

async function pintarHabitaciones(){
  let target = "";
  pintarHabitaciones.forEach((element,index) => {
    target += `<div class="max-auto rounded overflow-hidden shadow-lg bg-white flex w3/5">
    
    <div class="relative w-full h-48 overflow-hidden" onmouseover="startSlide(${index})" onmouseover="StopSlide()"
    `
    let strings= "";
    for(img in element.images){
      strings += `<img class="slide w-full h-full object-cover slide-${index}"
        src="${element.images[img]}" alt="Suite Ejecutivo - Foto 1" id="">
      `
    }    
    target += strings + `</div>
    <div class="p-4">
    <h2 class="font-bold text-xl mb-2"> ${element.nombre}</h2>
    <p class="text-gray-700 mb-2">
    ${element.description}
    </p>
    `
  });
  target.inner.HTML = target;
}