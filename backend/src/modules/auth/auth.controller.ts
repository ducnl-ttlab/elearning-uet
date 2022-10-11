import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Request,
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
import { Response } from 'express';

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
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    let user = await this.authService.googleLogin(req);
    return new SuccessResponse(user, 'success');
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
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
}
