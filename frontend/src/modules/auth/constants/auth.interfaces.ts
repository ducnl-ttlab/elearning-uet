import { SystemRole } from '@/common/constants';

export interface IGoogleRegisterParams {
    url: string;
    email: string;
}

export interface IGoogleLoginParams {
    email: string;
    password: string;
}
