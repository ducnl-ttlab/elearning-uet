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
import { NotificationService } from './service/notification.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/user.decorator';
import { Auth } from 'src/common/decorator/auth.decorator';
import { courseValidation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryDto, CheckoutDto } from './dto/user-course.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Get('')
  async getNotification(@Body() body: CheckoutDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ url: "session.url" });
  }
}
