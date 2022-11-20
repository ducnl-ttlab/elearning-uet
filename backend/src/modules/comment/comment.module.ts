import { AuthModule } from '../auth/auth.module'
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './service/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { CategoryModule } from '../category/category.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CategoryModule,
    CourseModule,
    UserModule,
    AuthModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class TopicModule {}
