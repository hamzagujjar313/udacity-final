import axios from "axios"
import { findWeather } from "../../server/findweather";
import { updateUI } from "./updateUI";
const dateInp=document.querySelector("#date");
const form = document.querySelector("form");

const handleSubmit = async(e)=> {
    e.preventDefault()
    // console.log("Working chck");
    const Location= await getCity();
    const {name,lng,lat}=Location
    //Date input by the user
    const date=dateInp.value
  
    const dateError = document.querySelector("#dateError"); // Get the error message element

    // Check if the date is in the past
    const today = new Date();
    const selectedDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        dateError.textContent = "Date can't be in the past.";
        dateError.style.display = "block";
        dateInp.focus();
        return;
    } else {
        dateError.style.display = "none"; // Hide error if date is valid
    }


    //remaining days function call
    const Rdays=getRdays(date)
    const Weather= await getWeather(lng,lat,Rdays)
    console.log(Weather);
    const {image}=await getPicture(name)
    updateUI(Rdays,name,image,Weather) 

}
const getCity=async () =>{
    const { data } = await axios.post("http://localhost:8000/getCity", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data)
      return data;
}
const getRdays = (date) => {
    const currentDate = new Date();
    const travelDate = new Date(date);

    // Reset time to midnight to avoid time zone issues
    currentDate.setHours(0, 0, 0, 0);
    travelDate.setHours(0, 0, 0, 0);

    const Rdays = (travelDate - currentDate) / (86400000);

    return Rdays;
};
const getWeather=async (lng,lat,Rdays)=>
{
    const { data } = await axios.post("http://localhost:8000/findWeather", {
        lng,lat,Rdays
      });
      return data
    }


    const getPicture = async (name) => {
        try {
            const { data } = await axios.post("http://localhost:8000/uploadPic", { name });
    //Error Handling if no image for City on API
            if (!data.image) {
                throw new Error("No Image on API for this city");
            }
    
            console.log(data);
            return data;
        } catch (error) {
            console.error(error.message);
            return { image: null, error: error.message };
        }
    };
    
    // const updateUI = (Rdays, city, pic, weather) => {
    //     const rDaysElement = document.querySelector("#remainingDays");
    //     const cityNameElement = document.querySelector(".cityName");
    //     const weatherElement = document.querySelector(".weather");
    //     const tempElement = document.querySelector(".temp");
    //     const windspeed = document.querySelector(".wnd_spd");
    //     const snow_chance = document.querySelector(".snow");
    //     const cityPicElement = document.querySelector(".cityPic");
    
    //     if (rDaysElement) rDaysElement.innerHTML = `Trip starts in ${Rdays} days from now`;
    //     if (cityNameElement) cityNameElement.innerHTML = `Location: ${city}`;
        
    //     if (weatherElement) {
    //         let weatherText = `Conditions: ${weather.description}`;
    //         if (Rdays < 7) weatherText = `Weather is: ${weather.description}`;
    //         weatherElement.innerHTML = weatherText;
    //     }
    
    //     if (tempElement) {
    //         let tempText = `Forecasted Temprature: ${weather.temp}&degC`;
    //         if (Rdays <= 7) tempText = `Temperature: ${weather.temp} &deg C`;
    //         tempElement.innerHTML = tempText;
    //     }
    
    //     if (Rdays > 7) {
    //         if (windspeed) windspeed.innerHTML = `Wind Speed: ${weather.wind_spd}`;
    //         if (snow_chance) snow_chance.innerHTML = `Snow Chance: ${weather.snow} %`;
    //     } else {
    //         if (windspeed) windspeed.innerHTML = "";
    //         if (snow_chance) snow_chance.innerHTML = "";
    //     }
        
    
    //     if (cityPicElement) cityPicElement.innerHTML = `<img src="${pic}" alt="Image Place">`;
        
    //     const flightData = document.querySelector(".travel_app");
    //     if (flightData) flightData.style.display = "block";
    // };
    
    
export{ handleSubmit }