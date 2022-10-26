import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entity/course.entity';
import { CourseDto } from '../dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly course: Repository<Course>,
  ) {}

  async saveCourse(course: Partial<Course>): Promise<Course> {
    try {
      return this.course.save(course);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
