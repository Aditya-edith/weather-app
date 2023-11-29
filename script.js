const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
// ... (previous code)

search.addEventListener("click", () => {
    const APIKey = "80df3914b1fea79c3a3960e3dd46b67f";
    const city = document.querySelector(".search-box input").value;
  
    if (city === "") {
      return;
    }
  
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == "404") {
            cityHide.textContent=city;
          container.style.height = "400px";
          weatherBox.classList.remove("active");
          weatherDetails.classList.remove("active");
          error404.classList.add("active");
          return;
        }
  
     
  
        // Move the return statement to the end of your callback function
  
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");
  
        if(cityHide.textContent==city){
            return;
        }
        else{
            cityHide.textContent=city;

            container.style.height = "555px";
            container.classList.add("active");
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error404.classList.remove("active");

            setTimeout(() => {
                container.classList.remove("active");
            }, 2500);

            switch (json.weather[0].main) {
                case "Clear":
                  image.src = "clear.png";
                  break;
        
                case "Rain":
                  image.src = "rain.png";
                  break;
        
                case "Snow":
                  image.src = "snow.png";
                  break;
        
                case "Clouds":
                  image.src = "cloud.png";
                  break;
        
                case "Mist":
                case "Haze":
                  image.src = "mist.png";
                  break;
        
                default:
                  image.src = "cloud.png";
                  break;
              }
        
              temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
              description.innerHTML = `${json.weather[0].description}`;
              humidity.innerHTML = `${json.main.humidity}%`;
              wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        }

        
      });
  });
  