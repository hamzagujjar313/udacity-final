const axios=require("axios")
const findWeather=async(lat, lng, Rdays, weather_key)=>{
    if(Rdays > 0 && Rdays <= 7) {
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${weather_key}`)
        // console.log(data.data[0]);
        const {weather,temp}=data.data[0]
        const {description}=weather
        const weather_data={description,temp}
        return weather_data
        // console.log(description,temp);
}
else if (Rdays > 7){
    const {data} = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${Rdays}&key=${weather_key}`)
    console.log("Forcasted weather below")
    // console.log(data)
    const {weather,temp,wind_spd,snow}=data.data[data.data.length-1]
    const {description}=weather
    weather_data={description,temp,wind_spd,snow}
    return weather_data
}
}
module.exports={findWeather} 