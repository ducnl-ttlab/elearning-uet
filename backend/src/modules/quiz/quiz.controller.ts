import { QuestionService } from './../question/service/question.service';
import { mysqlToTimeStamp, timeStampToMysql } from 'src/common/ultils';
import { UserCourseStatus } from 'database/constant';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Headers,
  Inject,
  UseGuards,
  BadRequestException,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IUserJwt } from 'src/common/interfaces';
import { Instructor, User } from 'src/common/decorator/custom.decorator';
import {
  Auth,
  CourseAuth,
  InstructorCourseAuth,
  JoinCourseAuth,
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
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
  videoParams,
} from 'src/infra/local-file/local-files.interceptor';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
import { CourseService } from '../course/service/course.service';
import { AuthService } from '../auth/service/auth.service';
import { Quiz } from './entity/quiz.entity';
import moment from 'moment';
import { JoinCourseGuard } from 'src/common/guard/student-course.guard';
import { QuizService } from './service/quiz.service';
import { validation } from './joi.request.pipe';
import { Course } from '../course/entity/course.entity';

@ApiTags('Topic')
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
  ) {}

  @Get('/:courseId/:topicId')
  @UsePipes(...validation({ key: 'topicIdParamSchema', type: 'param' }))
  @CourseAuth()
  async getShortTopics(
    @Res() response: Response,
    @Param() param: IQuizParam,
    @Req() req: Request,
    @Headers('host') host: Headers,
  ) {
    const { courseId, topicId } = param;

    let quizes = await this.quizService.getBulks(+topicId);
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
  @UsePipes(
    ...validation(
      { key: 'createQuizSchema', type: 'body' },
      { key: 'topicIdParamSchema', type: 'param' },
    ),
  )
  async createTopic(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Param() param: IQuizParam,
    @Body() body: CreateQuizDto,
  ) {
    let { startTime, name, duration } = body;
    const { topicId } = param;

    let quiz = {
      topicId: +topicId,
      name,
      startTime: timeStampToMysql(startTime),
      duration: +duration,
    };

    let createQuiz = await this.quizService.saveQuiz(quiz);

    return res.status(HttpStatus.OK).json(new SuccessResponse(createQuiz));
  }

  @Post('topics/:courseId/:topicId')
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
    // let quiz = await this.quizServiece.saveQuizBulk(body, +topicId);

    return res.status(HttpStatus.OK).json(
      new SuccessResponse({
        result,
      }),
    );
  }
}
