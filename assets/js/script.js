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
        oneDayEl.textContent = ""
        twoDayEl.textContent = ""
        threeDayEl.textContent = ""
        fourDayEl.textContent = ""
        fiveDayEl.textContent = ""


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
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
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
    // create elements to hold data
    var currentDateEl = document.createElement("h2");
    var currentIconEl = document.createElement("img");
    var currentDescriptionEl = document.createElement("span");
    var currentTempEl = document.createElement("p");
    var currentWindEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    var currentUVEl = document.createElement("p");
    
    // format date
    var currentDate = moment.unix(response.current.dt).format("MM/DD/YYYY");

    // fill elements with appropiate data
    currentDateEl.textContent = currentDate;
    currentIconEl.setAttribute("src", "./assets/img/" + response.current.weather[0].icon + ".png")
    currentDescriptionEl.textContent = response.current.weather[0].description
    currentTempEl.textContent = "Current Temperature: " + response.current.temp;
    currentWindEl.textContent = "Current Wind Speed: " + response.current.wind_speed;
    currentHumidityEl.textContent = "Current Humidity: " + response.current.humidity;
    currentUVEl.textContent = "Current UV-index: " + response.current.uvi;

    // append elements to page
    selectedCityEl.appendChild(currentDateEl);
    selectedCityEl.appendChild(currentIconEl);
    selectedCityEl.appendChild(currentDescriptionEl);
    selectedCityEl.appendChild(currentTempEl);
    selectedCityEl.appendChild(currentWindEl);
    selectedCityEl.appendChild(currentHumidityEl);
    selectedCityEl.appendChild(currentUVEl);
}

var displayForcastData = function(response) {
    // 1 day 
    // create elements to hold data
    var oneDayDateEl = document.createElement("h3");
    var oneDayIconEl = document.createElement("img");
    var oneDayTempEl = document.createElement("p");
    var oneDayWindEl = document.createElement("p");
    var oneDayHumidityEl = document.createElement("p");

    //format date
    var oneDayDate = moment.unix(response.list[4].dt).format("MM/DD/YY");

    oneDayDateEl.textContent = oneDayDate;
    oneDayIconEl.setAttribute("src", "./assets/img/" + response.list[4].weather[0].icon + ".png");
    oneDayTempEl.textContent = "Temp: " + response.list[4].main.temp;
    oneDayWindEl.textContent = "Wind: " + response.list[4].wind.speed;
    oneDayHumidityEl.textContent = "Humidity: " + response.list[4].main.humidity;

    oneDayEl.appendChild(oneDayDateEl);
    oneDayEl.appendChild(oneDayIconEl);
    oneDayEl.appendChild(oneDayTempEl);
    oneDayEl.appendChild(oneDayWindEl);
    oneDayEl.appendChild(oneDayHumidityEl);

    // 2 day
    var twoDayDateEl = document.createElement("h3");
    var twoDayIconEl = document.createElement("img");
    var twoDayTempEl = document.createElement("p");
    var twoDayWindEl = document.createElement("p");
    var twoDayHumidityEl = document.createElement("p");

    //format date
    var twoDayDate = moment.unix(response.list[12].dt).format("MM/DD/YY");

    twoDayDateEl.textContent = twoDayDate;
    twoDayIconEl.setAttribute("src", "./assets/img/" + response.list[12].weather[0].icon + ".png");
    twoDayTempEl.textContent = "Temp: " + response.list[12].main.temp;
    twoDayWindEl.textContent = "Wind: " + response.list[12].wind.speed;
    twoDayHumidityEl.textContent = "Humidity: " + response.list[12].main.humidity;

    twoDayEl.appendChild(twoDayDateEl);
    twoDayEl.appendChild(twoDayIconEl);
    twoDayEl.appendChild(twoDayTempEl);
    twoDayEl.appendChild(twoDayWindEl);
    twoDayEl.appendChild(twoDayHumidityEl);

    // 3 day
    var threeDayDateEl = document.createElement("h3");
    var threeDayIconEl = document.createElement("img");
    var threeDayTempEl = document.createElement("p");
    var threeDayWindEl = document.createElement("p");
    var threeDayHumidityEl = document.createElement("p");

    //format date
    var threeDayDate = moment.unix(response.list[20].dt).format("MM/DD/YY");

    threeDayDateEl.textContent = threeDayDate;
    threeDayIconEl.setAttribute("src", "./assets/img/" + response.list[20].weather[0].icon + ".png");
    threeDayTempEl.textContent = "Temp: " + response.list[20].main.temp;
    threeDayWindEl.textContent = "Wind: " + response.list[20].wind.speed;
    threeDayHumidityEl.textContent = "Humidity: " + response.list[20].main.humidity;

    threeDayEl.appendChild(threeDayDateEl);
    threeDayEl.appendChild(threeDayIconEl);
    threeDayEl.appendChild(threeDayTempEl);
    threeDayEl.appendChild(threeDayWindEl);
    threeDayEl.appendChild(threeDayHumidityEl);

    // 4 day
    var fourDayDateEl = document.createElement("h3");
    var fourDayIconEl = document.createElement("img");
    var fourDayTempEl = document.createElement("p");
    var fourDayWindEl = document.createElement("p");
    var fourDayHumidityEl = document.createElement("p");

    //format date
    var fourDayDate = moment.unix(response.list[28].dt).format("MM/DD/YY");

    fourDayDateEl.textContent = fourDayDate;
    fourDayIconEl.setAttribute("src", "./assets/img/" + response.list[28].weather[0].icon + ".png");
    fourDayTempEl.textContent = "Temp: " + response.list[28].main.temp;
    fourDayWindEl.textContent = "Wind: " + response.list[28].wind.speed;
    fourDayHumidityEl.textContent = "Humidity: " + response.list[28].main.humidity;

    fourDayEl.appendChild(fourDayDateEl);
    fourDayEl.appendChild(fourDayIconEl);
    fourDayEl.appendChild(fourDayTempEl);
    fourDayEl.appendChild(fourDayWindEl);
    fourDayEl.appendChild(fourDayHumidityEl);

    // 5 day
    var fiveDayDateEl = document.createElement("h3");
    var fiveDayIconEl = document.createElement("img");
    var fiveDayTempEl = document.createElement("p");
    var fiveDayWindEl = document.createElement("p");
    var fiveDayHumidityEl = document.createElement("p");

    //format date
    var fiveDayDate = moment.unix(response.list[36].dt).format("MM/DD/YY");

    fiveDayDateEl.textContent = fiveDayDate;
    fiveDayIconEl.setAttribute("src", "./assets/img/" + response.list[36].weather[0].icon + ".png");
    fiveDayTempEl.textContent = "Temp: " + response.list[36].main.temp;
    fiveDayWindEl.textContent = "Wind: " + response.list[36].wind.speed;
    fiveDayHumidityEl.textContent = "Humidity: " + response.list[36].main.humidity;

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