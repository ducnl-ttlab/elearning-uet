import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { StoryModule } from './modules/story/story.module';
import { DatabaseModule } from './common/database.module';
import { FavoriteStoryModule } from './modules/favorite-story/favorite-story.module';
import { StoryCategoryModule } from './modules/story-category/story-category.module';
import { CourseModule } from './modules/course/course.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { SearchModule } from './modules/search/search.module';
import { RedisCacheModule } from './modules/cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import { LocalFileModule } from './infra/local-file/local-file.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CategoryModule,
    StoryModule,
    FavoriteStoryModule,
    StoryCategoryModule,
    UserModule,
    AuthModule,
    MailModule,
    SearchModule,
    RedisCacheModule,
    CourseModule,
    LocalFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
