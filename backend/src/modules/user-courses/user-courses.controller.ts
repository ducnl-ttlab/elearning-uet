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
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserCourseService } from './service/user-course.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/user.decorator';
import { Auth } from 'src/common/decorator/auth.decorator';
import { courseValidation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryDto, CourseCreateDto, CourseDto } from './dto/course.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
@ApiTags('UserCourse')
@Controller('user-course')
export class UserCourseController {
  constructor(
    private readonly courseService: UserCourseService,
    private readonly categoryService: CategoryService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  @Get()
  async testStripe() {
    return await this.stripe.customers.list();
  }
}
