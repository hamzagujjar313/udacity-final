const axios =require ("axios")
const uploadPic= async(city_name,pixa_key)=>{
    console.log("iam working");
    const {data}=await axios.get(`https://pixabay.com/api/?key=${pixa_key}&q=${city_name}&image_type=photo`)
    const image=await data.hits[0].webformatURL;
    // console.log(image)
    return {image}
}

module.exports={uploadPic}