import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UsePipes,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryListResponse } from 'src/modules/category/dto/api-response.dto';
import { querySchema } from 'src/common/helpers/api.request';
import { JoiValidationPipe } from 'src/common/joi.validation.pipe';
import { QueryListDTO } from 'src/common/dto/api.request.dto';
import { UserService } from 'src/modules/user/service/user.service';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';
import { IUserJwt, IUserReq } from 'src/common/interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('profile')
  @UseGuards(JWTAuthGuard)
  async getProfile(@Req() req: IUserReq<IUserJwt>) {
    return req.user;
  }
}
