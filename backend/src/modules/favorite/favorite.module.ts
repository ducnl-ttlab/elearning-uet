import { RedisCacheModule } from '../cache/redis-cache.module';
import { Module } from '@nestjs/common';
import { TopicController } from './favorite.controller';
import { FavoriteService } from './service/favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';
import { Favorite } from './entity/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    CourseModule,
    RedisCacheModule,
  ],
  controllers: [TopicController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
