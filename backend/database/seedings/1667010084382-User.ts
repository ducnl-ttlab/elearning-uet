import { TableName, Role } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class User1667010084382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        id: '123456abc',
        username: 'ducluong',
        email: 'ducnl@tokyotechlab.com',
        password: '12345678',
        phone: '012345678',
        verified: true,
        role: Role.instructor,
      },
      {
        id: '123456abe',
        username: 'binhmup',
        email: 'binhltl@tokyotechlab.com',
        password: '12345678',
        phone: '012345678',
        verified: true,
        role: Role.admin,
      },
      {
        id: '123456abf',
        username: 'hieumup',
        email: 'hieudt@tokyotechlab.com',
        phone: '012345678',
        password: '12345678',
        verified: true,
        role: Role.student,
      },
      {
        id: '123456abg',
        username: 'hieuxoan',
        email: '19020291@vnu.edu.vn',
        phone: '012345678',
        password: '12345678',
        verified: true,
        role: Role.instructor,
      },
    ];
    let itemDatas = await Promise.all(
      items.map(async (item) => {
        const hashedPassword = await bcrypt.hash(item.password, 8);
        return {
          ...item,
          password: hashedPassword,
        };
      }),
    );

    await queryRunner.manager.getRepository(TableName.user).insert(itemDatas);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
