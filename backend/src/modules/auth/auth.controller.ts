import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  HttpCode,
  UseInterceptors,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ErrorResponse,
  SuccessResponse,
} from 'src/common/helpers/api.response';
import { MailService } from 'src/modules/mail/mail.service';
import { SignUp, VerifyEmail } from './dto/sign-up.dto';
import { User } from '../user/entity/user.entity';
import { Response, Request } from 'express';
import { GoogleOAuthGuard } from './guard/google-auth.guard';
import { FilteredUser, IUserReq, UserResponse } from 'src/common/interfaces';
import { JWTAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  hello() {
    return 'auth';
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    let { user } = (await this.authService.googleLogin(req)) as UserResponse;
    let { accessToken } = await this.authService.signUser(user);
    res.redirect(`${process.env.FRONTEND_URL}auth/google/${accessToken}`);
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyEmail: VerifyEmail, @Res() res: Response) {
    const { email, url } = verifyEmail;
    let user = await this.authService.validateEmail(email);

    if (user) {
      return res
        .status(HttpStatus.CONFLICT)
        .json(
          new ErrorResponse(
            HttpStatus.CONFLICT,
            'This email is alrealdy exist',
          ),
        );
    }

    await this.mailService.sendUserConfirmation(
      email,
      url,
      email.split('@')[0],
    );

    return res.status(HttpStatus.OK).json(new SuccessResponse(user, 'success'));
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUp: SignUp): Promise<User> {
    return this.authService.register(signUp);
  }

  @Get('abc')
  @UseGuards(JWTAuthGuard)
  a(@Req() req: IUserReq) {
    return 'ok';
  }
}
