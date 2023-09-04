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
  cityValue.value = "";
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  degree.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", response.data.weather[0].description);
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

  //Bonus Feature
  
// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let fahrenheitButton = document.querySelector("#fahrenheit");
//   let celsiusButton = document.querySelector("#celsius");
//   let degree = document.querySelector("#degree");
//   fahrenheitButton.classList.add("selected");
//   celsiusButton.classList.remove("selected");
//   degree.innerHTML = Math.round((degree.innerHTML * 9) / 5 + 32);
//   fahrenheitButton.disabled = true;
//   celsiusButton.disabled = false;
// }

// function changeToCelsius(event) {
//   event.preventDefault();
//   let fahrenheitButton = document.querySelector("#fahrenheit");
//   let celsiusButton = document.querySelector("#celsius");
//   let degree = document.querySelector("#degree");
//   fahrenheitButton.classList.remove("selected");
//   celsiusButton.classList.add("selected");
//   degree.innerHTML = Math.round(((degree.innerHTML - 32) * 5) / 9);
//   celsiusButton.disabled = true;
//   fahrenheitButton.disabled = false;
// }

// let celsiusClick = document.querySelector("#celsius");
// let fahrenheitClick = document.querySelector("#fahrenheit");

// fahrenheitClick.addEventListener("click", changeToFahrenheit);
// celsiusClick.addEventListener("click", changeToCelsius);
