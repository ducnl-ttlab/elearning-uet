import { TableName } from 'database/constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Course1667010171189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        instructorId: '123456abc',
        name: 'ducluong',
        email: 'ducnl@tokyotechlab.com',
        password: '12345678',
        isPublished: true,
      },
    ];
    let itemDatas = items.map(async (item) => {
      return {
        ...item,
      };
    });

    await queryRunner.manager.getRepository(TableName.course).insert(itemDatas);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
