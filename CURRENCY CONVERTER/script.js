const converterForm = document.querySelector('#converter-form');
const resultSection = document.querySelector('#result-section');

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertButton = document.querySelector('.button-convert'); 


converterForm.addEventListener("submit", (e) => {
     convertCurrency(e);
});
convertButton.addEventListener("click", convertTheCurrency);

async function convertTheCurrency() {
     try {
          const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
          const data = await response.json();
               
          const currencyOptions = Object.keys(data.rates);
          currencyOptions.forEach((currency) => {
               const option1 = document.createElement("option");
               option1.value = currency;
               option1.textContent = currency;
               fromCurrencySelect.appendChild(option1);  
               
               const option2 = document.createElement("option");
               option2.value = currency;
               option2.textContent = currency;
               toCurrencySelect.appendChild(option2);  
          });
     } catch (error) {
          console.log(error.message);
     }
}

async function convertCurrency(e) {
     e.preventDefault();
     const amountIn = Number(amountInput.value);
     const fromCurrencyValue = fromCurrencySelect.value;
     const toCurrencyValue = toCurrencySelect.value;

     if (!amountIn || amountIn < 0) {
          alert(`Please Enter Valid Number`);
          return;
     }

     const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
     const data = await response.json();

     const rate = data.rates[toCurrencyValue];
     const convertedAmount = Number(amountIn * rate).toFixed(2);

     resultSection.textContent = `${amountIn} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}

convertTheCurrency();