import { TableName } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Topics1668350578930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        id: 1,
        courseId: 1,
        name: 'React reactive',
        description: 'Làm chủ react native',
        content:
          'React Native lets you create truly native apps and doesn"t compromise your users" experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform’s native UI building blocks.',
      },
    ];

    await queryRunner.manager.getRepository(TableName.topic).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
