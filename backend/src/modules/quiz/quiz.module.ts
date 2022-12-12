import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './service/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entity/quiz.entity';
import { CategoryModule } from '../category/category.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { UserCourseModule } from '../user-courses/user-courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    CategoryModule,
    CourseModule,
    UserModule,
    AuthModule,
    ConfigModule,
    UserCourseModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
