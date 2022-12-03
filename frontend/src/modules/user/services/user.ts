import { IAxiosDefaultResponse, IUserData } from '@/common/interfaces';
import { loginModule } from '@/modules/auth/store/login.store';
import axios from 'axios';
import { IUpdateUserData } from '../constants/user.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function getUserData(): Promise<IAxiosDefaultResponse<IUserData>> {
    return axios
        .get(`${BE_URL}/user/profile`, {
            headers: {
                Authorization: 'Bearer ' + loginModule.accessToken,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function updateUserData(
    params: FormData,
): Promise<IAxiosDefaultResponse<Record<string, unknown>>> {
    return axios
        .put(
            `${BE_URL}/user/profile`,

            params,

            {
                headers: {
                    Authorization: 'Bearer ' + loginModule.accessToken,
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}
