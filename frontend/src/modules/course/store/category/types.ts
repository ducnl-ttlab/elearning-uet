export interface Category {
    id : number;
    name : string;
    image : string;
    courseTotal: number;
    studentTotal: number;
    avgRating: number;
}

export interface CategoryState {
    categories: Category[];
    error: boolean;
}