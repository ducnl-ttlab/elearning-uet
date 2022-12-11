import { IAxiosDefaultResponse, IAxiosListDefaultResponse } from '@/common/interfaces';
import localStorageTokenService from '@/common/tokenService';
import { loginModule } from '@/modules/auth/store/login.store';
import { UserActionDto } from '@/modules/common/constants/common.interfaces';
import axios from 'axios';
import {
    ICourseData,
    ICourseListParams,
    ICoursePreviewData,
    ITopicData,
} from '../constants/course.interfaces';

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
    return axios.post(`${BE_URL}/course`, params, {
        headers: {
            Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function getCoursePreviewData(
    courseId: number,
): Promise<IAxiosDefaultResponse<ICoursePreviewData>> {
    return axios
        .get(`${BE_URL}/topic/short/${courseId}`)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function studentAction(
    type: UserActionDto['type'],
    courseId: number,
    studentId: string,
    notificationId?: number,
): Promise<IAxiosDefaultResponse<Record<string, never>>> {
    const notificationQuery =
        (notificationId && `&notificationId=${notificationId}`) || '';
    return axios
        .put(
            `${BE_URL}/user-course/action/${courseId}/${studentId}?type=${type}${notificationQuery}`,
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

export async function getTopicList(
    courseId: number,
): Promise<IAxiosListDefaultResponse<ITopicData>> {
    return axios
        .get(`${BE_URL}/topic/${courseId}`, {
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

export async function createTopic(
    params: FormData,
    courseId: number,
): Promise<IAxiosDefaultResponse<ITopicData>> {
    return axios.post(`${BE_URL}/topic/${courseId}`, params, {
        headers: {
            Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            'Content-Type': 'multipart/form-data',
        },
    });
}
