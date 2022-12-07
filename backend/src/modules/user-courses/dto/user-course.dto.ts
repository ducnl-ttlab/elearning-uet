import { CommonListResponse } from './../../../common/helpers/api.response';
import { ApiProperty } from '@nestjs/swagger';
import { Role, UserCourseStatus } from 'database/constant';

interface ItemCheckout {
  id: number;
  quantity: number;
}

export class CheckoutDto {
  @ApiProperty()
  items: ItemCheckout[];
}

export class CheckoutCourseDto {
  @ApiProperty()
  courseId: number;
}
export class JoinCourseDto {
  @ApiProperty()
  courseId: number;

  @ApiProperty()
  code: string;
}

export class CategoryDto {
  @ApiProperty()
  categoryId: number;
}

export class CourseDto {
  @ApiProperty()
  id: number;
}

export interface StudentCourseDto {
  startCourseTime: Date;
  startBlockTime: Date;
  status: UserCourseStatus;
  rating: number;

  courseId: number;
  courseName: string;
  instructorName: string;
  beginCourseTime: Date;
  endCourseTime: Date;
  price: number;
  image: string;
}

export class StudenCourseListResponse extends CommonListResponse<StudentCourseDto> {}

export interface CheckRegisterDto {
  status: UserCourseStatus | Role | 'guest';
}

export interface CourseStudentList {
  userId: string;
  avatar: string;
  username: string;
  email: string;
  status: string;
  startCourseTime: string | Date;
}

export interface QueryListDto {
  keyword: string;
  page: number;
  pageSize: number;
}
export class CourseStudenListResponse extends CommonListResponse<CourseStudentList> {}
