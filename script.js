function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let minutes = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];

  let currentWeekday = days[currentDate.getDay()];
  let currentMonth = months[currentDate.getMonth()];
  let currentDay = currentDate.getDate();
  let currentYear = currentDate.getFullYear();
  let currentHour = currentDate.getHours();
  let currentMinute = minutes[currentDate.getMinutes()];

  let date = `${currentWeekday}, ${currentMonth} ${currentDay}, ${currentYear} <div> ${currentHour}:${currentMinute} </div>`;
  return date;
}

function getCity(response) {
  console.log(response);
  let currentCity = document.querySelector(".city");
  let newCity = response.data.name;
  currentCity.innerHTML = newCity;
}

function getTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cTemperature = document.querySelector(".temperature-actual");
  cTemperature.innerHTML = temperature;
}

function getWeather(response) {
  let weather = response.data.weather[0].main;
  let actualWeather = document.querySelector(".weather-today");
  actualWeather.innerHTML = weather;
}

function getHumidity(response) {
  let humidity = response.data.main.humidity;
  let actualHumidity = document.querySelector(".humidity");
  actualHumidity.innerHTML = ` ${humidity} %`;
}

function getWindSpeed(response) {
  let windSpeed = Math.round(response.data.wind.speed);
  let actualWindSpeed = document.querySelector(".windSpeed");
  actualWindSpeed.innerHTML = ` ${windSpeed} km/h`;
}

function getWeatherIcon(response) {
  let weatherIcon = response.data.weather[0].icon;
  let actualWeatherIcon = document.querySelector("#weatherIcon");
  actualWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  actualWeatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector(".city");
  let newCity = document.querySelector("#citySearch");
  currentCity.innerHTML = newCity.value;

  let apiKey = "0bf6ab793fb858c244e7221fd8975c04";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getTemperature);
  axios.get(apiURL).then(getWeather);
  axios.get(apiURL).then(getHumidity);
  axios.get(apiURL).then(getWindSpeed);
  axios.get(apiURL).then(getWeatherIcon);
  newCity.value = null;
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0bf6ab793fb858c244e7221fd8975c04";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getCity);
  axios.get(apiURL).then(getTemperature);
  axios.get(apiURL).then(getWeather);
  axios.get(apiURL).then(getHumidity);
  axios.get(apiURL).then(getWindSpeed);
  axios.get(apiURL).then(getWeatherIcon);
}

function findLocation(position) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentDate = new Date();
let actualTime = document.querySelector(".date-today");
actualTime.innerHTML = formatDate(currentDate);

let citySearch = document.querySelector("#new-city");
citySearch.addEventListener("submit", changeCity);
citySearch.addEventListener("click", changeCity);

let currentLocationSearch = document.querySelector("#locationButton");
currentLocationSearch.addEventListener("click", findLocation);
