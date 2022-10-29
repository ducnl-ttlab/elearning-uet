import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from '../entity/user-course.entity';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly usercourse: Repository<UserCourse>,
  ) {}

  async saveUserCourse(userCourse: Partial<UserCourse>): Promise<UserCourse> {
    try {
      return this.usercourse.save(userCourse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<UserCourse> {
    try {
      return this.usercourse.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existUserCourse(id: number): Promise<UserCourse> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found course');
    }
    return existCourse;
  }
}
