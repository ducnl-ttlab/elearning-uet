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
        image:
          'https://lptech.asia/uploads/files/2020/05/25/lap-trinh-web-php-mysql.png',
      },
      {
        instructorId: '19020281',
        categoryId: 2,
        name: 'khoa hoc AI co ban',
        description: 'khoa hoc AI co ban',
        price: 0,
        isPublished: true,
        image:
          'https://cdn.vietnambiz.vn/2019/9/24/w020190722589883245257-15692906256681976192157.jpg',
      },
      {
        instructorId: '19020286',
        categoryId: 3,
        name: 'khoa hoc lap trinh nang cao',
        description: 'khoa hoc lap trinh nang cao',
        price: 1000,
        isPublished: true,
        image:
          'https://prod-discovery.edx-cdn.org/media/course/image/825420a7-fa09-4c94-8deb-1e4decb916f4-56f44cd9d8e7.small.jpeg',
      },
      {
        instructorId: '19020075',
        categoryId: 4,
        name: 'khoa hoc lap trinh python',
        description: 'khoa hoc lap trinh python',
        price: 15000,
        isPublished: true,
        image:
          'https://images.viblo.asia/35852bff-d14e-457f-b562-00db7c0494cb.png',
      },
      {
        instructorId: '19020211',
        categoryId: 5,
        name: 'khoa hoc machine learning',
        description: 'khoa hoc machine learning',
        price: 20000,
        isPublished: true,
        image:
          'https://csc.edu.vn/data/images/mon-hoc/lap-trinh/mon-hoc-machine-learning-voi-python.png',
      },
      {
        instructorId: '123456xsabf',
        categoryId: 6,
        name: 'khoa hoc deep learning',
        description: 'khoa hoc deep learning',
        price: 40000,
        isPublished: true,
        image:
          'https://nordiccoder.com/app/uploads/2019/08/Machine_learning.jpg',
      },
      {
        instructorId: '123456abf',
        categoryId: 7,
        name: 'khoa hoc computer vision',
        description: 'khoa hoc computer vision',
        price: 40000,
        isPublished: true,
        image:
          'https://www.oracle.com/a/tech/img/og-computer-vision-facebook.jpg',
      },
      {
        instructorId: '19020476',
        categoryId: 8,
        name: 'khoa hoc natural language processing',
        description: 'khoa hoc natural language processing',
        price: 50000,
        isPublished: true,
        image:
          'https://i0.wp.com/trituenhantao.io/wp-content/uploads/2019/06/nlp.jpg?fit=1200%2C600&ssl=1',
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
