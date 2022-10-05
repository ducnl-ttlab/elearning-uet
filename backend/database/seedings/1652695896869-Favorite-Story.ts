import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../constant';

export class FavoriteStory1652695896869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        storyId: 1,
        deviceId: '7ac39b930e618b7c',
        isLike: false,
      },
      {
        storyId: 2,
        deviceId: '7ac39b930e618b7c',
        isLike: true,
      },
      {
        storyId: 3,
        deviceId: '7ac39b930e618b7c',
        isLike: false,
      },
    ];

    await queryRunner.manager
      .getRepository(TableName.favoriteStory)
      .insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
