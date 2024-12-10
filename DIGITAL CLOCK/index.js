const clockInput = document.querySelector('#clock-input');

function generateClock() {
  const clockDate = new Date();

  let getHour = clockDate.getHours();
  let getMinute = String(clockDate.getMinutes()).padStart(2, '0');
  let getSecond = String(clockDate.getSeconds()).padStart(2, '0');
  const period = getHour >= 12 ? 'PM' : 'AM';
  getHour = getHour % 12 || 12;
  
  clockInput.textContent = `${getHour} : ${getMinute} : ${getSecond} ${period}`;
}

setInterval(generateClock, 1000);
generateClock(); 