document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            age: formData.get("age"),
            interest: formData.get("interest"),
            works: formData.getAll("works"),
            comments: formData.get("comments"),
        };

        const response = await fetch("http://127.0.0.1:3001/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(result => alert(result.message))
            .catch(error => console.error("Помилка:", error));
    });
});
