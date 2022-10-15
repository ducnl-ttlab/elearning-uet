import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  HttpStatus,
  Body,
  Res,
  Param,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ErrorResponse,
  SuccessResponse,
} from 'src/common/helpers/api.response';
import { MailService } from 'src/modules/mail/mail.service';
import { VerifyEmail } from './dto/sign-up.dto';
import { Response, Request } from 'express';
import { GoogleOAuthGuard } from './guard/google-auth.guard';
import { UserResponse } from 'src/common/interfaces';
import { UserService } from '../user/service/user.service';
import { v4 as uuidv4 } from 'uuid';
import { TokenValidation } from './joi.request.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    let { user } = (await this.authService.googleLogin(req)) as UserResponse;
    let { accessToken } = await this.authService.signUserJwt(user);
    res.redirect(`${process.env.FRONTEND_URL}auth/google/${accessToken}`);
  }

  @Post('signup')
  async signUpEmail(@Body() verifyEmail: VerifyEmail, @Res() res: Response) {
    const { email, url } = verifyEmail;
    let user = await this.authService.existEmail(email);

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

    let id = uuidv4();
    let { accessToken } = await this.authService.signVerifyUserJwt({
      email,
      id,
    });

    await Promise.all([
      this.mailService.sendUserEmailConfirmation(
        { email, username: email.split('@')[0] },
        url + accessToken,
      ),
      this.userService.saveUser({
        id,
        email,
        verified: false,
      }),
    ]);

    return res.status(HttpStatus.OK).json(new SuccessResponse(email));
  }

  @Get('verify-email/:token')
  @UsePipes(TokenValidation)
  async verifyEmail(@Param('token') token: string, @Res() res: Response) {
    let user = await this.authService.verifyEmail(token);
    return res.status(HttpStatus.OK).json(new SuccessResponse(user));
  }
}
