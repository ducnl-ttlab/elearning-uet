import { TableName } from '../../../../database/constant';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { Story } from '../../story/entity/story.entity';

@Entity({ name: TableName.storyCategory })
export class StoryCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storyId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.storyCategoryList)
  @JoinColumn()
  category?: Category;

  @ManyToOne(() => Story, (story) => story.storyCategoryList)
  @JoinColumn()
  story?: Story;
}
