import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { TableName } from '../constant';
export class FavoriteStory1652087175130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.favoriteStory,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'storyId',
            type: 'int',
          },
          {
            name: 'deviceId',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'isLike',
            type: 'bool',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.favoriteStory,
      new TableForeignKey({
        columnNames: ['storyId'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.story,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.favoriteStory);
  }
}
