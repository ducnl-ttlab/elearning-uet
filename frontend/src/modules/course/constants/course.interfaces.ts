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
    rating?: number;
    categoryId?: number;
}
