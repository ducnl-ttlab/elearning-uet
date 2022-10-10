import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UsePipes,
  Headers,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryListResponse } from 'src/modules/category/dto/api-response.dto';
import { querySchema } from 'src/common/helpers/api.request';
import { JoiValidationPipe } from 'src/common/joi.validation.pipe';
import { QueryListDTO } from 'src/common/dto/api.request.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UsersService: UserService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(querySchema))
  async getAll(@Query() query: QueryListDTO, @Headers('host') host: Headers) {
    return 'hello';
  }
}
