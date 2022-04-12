var userFormEl = document.querySelector("#user-form");
var selectedCityEl = document.querySelector(".selected-city-container");
var cityStateEl = document.querySelector("#location");
var apiKey = "e53b451ac79065e81383f7950853a84e"


var getLatLon = function(location) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=" + apiKey;
    
    fetch(apiUrl).
    then(function(response) {
        if (response.ok) {
            response.json().then(function(response){
                console.log(response);
                var cityArray = response;
                console.log(cityArray);
                getWeatherData(cityArray);
            })
        }
        else {
            alert("Error: Something went wrong.")
        }
    })
    .catch(function(error) {
        alert("Unable to connect to weather data.")
    })
}


var formSubmitHandler = function (event) {
    event.preventDefault();

    //clear old content

    var cityStateSpaces = cityStateEl.value.trim();
    var cityState = cityStateSpaces.split(' ').join('');

    if (cityState) {
        getLatLon(cityState);
        cityStateEl.value="";
        selectedCityEl.textContent = ""

    }
}

var getWeatherData = function(city) {
    var location = city;

    if(location.length >= 1) {
        var lat = location[0].lat;
        var lon = location[0].lon;
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,daily&appid=" + apiKey;

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
    else {
        alert("Can't get weather data for this city."); 
    }
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


userFormEl.addEventListener("click", formSubmitHandler);


// Temp
// Wind
// Humidity
// UV Index 