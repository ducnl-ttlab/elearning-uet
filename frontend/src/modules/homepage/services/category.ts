import axios from 'axios';
import { AxiosDefaultResponse } from "@/common/interfaces";


const BASE_URL = process.env.VUE_APP_API_URL;

// export async function getCategoryPage():  Promise<AxiosDefaultResponse> {
//     const response = await axios.get(`${BASE_URL}/category`);
//     // console.log(response.data.data.items);
    
//     return response.data;
// }
export async function getCategoryPage() {
    const response = await axios.get(`${BASE_URL}/category`);
  
    // console.log(response);
    
    return response;
}