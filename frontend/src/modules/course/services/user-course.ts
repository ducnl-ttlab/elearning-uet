import { IAxiosDefaultResponse } from '@/common/interfaces';
import { loginModule } from '@/modules/auth/store/login.store';
import axios from 'axios';
import {
    IToggleCourseFavoriteResponse,
    IUserCourseData,
} from '../constants/course.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export async function getUserCourseData(
    courseId: number,
): Promise<IAxiosDefaultResponse<IUserCourseData>> {
    return axios
        .get(`${BE_URL}/user-course/check/${courseId}`, {
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

export async function toggleCourseFavorite(
    courseId: number,
): Promise<IAxiosDefaultResponse<IToggleCourseFavoriteResponse>> {
    return axios
        .post(`${BE_URL}/favorite/${courseId}`, {
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
