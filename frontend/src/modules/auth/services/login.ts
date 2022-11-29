import { IAxiosDefaultResponse } from '@/common/interfaces';
import axios from 'axios';
import { IGoogleLoginParams, IUserData } from '../constants/auth.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export interface ILoginData {
    accessToken?: string;
    user: IUserData;
}

export async function login(
    params: IGoogleLoginParams,
): Promise<IAxiosDefaultResponse<ILoginData>> {
    const response = await axios.post(`${BE_URL}/auth/login`, params);
    return response.data;
}

export async function selectRole(
    role: string,
    token: string,
): Promise<IAxiosDefaultResponse<Record<string, never>>> {
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
