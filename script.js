document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const responseMessage = document.getElementById('response-message');

    if (!name || !email || !message) {
        responseMessage.textContent = 'Please fill in all fields.';
        responseMessage.className = 'error';
        return;
    }

    const formData = { name, email, message };

    try {
        const response = await fetch('https://contact-backend-fapy.onrender.com/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        console.log(response);

        const result = await response.json();

        if (result.success) {
            responseMessage.textContent = 'Thank you for your message!';
            responseMessage.className = 'success';
            document.getElementById('contact-form').reset();
        } else {
            responseMessage.textContent = result.message || 'An error occurred. Please try again.';
            responseMessage.className = 'error';
        }
    } catch (error) {
        responseMessage.textContent = 'Failed to connect to the server. Please try again later.';
        responseMessage.className = 'error';
    }
});