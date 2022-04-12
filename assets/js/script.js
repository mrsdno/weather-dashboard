var userFormEl = document.querySelector("#user-form");
var selectedCityEl = document.querySelector(".selected-city-container");
var cityStateEl = document.querySelector("#location");
var apiKey = "e53b451ac79065e81383f7950853a84e"
var oneDayEl = document.querySelector("#one-day");
var twoDayEl = document.querySelector("#two-day");
var threeDayEl = document.querySelector("#three-day");
var fourDayEl = document.querySelector("#four-day");
var fiveDayEl = document.querySelector("#five-day");


var getLatLon = function(location) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=" + apiKey;
    
    fetch(apiUrl).
    then(function(response) {
        if (response.ok) {
            response.json().then(function(response){
                var cityArray = response;
                console.log(cityArray);
                getWeatherData(cityArray);
                getForecastData(cityArray);
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

var getForecastData =function(city) {
    var location = city;

    if (location.length >=1) {
        var lat = location[0].lat;
        var lon = location[0].lon;   
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + apiKey;
        fetch(apiUrl).
        then(function(response) {
            if (response.ok) {
                response.json().then(function(response){
                    console.log(response);
                    displayForcastData(response);
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
    var currentDateEl = document.createElement("div");
    var currentTempEl = document.createElement("div");
    var currentWindEl = document.createElement("div");
    var currentHumidityEl = document.createElement("div");
    var currentUVEl = document.createElement("div");

    currentDateEl.textContent = "Current Date: " + response.current.dt;
    currentTempEl.textContent = "Current Temperature: " + response.current.temp;
    currentWindEl.textContent = "Current Wind Speed: " + response.current.wind_speed;
    currentHumidityEl.textContent = "Current Humidity: " + response.current.humidity;
    currentUVEl.textContent = "Current UV-index: " + response.current.uvi;

    selectedCityEl.appendChild(currentDateEl);
    selectedCityEl.appendChild(currentTempEl);
    selectedCityEl.appendChild(currentWindEl);
    selectedCityEl.appendChild(currentHumidityEl);
    selectedCityEl.appendChild(currentUVEl);
}

var displayForcastData = function(response) {
    // 1 day 
    var oneDayDateEl = document.createElement("div");
    var oneDayIconEl = document.createElement("div");
    var oneDayTempEl = document.createElement("div");
    var oneDayWindEl = document.createElement("div");
    var oneDayHumidityEl = document.createElement("div");

    oneDayDateEl.textContent = "Date: " + response.list[1].dt;
    oneDayIconEl.textContent = "Icon: " + response.list[1].weather[0].icon;
    oneDayTempEl.textContent = "Temp: " + response.list[1].main.temp;
    oneDayWindEl.textContent = "Wind: " + response.list[1].wind.speed;
    oneDayHumidityEl.textContent = "Humidity: " + response.list[1].main.humidity;

    oneDayEl.appendChild(oneDayDateEl);
    oneDayEl.appendChild(oneDayIconEl);
    oneDayEl.appendChild(oneDayTempEl);
    oneDayEl.appendChild(oneDayWindEl);
    oneDayEl.appendChild(oneDayHumidityEl);

    // 2 day
    var twoDayDateEl = document.createElement("div");
    var twoDayIconEl = document.createElement("div");
    var twoDayTempEl = document.createElement("div");
    var twoDayWindEl = document.createElement("div");
    var twoDayHumidityEl = document.createElement("div");

    twoDayDateEl.textContent = "Date: " + response.list[2].dt;
    twoDayIconEl.textContent = "Icon: " + response.list[2].weather[0].icon;
    twoDayTempEl.textContent = "Temp: " + response.list[2].main.temp;
    twoDayWindEl.textContent = "Wind: " + response.list[2].wind.speed;
    twoDayHumidityEl.textContent = "Humidity: " + response.list[2].main.humidity;

    twoDayEl.appendChild(twoDayDateEl);
    twoDayEl.appendChild(twoDayIconEl);
    twoDayEl.appendChild(twoDayTempEl);
    twoDayEl.appendChild(twoDayWindEl);
    twoDayEl.appendChild(twoDayHumidityEl);

    // 3 day
    var threeDayDateEl = document.createElement("div");
    var threeDayIconEl = document.createElement("div");
    var threeDayTempEl = document.createElement("div");
    var threeDayWindEl = document.createElement("div");
    var threeDayHumidityEl = document.createElement("div");

    threeDayDateEl.textContent = "Date: " + response.list[3].dt;
    threeDayIconEl.textContent = "Icon: " + response.list[3].weather[0].icon;
    threeDayTempEl.textContent = "Temp: " + response.list[3].main.temp;
    threeDayWindEl.textContent = "Wind: " + response.list[3].wind.speed;
    threeDayHumidityEl.textContent = "Humidity: " + response.list[3].main.humidity;

    threeDayEl.appendChild(threeDayDateEl);
    threeDayEl.appendChild(threeDayIconEl);
    threeDayEl.appendChild(threeDayTempEl);
    threeDayEl.appendChild(threeDayWindEl);
    threeDayEl.appendChild(threeDayHumidityEl);

    // 4 day
    var fourDayDateEl = document.createElement("div");
    var fourDayIconEl = document.createElement("div");
    var fourDayTempEl = document.createElement("div");
    var fourDayWindEl = document.createElement("div");
    var fourDayHumidityEl = document.createElement("div");

    fourDayDateEl.textContent = "Date: " + response.list[4].dt;
    fourDayIconEl.textContent = "Icon: " + response.list[4].weather[0].icon;
    fourDayTempEl.textContent = "Temp: " + response.list[4].main.temp;
    fourDayWindEl.textContent = "Wind: " + response.list[4].wind.speed;
    fourDayHumidityEl.textContent = "Humidity: " + response.list[4].main.humidity;

    fourDayEl.appendChild(fourDayDateEl);
    fourDayEl.appendChild(fourDayIconEl);
    fourDayEl.appendChild(fourDayTempEl);
    fourDayEl.appendChild(fourDayWindEl);
    fourDayEl.appendChild(fourDayHumidityEl);

    // 5 day
    var fiveDayDateEl = document.createElement("div");
    var fiveDayIconEl = document.createElement("div");
    var fiveDayTempEl = document.createElement("div");
    var fiveDayWindEl = document.createElement("div");
    var fiveDayHumidityEl = document.createElement("div");

    fiveDayDateEl.textContent = "Date: " + response.list[5].dt;
    fiveDayIconEl.textContent = "Icon: " + response.list[5].weather[0].icon;
    fiveDayTempEl.textContent = "Temp: " + response.list[5].main.temp;
    fiveDayWindEl.textContent = "Wind: " + response.list[5].wind.speed;
    fiveDayHumidityEl.textContent = "Humidity: " + response.list[5].main.humidity;

    fiveDayEl.appendChild(fiveDayDateEl);
    fiveDayEl.appendChild(fiveDayIconEl);
    fiveDayEl.appendChild(fiveDayTempEl);
    fiveDayEl.appendChild(fiveDayWindEl);
    fiveDayEl.appendChild(fiveDayHumidityEl);
}


userFormEl.addEventListener("click", formSubmitHandler);


// Temp
// Wind
// Humidity