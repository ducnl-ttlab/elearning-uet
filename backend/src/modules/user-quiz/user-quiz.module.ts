import { UserCourseModule } from '../user-courses/user-courses.module';
import { Module } from '@nestjs/common';
import { UserQuizController } from './user-quiz.controller';
import { UserQuizService } from './service/user-quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';
import { AnswerModule } from '../answer/answer.module';
import { QuizModule } from '../quiz/quiz.module';
import { QuestionModule } from '../question/question.module';
import { UserQuiz } from './entity/user-quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuiz])],
  controllers: [UserQuizController],
  providers: [UserQuizService],
  exports: [UserQuizService],
})
export class UserQuizModule {}
