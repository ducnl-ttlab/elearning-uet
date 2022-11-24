import { TableName, Role } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
const gravatar = require('gravatar');

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
        id: '123456xsabf',
        username: 'hanhnd',
        email: 'hanhnd@tokyotechlab.com',
        phone: '012345678',
        password: '12345678',
        verified: true,
        role: Role.student,
      },
      {
        id: '123456xsabxf',
        username: 'congdv',
        email: 'congdv@tokyotechlab.com',
        phone: '012345678',
        password: '12345678',
        verified: true,
        role: Role.student,
      },
      {
        id: '123456xsabxfxa',
        username: 'vupa',
        email: 'vupa@tokyotechlab.com',
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
        let avatar = await gravatar.url(
          item.email,
          { s: '100', r: 'x', d: 'retro' },
          true,
        );
        return {
          ...item,
          avatar,
          password: hashedPassword,
        };
      }),
    );

    await queryRunner.manager.getRepository(TableName.user).insert(itemDatas);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
