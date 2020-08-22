//Date Code
let now = new Date();

let appDate = document.querySelector("#date");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

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
let month = months[now.getMonth()];

document.getElementById(
  "date"
).innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;
////end of date code

//fahrenheit conversion/link

let fahrenheitLink = document.querySelector("#fahrenheit-link");

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temp");

  let convertedTemp = temperatureElement.innerHTML;

  convertedTemp = Number(convertedTemp);

  temperatureElement.innerHTML = Math.round((convertedTemp * 9) / 5 + 32);
}

fahrenheitLink.addEventListener("click", convertToFahrenheit);

// end of fahrenheit conversion/link

//celcius link
let celsiusLink = document.querySelector("#celsius-link");

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temp");

  let convertedTempC = temperatureElement.innerHTML;

  convertedTempC = Number(convertedTempC);

  temperatureElement.innerHTML = Math.round((convertedTempC - 32) * 0.5556);
}

celsiusLink.addEventListener("click", convertToCelsius);

// end celcius link

//weather API in search + change to city and temperature
let search = document.querySelector("#city-search-button");

function showTemperature(response) {
  console.log(response.data.main.temp);
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);

  //let apiDescription = response.data.main.clouds;
  //let apiPrecipitation = Math.round(response.data.main.temp);
  //let apiHumidity = Math.round(response.data.main.humidity);
  //let apiWind = Math.round(response.data.main.temp);

  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function defaultSearch(cityInput) {
  let apiKey = "e147c39d271876136a14c616f5bc4feb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-input").value;

  search(cityInput);
}

search.addEventListener("submit", handleSubmit);

defaultSearch("New York");
