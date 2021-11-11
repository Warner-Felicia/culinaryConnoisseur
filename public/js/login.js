const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


const togglePasswordBtn = document.querySelectorAll('.passwordToggle');

togglePasswordBtn.forEach(btn => {
    btn.addEventListener('click',togglePassword);
});

function togglePassword() {
    const passwordInput = this.previousSibling.previousSibling;
    type = passwordInput.type;
    if (type === 'password') {
        passwordInput.type = 'text';
        this.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        this.textContent = 'Show Password';
    }
}
