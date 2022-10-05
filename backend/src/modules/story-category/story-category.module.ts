import { Module } from '@nestjs/common';
import { StoryCategoryController } from './story-category.controller';
import { StoryCategoryService } from './service/story-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryCategory } from './entity/story-category.entity';
import { StoryModule } from '../story/story.module';
import { CategoryModule } from '../category/category.module';
import { FavoriteStoryModule } from '../favorite-story/favorite-story.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryCategory]),
    CategoryModule,
    StoryModule,
    FavoriteStoryModule,
  ],
  providers: [StoryCategoryService],
  controllers: [StoryCategoryController],
})
export class StoryCategoryModule {}
