import { IAxiosDefaultResponse, IAxiosListDefaultResponse } from '@/common/interfaces';
import localStorageTokenService from '@/common/tokenService';
import { loginModule } from '@/modules/auth/store/login.store';
import { UserActionDto } from '@/modules/common/constants/common.interfaces';
import axios from 'axios';
import {
    ICourseData,
    ICourseListParams,
    ICoursePreviewData,
    ICreateQuizParams,
    IMessageDetail,
    IQuestionDetail,
    IQuizDetail,
    ITopicData,
} from '../constants/course.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export interface IGetMessageListParams {
    topicId?: number;
    page?: number;
    pageSize?: number;
}

export async function getCourseList(
    params: ICourseListParams,
): Promise<IAxiosListDefaultResponse<ICourseData>> {
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
    categoryId: number,
): Promise<IAxiosDefaultResponse<Record<string, unknown>>> {
    return axios
        .post(`${BE_URL}/course/${categoryId}`, params, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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

export async function deleteCourse(
    courseId: number,
): Promise<IAxiosDefaultResponse<Record<string, unknown>>> {
    return axios
        .delete(`${BE_URL}/course/${courseId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
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
                    Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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
    return axios
        .post(`${BE_URL}/topic/${courseId}`, params, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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

export async function updateTopic(
    params: FormData,
    courseId: number,
): Promise<IAxiosDefaultResponse<ITopicData>> {
    return axios
        .put(`${BE_URL}/topic/${courseId}`, params, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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

export async function deleteTopic(courseId: number): Promise<IAxiosDefaultResponse<any>> {
    return axios
        .delete(`${BE_URL}/topic/${courseId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function getQuizList(
    courseId: number,
    topicId: number,
): Promise<IAxiosListDefaultResponse<IQuizDetail>> {
    return axios
        .get(`${BE_URL}/quiz/${courseId}/${topicId}`, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function updateQuiz(
    courseId: number,
    topicId: number,
    params: IQuizDetail | IQuestionDetail,
): Promise<IAxiosDefaultResponse<IQuizDetail>> {
    return axios
        .put(`${BE_URL}/quiz/${courseId}/${topicId}`, params, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function createQuiz(
    courseId: number,
    topicId: number,
    params: ICreateQuizParams,
): Promise<IAxiosDefaultResponse<IQuizDetail>> {
    return axios
        .post(`${BE_URL}/quiz/${courseId}/${topicId}`, params, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function createQuizDetail(
    courseId: number,
    topicId: number,
    params: IQuizDetail,
): Promise<IAxiosDefaultResponse<IQuizDetail>> {
    return axios
        .post(`${BE_URL}/quiz/${courseId}/${topicId}`, params, {
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function deleteQuizPart(
    courseId: number,
    topicId: number,
    type: string,
    sourceId: number,
): Promise<IAxiosListDefaultResponse<IQuizDetail>> {
    return axios
        .delete(`${BE_URL}/quiz/${courseId}/${topicId}`, {
            params: {
                type: type,
                sourceId: sourceId,
            },
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function getMessageList(
    courseId: number,
    params: IGetMessageListParams,
): Promise<IAxiosListDefaultResponse<IMessageDetail>> {
    return axios
        .get(`${BE_URL}/comment/${courseId}`, {
            params: params,
            headers: {
                Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function sendMessage(
    courseId: number,
    topicId: number,
    message: string,
): Promise<IAxiosListDefaultResponse<IMessageDetail>> {
    return axios
        .post(
            `${BE_URL}/comment/${courseId}`,
            { comment: message },
            {
                params: {
                    topicId: topicId,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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

export async function rateCourse(
    courseId: number,
    rating: string,
): Promise<IAxiosListDefaultResponse<Record<string, never>>> {
    return axios
        .post(
            `${BE_URL}/rating/${courseId}`,
            {
                rating: rating,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorageTokenService.getAccessToken(),
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
