import { UserCourse } from './../user-courses/entity/user-course.entity';
import { CommentService } from './service/comment.service';
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
import moment from 'moment';
import { Course } from '../course/entity/course.entity';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':courseId')
  @CourseAuth()
  async comment(
    @Res() res: Response,
    @Instructor() instructor: Course,
    @Student() student: UserCourse,
    @User() user: IUserJwt,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(new SuccessResponse({ instructor, student, user, a: 'a' }));
  }
}
