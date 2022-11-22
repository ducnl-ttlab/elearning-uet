import { AuthModule } from '../auth/auth.module'
import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './service/topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entity/topic.entity';
import { CategoryModule } from '../category/category.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    CategoryModule,
    CourseModule,
    UserModule,
    AuthModule
  ],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
