import { IAxiosDefaultResponse } from '@/common/interfaces';
import { loginModule } from '@/modules/auth/store/login.store';
import axios from 'axios';
import { IUserInfo } from '../constants/user.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function getUserInfo(): Promise<IAxiosDefaultResponse<IUserInfo>> {
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
