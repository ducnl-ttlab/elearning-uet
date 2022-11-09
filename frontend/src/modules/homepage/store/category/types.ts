export interface Category {
    // id : number;
    // name : string;
    // image : string;
    // courseTotal: number;
    // studentTotal: number;
    // avgRating: number;
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface CategoryState {
    categories: Category[];
    error: boolean;
}