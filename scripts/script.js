import playList from './playList.js'


// date and time
const timeElement = document.querySelector('time')
const dateElement = document.querySelector('date')

// greeting
const greeting = document.querySelector('.greeting')
const nameInput = document.querySelector('.name')

// image slider
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = getRandomNum()

// weather widget
const cityInput = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

// quote widget
const changeQuoteBtn = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
let currentQuoteIndex = Math.floor(Math.random() * 6)

// audio player
const playBtn = document.querySelector('.play')
const playNextBtn = document.querySelector('.play-next')
const playPrevBtn = document.querySelector('.play-prev')
const playListContainer = document.querySelector('.play-list')
const audio = new Audio()
let isPlay = false
let playNum = 0




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


function getSlideNext() {
  randomNum >= 20 ? randomNum = 1 : randomNum += 1
  setBg()
}


function getSlidePrev() {
  randomNum <= 1 ? randomNum = 20 : randomNum -= 1
  setBg()
}


// add slide listeners
document.addEventListener('DOMContentLoaded', setBg)
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




async function getQuotes() {  
  const quotes = 'scripts/quotes.json'
  const res = await fetch(quotes)
  const data = await res.json()

  currentQuoteIndex += 1
  if (currentQuoteIndex > 5) {
    currentQuoteIndex = 0
  } else if (currentQuoteIndex < 0) {
    currentQuoteIndex = 5
  }
  
  quote.textContent = `"${data[currentQuoteIndex].text}"`
  author.textContent = data[currentQuoteIndex].author
}


document.addEventListener('DOMContentLoaded', getQuotes)
changeQuoteBtn.addEventListener('click', getQuotes)




function createPlayListHTML() {   // add play list to the HTML document
  playList.forEach(music => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = music.title
    playListContainer.append(li)
  })
}


function playAudio() {
  if (!audio.src) {   // if there are no active songs, create new song
    audio.src = playList[playNum].src
    audio.currentTime = 0
    const liActive = playListContainer.childNodes[playNum]
    liActive.classList.add('item-active')
  }
  
  if (!isPlay) {
    audio.play()
    isPlay = true
  } else {
    audio.pause()
    isPlay = false
  }

  playBtn.classList.toggle('pause')
}


function playChangeAudio() {    // play new music
  audio.src = playList[playNum].src
  audio.currentTime = 0
  audio.play()

  if (!playBtn.classList.contains('pause')) {
    playBtn.classList.add('pause')
    isPlay = true
  }

  playListContainer.childNodes.forEach(item => {    // remove item-active
    if (item.classList.contains('item-active')) {
      item.classList.remove('item-active')
    }
  })
  const liActive = playListContainer.childNodes[playNum]
  liActive.classList.toggle('item-active')
}


function playNext() {
  playNum++
  if (playNum > 3) {
    playNum = 0
  }
  playChangeAudio()
}


function playPrev() {
  playNum--
  if (playNum < 0) {
    playNum = 3
  }
  playChangeAudio()
}


document.addEventListener('DOMContentLoaded', createPlayListHTML)
playBtn.addEventListener('click', playAudio)
playNextBtn.addEventListener('click', playNext)
playPrevBtn.addEventListener('click', playPrev)
audio.addEventListener('ended', playNext)