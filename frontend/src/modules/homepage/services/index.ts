import axios from 'axios';
import { AxiosDefaultResponse } from "@/common/interfaces";


const BASE_URL = process.env.VUE_APP_API_URL;

export async function getCategoryPage():  Promise<AxiosDefaultResponse> {
    const response = await axios.get(`${BASE_URL}/category`);
    return response;
}