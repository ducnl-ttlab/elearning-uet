import { TopicService } from './../topics/service/topic.service';
import { UserCourse } from './../user-courses/entity/user-course.entity';
import { CommentService } from './service/comment.service';
import {
  CommentType,
  NotificationType,
  UserCourseStatus,
} from 'database/constant';
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
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IUserJwt } from 'src/common/interfaces';
import {
  Instructor,
  Student,
  User,
} from 'src/common/decorator/custom.decorator';
import { Auth, CourseAuth } from 'src/common/decorator/auth.decorator';
import { validation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import {
  CategoryDto,
  CheckoutDto,
  CheckoutCourseDto,
  JoinCourseDto,
} from './dto/user-course.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
import { CourseService } from '../course/service/course.service';
import { AuthService } from '../auth/service/auth.service';
import { Comment } from './entity/comment.entity';
import { Course } from '../course/entity/course.entity';
import { Topic } from '../topics/entity/topic.entity';
import { NotificationService } from '../notification/service/notification.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly topicService: TopicService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post(':courseId')
  @CourseAuth()
  @UsePipes(
    ...validation(
      { type: 'query', key: 'topicQuerySchema' },
      { type: 'body', key: 'commentBodySchema' },
      { type: 'param', key: 'commentParamSchema' },
    ),
  )
  async comment(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Student() student: UserCourse,
    @User() user: IUserJwt,
    @Query() query: { topicId: string },
    @Body() body: { comment: string },
    @Param() param: { courseId: string },
  ) {
    let topic: Partial<Topic> = {};
    if (query?.topicId) {
      topic = await this.topicService.existTopic(+query?.topicId);
    }
    const { comment } = body;
    let idBad = false;
    // check comment

    // save comment to db
    let newComment: Partial<Comment> = {
      userId: user.id,
      sourceId: topic.id ? +topic?.id : +param?.courseId,
      type: topic.id ? CommentType.topic : CommentType.course,
      comment,
      time: new Date(),
      isBad: idBad,
    };
    await this.commentService.saveComment(newComment);

    // get commentor in course or topic
    let commentorIds = await this.commentService.findCommentors(
      newComment.type,
      newComment.sourceId,
    );

    await Promise.all(
      commentorIds.map((userId) => {
        if(userId !== user.id) {
          let newNotification = {
            userId,
            type:
              newComment.type === CommentType.topic
                ? NotificationType.topicComment
                : NotificationType.courseComment,
            parentId: newComment.sourceId,
            isRead: false,
            title: `Bình luận ${
              newComment.type === CommentType.topic
                ? 'khóa học'
                : 'chủ đề khóa học'
            }`,
            description: `${user.username} đã bình luận khóa học`,
          };
          this.notificationService.saveNotification(newNotification);
        }
      }),
    );

    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }

  @Get(':courseId')
  @CourseAuth()
  @UsePipes(
    ...validation(
      { type: 'query', key: 'topicQuerySchema' },
      { type: 'param', key: 'commentParamSchema' },
    ),
  )
  async getComment(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Student() student: UserCourse,
    @User() user: IUserJwt,
    @Query() query: { topicId: string },
    @Body() body: { comment: string },
    @Param() param: { courseId: string },
  ) {
    let topic: Partial<Topic> = {};
    if (query?.topicId) {
      topic = await this.topicService.existTopic(+query?.topicId);
    }

    // get commentor in course or topic
    let commentors = await this.commentService.findCommentors(
      CommentType.course,
      1,
    );

    return res.status(HttpStatus.OK).json(new SuccessResponse(commentors));
  }
}
