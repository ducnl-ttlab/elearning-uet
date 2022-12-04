import { IAxiosDefaultResponse } from '@/common/interfaces';
import { loginModule } from '@/modules/auth/store/login.store';
import axios from 'axios';
import { ICourseData, ICourseListParams } from '../constants/course.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export interface ICourseItems {
    items: Array<ICourseData>;
}

export async function getCourseList(
    params: ICourseListParams,
): Promise<IAxiosDefaultResponse<ICourseItems>> {
    return axios
        .get(`${BE_URL}/course`, {
            params: { ...params },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function createCourse(
    params: FormData,
): Promise<IAxiosDefaultResponse<Record<string, unknown>>> {
    return axios
        .post(`${BE_URL}/course`, params, {
            headers: {
                Authorization: 'Bearer ' + loginModule.accessToken,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}
