import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './service/story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { FavoriteStoryModule } from '../favorite-story/favorite-story.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story]),
    FavoriteStoryModule,
    SearchModule,
  ],
  providers: [StoryService],
  controllers: [StoryController],
  exports: [StoryService],
})
export class StoryModule {}
