import { Controller, Get, UseGuards, Req, Post, Request } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResponse } from 'src/common/helpers/api.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    return this.authService.login(req.user);
  }
}
