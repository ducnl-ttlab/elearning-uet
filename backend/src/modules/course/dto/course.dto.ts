import { ApiProperty } from '@nestjs/swagger';
import { CommonListResponse } from 'src/common/helpers/api.response';

export class CourseCreateDto {
  @ApiProperty({
    description: 'The price of course',
    minimum: 0,
    default: 0,
  })
  price: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  startCourseTime: string;

  @ApiProperty()
  endCourseTime: string;
}

export interface CourseDto {
  id: number;
  categoryId: number;
  instructorId: string;
  description: string;
  name: string;
  isPublished: boolean;
  price: number;
  startCourseTime: Date;
  endCourseTime: Date;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export class CategoryDto {
  @ApiProperty()
  categoryId: number;
}
export interface CourseQueryDto {
  page: number
  keyword: string
  rating: number
  pageSize: number
}
export interface CourseSearchQueryDto {
  page: number
  keyword: string
  pageSize: number
  fields: string
}
export class CourseDto {
  @ApiProperty()
  id: number;
}
export class CourseListResponse extends CommonListResponse<CourseDto> {}
