import { SystemRole } from '@/common/constants';

export interface IUserData {
    id?: string;
    username?: string;
    email?: string;
    verified?: boolean;
    address?: string;
    phone?: string;
    avatar?: string;
    role?: SystemRole;
    provider?: string;
    created_at?: string;
    updated_at?: string;
}

export interface IGoogleRegisterParams {
    url: string;
    email: string;
}

export interface IGoogleLoginParams {
    email: string;
    password: string;
}
