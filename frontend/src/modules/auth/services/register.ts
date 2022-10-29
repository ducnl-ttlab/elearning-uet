import axios from 'axios';

const BASE_URL = process.env.VUE_APP_API_URL;

export interface IGoogleRegisterParams {
    url: string;
    email: string;
}

export async function registerWithGoogle(email: string) {
    return await axios.post(`${BASE_URL}/auth/signup`, {
        url: `${BASE_URL}/verify/email`,
        email: email,
    });
}
