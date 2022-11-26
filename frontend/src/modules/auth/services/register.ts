import { AxiosDefaultResponse } from '@/common/interfaces';
import axios from 'axios';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function signupWithGoogle(email: string): Promise<AxiosDefaultResponse> {
    const response = await axios.post(`${BE_URL}/auth/signup`, {
        url: `${FE_URL}/create-password/`,
        email: email,
    });
    return response;
}

export async function verifyToken(token: string): Promise<AxiosDefaultResponse> {
    const response = await axios.get(`${BE_URL}/auth/verify-email/${token}`);
    return response;
}

export async function setPassword(password: string, token: string): Promise<AxiosDefaultResponse> {
    const response = await axios.post(`${BE_URL}/auth/change-password`, {
        password: password,
    }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    return response;
}


export async function selectRole(role: string, token: string): Promise<AxiosDefaultResponse> {
    const response = await axios.put(`${BE_URL}/auth/select-role`, {
        role: role,
    }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    return response;
}