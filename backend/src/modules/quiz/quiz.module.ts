import { AnswerModule } from './../answer/answer.module';
import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './service/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entity/quiz.entity';
import { CategoryModule } from '../category/category.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { UserCourseModule } from '../user-courses/user-courses.module';
import { QuestionModule } from '../question/question.module';
import { Question } from './entity/question.entity';
import { Answer } from './entity/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Answer]),
    CategoryModule,
    CourseModule,
    UserModule,
    UserCourseModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
