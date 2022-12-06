import { UserCourseStatus } from './course.constants';

export interface ICourseData {
    id: number;
    categoryId: number;
    name: string;
    image: string;
    price: number;
    description: string;
    instructorName: string;
    avgRating: number | null;
    studentTotal: number;
    startCourse: string;
    endCourse: string;
}

export interface ICourseListParams {
    page?: number;
    pageSize?: number;
    keyword?: string;
    rating?: string;
    categoryId?: number;
    instructorIds?: string;
}

export interface ICourseCreation {
    isPublished: boolean;
    name: string;
    description: string;
    price: number;
    startCourseTime: string;
    endCourseTime: string;
    file?: string;
}

export interface ICoursePreviewTopic {
    id?: number;
    name?: string;
    description?: string;
}

export interface ICoursePreviewData {
    topics?: Array<ICoursePreviewTopic>;
    course?: ICourseData;
}

export interface IUserCourseData {
    status?: UserCourseStatus;
    favorite?: boolean;
}

export interface IToggleCourseFavoriteResponse {
    favorite?: boolean;
}
