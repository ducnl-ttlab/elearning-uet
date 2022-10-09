import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { StoryModule } from './modules/story/story.module';
import { DatabaseModule } from './common/database.module';
import { FavoriteStoryModule } from './modules/favorite-story/favorite-story.module';
import { StoryCategoryModule } from './modules/story-category/story-category.module';
import { Connection } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    StoryModule,
    FavoriteStoryModule,
    StoryCategoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
