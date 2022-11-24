import { UserCourseStatus } from '../../../database/constant';
import { TopicService } from '../topics/service/topic.service';
import { UserCourse } from '../user-courses/entity/user-course.entity';
import { CommentService } from './service/rating.service';
import { CommentType, NotificationType, Role } from 'database/constant';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  Query,
  Delete,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IUserJwt } from 'src/common/interfaces';
import {
  Instructor,
  Student,
  User,
} from 'src/common/decorator/custom.decorator';
import { CourseAuth, StudentCourseAuth } from 'src/common/decorator/auth.decorator';
import { validation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { Course } from '../course/entity/course.entity';
import { Topic } from '../topics/entity/topic.entity';
import { NotificationService } from '../notification/service/notification.service';
import { getPaginatedItems, mysqlTimeStamp } from 'src/common/ultils';

@ApiTags('Rating')
@Controller('rating')
export class CommentController {
  constructor() // private readonly topicService: TopicService, // private readonly commentService: CommentService,
  // private readonly notificationService: NotificationService,
  {}

  @Post(':courseId')
  @StudentCourseAuth()
  @UsePipes(
    ...validation(
      { type: 'body', key: 'ratingBodySchema' },
      { type: 'param', key: 'ratingParamSchema' },
    ),
  )
  async comment(
    @Res() res: Response,
    @Student() student: UserCourse,
    @User() user: IUserJwt,
    @Query() query: { topicId: string },
    @Body() body: { rating: string },
    @Param() param: { courseId: string },
  ) {
    console.log(param, body);

    return res.status(HttpStatus.OK).json(new SuccessResponse({ student }));
  }
}
