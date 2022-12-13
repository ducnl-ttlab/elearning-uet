import { QuestionService } from './../question/service/question.service';
import { mysqlToTimeStamp, timeStampToMysql } from 'src/common/ultils';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  Headers,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Instructor, Student } from 'src/common/decorator/custom.decorator';
import {
  CourseAuth,
  InstructorCourseAuth,
} from 'src/common/decorator/auth.decorator';
import { SuccessResponse } from 'src/common/helpers/api.response';
import {
  BulkQuizInsertDto,
  CreateQuizDto,
  IEditQuizDto,
  IQueryEditDto,
  IQuizParam,
  QuizListResponseDto,
} from './dto/dto';
import { QuizService } from './service/quiz.service';
import { validation } from './joi.request.pipe';
import { Course } from '../course/entity/course.entity';
import { UserCourse } from '../user-courses/entity/user-course.entity';

@ApiTags('Topic')
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
  ) {}

  @Get('rank/:courseId')
  async rankCourses(
    @Res() res: Response,
    @Param() param: { courseId: string },
    @Query() query: IQueryEditDto,
  ) {
    const { courseId } = param;

    let courseRank = await this.quizService.rankCourse(+courseId);
    return res.status(HttpStatus.OK).json(new SuccessResponse(courseRank));
  }

  @Get('/:courseId/:topicId')
  @UsePipes(...validation({ key: 'topicIdParamSchema', type: 'param' }))
  @CourseAuth()
  async getShortTopics(
    @Res() response: Response,
    @Param() param: IQuizParam,
    @Req() req: Request,
    @Student() student: UserCourse,
    @Headers('host') host: Headers,
  ) {
    const { topicId } = param;

    console.log('student', student);

    let quizes = await this.quizService.getBulks(+topicId, student?.userId);

    quizes = quizes.map((item) => {
      const { startTime } = item;
      return {
        ...item,
        startTime: mysqlToTimeStamp(startTime),
      };
    });

    const res: QuizListResponseDto = {
      items: quizes,
      totalItems: quizes.length,
    };
    return response.status(HttpStatus.OK).json(new SuccessResponse(res));
  }

  @Get('/:courseId/:topicId')
  @UsePipes(...validation({ key: 'topicIdParamSchema', type: 'param' }))
  @CourseAuth()
  async getTopics(
    @Req() req: Request,
    @Res() response: Response,
    @Param() param: { courseId: number },
    @Headers('host') host: Headers,
  ) {
    return response.status(HttpStatus.OK).json(new SuccessResponse('res'));
  }

  @Post('/:courseId/:topicId')
  @InstructorCourseAuth()
  async createTopics(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Param() param: IQuizParam,
    @Body() body: BulkQuizInsertDto,
  ) {
    const { topicId } = param;

    let quiz = await this.quizService.saveQuizBulk(body, +topicId);

    return res.status(HttpStatus.OK).json(new SuccessResponse(quiz));
  }

  @Put(':courseId/:topicId')
  @InstructorCourseAuth()
  @UsePipes(...validation({ key: 'topicIdParamSchema', type: 'param' }))
  async updateQuiz(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Param() param: IQuizParam,
    @Body() body: IEditQuizDto,
    @Query() query: IQueryEditDto,
  ) {
    const { topicId } = param;
    const { sourceId, type } = query;
    let { answer, question, quiz } = body;
    let result: any;
    if (quiz) {
      await this.quizService.updateQuiz(quiz);
    } else if (question) {
      result = await this.quizService.updateQuestion(question);
    } else if (answer) {
      result = await this.quizService.updateAnswer(answer);
    }

    return res.status(HttpStatus.OK).json(
      new SuccessResponse({
        result,
      }),
    );
  }

  @Delete(':courseId/:topicId')
  @InstructorCourseAuth()
  @UsePipes(
    ...validation(
      { key: 'topicIdParamSchema', type: 'param' },
      { key: 'editQuizQuerySchema', type: 'query' },
    ),
  )
  async deleteQuiz(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Param() param: IQuizParam,
    @Query() query: IQueryEditDto,
  ) {
    const { sourceId, type } = query;
    let result: any;

    switch (type) {
      case 'answer': {
        result = await this.quizService.deleteAnswer(sourceId);
        break;
      }
      case 'question': {
        result = await this.quizService.deleteQuestion(sourceId);
        break;
      }
      case 'quiz': {
        result = await this.quizService.deleteQuiz(sourceId);
        break;
      }
    }

    return res.status(HttpStatus.OK).json(new SuccessResponse(result));
  }
}
