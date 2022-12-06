import { IAxiosDefaultResponse } from '@/common/interfaces';
import { loginModule } from '@/modules/auth/store/login.store';
import axios from 'axios';
import {
    IToggleCourseFavoriteResponse,
    ICourseCheckoutResponse,
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
        .post(
            `${BE_URL}/favorite/${courseId}`,
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

export async function courseCheckout(
    courseId: number,
): Promise<IAxiosDefaultResponse<ICourseCheckoutResponse>> {
    return axios
        .post(
            `${BE_URL}/user-course/create-course-checkout/${courseId}`,
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

export async function courseCheckoutVerify(
    courseId: string,
    code: string,
): Promise<IAxiosDefaultResponse<Record<string, never>>> {
    return axios
        .post(`${BE_URL}/user-course/join-course/${courseId}/${code}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}
