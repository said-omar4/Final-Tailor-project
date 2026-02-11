// SELECT ELEMENTS
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let passwordInput = document.getElementById("password");
let form = document.getElementById("signupForm");

// ERROR ELEMENTS
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");
let passwordError = document.getElementById("passwordError");

// DISPLAY ELEMENTS
let dispName = document.getElementById("disp-name");
let dispEmail = document.getElementById("disp-email");
let dispPhone = document.getElementById("disp-phone");
let dispPass = document.getElementById("disp-pass");
let dispTime = document.getElementById("disp-time");
let userDisplay = document.getElementById("userDisplay");

// USERS ARRAY
let users = [];

// NAME VALIDATION
nameInput.addEventListener("input", (e) => {
    let text = e.target.value;

    // HIDE ERROR FIRST
    nameError.classList.remove("show");
    nameInput.classList.remove("invalid");

    if (text.length === 0) return;

    if (text.length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
        nameError.classList.add("show");
        nameInput.classList.add("invalid");
    }
    else if (text.length > 35) {
        nameError.textContent = "Name cannot exceed 35 characters";
        nameError.classList.add("show");
        nameInput.classList.add("invalid");
    }
    else if (/[0-9]/.test(text)) {
        nameError.textContent = "Name cannot contain numbers";
        nameError.classList.add("show");
        nameInput.classList.add("invalid");
    }
});

// PHONE VALIDATION
phoneInput.addEventListener("input", (e) => {
    let text = e.target.value.replace(/\D/g, '');

    phoneError.classList.remove("show");
    phoneInput.classList.remove("invalid");

    if (e.target.value.length === 0) return;

    if (text.length < 9) {
        phoneError.textContent = "Phone must be at least 9 digits";
        phoneError.classList.add("show");
        phoneInput.classList.add("invalid");
    }
    else if (text.length > 18) {
        phoneError.textContent = "Phone cannot exceed 18 digits";
        phoneError.classList.add("show");
        phoneInput.classList.add("invalid");
    }
    
});

// PASSWORD VALIDATION FUNCTION
function checkPassword(pass) {
    if (pass.length < 8) return "Must be at least 8 characters";
    if (!/[A-Z]/.test(pass)) return "Must contain uppercase letter";
    if (!/[a-z]/.test(pass)) return "Must contain lowercase letter";
    if (!/[0-9]/.test(pass)) return "Must contain number";
    if (!/[^A-Za-z0-9]/.test(pass)) return "Must contain special character";
    return "";
}

// PASSWORD INPUT
passwordInput.addEventListener("input", (e) => {
    let pass = e.target.value;

    passwordError.classList.remove("show");
    passwordInput.classList.remove("invalid");

    if (pass.length === 0) return;

    let error = checkPassword(pass);
    if (error) {
        passwordError.textContent = error;
        passwordError.classList.add("show");
        passwordInput.classList.add("invalid");
    }
});

// EMAIL VALIDATION
emailInput.addEventListener("input", (e) => {
    let email = e.target.value;

    emailError.classList.remove("show");
    emailInput.classList.remove("invalid");

    if (email.length === 0) return;

    if (!email.includes('@') || !email.includes('.')) {
        emailError.textContent = "Please enter a valid email";
        emailError.classList.add("show");
        emailInput.classList.add("invalid");
    }
});

// FORM SUBMIT
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // VALIDATE ALL FIELDS
    let nameValid = nameInput.value.length >= 3 && nameInput.value.length <= 35 && !/[0-9]/.test(nameInput.value);
    let emailValid = emailInput.value.includes('@') && emailInput.value.includes('.');
    let phoneDigits = phoneInput.value.replace(/\D/g, '');
    let phoneValid = phoneDigits.length >= 9 && phoneDigits.startsWith('61');
    let passwordValid = checkPassword(passwordInput.value) === "";

    if (nameValid && emailValid && phoneValid && passwordValid) {
        // CREATE USER
        let newUser = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
            time: new Date().toLocaleTimeString()
        };

        // ADD TO ARRAY
        users.push(newUser);

        // DISPLAY USER
        dispName.textContent = newUser.name;
        dispEmail.textContent = newUser.email;
        dispPhone.textContent = newUser.phone;
        dispPass.textContent = newUser.password;
        dispTime.textContent = newUser.time;
        userDisplay.classList.add("show");

        // RESET FORM
        form.reset();

        // HIDE ALL ERRORS
        [nameError, emailError, phoneError, passwordError].forEach(error => {
            error.classList.remove("show");
        });
    }
});