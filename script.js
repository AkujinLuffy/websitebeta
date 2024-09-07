document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
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
