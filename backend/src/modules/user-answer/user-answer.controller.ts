import { IUserJwt } from 'src/common/interfaces';
import { UserAnswerService } from './service/user-answer.service';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CourseAuth,
  InstructorCourseAuth,
  StudentCourseAuth,
} from 'src/common/decorator/auth.decorator';
import { QuestionService } from '../question/service/question.service';
import { QuizService } from '../quiz/service/quiz.service';
import { AnswerQuizBody, QAParam } from './dto/dto';
import { validation } from './joi.request.pipe';
import { Request, Response } from 'express';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { User } from 'src/common/decorator/custom.decorator';

@ApiTags('UserAnswer')
@Controller('user-answer')
export class UserAnswerController {
  constructor(
    private readonly quizService: QuizService,
    private readonly userAnswerService: UserAnswerService,
  ) {}

  @Post('/:courseId/:quizId')
  @StudentCourseAuth()
  @UsePipes(...validation({ key: 'quizIdParamSchema', type: 'param' }))
  async createTopic(
    @Res() res: Response,
    @Param() param: QAParam,
    @Body() body: number[],
    @User() user: IUserJwt,
  ) {
    const { quizId } = param;
    let answerIds = (await this.quizService.getAnswerList(quizId)).map(
      (item) => item.id,
    );

    let answerObj = answerIds.reduce(
      (acc, answerId) => ({ ...acc, [answerId]: true }),
      {},
    );

    let userAnswer = await Promise.all(
      body.map((answerId) => {
        if (answerObj[answerId]) {
          let newUserAnswer = {
            userId: user.id,
            answerId,
          };
          return this.userAnswerService.save(newUserAnswer);
        }
      }),
    );

    return res.status(HttpStatus.OK).json(new SuccessResponse(userAnswer));
  }
}
