const userInput = document.querySelector("#date");

userInput.max = new Date().toISOString().split("T")[0];

const calculateAge = document.querySelector("#calculate");

calculateAge.addEventListener("click", () => {
    const result = document.querySelector("#result");
    let birthDate = new Date(userInput.value);

    let date1 = birthDate.getDate();
    let month1 = birthDate.getMonth() + 1; 
    let year1 = birthDate.getFullYear();

    let todayDate = new Date();

    let date2 = todayDate.getDate();
    let month2 = todayDate.getMonth() + 1;
    let year2 = todayDate.getFullYear();

    let date3, month3, year3;

    year3 = year2 - year1;

    if ((isNaN(year3) && isNaN (month3) && isNaN(year3)) || (date3 === 0 || month3 === 0 || year3 === 0)) {
        alert("You Didn't Enter the Date of Birth!");
        return;
    }

    if (month2 >= month1) {
        month3 = month2 - month1;
    } else {
        year3--;
        month3 = 12 + month2 - month1;
    }

    if (date2 >= date1) {
        date3 = date2 - date1;
    } else {
        month3--;
        date3 = getDaysInMonth(year1, month1) + date2 - date1;
    }

    if (month3 < 0) {
        month3 = 11;
        year3--;
    }

    result.innerHTML = `You are ${year3} years. ${month3} months and ${date3} days old`;
    
})

function getDaysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}