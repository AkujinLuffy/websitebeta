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
