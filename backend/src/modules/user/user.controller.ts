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
import { UserService } from 'src/modules/user/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAll() {
    return this.usersService.findOne('a');
  }
}
