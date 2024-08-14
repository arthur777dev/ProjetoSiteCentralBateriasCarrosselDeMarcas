let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselInner = document.querySelector('.carousel-inner');
const intervalTime = 2000; 
const transitionTime = 1500; 
let isTransitioning = false; 


function showSlide(index) {
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }

    const offset = -slideIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    if (isTransitioning) return; 
    isTransitioning = true;

    const newSlideIndex = slideIndex + step;

    if (newSlideIndex >= totalSlides) {
        carouselInner.style.transition = 'none'; 
        showSlide(0); 
        setTimeout(() => {
            carouselInner.style.transition = `transform ${transitionTime}ms ease-in-out`; // Reativa a transição
            slideIndex = 1; 
            showSlide(slideIndex);
            isTransitioning = false; 
        }, 20);
    } else if (newSlideIndex < 0) {
        carouselInner.style.transition = 'none'; 
        showSlide(totalSlides - 1); 
        setTimeout(() => {
            carouselInner.style.transition = `transform ${transitionTime}ms ease-in-out`; // Reativa a transição
            slideIndex = totalSlides - 2; 
            showSlide(slideIndex); 
            isTransitioning = false; 
        }, 20);
    } else {
        slideIndex = newSlideIndex;
        showSlide(slideIndex);
        setTimeout(() => {
            isTransitioning = false; 
        }, transitionTime); 
    }
}


showSlide(slideIndex);


let autoSlide = setInterval(() => {
    moveSlide(1);
}, intervalTime);


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
        resetAutoSlide();
    }
});


document.querySelector('.prev').addEventListener('click', () => {
    moveSlide(-1);
    resetAutoSlide();
});
document.querySelector('.next').addEventListener('click', () => {
    moveSlide(1);
    resetAutoSlide();
});


function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        moveSlide(1);
    }, intervalTime);
}
