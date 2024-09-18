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

document.getElementById('orderButton').onclick = function() {
    document.getElementById('orderModal').style.display = 'flex';
    calculatePrice();
    document.body.style.overflow = "hidden";
};

document.querySelector('.close').onclick = function() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = "auto";
};

const serviceButtons = document.querySelectorAll('.service-btn');
let selectedServices = new Set();

// Toggle service selection
serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (selectedServices.has(button.dataset.value)) {
            selectedServices.delete(button.dataset.value);
            button.classList.remove('active');
        } else {
            selectedServices.add(button.dataset.value);
            button.classList.add('active');
        }
        calculatePrice();
    });
});

// Calculate price based on selected services
function calculatePrice() {
    let totalPrice = selectedServices.size * 10; // 10 lev per service
    document.getElementById('priceDisplay').innerText = `Total Price: ${totalPrice} lev`;
}

document.getElementById('orderForm').onsubmit = function(event) {
    event.preventDefault();

    let date = document.getElementById('serviceDate').value;
    let time = document.getElementById('serviceTime').value;
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let comment = document.getElementById('comment').value;
    let paymentMethod = document.getElementById('paymentMethod').value;

    // Collect order details
    let orderDetails = {
        services: Array.from(selectedServices),
        date: date,
        time: time,
        name: name,
        address: address,
        phone: phone,
        email: email,
        comment: comment,
        paymentMethod: paymentMethod
    };

    // Simulate sending the order details
    console.log("Order submitted:", orderDetails);

    // Display a confirmation message
    alert("Your order has been submitted. Thank you!");

    // Close the modal and allow background scroll
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = "auto";
};
    
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

