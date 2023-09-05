//Time Update

let currentTime = document.querySelector("#current-time");
let now = new Date();
let currentHour = now.getHours();
let currentMinute = ("0" + now.getMinutes()).slice(-2);
let clock = `${currentHour}:${currentMinute}`;
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getUTCFullYear();
currentTime.innerHTML = `${clock}, ${currentDay} ${currentMonth} ${currentYear}`;

//Search Engine

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastElement.innerHTML += `<div class="col-2">
              <strong class="days">${formatDay(forecastDay.dt)}</strong>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="${
        forecastDay.weather[0].description
      }" class="days-pic" />
              <p class="days-temp">
                <strong>${Math.round(forecastDay.temp.max)}°</strong>
                &nbsp; &nbsp; ${Math.round(forecastDay.temp.min)}°
              </p>
            </div>`;
    }
  });
}

function getForecast(coords) {
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showThisTemp(response) {
  let city = document.querySelector("#city");
  let cityInput = document
    .querySelector("#city-input")
    .value.trim()
    .toLowerCase();
  let description = document.querySelector("#description");
  let degree = document.querySelector("#degree");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let cityValue = document.querySelector("#city-input");
  let icon = document.querySelector("#main-icon");
  celsiusTemp = Math.round(response.data.main.temp);
  cityValue.value = "";
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  degree.innerHTML = celsiusTemp;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "817319571060895ed44fa0a04b25296c";
  let cityInput = document
    .querySelector("#city-input")
    .value.trim()
    .toLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showThisTemp);
}

let apiKey = "817319571060895ed44fa0a04b25296c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showThisTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Changing Units

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitButton = document.querySelector("#fahrenheit");
  let celsiusButton = document.querySelector("#celsius");
  let degree = document.querySelector("#degree");
  fahrenheitButton.classList.add("selected");
  celsiusButton.classList.remove("selected");
  degree.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  fahrenheitButton.disabled = true;
  celsiusButton.disabled = false;
}

function changeToCelsius(event) {
  event.preventDefault();
  let fahrenheitButton = document.querySelector("#fahrenheit");
  let celsiusButton = document.querySelector("#celsius");
  let degree = document.querySelector("#degree");
  fahrenheitButton.classList.remove("selected");
  celsiusButton.classList.add("selected");
  degree.innerHTML = celsiusTemp;
  celsiusButton.disabled = true;
  fahrenheitButton.disabled = false;
}

let celsiusTemp = null;

let celsiusClick = document.querySelector("#celsius");
let fahrenheitClick = document.querySelector("#fahrenheit");

celsiusClick.disabled = true;

fahrenheitClick.addEventListener("click", changeToFahrenheit);
celsiusClick.addEventListener("click", changeToCelsius);

//Current Position and Weather

// function showTemp(response) {
//   let currentCity = response.data.name;
//   let city = document.querySelector("#city");
//   let description = document.querySelector("#description");
//   let degree = document.querySelector("#degree");
//   let humidity = document.querySelector("#humidity");
//   let wind = document.querySelector("#wind");
//   let icon = document.querySelector("#main-icon");
//   city.innerHTML = currentCity;
//   description.innerHTML = response.data.weather[0].description;
//   degree.innerHTML = Math.round(response.data.main.temp);
//   humidity.innerHTML = Math.round(response.data.main.humidity);
//   wind.innerHTML = Math.round(response.data.wind.speed);
//   icon.setAttribute(
//     "src",
//     `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//   );
// }

// function showPosition(position) {
//   let apiKey = "817319571060895ed44fa0a04b25296c";
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//   axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
// }

// function currentWeather(event) {
//   event.preventDefault();
//   let city = document.querySelector("#city-input");
//   city.value = "";
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// let currentSearch = document.querySelector("#current-weather");
// currentSearch.addEventListener("click", currentWeather);

// navigator.geolocation.getCurrentPosition(showPosition);
