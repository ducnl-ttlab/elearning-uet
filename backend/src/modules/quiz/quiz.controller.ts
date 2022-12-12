import {
  defaultResponseTime,
  mysqlTime,
  removeExtention,
} from 'src/common/ultils';
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
import { CreateQuizDto } from './dto/dto';
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
    private readonly topicService: QuizService,
    private readonly courseService: CourseService,
  ) {}

  @Get('')
  @UsePipes(...validation({ key: 'topicIdParamSchema', type: 'param' }))
  async getShortTopics(
    @Res() response: Response,
    @Param() param: { courseId: number },
    @Req() req: Request,
    @Headers('host') host: Headers,
  ) {
    // const { courseId } = param;

    // let [course] = await this.courseService.instructorCourseDetail(courseId);

    // course.image =
    //   (course.image &&
    //     (course.image.startsWith('http')
    //       ? course.image
    //       : `${req.protocol}://${host}/course/image/${course.image}`)) ||
    //   '';

    // course.avatar =
    //   (course.avatar &&
    //     (course.avatar.startsWith('http')
    //       ? course.avatar
    //       : `${req.protocol}://${host}/user/image/${course.avatar}`)) ||
    //   '';

    // course.startCourseTime =
    //   (course.startCourseTime && mysqlTime(course.startCourseTime)) ||
    //   ('' as unknown as Date);

    // course.endCourseTime =
    //   (course.endCourseTime && mysqlTime(course.endCourseTime)) ||
    //   ('' as unknown as Date);

    // let { created_at, updated_at } = defaultResponseTime(
    //   course.created_at,
    //   course.updated_at,
    // );

    // course.created_at = created_at;
    // course.updated_at = updated_at;

    // const topics = await this.topicService.findShortCourseTopicList(courseId);
    // const res = {
    //   topics: topics,
    //   course: course,
    // };
    return response.status(HttpStatus.OK).json(new SuccessResponse('res'));
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
    // const { courseId } = param;
    // let topics = await this.topicService.getTopicsByCourseId(courseId);
    // let res: TopicListResponse = {
    //   items: topics[0].map((item) => {
    //     let { video } = item;
    //     if (video) {
    //       let videoName = removeExtention(video);
    //       video = video.startsWith('http')
    //         ? video
    //         : (videoName &&
    //             `${req.protocol}://${host}/chunk/${videoName}/video.m3u8`) ||
    //           '';
    //     }

    //     return {
    //       ...item,
    //       video: video || '',
    //     };
    //   }),
    //   totalItems: topics[1],
    // };
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
    @Body() body: CreateQuizDto,
  ) {
    console.log('instructor', instructor);
    let { startTime, name, duration } = body;

    return res.status(HttpStatus.OK).json(new SuccessResponse(name, duration));
  }
}
