import { loginModule } from './../../auth/store/login.store';
import { IAxiosDefaultResponse, IAxiosListDefaultResponse } from '@/common/interfaces';
import axios from 'axios';
import { IInstructorData, INotificationData } from '../constants/common.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function getInstructorList(): Promise<
    IAxiosListDefaultResponse<IInstructorData>
> {
    return axios
        .get(`${BE_URL}/course/instructor-list`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function getNotificationList(): Promise<
    IAxiosListDefaultResponse<INotificationData>
> {
    return axios
        .get(`${BE_URL}/notification`, {
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

export async function readNotification(): Promise<
    IAxiosDefaultResponse<Record<string, never>>
> {
    return axios
        .patch(
            `${BE_URL}/notification`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + loginModule.accessToken,
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
