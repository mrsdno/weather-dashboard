var selectedCityEl = document.querySelector(".selected-city-container");

var getWeatherData = function() {
    var lat = "-33.44"
    var lon = "-94.04"
    var apiKey = "e53b451ac79065e81383f7950853a84e"
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;

    fetch(apiUrl).
    then(function(response) {
        if (response.ok) {
            response.json().then(function(response){
                displayWeatherData(response);
            })
        }
        else {
            alert("Error: City not found.");
        }
    })
    .catch(function(error){
        alert("Unable to connect to GitHub");
    })
}

var displayWeatherData = function(response) {
    
    console.log(response);

    var currentTempEl = document.createElement("div");
    var currentWindEl = document.createElement("div");
    var currentHumidityEl = document.createElement("div");
    var currentUVEl = document.createElement("div");
    currentTempEl.textContent = "Current Temperature: " + response.current.temp;
    currentWindEl.textContent = "Current Wind Speed: " + response.current.wind_speed;
    currentHumidityEl.textContent = "Current Humidity: " + response.current.humidity;
    currentUVEl.textContent = "Current UV-index: " + response.current.uvi;
    selectedCityEl.appendChild(currentTempEl)
    selectedCityEl.appendChild(currentWindEl)
    selectedCityEl.appendChild(currentHumidityEl)
    selectedCityEl.appendChild(currentUVEl)
}

getWeatherData();


// Temp
// Wind
// Humidity
// UV Index 