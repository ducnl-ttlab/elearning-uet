import { SystemRole } from '@/common/constants';

export interface IUserInfo {
    id?: string | number;
    username?: string;
    email?: string;
    verified?: boolean;
    address?: string | null;
    phone?: number;
    avatar?: string;
    role?: SystemRole;
    provider?: string;
    created_at?: string;
    updated_at?: string;
}
