//La funcionalidad del carrusel
const slider = document.getElementById("slider");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentIndex = 0;

function updateSliderPosition() {
  const slides = slider.querySelectorAll('.flex-shrink-0');
  const totalSlides = slides.length;
  const slideWidth = slides[0].offsetWidth;
  const newTransformValue = -currentIndex * slideWidth;

  slider.style.transform = `translateX(${newTransformValue}px)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slider.querySelectorAll('.flex-shrink-0').length - 1 : currentIndex - 1;
  updateSliderPosition();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex === slider.querySelectorAll('.flex-shrink-0').length - 1) ? 0 : currentIndex + 1;
  updateSliderPosition();
});