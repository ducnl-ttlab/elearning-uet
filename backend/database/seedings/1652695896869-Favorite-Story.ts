import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../constant';

export class FavoriteStory1652695896869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [];

    await queryRunner.manager
      .getRepository(TableName.favoriteStory)
      .insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
