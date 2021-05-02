const weather = document.querySelector(".weather-js");
const API_KEY = "2083156483219be782751b10c6ef603b";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        const currentWeather = json.weather[0].main;
            
        weather.innerText = `현재 위치 ${place} 
                             현재 기온 ${temperature}˚C
                             현재 날씨 ${currentWeather}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('지역정보를 찾을 수 없습니다.');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoordinate() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoord = JSON.parse(loadedCoords);
        getWeather(parseCoord.latitude, parseCoord.longitude);
    }
}

function init() {
    loadCoordinate();
}

init();