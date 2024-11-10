const weatherName = document.querySelector('#weatherName');
const weatherTemperature = document.querySelector('#weatherTemperature');
const weatherHumidity = document.querySelector('#weatherHumidity');
const weatherWind = document.querySelector('#weatherWind');
const weatherSearch = document.querySelector('#inputButton');

weatherSearch.addEventListener('click', () => {
  const img = document.createElement('img');
  img.setAttribute('id', 'weatherIcon');
  const containerImage = document.getElementsByClassName('container-image')[0];
  const weatherGetName = document.querySelector('#inputText');
  const weatherElements = document.querySelectorAll('.Weather');

  async function getAPI() {
    const APIKEY = "dea4aacad41943de9e361612241011";
    const location = weatherGetName.value;

    if (location === '') {
      img.src = '404.png';
      containerImage.innerHTML = ''; 
      containerImage.appendChild(img);
      weatherName.textContent = 'NOT FOUND!';
      weatherElements.forEach(el => el.style.display = "none");
      return;
    }

    try {
      const APIWeather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location}&aqi=no`);
      const weatherData = await APIWeather.json();

      const country = weatherData.location.country;
      weatherName.textContent = country;

      const temperature = weatherData.current.temp_c;
      weatherTemperature.textContent = `${temperature}°C`;

      const humidity = weatherData.current.humidity;
      weatherHumidity.textContent = `${humidity}%`;

      const wind = weatherData.current.wind_kph;
      weatherWind.textContent = `${wind}Km/h`;

      const iconUrl = weatherData.current.condition.icon;
      img.src = `http:${iconUrl}`;
      containerImage.innerHTML = ''; 
      containerImage.appendChild(img);

      weatherElements.forEach(el => el.style.display = "block");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherName.textContent = 'Error loading data';
    }
  }
  getAPI();
});