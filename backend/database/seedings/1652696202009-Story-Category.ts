import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../constant';

export class StoryCategory1652696202009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [];
    await queryRunner.manager
      .getRepository(TableName.storyCategory)
      .insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
