// DOM Elements
const body = document.querySelector('.body'),
    dateTag = document.querySelector('.date'),
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    button = document.querySelector('.button'),
    monthAll = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ],
    days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ],
    //Array of images
    images = [
        "url('assets/images/night/1.jpg')",
        "url('assets/images/night/2.jpg')",
        "url('assets/images/night/3.jpg')",
        "url('assets/images/night/4.jpg')",
        "url('assets/images/night/5.jpg')",
        "url('assets/images/night/6.jpg')",

        "url('assets/images/morning/1.jpg')",
        "url('assets/images/morning/2.jpg')",
        "url('assets/images/morning/3.jpg')",
        "url('assets/images/morning/4.jpg')",
        "url('assets/images/morning/5.jpg')",
        "url('assets/images/morning/6.jpg')",

        "url('assets/images/day/1.jpg')",
        "url('assets/images/day/2.jpg')",
        "url('assets/images/day/3.jpg')",
        "url('assets/images/day/4.jpg')",
        "url('assets/images/day/5.jpg')",
        "url('assets/images/day/6.jpg')",

        "url('assets/images/evening/1.jpg')",
        "url('assets/images/evening/2.jpg')",
        "url('assets/images/evening/3.jpg')",
        "url('assets/images/evening/4.jpg')",
        "url('assets/images/evening/5.jpg')",
        "url('assets/images/evening/6.jpg')"
    ]

// Show Time
function showTime() {
    let today = new Date(),
        month = today.getMonth(),
        day = today.getDay(),
        date = today.getDate(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();


    // Output Date and Time
    dateTag.innerHTML = `${days[day]}, ${date} ${monthAll[month]}`;
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        document.body.style.backgroundImage = images[hour];
        greeting.textContent = "Доброй ночи,"
    } else if (hour < 12) {
        document.body.style.backgroundImage = images[hour];
        greeting.textContent = "Доброе утро,"
    } else if (hour < 18) {
        document.body.style.backgroundImage = images[hour];
        greeting.textContent = "Добрый день,"
    } else {
        document.body.style.backgroundImage = images[hour];
        greeting.textContent = "Добрый вечер,"
    }
}

// Switch bg
button.addEventListener('click', getImage);
let index = 1;
let secondIndex = 0;

function getImage() {
    let today = new Date(),
        hour = today.getHours();

    if (hour + index >= images.length && secondIndex < hour) {
        document.body.style.backgroundImage = images[secondIndex];
        secondIndex++;
    }

    document.body.style.backgroundImage = images[hour + index];

    index++;
    button.disabled = true;
    setTimeout(function () { button.disabled = false }, 1000);
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Как твоё имя]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (name.textContent) {
                localStorage.setItem('name', e.target.innerText);
                name.blur();
            } else {
                name.textContent = localStorage.getItem('name');
                name.blur();
            }

            if (localStorage.getItem('name') === null) {
                name.textContent = '[Как Ваше имя?]';
            }
        }
    } else {
        if (name.textContent) {
            localStorage.setItem('name', e.target.innerText);
        } else {
            name.textContent = localStorage.getItem('name');
        }

        if (localStorage.getItem('name') === null) {
            name.textContent = '[Как Ваше имя?]';
        }
    }
}

function cleanName() {
    name.textContent = '';
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Введите задачи]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (name.textContent) {
                localStorage.setItem('focus', e.target.innerText);
                focus.blur();
            } else {
                focus.textContent = localStorage.getItem('focus');
                focus.blur();
            }

            if (localStorage.getItem('focus') === null) {
                focus.textContent = '[Какие планы на сегодня?]';
            }
        }
    } else {
        if (focus.textContent) {
            localStorage.setItem('focus', e.target.innerText);
        } else {
            focus.textContent = localStorage.getItem('focus');
        }

        if (localStorage.getItem('focus') === null) {
            focus.textContent = '[Введите задачи]';
        }
    }
}

function cleanFocus(e) {
    focus.textContent = '';
}

name.addEventListener('focus', cleanName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('focus', cleanFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Weather
const weather = document.querySelector('.weather'),
    weatherIcon = weather.querySelector('.weather__icon'),
    temperature = weather.querySelector('.weather__temperature'),
    weatherDescription = weather.querySelector('.weather__description'),
    city = weather.querySelector('.weather__city'),
    humidity = weather.querySelector('.weather__humidity'),
    wind = weather.querySelector('.weather__wind');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `влажность ${data.main.humidity}%`;
    wind.textContent = `ветер ${data.wind.speed} м/с`;
}

function checkCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[В каком городе узнать погоду?]';
    } else {
        city.textContent = localStorage.getItem('city');
        document.addEventListener('DOMContentLoaded', getWeather);
    }

}

function setCity(e) {
    if (e.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

function cleanCity() {
    city.textContent = '';
}

function saveCity(e) {
    if (city.textContent) {
        localStorage.setItem('city', e.target.innerText);
    } else {
        city.textContent = localStorage.getItem('city');
    }

    if (localStorage.getItem('city') === null) {
        city.textContent = '[В каком городе узнать погоду?]';
    }
}

checkCity();
city.addEventListener('focus', cleanCity);
city.addEventListener('blur', saveCity);
city.addEventListener('keypress', setCity);

// Quote
const blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    btn = document.querySelector('.quote-btn');

async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json();

    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);


// Run
showTime();
setBgGreet();
getName();
getFocus();
