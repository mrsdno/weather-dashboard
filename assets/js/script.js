var userFormEl = document.querySelector("#user-form");
var selectedCityEl = document.querySelector(".selected-city-container");
var cityStateEl = document.querySelector("#location");
var apiKey = "e53b451ac79065e81383f7950853a84e"
var oneDayEl = document.querySelector("#one-day");
var twoDayEl = document.querySelector("#two-day");
var threeDayEl = document.querySelector("#three-day");
var fourDayEl = document.querySelector("#four-day");
var fiveDayEl = document.querySelector("#five-day");
var savedCitiesEl = document.querySelector(".saved-cities-container");
var saveCityBtn = document.querySelector("#save-btn");
var city = "";
var storedCityNames = [];
var currentUVEl = document.createElement("p");

var getLatLon = function(location) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=" + apiKey;
    if (location) {
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
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    //clear old content

    var cityStateSpaces = cityStateEl.value.trim();
    var cityState = cityStateSpaces.split(' ').join('');

    if (cityState) {
        getLatLon(cityState);

        // clear old data
        cityStateEl.value="";
        selectedCityEl.textContent = "";
        oneDayEl.textContent = "";
        twoDayEl.textContent = "";
        threeDayEl.textContent = "";
        fourDayEl.textContent = "";
        fiveDayEl.textContent = "";
    }
}

var getWeatherData = function(city) {
    var location = city;

    if(location.length >= 1) {
        city = location[0].name;
        var lat = location[0].lat;
        var lon = location[0].lon;
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,daily&appid=" + apiKey;

        fetch(apiUrl).
        then(function(response) {
            if (response.ok) {
                response.json().then(function(response){
                    displayWeatherData(response, city);
                })
            }
            else {
                alert("Error: City not found.");
            }
        })
        .catch(function(error){
            alert("Error: Something Went Wrong");
        })
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



var displayWeatherData = function(response, city) {
    // create elements to hold data
    var currentCityEl = document.createElement("h2");
    var currentDateEl = document.createElement("h2");
    var currentIconEl = document.createElement("img");
    var currentDescriptionEl = document.createElement("span");
    var currentTempEl = document.createElement("p");
    var currentWindEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    // note that I declared UV index globally so I can use it later

    
    // format data appropiately
    var currentDate = moment.unix(response.current.dt).format("MM/DD/YYYY");
    var currentTemp = Math.round(response.current.temp);

    // fill elements with appropiate data
    currentCityEl.textContent = city;
    currentDateEl.textContent = " " + currentDate;
    currentIconEl.setAttribute("src", "./assets/img/" + response.current.weather[0].icon + ".png")
    currentDescriptionEl.textContent = response.current.weather[0].description
    currentTempEl.textContent = "Current Temperature: " + currentTemp + "°F";
    currentWindEl.textContent = "Current Wind Speed: " + response.current.wind_speed + " mph";
    currentHumidityEl.textContent = "Current Humidity: " + response.current.humidity + "%";
    currentUVEl.textContent = "Current UV-index: " + response.current.uvi;

    // append elements to page
    selectedCityEl.appendChild(currentCityEl);
    selectedCityEl.appendChild(currentDateEl);
    selectedCityEl.appendChild(currentIconEl);
    selectedCityEl.appendChild(currentDescriptionEl);
    selectedCityEl.appendChild(currentTempEl);
    selectedCityEl.appendChild(currentWindEl);
    selectedCityEl.appendChild(currentHumidityEl);
    selectedCityEl.appendChild(currentUVEl);

    // add attribute to city element to select text later
    currentCityEl.setAttribute("id", "city-name");

    // format UV index
    var uvIndex = response.current.uvi;

    uvIndexColor(uvIndex);
    
}

var uvIndexColor = function(uvIndex) {
    console.log(uvIndex);
    if(uvIndex <= 2) {
        currentUVEl.className = "";
        currentUVEl.classList.add("badge", "badge-success");
    }
    else if (uvIndex >2 && uvIndex <= 7) {
        currentUVEl.className = "";
        currentUVEl.classList.add("badge", "badge-warning");
    }
    else if (uvIndex > 7) {
        currentUVEl.className = "";
        currentUVEl.classList.add("badge", "badge-danger");
    }
}

var displayForcastData = function(response) {
    // 1 day 
    // create elements to hold data
    var oneDayDateEl = document.createElement("h3");
    var oneDayIconEl = document.createElement("img");
    var oneDayTempEl = document.createElement("p");
    var oneDayWindEl = document.createElement("p");
    var oneDayHumidityEl = document.createElement("p");

    //format date and round temp and round temp 
    var oneDayDate = moment.unix(response.list[4].dt).format("MM/DD/YY");
    var oneDayTemp = Math.round(response.list[4].main.temp);

    oneDayDateEl.textContent = oneDayDate;
    oneDayIconEl.setAttribute("src", "./assets/img/" + response.list[4].weather[0].icon + ".png");
    oneDayTempEl.textContent = "Temp: " + oneDayTemp + "°F";
    oneDayWindEl.textContent = "Wind: " + response.list[4].wind.speed + " mph";
    oneDayHumidityEl.textContent = "Humidity: " + response.list[4].main.humidity + "%";

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

    // format date and round temp
    var twoDayDate = moment.unix(response.list[12].dt).format("MM/DD/YY");
    var twoDayTemp = Math.round(response.list[12].main.temp);

    twoDayDateEl.textContent = twoDayDate;
    twoDayIconEl.setAttribute("src", "./assets/img/" + response.list[12].weather[0].icon + ".png");
    twoDayTempEl.textContent = "Temp: " + twoDayTemp + "°F";
    twoDayWindEl.textContent = "Wind: " + response.list[12].wind.speed + " mph";
    twoDayHumidityEl.textContent = "Humidity: " + response.list[12].main.humidity + "%";

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

    //format date and round temp
    var threeDayDate = moment.unix(response.list[20].dt).format("MM/DD/YY");
    var threeDayTemp = Math.round(response.list[20].main.temp);

    threeDayDateEl.textContent = threeDayDate;
    threeDayIconEl.setAttribute("src", "./assets/img/" + response.list[20].weather[0].icon + ".png");
    threeDayTempEl.textContent = "Temp: " + threeDayTemp + "°F";
    threeDayWindEl.textContent = "Wind: " + response.list[20].wind.speed + " mph";
    threeDayHumidityEl.textContent = "Humidity: " + response.list[20].main.humidity + "%";

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

    //format date and round temp
    var fourDayDate = moment.unix(response.list[28].dt).format("MM/DD/YY");
    var fourDayTemp = Math.round(response.list[28].main.temp);

    fourDayDateEl.textContent = fourDayDate;
    fourDayIconEl.setAttribute("src", "./assets/img/" + response.list[28].weather[0].icon + ".png");
    fourDayTempEl.textContent = "Temp: " + fourDayTemp + "°F";
    fourDayWindEl.textContent = "Wind: " + response.list[28].wind.speed + " mph";
    fourDayHumidityEl.textContent = "Humidity: " + response.list[28].main.humidity + "%";

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

    //format date and round temp
    var fiveDayDate = moment.unix(response.list[36].dt).format("MM/DD/YY");
    var fiveDayTemp = Math.round(response.list[36].main.temp);

    fiveDayDateEl.textContent = fiveDayDate;
    fiveDayIconEl.setAttribute("src", "./assets/img/" + response.list[36].weather[0].icon + ".png");
    fiveDayTempEl.textContent = "Temp: " + fiveDayTemp + "°F";
    fiveDayWindEl.textContent = "Wind: " + response.list[36].wind.speed + " mph";
    fiveDayHumidityEl.textContent = "Humidity: " + response.list[36].main.humidity + "%";

    fiveDayEl.appendChild(fiveDayDateEl);
    fiveDayEl.appendChild(fiveDayIconEl);
    fiveDayEl.appendChild(fiveDayTempEl);
    fiveDayEl.appendChild(fiveDayWindEl);
    fiveDayEl.appendChild(fiveDayHumidityEl);

    saveCityBtn.classList.remove("display-none");
}

var saveCity = function(city) {

    // get the city name from the current weather display
    var cityName = document.querySelector("#city-name")
    var newCity = cityName.textContent;


    // save this city name to city name object in local storage
    // but first check if there is already something saved
    if (localStorage.cities) {
        var storedCityNames = localStorage.getItem("cities");
        storedCityNames = JSON.parse(storedCityNames);
    }

    if (storedCityNames){
        for(i=0; i < storedCityNames.length; i++){
            var newCityExists = false;
            for(y=0; y < storedCityNames.length; y++){
                if(newCity == storedCityNames[y]) {
                    newCityExists= true;
                }
            }

        if (newCityExists === false) {
            storedCityNames = storedCityNames.concat(newCity);
            console.log(storedCityNames);
            localStorage.setItem('cities', JSON.stringify(storedCityNames));

            // create a button for this city name and append to container
            var savedCityBtn = document.createElement("button");
            savedCityBtn.innerHTML = cityName.textContent;
            savedCitiesEl.appendChild(savedCityBtn);
            savedCityBtn.className = "city-btn";
        
            var newCity = cityName.textContent;
            savedCityBtn.setAttribute("data-city", newCity);
            break;
        }

        else if (newCityExists === true) {

            alert("You already have this city saved!");
            break;
        }
        
    }
    saveCityBtn.classList.add("display-none");
}
    
    // if there isnt something saved set up an object that we will save to
    else {
        var storeCity = [];
        storeCity.push(newCity);
        localStorage.setItem('cities', JSON.stringify(storeCity));

        // create a button for this city name and append to container
        var savedCityBtn = document.createElement("button");
        savedCityBtn.innerHTML = cityName.textContent;
        savedCitiesEl.appendChild(savedCityBtn);
        savedCityBtn.className = "city-btn";
        savedCityBtn.setAttribute("data-city", newCity);
    }
    
}

var showSavedCities = function() {

    var storedCityNames = JSON.parse(localStorage.getItem("cities"));
    if (storedCityNames){
        for(i=0; i < storedCityNames.length; i++){
            console.log(storedCityNames[i])
            // create a button for this city name and append to container
            var savedCityBtn = document.createElement("button");
            savedCityBtn.innerHTML = storedCityNames[i];
            savedCitiesEl.appendChild(savedCityBtn);
            savedCityBtn.className = "city-btn";
            savedCityBtn.setAttribute("data-city", storedCityNames[i]);
        }
    }
}


showSavedCities();

userFormEl.addEventListener("click", formSubmitHandler);

saveCityBtn.addEventListener("click", saveCity);

savedCitiesEl.addEventListener("click", function(event){
    event.preventDefault();
    var savedCityBtnClick = event.target.dataset.city;
    console.log(savedCityBtnClick);

    // clear old data
    cityStateEl.value="";
    selectedCityEl.textContent = "";
    oneDayEl.textContent = "";
    twoDayEl.textContent = "";
    threeDayEl.textContent = "";
    fourDayEl.textContent = "";
    fiveDayEl.textContent = "";

    getLatLon(savedCityBtnClick);

})

// Temp
// Wind
// Humidity