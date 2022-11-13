import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationCourse } from '../entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationCourse)
    private readonly notification: Repository<NotificationCourse>,
  ) {}

  async saveNotification(notification: Partial<NotificationCourse>): Promise<NotificationCourse> {
    try {
      return this.notification.save(notification);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<NotificationCourse> {
    try {
      return this.notification.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existNotification(id: number): Promise<NotificationCourse> {
    let existNotification = await this.findOneById(id);
    if (!existNotification) {
      throw new NotFoundException('Not found notification');
    }
    return existNotification;
  }
}
