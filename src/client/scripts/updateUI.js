 const updateUI = (Rdays, city, pic, weather) => {
        const rDaysElement = document.querySelector("#remainingDays");
        const cityNameElement = document.querySelector(".cityName");
        const weatherElement = document.querySelector(".weather");
        const tempElement = document.querySelector(".temp");
        const windspeed = document.querySelector(".wnd_spd");
        const snow_chance = document.querySelector(".snow");
        const cityPicElement = document.querySelector(".cityPic");
    
        if (rDaysElement) rDaysElement.innerHTML = `Trip starts in ${Rdays} days from now`;
        if (cityNameElement) cityNameElement.innerHTML = `Location: ${city}`;
        
        if (weatherElement) {
            let weatherText = `Conditions: ${weather.description}`;
            if (Rdays < 7) weatherText = `Weather is: ${weather.description}`;
            weatherElement.innerHTML = weatherText;
        }
    
        if (tempElement) {
            let tempText = `Forecasted Temprature: ${weather.temp}&degC`;
            if (Rdays <= 7) tempText = `Temperature: ${weather.temp} &deg C`;
            tempElement.innerHTML = tempText;
        }
    
        if (Rdays > 7) {
            if (windspeed) windspeed.innerHTML = `Wind Speed: ${weather.wind_spd}`;
            if (snow_chance) snow_chance.innerHTML = `Snow Chance: ${weather.snow} %`;
        } else {
            if (windspeed) windspeed.innerHTML = "";
            if (snow_chance) snow_chance.innerHTML = "";
        }
        
    
        if (cityPicElement) cityPicElement.innerHTML = `<img src="${pic}" alt="Image Place">`;
        
        const flightData = document.querySelector(".travel_app");
        if (flightData) flightData.style.display = "block";
    };
    module.exports={updateUI}