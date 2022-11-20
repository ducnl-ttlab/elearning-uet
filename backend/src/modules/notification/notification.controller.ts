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
  Put,
  Patch,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { NotificationService } from './service/notification.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/user.decorator';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  NotificationListResponse,
  QueryNotificationDto,
} from './dto/notification.dto';
import { defaultResponseTime, getPaginatedItems } from 'src/common/ultils';
import { NotificationType } from 'database/constant';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notification: NotificationService) {}

  @Post('send')
  @UseGuards(JWTAuthGuard)
  async sendNotification(@Res() res: Response, @User() user: IUserJwt) {
    let newNotification = {
      userId: '123456abc',
      type: NotificationType.studentJoinCourse,
      sourceId: '123456abf',
      parentId: 1,
      isRead: false,
      title: 'Học sinh tham gia khóa học',
      description: `học sinh ${user.username} đã tham gia khóa học fex của bạn`,
    };

    await this.notification.saveNotification(newNotification);
    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  async getNotification(
    @Res() res: Response,
    @User() user: IUserJwt,
    @Query() query: QueryNotificationDto,
  ) {
    let { page, pageSize } = query;
    console.log(user.id);
    let notification = await this.notification.getNotificationsByUserId(
      user.id,
    );
    let items = notification[0].map((item) => {
      let { created_at, updated_at } = item;
      return {
        ...item,
        ...defaultResponseTime(created_at, updated_at),
      };
    });

    let response: NotificationListResponse = {
      ...getPaginatedItems(items, +page, +pageSize),
      totalItems: notification[1],
    };
    return res.status(HttpStatus.OK).json(new SuccessResponse(response));
  }

  @Patch()
  @UseGuards(JWTAuthGuard)
  async readNotification(@Res() res: Response, @User() user: IUserJwt) {
    let notification = await this.notification.readNotification(user.id);
    return res.status(HttpStatus.OK).json(new SuccessResponse(notification));
  }
}
