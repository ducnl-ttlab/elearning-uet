import { TableName } from 'database/constant';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Comments1668911829507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableName.comments,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'usercourseId',
            type: 'int',
          },
          {
            name: 'topicId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'comment',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'time',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'isBad',
            type: 'tinyint',
            isNullable: false,
            default: false,
          },
          {
            name: 'isBlock',
            type: 'tinyint',
            isNullable: false,
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TableName.comments,
      new TableForeignKey({
        columnNames: ['usercourseId'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.userCourse,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      TableName.comments,
      new TableForeignKey({
        columnNames: ['topicId'],
        referencedColumnNames: ['id'],
        referencedTableName: TableName.topics,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableName.comments);
  }
}
