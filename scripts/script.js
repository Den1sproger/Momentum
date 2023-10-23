const timeElement = document.querySelector('time')
const dateElement = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const nameInput = document.querySelector('.name')
const cityInput = document.querySelector('.city')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = getRandomNum()
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')




function getTimeOfDay() {
  const dateTime = new Date();
  const hours = dateTime.getHours()

  if (hours >= 0 && hours <= 3) {
    return 'night'
  } else if (hours >= 4 && hours <= 11) {
    return 'morning'
  } else if (hours >= 12 && hours <= 16) {
    return 'afternoon'
  } else {
    return 'evening'
  }
}


function showGreeting() {
  const timeOfDay = getTimeOfDay()
  greeting.textContent = `Good ${timeOfDay}`
}


function showDateTime() {
  const dateTime = new Date();

  // show time
  const currentTime = dateTime.toLocaleTimeString();
  timeElement.textContent = currentTime
  
  // show date
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  const currentDate = dateTime.toLocaleDateString('en-US', options)
  dateElement.textContent = currentDate

  showGreeting()
  setTimeout(showDateTime, 1000)
}
showDateTime()




// save data to local storage
function setLocalStorage() {
  localStorage.setItem('userName', nameInput.value)
  localStorage.setItem('userCity', cityInput.value)
}

// get data from local storage
function getLocalStorage() {
  const nameFromLS = localStorage.getItem('userName')
  const cityFromLS = localStorage.getItem('userCity')

  if (nameFromLS !== null) {
    nameInput.value = nameFromLS
  }
  
  if (cityFromLS !== '') {
    cityInput.value = cityFromLS
  } else {
    cityInput.value = 'Minsk'
  }
}

// add local storage listeners
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('DOMContentLoaded', getLocalStorage)




// get random number from 1 to 20
function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1
}


// set background image
function setBg() {
  const timeOfDay = getTimeOfDay()
  const bgNum = String(randomNum).padStart(2, "0")
  const img = new Image()

  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`
  }
}
setBg()


function getSlideNext() {
  randomNum >= 20 ? randomNum = 1 : randomNum += 1
  setBg()
}


function getSlidePrev() {
  randomNum <= 1 ? randomNum = 20 : randomNum -= 1
  setBg()
}


// add slide listeners
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)




async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=b50b70ec933b37883cbac2d86479f831&units=metric`
  const res = await fetch(url)    // get weather data from api
  const weatherError = document.querySelector('.weather-error')
  if (weatherError) {
    weatherError.remove()     // delete old weather-error div if it exists
  }
  weatherIcon.className = 'weather-icon owf'

  if (res.status === 200) {   // show weather
    const data = await res.json()
    
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.round(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}`
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}`

  } else {          // show error
    const desContainer = document.querySelector('.description-container')
    desContainer.insertAdjacentHTML(
      'beforebegin',
      `<div class="weather-error">Error! city not found for '${cityInput.value}'!</div>`
    )
    temperature.textContent = ''
    weatherDescription.textContent = ''
    wind.textContent = ''
    humidity.textContent = ''
  }
}


function setCity(event) {
  if (event.code === 'Enter') {   // if pressed Enter
    getWeather()
    cityInput.blur()
  }
}

window.addEventListener('load', getWeather)
cityInput.addEventListener('keypress', setCity)