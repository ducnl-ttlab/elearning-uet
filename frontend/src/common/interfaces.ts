export enum IHTTPResponse{
    "SUCCESS" = 200,
    "404_ERROR" = 404,
    "INTERNAL_ERROR" = 500,
}
export interface IAxiosDataResponse {
    data?: {};
    code: IHTTPResponse;
    message?: string;
    success?: boolean;
}
export interface AxiosDefaultResponse {
    config?: {};
    data?: IAxiosDataResponse;
}