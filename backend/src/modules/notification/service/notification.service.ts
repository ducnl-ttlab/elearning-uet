import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentType, NotificationType, TableName } from 'database/constant';
import { ResultSetHeader } from 'mysql2/promise';
import { getManager, Repository } from 'typeorm';
import {
  CommentNotificationDto,
  StudentJoinCourseDto,
} from '../dto/notification.dto';
import { NotificationCourse } from '../entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationCourse)
    private readonly notification: Repository<NotificationCourse>,
  ) {}

  async saveComment({
    commentType,
    userId,
    courseOrTopicId,
    username,
  }: CommentNotificationDto) {
    let notificationType = {
      [CommentType.topic]: {
        type: NotificationType.topicComment,
        title: 'Chủ đề khóa học',
        description: `${username} đã bình luận về chủ đề trong khóa học`,
      },
      [CommentType.course]: {
        type: NotificationType.courseComment,
        title: 'Khóa học',
        description: `${username} đã bình luận về chủ đề trong khóa học`,
      },
    };

    const { type, title, description } = notificationType[commentType];
    let newNotification = {
      userId,
      type: type,
      parentId: courseOrTopicId,
      isRead: false,
      title: title,
      description: description,
    };

    this.saveNotification(newNotification);
  }

  async studentJoinCourse({
    instructorId,
    type,
    studentId,
    courseId,
    studentName,
    courseName,
  }: StudentJoinCourseDto) {
    let newNotification = {
      userId: instructorId,
      type: NotificationType[type],
      sourceId: studentId,
      parentId: courseId,
      isRead: false,
      title: 'Học sinh tham gia khóa học',
      description: `Học sinh ${studentName} đã tham gia khóa học ${courseName} của bạn`,
    };

    return this.saveNotification(newNotification);
  }

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
    try {
      const resultItems = await entityManager.query(query, [userId]);
      return resultItems;
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
