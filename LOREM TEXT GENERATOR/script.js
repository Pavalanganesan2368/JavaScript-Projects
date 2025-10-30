const inputNumber = document.querySelector("#input-number");
const inputButton = document.querySelector(".input-button");
const displayText = document.querySelector("#display-para");
const totalPara = document.querySelector("#total-para");

inputButton.addEventListener("click", () => {
    const inputNumberVal = Number(inputNumber.value);
    let randomText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, ante non convallis fermentum."
];

    let text = "";

    if (!inputNumberVal) {
        alert("Please enter the range number first");
        return;
    }

    for (let i = 0; i <= inputNumberVal; i++) {
        const randomNumber = Math.floor(Math.random() * randomText.length);
        text += randomText[randomNumber];
    }

    displayText.textContent = text;
    totalPara.textContent = `Total Paragraph : ${inputNumberVal}`;
});