import { ApiProperty } from '@nestjs/swagger';

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

export class CategoryDto {
  @ApiProperty()
  categoryId: number;
}

export class CourseDto {
  @ApiProperty()
  id: number;
}
