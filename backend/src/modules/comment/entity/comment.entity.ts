import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: TableName.comments })
export class Comment {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column({ nullable: false })
  usercourseId: number;

  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  topicId: number;

  @ApiProperty({ example: '123abc' })
  @Column({ length: 255, nullable: false })
  comment: string;

  @ApiProperty({ type: 'date' })
  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    nullable: true
  })
  time: Date;

  @ApiProperty({ example: false})
  @Column({ type: 'boolean', nullable: false, default: false })
  isBad: boolean;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', nullable: false, default: false })
  isBlock: boolean;
}