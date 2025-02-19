document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".numbers");
    const inputNumber = document.getElementById("input-number");
    const equalToButton = document.getElementById("equalTo-button");
    const clearButton = document.getElementById("clear-button");

    // Event listener for number and operator buttons
    for ( let i = 0; i < buttons.length; i++ ) {
        buttons[i].addEventListener( "click", (e) => {
            const value = e.target.innerText;
            if ( value !== "=" && value !== "C") {
                inputNumber.value += value;
            }
        });
    }

    // Function to evaluate the expression safely
    function equalToFunction() {
        try {
            inputNumber.value = new Function("return " + inputNumber.value)();
        } catch {
            inputNumber.value = "Math Error";
        }
    }

    // Add event listener for equal button
    equalToButton.addEventListener("click", equalToFunction);

    // Add event listener for clear button
    clearButton.addEventListener("click", () => {
        inputNumber.value = "";
    });
});