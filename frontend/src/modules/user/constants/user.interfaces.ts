import { SystemRole } from '@/common/constants';

export interface IUpdateUserData {
    username?: string;
    phone?: string;
    address?: string;
    file?: File;
    password?: string;
    currentPassword?: string;
}
