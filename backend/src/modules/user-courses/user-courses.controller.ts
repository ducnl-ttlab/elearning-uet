import { NotificationService } from './../notification/service/notification.service';
import { NotificationType, UserCourseStatus } from 'database/constant';
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
import { UserCourseService } from './service/user-course.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/user.decorator';
import { Auth, JoinCourseAuth } from 'src/common/decorator/auth.decorator';
import { userCourseValidation } from './joi.request.pipe';
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
import { UserCourse } from './entity/user-course.entity';
import moment from 'moment';

@ApiTags('UserCourse')
@Controller('user-course')
export class UserCourseController {
  constructor(
    private readonly userCourseService: UserCourseService,
    private readonly notification: NotificationService,
    private readonly courseService: CourseService,
    private readonly authService: AuthService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  @Get()
  async testStripe() {
    // return await this.stripe.balance.retrieve();
    // return await this.stripe.customers.create({
    //   phone: '0915213123',
    //   name: 'ducnong',
    //   email: '19020153@vnu.edu.vn',
    // });
    return await this.stripe.customers.list({
      limit: 3,
    });
    // return await this.stripe.balance.retrieve();
    // return await this.stripe.sources.create({
    //   type: 'ach_credit_transfer',
    //   currency: 'usd',
    //   owner: {
    //     email: 'jenny.rosen@example.com',
    //   },
    // });
  }

  @Post('create-course-checkout/:courseId')
  @UsePipes(
    ...userCourseValidation({
      key: 'courseIdParamSchema',
      type: 'param',
    }),
  )
  @JoinCourseAuth()
  async createCheckout(
    @User() user: IUserJwt,
    @Param() param: CheckoutCourseDto,
    @Res() res: Response,
  ) {
    let course = await this.courseService.existCourse(param.courseId);
    let instructor = await this.courseService.getCourseInstrutor(
      course.instructorId,
    );
    let { name, price, image } = course;
    const { phone, username } = instructor;

    let images = (image && [image]) || [];
    let { code, token, time } = await this.authService.generateAuthToken();

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name,
              images,
              description: `Giảng viên: ${username} ${
                phone ? `, Số điện thoại: ${phone}` : ''
              }`,
              metadata: {
                instructor: instructor.username,
              },
            },
            unit_amount: parseInt(`${price}`),
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:8081/${code}`,
      cancel_url: `http://localhost:8081/cancel`,
    });

    // save token to db
    await this.authService.saveResetToken(user.id, token, time);
    return res.status(HttpStatus.OK).json({ url: session.url });
  }

  @Post('join-course/:courseId/:code')
  @UsePipes(
    ...userCourseValidation({
      key: 'categoryParamSchema',
      type: 'param',
    }),
  )
  @JoinCourseAuth()
  async verifyJoinCourse(
    @User() user: IUserJwt,
    @Param() param: JoinCourseDto,
    @Res() res: Response,
  ) {
    let { courseId, code } = param;
    let { id } = user;
    // check token
    let existUser = await this.authService.existEmail(user.email);
    await this.authService.verifyCode(code, existUser, 100 * 60);

    // check course
    let course = await this.courseService.existCourse(param.courseId);

    let newUserCourse: Partial<UserCourse> = {
      courseId,
      userId: id,
      status: UserCourseStatus.accepted,
      startCourseTime: new Date(),
    };

    //send notification to instructor
    let newNotification = {
      userId: course.instructorId,
      type: NotificationType.studentJoinCourse,
      sourceId: id,
      parentId: courseId,
      isRead: false,
      title: 'Học sinh tham gia khóa học',
      description: `học sinh ${user.username} đã tham gia khóa học ${course.name} của bạn`,
    };

    await Promise.all([
      this.userCourseService.saveUserCourse(newUserCourse),
      this.authService.resetTokenById(id),
      this.notification.saveNotification(newNotification),
    ]);

    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }
}
