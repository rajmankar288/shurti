/* ==========================
   SLIDER
========================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const currentSlide = document.getElementById("currentSlide");
const totalSlides = document.getElementById("totalSlides");

let slideIndex = 0;

totalSlides.textContent = String(slides.length).padStart(2, "0");


function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    }

    if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    slides[slideIndex].classList.add("active");

    dots[slideIndex].classList.add("active");

    currentSlide.textContent =
        String(slideIndex + 1).padStart(2, "0");
}


/* ==========================
   NEXT SLIDE
========================== */

function nextSlide() {

    slideIndex++;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    showSlide(slideIndex);
}


/* ==========================
   PREVIOUS SLIDE
========================== */

function prevSlide() {

    slideIndex--;

    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    showSlide(slideIndex);
}


/* ==========================
   GO TO SLIDE
========================== */

function goToSlide(index) {

    slideIndex = index;

    showSlide(slideIndex);
}


/* ==========================
   KEYBOARD NAVIGATION
========================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        prevSlide();
    }

});


/* ==========================
   TOUCH / SWIPE
========================== */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(event) {

    touchStartX = event.changedTouches[0].screenX;

});

document.addEventListener("touchend", function(event) {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {
        nextSlide();
    } else {
        prevSlide();
    }

}


/* ==========================
   BACKGROUND FLOATING HEARTS
========================== */

const heartContainer = document.querySelector(".hearts");

const heartSymbols = ["♥", "♡", "❤", "💗"];

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        15 + Math.random() * 25 + "px";

    heart.style.animationDuration =
        5 + Math.random() * 6 + "s";

    heart.style.animationDelay =
        Math.random() * 3 + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 12000);
}


/* Create hearts continuously */

setInterval(createHeart, 700);


/* Initial slide */

showSlide(0);