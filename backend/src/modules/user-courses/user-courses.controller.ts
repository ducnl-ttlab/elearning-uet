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
import {
  CategoryDto,
  CheckoutDto,
  CheckoutCourseDto,
} from './dto/user-course.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { STRIPE_CLIENT } from 'src/common/constant';
import Stripe from 'stripe';
import { CourseService } from '../course/service/course.service';
import { AuthService } from '../auth/service/auth.service';

@ApiTags('UserCourse')
@Controller('user-course')
export class UserCourseController {
  constructor(
    private readonly userCourseService: UserCourseService,
    private readonly categoryService: CategoryService,
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
  @Auth("student")
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
    const {phone, username} = instructor

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
              description: `Giảng viên: ${username} ${phone? `, phone:${phone}`: ''}`,
              metadata: {
                instructor: instructor.username,
              }
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
    await this.authService.saveResetToken(user.id, token, time)
    return res.status(HttpStatus.OK).json({ url: session.url });
  }
}
