import { CommentType, TableName } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';
export class Comments1668911845586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        userId: '19020301',
        sourceId: 3,
        type: CommentType.course,
        comment: 'djt me may',
        time: new Date(),
        isBad: 0,
        isBlock: 0,
      },
    ];

    await queryRunner.manager.getRepository(TableName.comment).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
