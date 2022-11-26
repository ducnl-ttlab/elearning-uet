import { IErrorMessage } from '@/modules/auth/services/login';

export enum IHTTPResponse {
    'SUCCESS' = 200,
    '404_ERROR' = 404,
    'INTERNAL_ERROR' = 500,
}
export interface IAxiosDataResponse {
    data?: {};
    code: IHTTPResponse;
    message?: string;
    success?: boolean;
    errors?: Array<IErrorMessage>;
}
export interface AxiosDefaultResponse {
    config?: {};
    data?: IAxiosDataResponse;
}
