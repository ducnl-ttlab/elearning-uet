import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName, NotificationType } from '../constant';

export class Notifications1667388294344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        userId: '19020206',
        sourceId: 1,
        parentId: 'React reactive',
        isRead: 0,
        type: NotificationType.studentJoinCourse,
        title: 'hoc sinh tham gia khoa hoc',
        description: 'hoc sinh tham gia khoa hoc',
      },
      {
        userId: '19020216',
        sourceId: 1,
        parentId: 'React reactive',
        isRead: 0,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh đã mua khóa học',
        description: 'học sinh đã mua khóa học',
      },
      {
        userId: '19020201',
        sourceId: 4,
        parentId: 'React reactive',
        isRead: 0,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh đã mua khóa học',
        description: 'học sinh đã mua khóa học',
      },
      {
        userId: '19020231',
        sourceId: 1,
        parentId: 'React reactive',
        isRead: 1,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh tham gia khóa học',
        description: 'học sinh tham gia khóa học',
      },
      {
        userId: '19020261',
        sourceId: 3,
        parentId: 'React reactive',
        isRead: 0,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh tham gia khóa học',
        description: 'học sinh tham gia khóa học',
      },
      {
        userId: '19020153',
        sourceId: 4,
        parentId: 'React reactive',
        isRead: 1,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh đã mua khóa học',
        description: 'học sinh đã mua khóa học',
      },
      {
        userId: '19020276',
        sourceId: 1,
        parentId: 'React reactive',
        isRead: 1,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh đã mua khóa học',
        description: 'học sinh đã mua khóa học',
      },
      {
        userId: '19020281',
        sourceId: 1,
        parentId: 'React reactive',
        isRead: 0,
        type: NotificationType.studentJoinCourse,
        title: 'học sinh tham gia khóa học',
        description: 'học sinh tham gia khóa học',
      },
    ];

    await queryRunner.manager
      .getRepository(TableName.notification)
      .insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
