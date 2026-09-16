/* =========================================
   PG GLAM STUDIO
   BOOKING SCRIPT
========================================= */


/* =========================================
   GET FORM ELEMENTS
========================================= */

const dateInput = document.querySelector("#date");
const form = document.querySelector("#booking-form");
const bookingMessage = document.querySelector("#booking-message");


/* =========================================
   GET TODAY'S LOCAL DATE
========================================= */

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

const todayString =
    `${year}-${month}-${day}`;


/* =========================================
   PREVENT PAST DATES
========================================= */

dateInput.setAttribute(
    "min",
    todayString
);


/* =========================================
   BOOKING FORM SUBMISSION
========================================= */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* ================================
           GET FORM VALUES
        ================================= */

        const name =
            document.querySelector("#name")
                .value.trim();

        const email =
            document.querySelector("#email")
                .value.trim();

        const phone =
            document.querySelector("#phone")
                .value.trim();

        const service =
            document.querySelector("#service")
                .value;

        const date =
            document.querySelector("#date")
                .value;

        const time =
            document.querySelector("#time")
                .value;

        const message =
            document.querySelector("#message")
                .value.trim();


        /* ================================
           CHECK REQUIRED FIELDS
        ================================= */

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            service === "" ||
            date === "" ||
            time === ""
        ) {

            bookingMessage.textContent =
                "Please complete all required booking fields.";

            return;
        }


        /* ================================
           CHECK DATE
        ================================= */

        if (date < todayString) {

            bookingMessage.textContent =
                "Please choose today or a future date.";

            return;
        }


        /* ================================
           CHECK EMAIL
        ================================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            bookingMessage.textContent =
                "Please enter a valid email address.";

            return;
        }


        /* ================================
           SHOW SENDING MESSAGE
        ================================= */

        bookingMessage.textContent =
            "Sending your appointment request...";


        /* ================================
           PREPARE FORM DATA
        ================================= */

        const formData =
            new FormData(form);


        /* ================================
           SEND TO FORMSPREE
        ================================= */

        try {

            const response =
                await fetch(
                    form.action,
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            /* ============================
               SUCCESS
            ============================ */

            if (response.ok) {

                bookingMessage.textContent =
                    "Thank you! Your appointment request has been received. We will contact you shortly.";

                form.reset();

                dateInput.setAttribute(
                    "min",
                    todayString
                );

            }


            /* ============================
               SERVER ERROR
            ============================ */

            else {

                bookingMessage.textContent =
                    "Sorry, there was a problem sending your request. Please try again.";

            }

        }


        /* ================================
           CONNECTION ERROR
        ================================= */

        catch (error) {

            bookingMessage.textContent =
                "Sorry, there was a connection problem. Please try again.";

            console.error(
                "Booking submission error:",
                error
            );

        }

    }
);