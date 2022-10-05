import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StoryCategory } from '../../story-category/entity/story-category.entity';
import { FavoriteStory } from '../../favorite-story/entity/favorite-story.entity';

@Entity({ name: TableName.story })
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isHot: boolean;

  @OneToMany(() => StoryCategory, (storyCategory) => storyCategory.category)
  storyCategoryList?: StoryCategory[];

  @OneToMany(() => FavoriteStory, (favoriteStory) => favoriteStory.story)
  favoriteStoryList?: FavoriteStory[];
}
