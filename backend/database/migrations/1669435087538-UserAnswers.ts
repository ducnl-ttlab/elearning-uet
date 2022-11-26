import { TableName } from 'database/constant';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class UserAnswers1669435087538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: TableName.userAnswer,
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'answerId',
                  type: 'int',
                }
              ],
            }),
          );
      
          await queryRunner.createForeignKey(
            TableName.userAnswer,
            new TableForeignKey({
              columnNames: ['answerId'],
              referencedColumnNames: ['id'],
              referencedTableName: TableName.answer,
              onDelete: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TableName.answer);

    }

}
