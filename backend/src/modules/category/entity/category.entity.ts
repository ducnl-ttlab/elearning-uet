import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StoryCategory } from '../../story-category/entity/story-category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: TableName.category })
export class Category {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'kinh doanh' })
  @Column({ length: 255, nullable: false })
  name: string;

  @ApiProperty({ example: 'bussiness' })
  @Column({ length: 255, nullable: false })
  image: string;

  @OneToMany(() => StoryCategory, (storyCategory) => storyCategory.category)
  storyCategoryList?: StoryCategory[];
}
