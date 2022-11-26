import { TableName } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Course1667010171189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        instructorId: '123456abc',
        categoryId: 1,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '19020281',
        categoryId: 2,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '19020286',
        categoryId: 3,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '19020075',
        categoryId: 4,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '19020211',
        categoryId: 5,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '123456xsabf',
        categoryId: 6,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '123456abf',
        categoryId: 7,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
      {
        instructorId: '19020476',
        categoryId: 8,
        name: 'khoa hoc lap trinh co ban',
        description: 'khoa hoc lap trinh co ban',
        price: 12321.1,
        isPublished: true,
        image: 'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png'
      },
    ];
    let itemDatas = items.map((item) => {
      return {
        ...item,
      };
    });

    await queryRunner.manager.getRepository(TableName.course).insert(itemDatas);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
