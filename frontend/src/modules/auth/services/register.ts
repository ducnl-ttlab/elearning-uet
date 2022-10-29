import axios from 'axios';

const FE_BASE_URL = process.env.VUE_APP_API_URL;
const BE_BASE_URL = process.env.VUE_APP_FE_BASE_URL;
export interface IGoogleRegisterParams {
    url: string;
    email: string;
}

export async function registerWithGoogle(email: string) {
    return await axios.post(`${FE_BASE_URL}/auth/signup`, {
        url: `${BE_BASE_URL}/verify/email`,
        email: email,
    });
}
