import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName, NotificationType } from '../constant';

export class Notifications1667388294344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        userId: 1,
        sourceId: 1,
        parentId: 'React reactive',
        isRead: 0,
        type: NotificationType.studentJoinCourse,
        title: 'hoc sinh tham gia khoa hoc',
        description: 'hoc sinh tham gia khoa hoc',
      },
    ];

    await queryRunner.manager
      .getRepository(TableName.notification)
      .insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
