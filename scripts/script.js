const timeElement = document.querySelector('time')
const dateElement = document.querySelector('date')
const greeting = document.querySelector('.greeting')
const nameInput = document.querySelector('.name')
const cityInput = document.querySelector('.city')



function getTimeOfDay(hours) {
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
  const dateTime = new Date();
  const hours = dateTime.getHours()

  const timeOfDay = getTimeOfDay(hours)
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
