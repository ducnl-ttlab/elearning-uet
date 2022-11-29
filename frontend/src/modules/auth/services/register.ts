import { IAxiosDefaultResponse } from '@/common/interfaces';
import axios from 'axios';
import { IUserData } from '../constants/auth.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function signupWithGoogle(
    email: string,
): Promise<IAxiosDefaultResponse<string>> {
    const response = await axios.post(`${BE_URL}/auth/signup`, {
        url: `${FE_URL}/create-password/`,
        email: email,
    });
    return response.data;
}

export async function verifyToken(
    token: string,
): Promise<IAxiosDefaultResponse<IUserData>> {
    const response = await axios.get(`${BE_URL}/auth/verify-email/${token}`);
    return response.data;
}

export async function setPassword(
    password: string,
    token: string,
): Promise<IAxiosDefaultResponse<Record<string, unknown>>> {
    const response = await axios.post(
        `${BE_URL}/auth/change-password`,
        {
            password: password,
        },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    );
    return response.data;
}

export async function selectRole(
    role: string,
    token: string,
): Promise<IAxiosDefaultResponse<Record<string, unknown>>> {
    const response = await axios.put(
        `${BE_URL}/auth/select-role`,
        {
            role: role,
        },
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    );
    return response.data;
}
