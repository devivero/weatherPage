const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?"//"https://uwpce-fortune-proxy.herokuapp.com/"
//const form = document.getElementById("apiOptions")
let debug = null

function wow(){
  // get user's location from the browser
  navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
}
function geolocSuccess(position){
  //const newPos = {lat: position.coords.latitude, lng: position.coords.longitude};
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let newPosString = "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&APPID=32f2896d2c86b6cab0880ccfda804d0c";
  getWeather(newPosString);
}

// callback for no success getting location from user's browser
function geolocError(){
  console.log("Error getting user's location :(");
  let weatherDiv = document.getElementById("weather")
  weatherDiv.innerHTML = "Error getting user's location :("
}

function getWeather (queryString) {
  let request = new XMLHttpRequest()
  let location = queryString

  if (queryString == "seattle"){
    location = "lat=47.6762&lon=-122.3182&units=imperial&APPID=32f2896d2c86b6cab0880ccfda804d0c"
  } else if (queryString == "london"){
    location = "lat=51.5074&lon=0.1278&units=imperial&APPID=32f2896d2c86b6cab0880ccfda804d0c"
  } 

  // starts talk to API - 3 params
  // request method, url, (optional) async flag (default true)
  request.open("GET", apiURL + location, true)

  // fires when the request is complete
  // long term - I want to update the DOM
  request.onload = function () {
    let weatherDiv = document.getElementById("weather")
    let response = JSON.parse(request.response)
    console.log(response.main.temp)

    // debug = response
    weatherDiv.innerHTML =
    "Temperature: " + Math.round(response.main.temp) + ' F ' +
    " | Low Temperature: " + Math.round(response.main.temp_min) + ' F ' +
    " | High Temperature: " + Math.round(response.main.temp_max) + ' F ' +
    " | Humidity: " + response.main.humidity + '%'
  }

  // fires if something goes wrong
  request.onerror = function (errorObject) {
    console.log("broken :(")
    console.log(errorObject)
    let weatherDiv = document.getElementById("weather")
    weatherDiv.innerHTML = "broken :("
  }

  // send the request!
  request.send()
}
