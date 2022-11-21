import { TableName, UserCourseStatus } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCourses1669059281163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        courseId: 1,
        userId: '123456abf',
        status: UserCourseStatus.accepted,
        startCourseTime: new Date(),
      },
    ];

    await queryRunner.manager.getRepository(TableName.userCourse).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
