import playList from './playList.js'
// import '../css/style.css'
// import '../css/owfont-regular.css'



// settings
const settingsBtn = document.querySelector('.settings')
const settings = document.querySelector('.settings-menu')
let language = 'en'
const langBtn = document.querySelector('.language')
const settingsCheckBoxes = document.querySelectorAll('input[type="checkbox"]')
const photoSource = document.querySelector('.photo-source')
const blockNames = document.querySelectorAll('.block-name')

// date and time
const timeElement = document.querySelector('time')
const dateElement = document.querySelector('.date')

// greeting
const greetingContainer = document.querySelector('.greeting-container')
const greeting = document.querySelector('.greeting')
const nameInput = document.querySelector('.name')

// image slider
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = getRandomNum()

// weather widget
const weatherContainer = document.querySelector('.weather')
const cityInput = document.querySelector('.city')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

// quote widget
const quoteContainer = document.querySelector('.quote-container')
const changeQuoteBtn = document.querySelector('.change-quote')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
let currentQuoteIndex = Math.floor(Math.random() * 6)

// audio player
const playerContainer = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const playNextBtn = document.querySelector('.play-next')
const playPrevBtn = document.querySelector('.play-prev')
const playListContainer = document.querySelector('.play-list')
const audio = new Audio()
let isPlay = false
let playNum = 0




// -------- SETTINGS SECTION --------
const blocksContainers = {
  audio: playerContainer,
  weather: weatherContainer,
  time: timeElement,
  date: dateElement,
  greeting: greetingContainer,
  quote: quoteContainer
}

settingsBtn.addEventListener('click', function () {
  settings.classList.toggle('active')
})


for (let checkBox of settingsCheckBoxes) {
  checkBox.addEventListener('change', function (element) {
    const block = blocksContainers[element.target.value]
    block.classList.toggle('hidden')
  })
}


function switchSettingsLang() {
  const blocksTranslation = {
    audio: {
      en: 'Audio',
      ru: 'Аудио'
    },
    weather: {
      en: 'Weather',
      ru: 'Погода'
    },
    time: {
      en: 'Time',
      ru: 'Время'
    },
    date: {
      en: 'Date',
      ru: 'Дата'
    },
    greeting: {
      en: 'Greeting',
      ru: 'Приветствие'
    },
    quote: {
      en: 'Quote',
      ru: 'Цитата'
    }
  }

  const photoSourceTranslation = {
    en: 'Photo source',
    ru: 'Источник фото'
  }
  photoSource.textContent = photoSourceTranslation[language]

  Object.keys(blocksTranslation).forEach((item, index, array) => {
    const value = blocksTranslation[item]
    blockNames[index].textContent = value[language]
  })
}




// -------- DATETIME AND GREEETING SECTION --------
function getWelcomeTimeOfDay(lang='en') {
  const dateTime = new Date()
  const hours = dateTime.getHours()
  const greetingTranslation = {
    night: {
      en: 'Good night',
      ru: 'Доброй ночи'
    },
    morning: {
      en: 'Good morning',
      ru: 'Доброе утро'
    },
    afternoon: {
      en: 'Good afternoon',
      ru: 'Добрый день'
    },
    evening: {
      en: 'Good evening',
      ru: 'Добрый вечер'
    }
  }

  if (hours >= 0 && hours <= 3) {
    return greetingTranslation.night[lang]
  } else if (hours >= 4 && hours <= 11) {
    return greetingTranslation.morning[lang]
  } else if (hours >= 12 && hours <= 16) {
    return greetingTranslation.afternoon[lang]
  } else {
    return greetingTranslation.evening[lang]
  }
}


function showGreeting() {
  const welcomeTimeOfDay = getWelcomeTimeOfDay(language)
  greeting.textContent = welcomeTimeOfDay
}


function showDateTime() {
  const dateTime = new Date();

  // show time
  const currentTime = dateTime.toLocaleTimeString()
  timeElement.textContent = currentTime
  
  // show date
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  const currentDate = dateTime.toLocaleDateString(language, options)
  dateElement.textContent = currentDate

  showGreeting()
  setTimeout(showDateTime, 1000)
}
showDateTime()




// save data to local storage
function setLocalStorage() {
  localStorage.setItem('userName', nameInput.value)
  localStorage.setItem('userCity', cityInput.value)
  localStorage.setItem('language', language)
  
  settingsCheckBoxes.forEach(checkBox => {
    localStorage.setItem(`block-${checkBox.value}`, checkBox.checked)
  })
}

// get data from local storage
function getLocalStorage() {
  const languageFromLS = localStorage.getItem('language')
  const nameFromLS = localStorage.getItem('userName')
  const cityFromLS = localStorage.getItem('userCity')

  if (nameFromLS !== null) {
    language = languageFromLS
  } else {
    language = 'en'
  }

  if (nameFromLS !== null) {
    nameInput.value = nameFromLS
  }
  
  if (cityFromLS !== '') {
    cityInput.value = cityFromLS
  } else {
    cityInput.value = 'Minsk'
  }


  settingsCheckBoxes.forEach(checkBox => {
    const stateFromLS = localStorage.getItem(`block-${checkBox.value}`)

    if (stateFromLS !== null) {
      checkBox.checked = stateFromLS === 'true'
      if (checkBox.checked) {
        const block = blocksContainers[checkBox.value]
        block.classList.toggle('hidden')
      }
    }
  })
}

// add local storage listeners
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('DOMContentLoaded', getLocalStorage)




// -------- BACKGROUND IMAGE WITH SLIDER SECTION --------
// get random number from 1 to 20
function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1
}


// set background image
function setBg() {
  const welcomeTimeOfDay = getWelcomeTimeOfDay()
  const words = welcomeTimeOfDay.split(' ')
  const bgNum = String(randomNum).padStart(2, "0")
  const img = new Image()

  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${words[1]}/${bgNum}.jpg`
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`
  }
}


function getSlideNext() {
  randomNum++
  if (randomNum >= 20) {
    randomNum = 1
  }
  setBg()
}


function getSlidePrev() {
  randomNum--
  if (randomNum <= 1) {
    randomNum = 20
  }
  setBg()
}


// add slide listeners
document.addEventListener('DOMContentLoaded', setBg)
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)




// -------- WEATHER SECTION --------
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${language}&appid=b50b70ec933b37883cbac2d86479f831&units=metric`
  const res = await fetch(url)    // get weather data from api
  const weatherError = document.querySelector('.weather-error')
  if (weatherError) {
    weatherError.remove()     // delete old weather-error div if it exists
  }
  weatherIcon.className = 'weather-icon owf'

  if (res.status === 200) {   // show weather
    const data = await res.json()
    
    const windTranslate = {
      en: 'Wind speed',
      ru: 'Скорость ветра'
    }
    const speedTranslate = {
      en: 'm/s',
      ru: 'м/с'
    }
    const humidityTranslate = {
      en: 'Humidity',
      ru: 'Влажность'
    }
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.round(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description
    wind.textContent = `${windTranslate[language]}: ${Math.round(data.wind.speed)} ${speedTranslate[language]}`
    humidity.textContent = `${humidityTranslate[language]}: ${Math.round(data.main.humidity)}`

  } else {          // show error
    const desContainer = document.querySelector('.description-container')
    const errorTranslate = {
      en: 'Error! city not found for',
      ru: 'Ошибка! Не найден город с названием'
    }
    desContainer.insertAdjacentHTML(
      'beforebegin',
      `<div class="weather-error">${errorTranslate[language]} '${cityInput.value}'!</div>`
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




// -------- QUOTES SECTION --------
async function getQuotes(changeIndex=true) {
  const qoutesFiles = {
    en: './assets/json/quotes_en.json',
    ru: './assets/json/quotes_ru.json'
  }
  const quotes = qoutesFiles[language]
  const res = await fetch(quotes)
  const data = await res.json()

  if (changeIndex) {
    currentQuoteIndex += 1
    if (currentQuoteIndex > 5) {
      currentQuoteIndex = 0
    } else if (currentQuoteIndex < 0) {
      currentQuoteIndex = 5
    }
  }
  
  quote.textContent = `"${data[currentQuoteIndex].text}"`
  author.textContent = data[currentQuoteIndex].author
}


document.addEventListener('DOMContentLoaded', getQuotes)
changeQuoteBtn.addEventListener('click', getQuotes)




// -------- MUSIC PLAY LIST SECTION --------
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




// -------- LANGUAGE SWITCH --------
langBtn.addEventListener('click', function () {
  langBtn.classList.toggle('ru')

  if (language === 'en') {
    language = 'ru'
    langBtn.textContent = 'RU'
    cityInput.placeholder = '[Введите город]'
    nameInput.placeholder = '[Введите имя]'
  } else {
    language = 'en'
    langBtn.textContent = 'EN'
    cityInput.placeholder = '[Enter city]'
    nameInput.placeholder = '[Enter name]'
  }

  if (cityInput.value === 'Minsk') {
    cityInput.value = 'Минск'
  } else if (cityInput.value === 'Минск') {
    cityInput.value = 'Minsk'
  }

  getWeather()
  getQuotes(false)
  switchSettingsLang()
})