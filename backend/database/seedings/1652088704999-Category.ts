import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableName } from '../constant';

export class Category1652088704999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        id: 1,
        image: 'life',
        name: 'Bài học cuộc sống',
      },
      {
        id: 2,
        image: 'peace',
        name: 'Hòa Bình',
      },
      {
        id: 3,
        name: 'Thiên nhiên',
        image: 'leaves',
      },
      {
        id: 4,
        name: 'Thành tựu',
        image: 'gold',
      },
      {
        id: 5,
        name: 'Tình cảm',
        image: 'love',
      },
      {
        id: 6,
        name: 'Ý chí',
        image: 'diamond',
      },
    ];

    await queryRunner.manager.getRepository(TableName.category).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
