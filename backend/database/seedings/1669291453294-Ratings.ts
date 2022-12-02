import { TableName, Role } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';
export class Ratings1669291453294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        userCourseId: 1,
        rating: '1',
      },
    ];

    await queryRunner.manager.getRepository(TableName.rating).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
