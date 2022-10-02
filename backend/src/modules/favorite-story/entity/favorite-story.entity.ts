import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Story } from '../../story/entity/story.entity';

@Entity({ name: TableName.favoriteStory })
export class FavoriteStory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  image: string;

  @ManyToOne(() => Story, (story) => story.favoriteStoryList)
  story?: Story;
}
