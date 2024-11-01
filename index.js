
function changeWeather (response){
    let temperatureElement = document.querySelector('#temperature');
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windspeed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector("#main-icon");
    
    
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="main-weather-icon"/>`;
    timeElement.innerHTML = formateDate(date);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
}

function formateDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

   return `${day} ${hours}:${minutes}`;

}

function searchCity (city){
    let apiKey = "25003fb5bf42fe9747o6t953e32a77ae";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiURL).then(changeWeather);
}

function handleSearches(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input-id");

    searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form-id");
searchForm.addEventListener("submit", handleSearches);

searchCity("Karachi");