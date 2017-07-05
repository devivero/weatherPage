const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?"//"https://uwpce-fortune-proxy.herokuapp.com/"
const form = document.getElementById("apiOptions")
// const apiURL = "https://uwpce-fortune-proxy.herokuapp.com/?format=html"
let debug = null

function handleSubmit () {
  event.preventDefault()
  console.log(form)


  /*
  // get form values
  let values = {format: form.format.value}
  // serialize them into a query string
  let queryString = queryBuilder(values)
  // call getQuote with the query string
  */
  getWeather(queryString)
}

function getWeather (queryString) {
  let request = new XMLHttpRequest()

  // starts talk to API - 3 params
  // request method, url, (optional) async flag (default true)
  request.open("GET", apiURL + queryString, true)

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
  request.error = function (errorObject) {
    console.log("broken :(")
    console.log(errorObject)
  }

  // send the request!
  request.send()
}

function queryBuilder(queryObj){
  let holder = []
  // loop through queryObj key value pairs
  for(let key in queryObj){
    // turn each one into "key=value"
    let convert = `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`
    // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
    holder.push(convert)
  }
  // concatenate the pairs together, with & between
  let longString = holder.join("&")
  // prepend a ? to concatenated string, return
  return `?${longString}`
}

// document.addEventListener("DOMContentLoaded", function () {
//   let btnQuote = document.querySelector("button")
//   btnQuote.addEventListener("click", getQuote)
// })
