import { UserCourseModule } from './../user-courses/user-courses.module';
import { Module } from '@nestjs/common';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswerService } from './service/user-answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './entity/user-answer.entity';
import { CourseModule } from '../course/course.module';
import { AnswerModule } from '../answer/answer.module';
import { QuizModule } from '../quiz/quiz.module';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAnswer]),
    CourseModule,
    UserCourseModule,
    QuizModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [UserAnswerController],
  providers: [UserAnswerService],
  exports: [UserAnswerService],
})
export class UserAnswerModule {}
