import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { Story } from '../../story/entity/story.entity';

@Entity({ name: TableName.favoriteStory })
export class StoryCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storyId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.StoryCategoryList)
  category?: Category;

  @ManyToOne(() => Story, (story) => story.StoryCategoryList)
  story?: Story;
}
