const dateInput = document.querySelector("#date");

const today = new Date().toISOString().split("T")[0];

dateInput.setAttribute("min", today);

const form = document.querySelector("#booking-form");
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const service = document.querySelector("#service").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    const message = document.querySelector("#message").value;

    const bookingMessage = document.querySelector("#booking-message");

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        service === "" ||
        date === "" ||
        time === ""
    ) {
        bookingMessage.textContent = "Please complete all booking fields.";
        return;
    }

    if (date < today) {
        bookingMessage.textContent = "Please choose today or a future date.";
        return;
    }

    bookingMessage.textContent = "Sending your appointment request...";

    const formData = new FormData(form);

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            bookingMessage.textContent =
                "Thank you! Your appointment request has been received. We will contact you shortly.";

            form.reset();

            dateInput.setAttribute("min", today);

        } else {

            bookingMessage.textContent =
                "Sorry, there was a problem sending your request. Please try again.";

        }

    } catch (error) {

        bookingMessage.textContent =
            "Sorry, there was a connection problem. Please try again.";

    }

});