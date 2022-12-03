import { IAxiosDefaultResponse } from '@/common/interfaces';
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
