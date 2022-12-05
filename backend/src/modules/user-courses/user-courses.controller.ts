import { FavoriteService } from './../favorite/service/favorite.service';
import {
  getPaginatedItems,
  mysqlTime,
  mysqlTimeStamp,
} from 'src/common/ultils';
import { NotificationService } from './../notification/service/notification.service';
import { UserCourseStatus } from 'database/constant';
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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCourseService } from './service/user-course.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/custom.decorator';
import { Auth, JoinCourseAuth } from 'src/common/decorator/auth.decorator';
import { userCourseValidation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import {
  CheckoutCourseDto,
  JoinCourseDto,
  StudenCourseListResponse,
  StudentCourseDto,
  CheckRegisterDto,
} from './dto/user-course.dto';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
import { CourseService } from '../course/service/course.service';
import { AuthService } from '../auth/service/auth.service';
import { UserCourse } from './entity/user-course.entity';
import { StudentJoinCourseDto } from '../notification/dto/notification.dto';
import { RedisCacheService } from '../cache/redis-cache.service';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('UserCourse')
@Controller('user-course')
export class UserCourseController {
  constructor(
    private readonly userCourseService: UserCourseService,
    private readonly notification: NotificationService,
    private readonly courseService: CourseService,
    private readonly authService: AuthService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private readonly cache: RedisCacheService,
    private readonly favoriteService: FavoriteService,
  ) {}

  // @Get()
  // async testStripe() {
  //   // return await this.stripe.balance.retrieve();
  //   // return await this.stripe.customers.create({
  //   //   phone: '0915213123',
  //   //   name: 'ducnong',
  //   //   email: '19020153@vnu.edu.vn',
  //   // });
  //   return await this.stripe.customers.list({
  //     limit: 3,
  //   });
  //   // return await this.stripe.balance.retrieve();
  //   // return await this.stripe.sources.create({
  //   //   type: 'ach_credit_transfer',
  //   //   currency: 'usd',
  //   //   owner: {
  //   //     email: 'jenny.rosen@example.com',
  //   //   },
  //   // });
  // }

  @Get('')
  @Auth('student')
  @UsePipes(
    ...userCourseValidation({
      key: 'userCourseQueryListSchema',
      type: 'param',
    }),
  )
  async getCourses(
    @User() user: IUserJwt,
    @Res() res: Response,
    @Query() query: { keyword: string; page: number; pageSize: number },
  ) {
    const { keyword, page, pageSize } = query;

    let userCourses: StudentCourseDto[] = await this.cache.setOrgetCache(
      `usercourse${user.id}`,
      async () => {
        let userCourses = await this.userCourseService.findCoursesByUserId(
          user.id,
        );

        userCourses = userCourses.map((item) => {
          let {
            startBlockTime,
            startCourseTime,
            beginCourseTime,
            endCourseTime,
          } = item;
          return {
            ...item,
            startCourseTime: mysqlTime(startCourseTime),
            startBlockTime: mysqlTimeStamp(startBlockTime),
            beginCourseTime: mysqlTime(beginCourseTime),
            endCourseTime: mysqlTime(endCourseTime),
          };
        });
      },
    );

    if (keyword) {
      userCourses = [
        ...userCourses.filter((item) => {
          return item.courseName.includes(keyword);
        }),
      ];
    }

    const response: StudenCourseListResponse = {
      ...getPaginatedItems(userCourses, +page, +pageSize),
      totalItems: userCourses.length,
    };

    return res.status(HttpStatus.OK).json(new SuccessResponse(response));
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
    let { id, username } = user;
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
    let newNotification: StudentJoinCourseDto = {
      instructorId: course.instructorId,
      type: 'studentJoinCourse',
      studentId: id,
      courseId: course.id,
      studentName: username,
      courseName: course.name,
    };

    await Promise.all([
      this.userCourseService.saveUserCourse(newUserCourse),
      this.authService.resetTokenById(id),
      this.notification.studentJoinCourse(newNotification),
    ]);

    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }

  @Post('register-free-course/:courseId')
  @UsePipes(
    ...userCourseValidation({
      key: 'courseIdParamSchema',
      type: 'param',
    }),
  )
  @JoinCourseAuth()
  async registerFreeCourse(
    @User() user: IUserJwt,
    @Param() param: CheckoutCourseDto,
    @Res() res: Response,
  ) {
    let { courseId } = param;
    let { id, username } = user;

    // check course
    let course = await this.courseService.existCourse(param.courseId);

    let newUserCourse: Partial<UserCourse> = {
      courseId,
      userId: id,
      status: UserCourseStatus.accepted,
      startCourseTime: new Date(),
    };

    //send notification to instructor
    let newNotification: StudentJoinCourseDto = {
      instructorId: course.instructorId,
      type: 'studentJoinCourseFree',
      studentId: id,
      courseId: course.id,
      studentName: username,
      courseName: course.name,
    };

    await Promise.all([
      this.userCourseService.saveUserCourse(newUserCourse),
      this.notification.studentJoinCourse(newNotification),
    ]);

    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }

  @Get('check/:courseId')
  @UsePipes(
    ...userCourseValidation({
      key: 'courseIdParamSchema',
      type: 'param',
    }),
  )
  @UseGuards(JWTAuthGuard)
  async checkCourseRegistration(
    @User() user: IUserJwt,
    @Param() param: CheckoutCourseDto,
    @Res() res: Response,
  ) {
    let course = await this.courseService.existCourse(param.courseId);
    if (!course) {
      throw new NotFoundException('Not found course');
    }
    let userCourse = await this.userCourseService.findOneByUsercourse(
      user.id,
      course.id,
    );

    let favorite = await this.favoriteService.existFavorite(user.id, course.id);

    let status: CheckRegisterDto['status'] =
      userCourse?.status || user.role || 'guest';

    return res
      .status(HttpStatus.OK)
      .json(new SuccessResponse({ status, favorite: !!favorite }));
  }
}
