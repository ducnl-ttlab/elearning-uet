import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableName } from 'database/constant';
import { ResultSetHeader } from 'mysql2/promise';
import { getManager, Repository } from 'typeorm';
import { NotificationCourse } from '../entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationCourse)
    private readonly notification: Repository<NotificationCourse>,
  ) {}

  async saveNotification(
    notification: Partial<NotificationCourse>,
  ): Promise<NotificationCourse> {
    try {
      return this.notification.save(notification);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async readNotification(userId: string): Promise<ResultSetHeader> {
    const entityManager = getManager();
    let query = `UPDATE ${TableName.notification}
    SET isRead = 1
    WHERE userId = ?`;
    const resultItems = await entityManager.query(query, [userId]);
    return resultItems;
  }

  async findOneById(id: number): Promise<NotificationCourse> {
    try {
      return this.notification.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getNotificationsByUserId(
    userId: string,
  ): Promise<[NotificationCourse[], number]> {
    try {
      return this.notification.findAndCount({
        where: {
          userId,
        },
      });
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
