import { ObjectId } from 'mongodb';
import { AxiosResponse } from 'axios';
import {
    OrderDirection,
    SystemRole,
    HttpStatus,
    AuthProvider,
    UserStatus,
    Gender
} from './constants';

export interface ICommonListQuery {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: OrderDirection;
    keyword?: string;
}

export interface IGetListResponse<T> {
    items: T[];
    totalItems: number;
}

export interface IBodyResponse<T> extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: HttpStatus;
    message: string;
    data: T;
    errors?: { key: string; message: string; errorCode: HttpStatus }[];
}

export interface ILoginBody {
    provider: AuthProvider;
    email?: string;
    password?: string;
    phoneNumber?: string;
    otp?: string;
    token?: string;
    redirectUri?: string;
}

export interface ILoginResponse {
    accessToken: {
        token: string;
        expiresIn: number;
    };
    refreshToken: {
        token: string;
        expiresIn: number;
    };
    profile: IUser;
}

export interface IFile {
    _id: ObjectId;
    fileName: string;
    originalFileName: string;
    storageKey: string;
    path: string;
    extension?: string;
    mimetype?: string;
    size?: number; // in Kb
    createdBy?: ObjectId;
    createdAt?: Date;
    updatedBy?: ObjectId;
    updatedAt?: Date;
}
export interface IAddress {
    province: ObjectId;
    addressDetail: string;
    // TODO: define district, ward here
}
export interface ISubject {
    _id?: ObjectId;
    subject?: string;
    description?: string;
}
export interface IGrade {
    _id?: ObjectId;
    grade?: string;
    description?: string;
}

export interface IFacebookData {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
}
export interface IGoogleData {
    id: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
    picture: string;
}
export interface IZaloData {
    id: string;
    name: string;
}
export interface IUser {
    _id: ObjectId;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    phoneNumber?: string;
    systemRoles: SystemRole[];
    facebookData?: IFacebookData;
    googleData?: IGoogleData;
    zaloData?: IZaloData;
    moreInformation?:
        | ITeacherMoreInformation
        | IStudentMoreInformation
        | IInhouseAdminMoreInformation
        | ICompanyAdminMoreInformation;
    status?: IUserStatus[];
}

export interface ITeacherMoreInformation {
    address?: IAddress;
    birthday?: string;
    companyId?: ObjectId;
    subjects?: ISubject[];
    grades?: IGrade[];
}

export interface IStudentMoreInformation {
    address?: IAddress;
    birthday?: string;
    companyId?: ObjectId;
    favoriteSubjects?: ISubject[];
    grade?: IGrade;
}

export interface IInhouseAdminMoreInformation {
    address?: IAddress;
    birthday?: string;
    customerRoles?: ObjectId[];
}

export interface ICompanyAdminMoreInformation {
    address?: IAddress;
    birthday?: string;
    companyId: ObjectId;
    customerRoles?: ObjectId[];
}

export interface IUserStatus {
    provider: AuthProvider;
    status: UserStatus;
}

export interface IRegisterEmailBody {
    email: string;
}

export interface IActiveEmailBody {
    token: string;
    password: string;
}

export interface IForgotPasswordBody {
    email: string;
}

export interface IResetPasswordBody {
    token: string;
    password: string;
}

export interface IRequestOtpBody {
    phoneNumber: string;
}

export interface IChangePasswordBody {
    oldPassword?: string;
    newPassword: string;
}

export interface IInitProfileBody {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthday?: string;
    systemRole: SystemRole;
    subjects: { _id: ObjectId; }[];
    grades: { _id: ObjectId; }[];
}

export interface IUpdateProfileBody {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthday?: string;
    subjects: { _id: ObjectId; }[];
    grades: { _id: ObjectId; }[];
}

export interface IRegisterPhoneNumberBody {
    phoneNumber: string;
}
