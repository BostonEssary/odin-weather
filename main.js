const KEY = '?key=0be96db5acc6427f81c173514230510'
const BASE_URL = 'https://api.weatherapi.com/v1'
const CURRENT_WEATHER = '/current.json'
const FUTURE_WEATHER = '/forecast.json'
let userLocation = '&q='
let fTemp = true
const area = document.querySelector('.location')
const temp = document.querySelector('.temp')
const submit = document.getElementById("submit")
const changeTempButton = document.querySelector('.change-temp')
const changeTempIcon = document.getElementById('change-temp-icon')
const formContainer = document.getElementById('form-container')
const weatherCard = document.getElementById("weather-card")
const condition = document.querySelector(".condition")
const conditionIcon = document.querySelector('.condition-icon')
const timeContainer = document.querySelector('.time')
const locationIcon = document.querySelector(".location-icon")
const clockIcon = document.querySelector(".clock-icon")
const highTemp = document.querySelector(".high-temp")
const lowTemp = document.querySelector(".low-temp")
const form = document.querySelector('.form')
const nav = document.getElementById('nav')



submit.addEventListener("click", function(e){
  e.preventDefault()
  fetchData()
  fetchForecastData()
  weatherCard.classList.remove("hidden")
})

changeTempButton.addEventListener("click", function(){
  if(fTemp === true){
    changeTempIcon.src = "icons/thermometer-glass-celsius.svg"
    fTemp = false
  }
  else{
    changeTempIcon.src = "icons/thermometer-glass-fahrenheit.svg"
    fTemp = true
  }
  console.log(fTemp)
})

function changeBGColorFahren(isDay){
  weatherCard.removeAttribute('class')
  if (isDay === 1){
    weatherCard.classList.add("sunny")
  }
  else{
    weatherCard.classList.add('cool-night')
  }
}



function changeBGColorCelsius(isDay){
  weatherCard.removeAttribute('class')
  if (isDay === 1){
    weatherCard.classList.add("sunny")
  }
  else{
    weatherCard.classList.add('cool-night')
  }
}

function changeIconDay(response){
  if(response.current.condition.text === "Sunny"){
    conditionIcon.src = "icons/sun-hot.svg"
  }
  else if(response.current.condition.text === "Partly cloudy"){
    conditionIcon.src = "icons/partly-cloudy-day.svg"
  }
  else if(response.current.condition.text === "Clear"){
    conditionIcon.src = "icons/clear-day.svg"
  }
  else if(response.current.condition.text === "Moderate rain"){
    conditionIcon.src = "icons/raindrops.svg"
  }
  else if(response.current.condition.text === "Mist" ){
    conditionIcon.src = "icons/mist.svg"
  }
  else if(response.current.condition.text === "Overcast" ){
    conditionIcon.src = "icons/overcast.svg"
  }
}

function changeIconNight(response){
  if(response.current.condition.text === "Sunny"){
    conditionIcon.src = "icons/starry-night.svg"
  }
  else if(response.current.condition.text === "Partly cloudy"){
    conditionIcon.src = "icons/partly-cloudy-night.svg"
  }
  else if(response.current.condition.text === "Clear"){
    conditionIcon.src = "icons/starry-night.svg"
  }
  else if(response.current.condition.text === "Moderate rain"){
    conditionIcon.src = "icons/raindrops.svg"
  }
  else if(response.current.condition.text === "Mist" ){
    conditionIcon.src = "icons/mist.svg"
  }
  else if(response.current.condition.text === "Overcast" ){
    conditionIcon.src = "icons/overcast.svg"
  }
  else if(response.current.condition.text === "Light rain"){
    conditionIcon.src = "icons/partly-cloudy-night-drizzle.svg"
  }
}



function converTime(time){
  let isAm = true
  let currentTime = time.substr(11)
  console.log(currentTime)
  let standDardTime = ''
  currentTime = currentTime.split(':')
  
  let hour = Number(currentTime[0])
  let minute = currentTime[1]

  console.log(currentTime)
  if (hour <= 12 && hour > 0){
    standDardTime = "" + hour
  }
  else if(hour > 12){
    standDardTime = '' + (hour - 12)
    isAm = false;
  }
  else if(hour === 0){
    standDardTime = "" + 12
  }

  if (isAm === true){
    standDardTime = standDardTime + (':' + minute) +' am'
  }
  else{
    standDardTime = standDardTime + (':' + minute) + ' pm'
  }

  return standDardTime
}

function fetchData(){
  
  let value = document.getElementById("zipcode").value
  let zip = userLocation.concat(value)
  fetch(`${BASE_URL}${CURRENT_WEATHER}${KEY}${zip}`, {mode: 'cors'})
  .then(function(response){
    return response.json()
  })
  .then(function(response) {

    let time = response.location.localtime
    timeContainer.textContent = converTime(time)
    console.log(response)
    
   
    area.textContent = response.location.name + ', ' + response.location.region
    condition.textContent = response.current.condition.text
    if(fTemp === true ){
      temp.textContent = Math.round(response.current.temp_f) + ' F°'
      if(response.current.is_day === 1){
        changeBGColorFahren(response.current.is_day)
        locationIcon.src = 'icons/location-svgrepo-com.svg'
        clockIcon.src = "icons/icons8-clock.svg"
        if(weatherCard.classList.contains("light-text")){
          weatherCard.classList.remove("light-text")
        }
      }
      else{
        locationIcon.src = 'icons/location-white.svg'
        clockIcon.src = "icons/clock-white.svg"
        changeBGColorFahren(response.current.is_day)
        weatherCard.classList.add("light-text")
      }
      

    }
    else{
      temp.textContent = Math.round(response.current.temp_c) + ' C°'
      if(response.current.is_day === 1) {
        changeBGColorCelsius(response.current.is_day)
        locationIcon.src = 'icons/location-svgrepo-com.svg'
        clockIcon.src = "icons/icons8-clock.svg"
        if(weatherCard.classList.contains("light-text")){
          weatherCard.classList.remove("light-text")
        }
      }
      else{
        locationIcon.src = 'icons/location-white.svg'
        clockIcon.src = "icons/clock-white.svg"
        changeBGColorCelsius(response.current.is_day)
        weatherCard.classList.add("light-text")
      }
      
    }

    
    

    console.log(response.current.is_day)
    if(response.current.is_day === 1){
      changeIconDay(response)
    }
    else{
      changeIconNight(response)
    }
    
      
  });

  
}

function fetchForecastData(){
  let value = document.getElementById("zipcode").value
  let zip = userLocation.concat(value)

  fetch(`${BASE_URL}${FUTURE_WEATHER}${KEY}${zip}`, {mode: 'cors'})
.then(function(response){
  return response.json()
})
.then(function(response) {
  const todayHigh = Math.round(response.forecast.forecastday[0].day.maxtemp_f)
  const todayLow = Math.round(response.forecast.forecastday[0].day.mintemp_f)
  
  highTemp.textContent = "H " + todayHigh
  lowTemp.textContent = "L " + todayLow
});
}