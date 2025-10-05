// js/main.js

// --- Countdown Timer ---
const countdown = () => {
    // Set the date for the event
    const eventDate = new Date("Jan 13, 2026 09:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "The event has started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    };

    // Initial call to display timer immediately
    updateTimer();
    
    // Update the timer every second
    const interval = setInterval(updateTimer, 1000);
};
// Add to js/main.js

// --- Scroll-Triggered Animations ---
const scrollAnimation = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
};
// Add to js/main.js

// --- Mobile Navigation Toggle ---
const mobileNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('is-active');
    });
};

// --- Initialize all scripts on page load ---
document.addEventListener('DOMContentLoaded', () => {
    countdown();
    scrollAnimation();
    mobileNav();
});