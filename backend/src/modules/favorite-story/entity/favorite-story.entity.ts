import { TableName } from '../../../../database/constant';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Story } from '../../story/entity/story.entity';

@Entity({ name: TableName.favoriteStory })
export class FavoriteStory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  storyId: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  isLike: boolean;

  @Column({ length: 255, nullable: false })
  deviceId: string;

  @ManyToOne(() => Story, (story) => story.favoriteStoryList)
  story?: Story;
}
