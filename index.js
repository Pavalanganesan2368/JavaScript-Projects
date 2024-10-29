const clickButton = document.querySelector('#clickButton');
const getResult = document.querySelector('#getResult');
const resetButton = document.querySelector('#resetButton');

clickButton.addEventListener('click', () => {
    const textInput = Number(document.querySelector('#textInput').value);
    
    if (isNaN(textInput)) {
        getResult.textContent="INVALID NUMBER";
    } else {
        let calculate = textInput * 2.54;
        getResult.textContent = `${calculate.toFixed(0)} CM`;  
    }
});

resetButton.addEventListener('click', () => {
    document.getElementById('textInput').value = 0;
    getResult.textContent = `0 CM`;
});