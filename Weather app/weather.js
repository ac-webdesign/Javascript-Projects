// document.getElementById('weatherForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const apiKey = '35c800d4d75fabdff4efa024d18565aa';
//   const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
//   const city = document.getElementById('cityInput').value;
//   const apiUrlWithParams = `${apiUrl}?q=${city}&appid=${apiKey}`;

//   console.log(weatherForm);
//   fetch(apiUrlWithParams)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
//       const weatherDescription = data.weather[0].description;
//       document.getElementById('weatherInfo').innerHTML = `<p><b>Temperature in ${city}:</b> ${temperatureCelsius}°C</p><p><b>Weather description:</b> ${weatherDescription}</p>`;
//     })
//     .catch(error => {
//       document.getElementById('weatherInfo').innerHTML = `There was a problem fetching the weather data: ${error.message}`;
//     });
// });


const weatherForm=document.querySelector('.weatherForm');
const cityInput=document.querySelector('.cityInput');
const card = document.querySelector('.weatherInfo');
const apiKey = '35c800d4d75fabdff4efa024d18565aa';
console.log(cityInput);


weatherForm.addEventListener("submit",async event =>{

  event.preventDefault(); //not refresh

  const city = cityInput.value;
  if(city){
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please enter the city");
  }
});

async function getWeatherData(city){
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
      throw new Error("Could not fetch weather data. Please enter a valid city");

    }
    return await response.json(); //AN OLA OK METATROPH SE JSON POY EINAI PINAKAS ME OBJECTS
} 

function displayWeatherInfo(data){
  console.log(data);
  const      {name:city,
               main: {temp,humidity}, 
               weather: [{description,id}],
               sys: {country}
              } = data;  //AYTA TA PAIRNOUME AP TO JSON FILE POY EXOYME DHMIOYRGHSEI
              
    card.textContent=""; //reset
    card.style.display="flex";

    const cityDisplay = document.createElement("h1");
    const countryDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // countryDisplay.textContent=country;
    cityDisplay.textContent = `${city}, ${country}`;
    
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);


    

    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');


    card.appendChild(cityDisplay);
    // card.appendChild(countryDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){

    if(weatherId===800){
      return '☀️';
    }
    if(weatherId>800){
      return '☁️';
    }
    if(weatherId>701 && weatherId<782){
      return '🌫️';
    }
    if(weatherId>=600 && weatherId<=622){
      return '❄️';
    }
    if(weatherId>=500 && weatherId<=531){
      return '🌦️';
    }
    if(weatherId<=321 && weatherId>=300){
      return '🌧️';
    }
    if(weatherId<=232 && weatherId>=200){
      return '⛈️';
    }
}
function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent=message;
  errorDisplay.classList.add(".errorDisplay");

  card.textContent="";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
