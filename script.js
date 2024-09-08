// Toggle accordion content
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        // Toggle active state
        button.classList.toggle('active');

        // Handle expand/collapse animation
        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
});

// Additional code for mobile can ensure the click is responsive
window.addEventListener('resize', () => {
    document.querySelectorAll('.accordion-header').forEach(button => {
        // Remove active state on resize to start collapsed
        if (window.innerWidth <= 768) {
            button.classList.remove('active');
            button.nextElementSibling.style.maxHeight = 0;
        }
    });
});

// Initial load to ensure sections are collapsed
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.nextElementSibling.style.maxHeight = 0;
        });
    }
});

document.querySelectorAll('.footer-box').forEach(box => {
    box.addEventListener('click', () => {
        box.classList.toggle('active');
    });
});

document.querySelectorAll('.order-now-button').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('orderModal').style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('orderModal')) {
        document.getElementById('orderModal').style.display = 'none';
    }
});

document.getElementById('calculatePrice').addEventListener('click', () => {
    const service = document.getElementById('service').value;
    const timeWindow = document.getElementById('timeWindow').value;

    let price = 0;
    if (service === 'service1') {
        price = timeWindow === 'morning' ? 50 : 60;
    } else if (service === 'service2') {
        price = timeWindow === 'morning' ? 70 : 80;
    }

    document.getElementById('price').textContent = price;
});

document.getElementById('orderForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const timeWindow = document.getElementById('timeWindow').value;
    const comments = document.getElementById('comments').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;
    
    console.log(`Order Details:
    Service: ${service}
    Date: ${date}
    Time Window: ${timeWindow}
    Comments: ${comments}
    Email: ${email}
    Address: ${address}
    Phone: ${phone}
    Payment Method: ${payment}`);

    alert('Order placed successfully!');
    document.getElementById('orderModal').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', function() {
    // Select all slides and indicators
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelector('.indicators');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentSlide = 0;
    const slideCount = slides.length;

    // Array of possible animations
    const animations = [
        { in: 'fadeIn', out: 'fadeOut' },
        { in: 'slideInRight', out: 'slideOutLeft' },
        { in: 'slideInLeft', out: 'slideOutRight' },
        { in: 'zoomIn', out: 'zoomOut' },
        { in: 'flipInX', out: 'flipOutX' },
        { in: 'blurIn', out: 'blurOut' },
        { in: 'bounceIn', out: 'bounceOut' }
    ];

    // Create indicators
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }

    // Function to apply random animation
    function applyRandomAnimation(slide, isIncoming) {
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        slide.style.animation = `${isIncoming ? randomAnimation.in : randomAnimation.out} 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${isIncoming ? '0.1s' : '0s'} forwards`;
    }

    // Function to update the active slide and indicator
    function updateSlide() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            setTimeout(() => {
                slide.classList.add('active');
                applyRandomAnimation(slide, true);
            }, 100);
        } else {
            slide.classList.remove('active');
            applyRandomAnimation(slide, false);
        }
    });
    
    const indicatorDots = document.querySelectorAll('.indicator');
    indicatorDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

    // Function to go to a specific slide
    function goToSlide(n) {
        currentSlide = (n + slideCount) % slideCount;
        updateSlide();
    }

    // Function to go to the next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Function to go to the previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-advance slides every 5 seconds
    let autoAdvance = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    sliderContainer.addEventListener('mouseleave', () => autoAdvance = setInterval(nextSlide, 5000));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
});
// Add touch support
// Function to check if the device is mobile-sized
function isMobileDevice() {
    return window.matchMedia("(max-width: 768px)").matches;
}

// Add functionality for mobile devices to allow clicking on back to flip back
function updateFlipCardBehavior() {
    document.querySelectorAll('.flip-card').forEach(card => {
        const innerCard = card.querySelector('.flip-card-inner');
        const front = card.querySelector('.flip-card-front');
        const back = card.querySelector('.flip-card-back');

        if (isMobileDevice()) {
            // On mobile, handle clicks on both front and back to toggle flip
            front.addEventListener('click', () => {
                innerCard.classList.add('is-flipped');
            });
            back.addEventListener('click', () => {
                innerCard.classList.remove('is-flipped');
            });
        } else {
            // Ensure the event listener is removed for non-mobile devices
            // since they use CSS hover instead
            front.removeEventListener('click', () => {
                innerCard.classList.add('is-flipped');
            });
            back.removeEventListener('click', () => {
                innerCard.classList.remove('is-flipped');
            });
        }
    });
}

// Initialize or update the behavior on load and resize
updateFlipCardBehavior();
window.addEventListener('resize', updateFlipCardBehavior);

