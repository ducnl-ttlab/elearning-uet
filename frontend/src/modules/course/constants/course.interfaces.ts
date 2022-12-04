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

export interface ICoursePreviewTopic {
    id?: number;
    name?: string;
    description?: string;
}

export interface ICoursePreviewData {
    topics?: Array<ICoursePreviewTopic>;
    course?: ICourseData;
}
