import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationCourse } from '../entity/user-course.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationCourse)
    private readonly usercourse: Repository<NotificationCourse>,
  ) {}

  async saveUserCourse(userCourse: Partial<NotificationCourse>): Promise<NotificationCourse> {
    try {
      return this.usercourse.save(userCourse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<NotificationCourse> {
    try {
      return this.usercourse.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existUserCourse(id: number): Promise<NotificationCourse> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found course');
    }
    return existCourse;
  }
}
