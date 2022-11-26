import { AxiosDefaultResponse } from "@/common/interfaces";
import axios from "axios";
import { IGoogleLoginParams } from "../constants/auth.interfaces";

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function loginWithGoogle(params: IGoogleLoginParams): Promise<AxiosDefaultResponse> {
    const response = await axios.post(`${BE_URL}/auth/signup`, params)
    return response;
}