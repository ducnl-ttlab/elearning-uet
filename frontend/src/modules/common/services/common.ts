import { IAxiosDefaultResponse } from '@/common/interfaces';
import axios from 'axios';
import { IInstructorData } from '../constants/common.interfaces';

const FE_URL = process.env.VUE_APP_FE_BASE_URL;
const BE_URL = process.env.VUE_APP_API_URL;

export interface IInstructorItems {
    items: Array<IInstructorData>;
}

export async function getInstructorList(): Promise<
    IAxiosDefaultResponse<IInstructorItems>
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
