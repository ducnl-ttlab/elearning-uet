import { AxiosDefaultResponse } from '@/common/interfaces';
import axios from 'axios';
import { IGoogleLoginParams, IUserData } from '../constants/auth.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export interface ILoginResponse {
    code?: number;
    message?: string;
    success?: boolean;
    errors?: Array<IErrorMessage>;
    data?: {
        accessToken?: string;
        user: IUserData;
    };
}

export interface IErrorMessage {
    key?: string;
    errorCode?: number;
    message?: string;
}

export async function loginWithGoogle(
    params: IGoogleLoginParams,
): Promise<ILoginResponse> {
    const response = await axios.post(`${BE_URL}/auth/login`, params);
    return response.data;
}

export async function selectRole(
    role: string,
    token: string,
): Promise<AxiosDefaultResponse> {
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
    return response;
}
