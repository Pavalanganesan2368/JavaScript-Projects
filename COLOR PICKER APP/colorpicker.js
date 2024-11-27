const colorRandom = document.getElementById("colorRandom");
const colorChange = document.getElementById("colorChange");
const colorButton = document.getElementById("colorButton");

let colorDecimal = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

colorButton.addEventListener("click", () => {
    let color = "#";  // Initialize the color as a string for hex
    colorRandom.textContent = "";  // Clear previous content

    for(let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * 16);  // Generate random index for each digit
        color += colorDecimal[randomIndex];  // Append each random color part
    }

    colorRandom.textContent = color;  // Update the text with the final color
    randomColorChange(color);  // Pass the generated color to change the background
});

function randomColorChange(color) {
    colorChange.style.backgroundColor = color;  // Set the background color
}