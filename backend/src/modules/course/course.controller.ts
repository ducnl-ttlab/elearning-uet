import { Controller } from '@nestjs/common';

import { CourseService } from './service/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
}
