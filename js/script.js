const port = "https://smart-feedback-form-backend-production.up.railway.app";
const dataKey = "feedback-data-xyz";

document
    .getElementById("feedbackForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const rating = Number(
            document.querySelector('input[name="rating"]:checked')?.value || 4,
        );

        const source = document.getElementById("source").value;

        const features = [];
        document.querySelectorAll(".options input:checked").forEach((cb) => {
            features.push(cb.value);
        });

        const message = document.getElementById("feedback").value;

        const data = {
            name,
            email,
            rating,
            source,
            likedFeatures: features,
            message,
        };

        disableForm();

        fetch(port + "/feedback/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Request failed.");
                return response.json();
            })
            .then((responseData) => {
                localStorage.setItem(dataKey, JSON.stringify(responseData));
                alert("Feedback submitted!");
                enableForm();
                document.getElementById("feedbackForm").reset();
                window.location.href = "response.html";
            })
            .catch((error) => {
                alert("Not able to store the data.");
                console.error(error);
                enableForm();
            });
    });

function disableForm() {
    const form = document.querySelector("form");

    form.classList.add("disabled");

    form.querySelectorAll("input, button, select, textarea").forEach(
        (el) => (el.disabled = true),
    );
}

function enableForm() {
    const form = document.querySelector("form");

    form.classList.remove("disabled");

    form.querySelectorAll("input, button, select, textarea").forEach(
        (el) => (el.disabled = false),
    );
}
