const express = require("express")
const dotenv=require("dotenv")
const app = express();
const cors = require("cors");
//Function Imports
const {getCityLocation}=require("./getCityLoc")
const {findWeather}=require("./findweather")
const{uploadPic}=require("./uploadPic")
app.use(express.json())
app.use(express.static('dist'))
dotenv.config()

// require("dotenv").config()

app.use(cors())

port = 8000

//saving API keys from .env file in constans
const username=process.env.APP_USERNAME
const weather_key=process.env.WEATHER_KEY
const pixabay_key=process.env.PIXABAY_KEY

// console.log(weather_key)

app.get("/", (req, res) => {
  res.render("index.html")
})

app.post("/getCity", async (req,res) => {

    const {city}=req.body
    const Location=await getCityLocation(city,username)
    // console.log(Location)
    res.send(Location)
})

app.post("/findWeather", async (req,res) => {
    const {lat,lng,Rdays}=req.body
    const Weather=await findWeather(lat, lng, Rdays, weather_key)
    console.log(Weather);
    res.send(Weather)
})
app.post("/uploadPic", async (req,res) => {
    const {name}=req.body
    
    console.log(name);
    const Picture=await uploadPic(name,pixabay_key)
    res.send(Picture)
})

app.listen(8000, () => console.log(`server is listening on port ${port}`))

