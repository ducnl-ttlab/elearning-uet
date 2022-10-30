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
import { CategoryDto, CheckoutDto } from './dto/user-course.dto';
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

  @Post('create-checkout')
  async createCheckout(@Body() body: CheckoutDto, @Res() res: Response) {
    const storeItems = new Map([
      [1, { priceInCents: 10000, name: 'Learn React Today' }],
      [2, { priceInCents: 20000, name: 'Learn CSS Today' }],
    ]);
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:8081/ok`,
      cancel_url: `http://localhost:8081/cancel`,
    });

    return res.status(HttpStatus.OK).json({ url: session.url });
  }
}
