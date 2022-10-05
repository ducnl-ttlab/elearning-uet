import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { TableName } from '../constant';

export class StoryCategory1652086390646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.storyCategory,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'categoryId',
            type: 'int',
          },
          {
            name: 'storyId',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.storyCategory,
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.category,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.storyCategory,
      new TableForeignKey({
        columnNames: ['storyId'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.story,
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX category_story_index ON ${TableName.storyCategory}(storyId, categoryId) `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.storyCategory);
  }
}
