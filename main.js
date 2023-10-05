const KEY = '?key=0be96db5acc6427f81c173514230510'
const BASE_URL = 'https://api.weatherapi.com/v1'
const CURRENT_WEATHER = '/current.json'
let userLocation = '&q='
let fTemp = true
const area = document.querySelector('.location')
const temp = document.querySelector('.temp')
const submit = document.getElementById("submit")
const changeTempButton = document.querySelector('.change-temp')
const changeTempIcon = document.getElementById('change-temp-icon')
const formContainer = document.getElementById('form-container')
const weatherCard = document.querySelector(".weather-card")
const condition = document.querySelector(".condition")
const conditionIcon = document.querySelector('.condition-icon')
const form = document.querySelector('.form')
const nav = document.getElementById('nav')



submit.addEventListener("click", function(e){
  e.preventDefault()
  fetchData()
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

function changeBGColorFahren(climate){
  document.body.removeAttribute('class')
  formContainer.removeAttribute('class')
  nav.removeAttribute('class')
  form.removeAttribute('class')
  if(climate >= 100){
    document.body.classList.add('hot')
    nav.classList.add('hot')
    form.classList.add('hot')
    formContainer.classList.add('light')
  }
  else if (climate >= 80){
    document.body.classList.add('sunny')
    formContainer.classList.add('light')
    nav.classList.add('sunny')
    form.classList.add('sunny')

  }
  else if(climate >= 50){
    document.body.classList.add('cool')
    formContainer.classList.add('dark')
    nav.classList.add('cool')
    form.classList.add('cool')

  }
  else{
    document.body.classList.add('cold')
    formContainer.classList.add('dark')
    nav.classList.add('cold')
    form.classList.add('cold')

  }
}

function changeBGColorCelsius(climate){
  document.body.removeAttribute('class')
  if(climate >= 38){
    document.body.classList.add('hot')
  }
  else if (climate >= 27){
    document.body.classList.add('sunny')
  }
  else if(climate >= 10){
    document.body.classList.add('cool')
  }
  else{
    document.body.classList.add('cold')
  }
}

function fetchData(){
  
  let value = document.getElementById("zipcode").value
  let zip = userLocation.concat(value)
  fetch(`${BASE_URL}${CURRENT_WEATHER}${KEY}${zip}`, {mode: 'cors'})
  .then(function(response){
    return response.json()
  })
  .then(function(response) {
    console.log(response)
    console.log(response.current.condition.text)
    area.textContent = response.location.name + ', ' + response.location.region
    condition.textContent = response.current.condition.text
    if(fTemp === true ){
      temp.textContent = 'Temp: ' + response.current.temp_f + ' Fº'
      changeBGColorFahren(response.current.temp_f)

    }
    else{
      temp.textContent = response.current.temp_c + ' Cº'
      changeBGColorCelsius(response.current.temp_c)
    }

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
      
  });
}