import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryModule } from './modules/story/story.module';
import { DatabaseModule } from './common/database.module';
import { FavoriteStoryModule } from './modules/favorite-story/favorite-story.module';
import { StoryCategoryModule } from './modules/story-category/story-category.module';
import { Connection } from 'typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { CategoryModule } from './modules/category/category.module';
import { SearchModule } from './modules/search/search.module';
@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    StoryModule,
    FavoriteStoryModule,
    StoryCategoryModule,
    UserModule,
    AuthModule,
    MailModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
