import { TopicService } from './../topics/service/topic.service';
import { UserCourse } from './../user-courses/entity/user-course.entity';
import { CommentService } from './service/comment.service';
import { CommentType, NotificationType } from 'database/constant';
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
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IUserJwt } from 'src/common/interfaces';
import {
  Instructor,
  Student,
  User,
} from 'src/common/decorator/custom.decorator';
import { CourseAuth } from 'src/common/decorator/auth.decorator';
import { validation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { Comment } from './entity/comment.entity';
import { Course } from '../course/entity/course.entity';
import { Topic } from '../topics/entity/topic.entity';
import { NotificationService } from '../notification/service/notification.service';
import { getPaginatedItems, mysqlTimeStamp } from 'src/common/ultils';
// import { checkBadWordScript } from 'src/infra/python-script/check-bad-word';

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
    // check comment
    // let idBad = await checkBadWordScript(comment);

    let idBad = false;

    // save comment to db
    let newComment: Partial<Comment> = {
      userId: user.id,
      sourceId: topic.id ? +topic?.id : +param?.courseId,
      type: topic.id ? CommentType.topic : CommentType.course,
      comment,
      time: new Date(),
      isBad: idBad,
    };

    // get commentor in course or topic
    let commentorIds = await this.commentService.findCommentors(
      newComment.type,
      newComment.sourceId,
    );

    await Promise.all([
      ...commentorIds.map((userId) => {
        if (userId !== user.id) {
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
      this.commentService.saveComment(newComment),
    ]);

    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }

  @Get(':courseId')
  @CourseAuth()
  @UsePipes(
    ...validation(
      { type: 'query', key: 'queryListSchema' },
      { type: 'param', key: 'commentParamSchema' },
    ),
  )
  async getComment(
    @Res() res: Response,
    @Query() query: { topicId: string; page: string; pageSize: string },
    @Param() param: { courseId: string },
  ) {
    let topic: Partial<Topic> = {};
    let { topicId, page = 1, pageSize = 8 } = query;
    if (topicId) {
      topic = await this.topicService.existTopic(+topicId);
    }

    // get commentor in course or topic
    let commentors = await this.commentService.findComments(
      topicId ? CommentType.topic : CommentType.course,
      topicId ? +topicId : +param.courseId,
    );

    let response = {
      ...getPaginatedItems(
        commentors.map((item) => {
          return {
            ...item,
            time: mysqlTimeStamp(item.time),
          };
        }),
        +page,
        +pageSize,
      ),
      totalItems: commentors?.length,
    };

    return res.status(HttpStatus.OK).json(new SuccessResponse(response));
  }
}
