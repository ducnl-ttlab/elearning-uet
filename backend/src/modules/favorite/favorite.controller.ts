import { defaultResponseTime, mysqlTime } from 'src/common/ultils';
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
import { User } from 'src/common/decorator/custom.decorator';
import { Auth, JoinCourseAuth } from 'src/common/decorator/auth.decorator';
import { SuccessResponse } from 'src/common/helpers/api.response';
import {
  CategoryDto,
  CheckoutDto,
  CheckoutCourseDto,
  JoinCourseDto,
} from './dto/topic.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
import { CourseService } from '../course/service/course.service';
import { AuthService } from '../auth/service/auth.service';
import moment from 'moment';
import { JoinCourseGuard } from 'src/common/guard/student-course.guard';
import { validation } from './joi.request.pipe';

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly courseService: CourseService) {}

  @Get('short/:courseId')
  @UsePipes(...validation({ key: 'courseIdParamSchema', type: 'param' }))
  async getTopics(
    @Req() req: Request,
    @Res() response: Response,
    @Param() param: { courseId: number },
    @Headers('host') host: Headers,
  ) {}
}
