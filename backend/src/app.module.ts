import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { StoryModule } from './modules/story/story.module';
import { DatabaseModule } from './common/database.module';
import { FavoriteStoryModule } from './modules/favorite-story/favorite-story.module';
import { StoryCategoryModule } from './modules/story-category/story-category.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    StoryModule,
    FavoriteStoryModule,
    StoryCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
