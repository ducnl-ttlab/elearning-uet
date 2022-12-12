import { Course } from 'src/modules/course/entity/course.entity';
import { Instructor } from '../../common/decorator/custom.decorator';
import { FavoriteService } from '../favorite/service/favorite.service';
import {
  filterUser,
  getPaginatedItems,
  mysqlTime,
  mysqlTimeStamp,
} from 'src/common/ultils';
import { NotificationService } from '../notification/service/notification.service';
import { Role, UserCourseStatus } from 'database/constant';
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UsePipes,
  Inject,
  UseGuards,
  Headers,
  Req,
  Query,
  Put,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AdminService } from './service/admin.service';
import { IUserJwt, IUserReq } from 'src/common/interfaces';

import { validation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { courseParam, EditCourseDto } from './dto/admin.dto';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
import { CourseService } from '../course/service/course.service';
import { AuthService } from '../auth/service/auth.service';
import {
  InvitedStudentJoinCourseDto,
  StudentJoinCourseDto,
} from '../notification/dto/notification.dto';
import { RedisCacheService } from '../cache/redis-cache.service';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';
import { LoginBody } from '../auth/dto/login-dto';
import { validate } from 'class-validator';
import { Auth } from 'src/common/decorator/auth.decorator';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly notification: NotificationService,
    private readonly courseService: CourseService,
    private readonly authService: AuthService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private readonly cache: RedisCacheService,
    private readonly adminService: AdminService,
  ) {}

  @Get('users')
  @Auth('admin')
  async getUsers(
    @Body() body: LoginBody,
    @Res() res: Response,
    @Req() req: IUserReq<IUserJwt>,
    @Headers('host') host: Headers,
  ) {
    let users = await this.adminService.getAllUsers();
    return res.status(HttpStatus.OK).json(new SuccessResponse(users));
  }

  @Get('courses')
  @Auth('admin')
  async getCourses(
    @Body() body: LoginBody,
    @Res() res: Response,
    @Req() req: IUserReq<IUserJwt>,
    @Headers('host') host: Headers,
  ) {
    let courses = await this.adminService.getAllCourses();
    return res.status(HttpStatus.OK).json(new SuccessResponse(courses));
  }

  @Put('courses/:courseId')
  @Auth('admin')
  @UsePipes(
    ...validation({
      key: 'editCourseChema',
      type: 'body',
    }),
  )
  async editCourses(
    @Body() body: EditCourseDto,
    @Res() res: Response,
    @Req() req: IUserReq<IUserJwt>,
    @Headers('host') host: Headers,
    @Param() param: courseParam,
  ) {
    const { courseId } = param;

    const { name, price, isPublished } = body;
    console.log({ body });
    if (!name && !price && !isPublished) {
      throw new BadRequestException();
    }

    let updateCourse: any = {};
    if (name) {
      updateCourse.name = name;
    }
    if (price) {
      updateCourse.price = price;
    }
    if (isPublished) {
      updateCourse.isPublished = isPublished;
    }

    console.log({ updateCourse });
    let updateCoures = await this.courseService.updateCourse(
      +courseId,
      updateCourse,
    );

    return res.status(HttpStatus.OK).json(new SuccessResponse(updateCoures));
  }

  @Post('login')
  @UsePipes(
    ...validation({
      key: 'loginSchema',
      type: 'body',
    }),
  )
  async login(
    @Body() body: LoginBody,
    @Res() res: Response,
    @Req() req: IUserReq<IUserJwt>,
    @Headers('host') host: Headers,
  ) {
    const { email, password } = body;
    let user = await this.authService.validateLocalUser(email, password);

    if (user.role !== Role.admin) {
      throw new BadRequestException('incorrect role');
    }
    let unreadNotification = await this.notification.countUnreadNotification(
      user.id,
    );

    const { accessToken } = await this.authService.signUserJwt({
      email,
      id: user.id,
      username: user.username,
      role: user.role,
    });
    const { avatar } = user;

    user.avatar = avatar.startsWith('http')
      ? avatar
      : `${req.protocol}://${host}/user/image/${avatar}`;

    return res.status(HttpStatus.OK).json(
      new SuccessResponse({
        user: { ...filterUser(user), unreadNotification },
        accessToken,
      }),
    );
  }
}
