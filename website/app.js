/* Global Variables */
const API_KEY = "574668d067832bea5ebff2d2a11bd7cf&units=imperial";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = +d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const updateUI = async () => {
  const repsonse = await fetch("/weather", { method: "GET" });
  try {
    const weather = await repsonse.json();
    document.querySelector("#date").innerHTML = `Date: ${weather.date}`;
    document.querySelector(
      "#temp"
    ).innerHTML = `Temprature: ${weather.temp} Degrees`;
    document.querySelector(
      "#content"
    ).innerHTML = `Your Feeling: ${weather.userResponse}`;
  } catch (e) {
    console.log(e);
  }
};

// Get the data from user
const handleButtonClick = () => {
  const zipCode = document.querySelector("#zip").value;
  getWeather(BASE_URL, zipCode, API_KEY)
    .then((temp) => {
      const userFeeling = document.querySelector("#feelings").value;
      const data = {
        temp: temp,
        date: newDate,
        userResponse: userFeeling,
      };
      addWeather("/addWeather", data);
    })
    .then(updateUI);
};

// Listen to button click
document
  .querySelector("#generate")
  .addEventListener("click", handleButtonClick);

// Get weather data
const getWeather = async (url, zipCode, key) => {
  const response = await fetch(`${url}?zip=${zipCode}&appid=${key}`, {
    method: "GET",
  });

  try {
    const data = await response.json();
    return data.main.temp;
  } catch (e) {
    console.log(e);
  }
};

// Send weather data to the server
const addWeather = async (path, data) => {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const weather = await response.json();
    return weather;
  } catch (e) {
    console.log(e);
  }
};
