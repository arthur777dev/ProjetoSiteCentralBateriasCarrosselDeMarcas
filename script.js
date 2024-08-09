let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }

    const offset = -slideIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    slideIndex += step;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
        document.querySelector('.carousel-inner').style.transition = 'none'; // Disable transition for reset
        document.querySelector('.carousel-inner').style.transform = `translateX(0%)`;
        setTimeout(() => {
            document.querySelector('.carousel-inner').style.transition = 'transform 0.5s ease-in-out'; // Enable transition
            showSlide(slideIndex);
        }, 50); // Delay to ensure transition is re-enabled
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
        document.querySelector('.carousel-inner').style.transition = 'none'; // Disable transition for reset
        document.querySelector('.carousel-inner').style.transform = `translateX(-${(totalSlides - 10) * 100}%)`;
        setTimeout(() => {
            document.querySelector('.carousel-inner').style.transition = 'transform 0.5s ease-in-out'; // Enable transition
            showSlide(slideIndex);
        }, 50); // Delay to ensure transition is re-enabled
    } else {
        showSlide(slideIndex);
    }
}

// Inicializa o carrossel
showSlide(slideIndex);

// Adiciona eventos de teclado para navegação (opcional)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});