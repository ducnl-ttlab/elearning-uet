import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helpers/api.response';

import { UserService } from 'src/modules/user/service/user.service';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';
import { IUserJwt, IUserReq } from 'src/common/interfaces';
import { AuthService } from '../auth/service/auth.service';
import { filterUser } from 'src/common/ultils';
import { Response, Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private authService: AuthService,
  ) {}

  @Get('profile')
  @UseGuards(JWTAuthGuard)
  async getProfile(@Req() req: IUserReq<IUserJwt>, @Res() res: Response) {
    let user = await this.authService.existEmail(req.user.email);

    return res
      .status(HttpStatus.OK)
      .json(new SuccessResponse(filterUser(user)));
  }

  @Put('profile')
  @UseGuards(JWTAuthGuard)
  async editProfile(@Req() req: IUserReq<IUserJwt>, @Res() res: Response) {
    let user = await this.authService.existEmail(req.user.email);

    return res
      .status(HttpStatus.OK)
      .json(new SuccessResponse(filterUser(user)));
  }
}
