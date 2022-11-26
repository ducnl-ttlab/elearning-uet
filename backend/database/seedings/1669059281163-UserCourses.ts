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
      {
        courseId: 1,
        userId: '123456xsabf',
        status: UserCourseStatus.expired,
        startCourseTime: new Date(),
      },
      {
        courseId: 1,
        userId: '123456xsabxf',
        status: UserCourseStatus.commentBlocking,
        startCourseTime: new Date(),
        startBlockTime: new Date(),
        blockDuration: 45
      },
      {
        courseId: 1,
        userId: '123456xsabxfxa',
        status: UserCourseStatus.accepted,
        startCourseTime: new Date(),
      },
    ];

    await queryRunner.manager.getRepository(TableName.userCourse).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
