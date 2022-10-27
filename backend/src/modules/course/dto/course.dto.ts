export interface CourseCreateDto {
  price: number;
  name: string;
  description: string;
  isPublished: boolean;
}

export interface CategoryDto {
  categoryId: number;
}

export interface CourseDto {
  id: number;
}
