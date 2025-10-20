const form = document.querySelector("#form");
const userName = document.querySelector("#username");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const userConfirmPassword = document.querySelector("#cpassword");

form.addEventListener("submit", (e) => {
    if (!validateInputs()) {
        e.preventDefault();
    }

    //alert("Form submitted successfully!");
});

function validateInputs() {
    const userNameValue = userName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const userPasswordValue = userPassword.value.trim();
    const userConfirmPasswordValue = userConfirmPassword.value.trim();

    let isValid = true;

    if (userNameValue === '') {
        setError(userName, "Username is Required");
        isValid = false;
    } else {
        setSuccess(userName);
    }

    if (userEmailValue === '') {
        setError(userEmail, 'Email is Required');
        isValid = false;
    } else if (!validateEmail(userEmailValue)) {
        setError(userEmail, 'Email Format is not Valid');
        isValid = false;
    } else {
        setSuccess(userEmail);
    }

    if (userPasswordValue === '') {
        setError(userPassword, "Password is Required");
        isValid = false;
    } else if (userPasswordValue.length < 8) {
        setError(userPassword, 'Password must be at least 8 characters long');
        isValid = false;
    } else {
        setSuccess(userPassword);
    }

    if (userConfirmPasswordValue === '') {
        setError(userConfirmPassword, 'Confirm Password is Required');
        isValid = false;
    } else if (userConfirmPasswordValue !== userPasswordValue) {
        setError(userConfirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess(userConfirmPassword);
    }

    return isValid;
}

function setError(element, message) {
    const inputGroup = element.parentElement;
    
    const errorElement = inputGroup.querySelector('.message');

    errorElement.innerText = message;

    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.message');

    errorElement.innerText = '';

    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
