const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const toggleForm = document.getElementById('toggle-form');
const errorMessage = document.getElementById('error-message');
const fullNameField = document.getElementById('fullName');

let isSignUp = false;

toggleForm.addEventListener('click', () => {
    isSignUp = !isSignUp;
    formTitle.textContent = isSignUp ? 'Реєстрація' : 'Вхід';
    fullNameField.style.display = isSignUp ? 'block' : 'none';
    toggleForm.innerHTML = isSignUp
        ? 'Вже маєш обліковий запис? <a href="#">Вхід</a>'
        : "Не маєш облікового запису? <a href='#'>Реєстрація</a>";
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = fullNameField.value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (isSignUp && !fullName) {
        errorMessage.textContent = "Ім'я необхідне для реєстрації.";
        return;
    }

    if (!email || !password) {
        errorMessage.textContent = 'Усі поля мають бути заповнені.';
        return;
    }

    try {
        const response = await fetch(`https://travel-app-api.up.railway.app/api/v1/auth/${isSignUp ? 'sign-up' : 'sign-in'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(isSignUp ? { fullName, email, password } : { email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Виникла помилка');
        }

        alert(isSignUp ? 'Реєстрація успішна!' : 'Вхід успішний!');
        if (!isSignUp) {
            localStorage.setItem('token', result.token);
        }
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});