import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StoryCategory } from '../../story-category/entity/story-category.entity';

@Entity({ name: TableName.category })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  image: string;

  @OneToMany(() => StoryCategory, (storyCategory) => storyCategory.category)
  StoryCategoryList?: StoryCategory[];
}
