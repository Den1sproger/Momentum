const timeElement = document.querySelector('time')
const dateElement = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const nameInput = document.querySelector('.name')
const cityInput = document.querySelector('.city')
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = getRandomNum()




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

  if (cityFromLS !== null) {
    cityInput.value = cityFromLS
  }
}

// add local storage listeners
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)




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