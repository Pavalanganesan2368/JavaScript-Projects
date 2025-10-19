const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", (e) => {
    e.preventDefault();

    //GET FORM VALUES
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    // console.log(typeof amount);

    transactions.push({
        id : Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();
});

function updateTransactionList () {
    transactionListEl.innerHTML = "";

    const sortedTransaction = [...transactions].reverse();

    sortedTransaction.forEach((transaction) => {
        const transactionEl = createTransactionEl(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionEl (transaction) {
    const listEl = document.createElement("li");
    listEl.classList.add("transaction");
    listEl.classList.add(transaction.amount > 0 ? "income" : "expense");

    listEl.innerHTML = `
        <span>${transaction.description}</span>
        <span>${formatCurrency(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
        </span>
    `;

    return listEl;
}

function updateSummary () {
    const balance = transactions.reduce((prev, transaction) => {
        return prev + transaction.amount
    }, 0);

    const income = transactions.filter((transaction) => transaction.amount > 0)
    .reduce((prev, transaction) => prev + transaction.amount, 0);

     const expenses = transactions.filter((transaction) => transaction.amount < 0)
    .reduce((prev, transaction) => prev + transaction.amount, 0);

    // UPDATE UI

    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent = formatCurrency(income);
    expenseAmountEl.textContent = formatCurrency(expenses);
}

function formatCurrency (number) {
    return new Intl.NumberFormat("en-IN", {
        style : "currency",
        currency : "INR"
    }).format(number);
}

function removeTransaction (id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

// INITIAL RENDER 
updateSummary();
updateTransactionList();