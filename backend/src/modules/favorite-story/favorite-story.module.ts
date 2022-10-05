import { Module } from '@nestjs/common';
import { FavoriteStoryController } from './favorite-story.controller';
import { FavoriteStoryService } from './service/favorite-story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteStory } from './entity/favorite-story.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteStory])],
  providers: [FavoriteStoryService],
  controllers: [FavoriteStoryController],
  exports: [FavoriteStoryService],
})
export class FavoriteStoryModule {}
