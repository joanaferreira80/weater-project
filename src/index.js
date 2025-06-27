function displayTemperature(response) {

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#current-city");
let descriptionElement = document.querySelector("#description");
let humidityElement =document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let iconElement = document.querySelector("#icon");

cityElement.innerHTML = response.data.city;
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
descriptionElement.innerHTML = response.data.condition.description;  
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
iconElement.innerHTML= `<img src="${response.data.condition.icon_url}"class="current-temperature-icon"/>`;

getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function searchCity (city){
  let apiKey = "t61c0cb24c8co6107fad0a63023aa3ea";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
 searchCity(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city){
  let apiKey="t61c0cb24c8co6107fad0a63023aa3ea";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {

  let days = response.data.daily;
  let forecastHtml="";
  days.forEach(function (day, index) {
    if (index < 5) {
    
    forecastHtml = forecastHtml +
    `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div >
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>`;
    }
           });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
searchCity("London");
