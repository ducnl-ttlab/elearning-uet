import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: TableName.user })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  role: number;

  @Column()
  resetToken: string;

  @Column()
  expiredTokenTime: number;
}
