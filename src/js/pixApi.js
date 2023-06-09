import axios from "axios";
const API_KEY = "37051874-03d297e7e3d15f7d8b55f1f76";
axios.defaults.baseURL = "https://pixabay.com/";


export async function getPhotos(query, page){
try {
    const {data} = await axios("api/", {params: {key: API_KEY, q:query, image_type: "photo", orientation:"horizontal", safesearch:  true, page, per_page: 40}})
    return data
} catch (error) {
    console.log(error)
}
}