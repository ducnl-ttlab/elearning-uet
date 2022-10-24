import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../constant';

export class Story1652244550573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [];

    await queryRunner.manager.getRepository(TableName.story).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
