export interface EditCourseDto {
  name: string;
  price: number;
  isPublished: boolean;
}

export interface courseParam {
  courseId: number;
}
export interface userParam {
  userId: string;
}

export interface EditUserDto {
  username: string;
  phone: string;
  address: string;
  password: string;
}
