const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.querySelector("#strength-label");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword () {
    const length = Number(lengthSlider.value);
    const includeUpperCase = uppercaseCheckbox.checked;
    const includeLowerCase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if (!includeLowerCase && !includeUpperCase && !includeNumbers && !includeSymbols) {
        alert('You must select atleast one checked value!');
        return;
    }

    const newPassword = createRandomPassword(length, includeLowerCase, includeNumbers, includeUpperCase, includeSymbols);
    passwordInput.value = newPassword;
    createStrengthMeter(newPassword);
}

function createRandomPassword (length, includeLowerCase, includeNumbers, includeUpperCase, includeSymbols) {
    let allCharacters = "";

    if (includeLowerCase) allCharacters += lowercaseLetters;
    if (includeUpperCase) allCharacters += uppercaseLetters;
    if (includeNumbers) allCharacters += numberCharacters;
    if (includeSymbols) allCharacters += symbolCharacters;
    

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

function createStrengthMeter (password) {
    const newPasswordLength = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strengthScore = 0;
    strengthScore += Math.min((newPasswordLength * 2), 40);

    if (hasUpperCase) strengthScore += 15;
    if (hasLowerCase) strengthScore += 15;
    if (hasNumber) strengthScore += 15;
    if (hasSymbol) strengthScore += 15;

    if (newPasswordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }

    const safeScore = Math.max(5, Math.min(100, strengthScore));
    strengthBar.style.width = `${safeScore}%`;

    let strengthLabelText = "";
    let barColor = "";

    if (strengthScore < 40) {
        barColor = "#fc8181";
        strengthLabelText = "Weak";
    } else if (strengthScore < 60) {
        barColor = "#fdb38d";
        strengthLabelText = "Medium";
    } else if (strengthScore < 80) {
        barColor = "#68d391";
        strengthLabelText = "Strong";
    } else {
        barColor = "#22e392";
        strengthLabelText = "Very Strong";
    }

    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strengthLabelText;

}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
    if (!passwordInput.value) return;


    navigator.clipboard.writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch(() => alert("Could not copy a clipboard"));
});

function showCopySuccess () {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#48bb78";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    },1500)
}