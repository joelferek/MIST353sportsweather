const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    weatherBase: "https://api.openweathermap.org/data/2.5/weather",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

const teamsData = {
    "las vegas": 153.47,
    "san francisco": 144.81,
    "green bay": 134.81,
    "new england": 131.45,
    "chicago": 130.29,
    "philadelphia": 127.06,
    "seattle": 123.04,
    "new york": 121.79,
    "baltimore": 120.27,
    "pittsburgh": 120.10,
    "tampa bay": 119.94,
    "denver": 119.75,
    "houston": 117.45,
    "minnesota": 116.85,
    "kansas city": 115.13,
    "cleveland": 112.17,
    "nfl average": 111.75,
    "atlanta": 110.66,
    "new orleans": 109.60,
    "dallas": 107.87,
    "carolina": 104.59,
    "washington": 104,
    "los angeles": 103.62,
    "tennessee": 100.67,
    "indianapolis": 99.51,
    "miami": 94.95,
    "detroit": 91.89,
    "arizona": 91.34,
    "buffalo": 89.65,
    "cincinnati": 87.36,
    "jacksonville": 84.76
};
const avgTemp = {
    "las vegas": 75,
    "san francisco": 68,
    "green bay": 50,
    "new england": 48,
    "chicago": 45,
    "philadelphia": 54,
    "seattle": 55,
    "new york": 58,
    "baltimore": 60,
    "pittsburgh": 53,
    "tampa bay": 78,
    "denver": 65,
    "houston": 77,
    "minnesota": 45,
    "kansas city": 62,
    "cleveland": 51,
    "atlanta": 70,
    "new orleans": 75,
    "dallas": 80,
    "carolina": 72,
    "washington": 65,
    "los angeles": 75,
    "tennessee": 68,
    "indianapolis": 55,
    "miami": 82,
    "detroit": 53,
    "arizona": 80,
    "buffalo": 48,
    "cincinnati": 55,
    "jacksonville": 80
}
function goToAboutUs() {
    window.location.href = "about-us";
}


function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        getAveragePrice(searchbox.value);
        getAveragetemp(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.weatherBase}?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(displayResults)
        .catch(error => console.error("Error fetching weather data:", error));
}

function getAveragePrice(city) {
    const mockPriceData = { averagePrice: teamsData[city.toLowerCase()] || "N/A" };
    displayAveragePrice(mockPriceData);
}
function getAveragetemp(city) {
    const mockPricetemp = { averagetemp: avgTemp[city.toLowerCase()] || "N/A" };
    displayAveragetemp(mockPricetemp);
}
function displayAveragePrice(priceData) {
    let averagePrice = priceData.averagePrice;
    let priceElement = document.querySelector('.price-heading');
    priceElement.innerText = `Average Price: $${averagePrice}`;
}
function displayAveragetemp(tempData) {
    let averagetemp = tempData.averagetemp;
    let tempElement = document.querySelector('.temp-heading');
    tempElement.innerHTML = `Average Temp: ${averagetemp}<span>°F</span>`;
}


function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
