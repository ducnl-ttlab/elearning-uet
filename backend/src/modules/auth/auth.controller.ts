import { Controller, Get, UseGuards, Req, Post, Request } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { MailService } from 'src/modules/mail/mail.service';
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

  @Post('signup')
  async signup(@Request() req) {
    await this.mailService.sendUserConfirmation(
      '19020153@vnu.edu.vn',
      'duc',
      'duc',
    );
    return 'ok';
  }
}
