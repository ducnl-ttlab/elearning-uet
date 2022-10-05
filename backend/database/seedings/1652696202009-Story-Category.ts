import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../constant';

export class StoryCategory1652696202009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        categoryId: 1,
        storyId: 1,
      },
      {
        categoryId: 2,
        storyId: 2,
      },
      {
        categoryId: 1,
        storyId: 3,
      },
      {
        categoryId: 1,
        storyId: 4,
      },
      {
        categoryId: 1,
        storyId: 5,
      },
      {
        categoryId: 1,
        storyId: 6,
      },
      {
        categoryId: 1,
        storyId: 7,
      },
      {
        categoryId: 1,
        storyId: 8,
      },
      {
        categoryId: 1,
        storyId: 9,
      },
      {
        categoryId: 1,
        storyId: 10,
      },
      {
        categoryId: 1,
        storyId: 11,
      },
      {
        categoryId: 1,
        storyId: 12,
      },
      {
        categoryId: 1,
        storyId: 13,
      },
      {
        categoryId: 1,
        storyId: 14,
      },
    ];
    await queryRunner.manager
      .getRepository(TableName.storyCategory)
      .insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
