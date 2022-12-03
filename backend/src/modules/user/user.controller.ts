import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Put,
  UsePipes,
  Body,
  UseInterceptors,
  UploadedFile,
  Headers,
  BadRequestException,
  Param,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UserService } from 'src/modules/user/service/user.service';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';
import { IUserJwt, IUserReq } from 'src/common/interfaces';
import { AuthService } from '../auth/service/auth.service';
import { filterUser, mysqlTimeStamp } from 'src/common/ultils';
import { Response } from 'express';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validation } from './joi.request.pipe';
import { UserChangeDto } from './dto/user';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { RedisCacheService } from '../cache/redis-cache.service';
import { User } from './entity/user.entity';
const fs = require('fs');
import * as bcrypt from 'bcryptjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private authService: AuthService,
    private readonly cacheManager: RedisCacheService,
  ) {}

  @Get('profile')
  @UseGuards(JWTAuthGuard)
  async getProfile(
    @Req() req: IUserReq<IUserJwt>,
    @Res() res: Response,
    @Headers('host') host: Headers,
  ) {
    let user = (await this.cacheManager.setOrgetCache(
      `user${req.user.id}`,
      async () => {
        return await this.authService.existEmail(req.user.email);
      },
    )) as User;

    const { avatar, created_at, updated_at } = user;

    user.avatar = avatar.startsWith('http')
      ? avatar
      : `${req.protocol}://${host}/user/image/${avatar}`;

    let userRes = {
      ...user,
      created_at: mysqlTimeStamp(created_at),
      updated_at: mysqlTimeStamp(updated_at),
    };

    return res
      .status(HttpStatus.OK)
      .json(new SuccessResponse(filterUser(userRes)));
  }

  @Put('profile')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(LocalFilesInterceptor(imageParams('avatar')))
  @UsePipes(...validation({ type: 'body', key: 'userChangeSchema' }))
  async editProfile(
    @Req() req: IUserReq<IUserJwt>,
    @Res() res: Response,
    @Body() body: UserChangeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let avatar = file?.filename;
    const { username, phone, address, password, currentPassword } = body;

    if (Object.keys(body).length < 1) {
      throw new BadRequestException();
    }

    if (currentPassword && password) {
      await this.authService.validateLocalUser(
        req.user.email,
        password,
        'Current password incorrect',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await Promise.all([
      this.usersService.updateUser(req.user.id, {
        avatar,
        username,
        phone,
        address,
        password: hashedPassword,
      }),
      this.cacheManager.deleteByKey(`user${req.user.id}`),
    ]);
    return res.status(HttpStatus.OK).json(new SuccessResponse());
  }

  @Get('image/:name')
  @ApiParam({ name: 'name' })
  @ApiResponse({ status: 200, description: 'Found image.' })
  @ApiResponse({ status: 404, description: 'Not Found Image.' })
  Category(
    @Param('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    let path = join(process.cwd(), `/uploads/avatar/${name}`);

    if (!fs.existsSync(path)) {
      throw new NotFoundException('Not found image');
    }
    const stream = createReadStream(path);

    response.set({
      'Content-Disposition': `inline; filename="${name}"`,
      'Content-Type': 'image/jpeg',
    });

    return new StreamableFile(stream);
  }
}
