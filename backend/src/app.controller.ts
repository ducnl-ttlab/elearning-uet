import {
  Controller,
  Get,
  Res,
  Param,
  UseInterceptors,
  UploadedFile,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import LocalFilesInterceptor, {
  imageFilter,
  mediaParams,
} from 'src/infra/local-file/local-files.interceptor';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('image')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':name')
  // getImage(@Param('name') name, @Res() res): void {
  //   res.sendFile(name, { root: 'public' });
  // }
  @Get('')
  getHelloWold(@Res() res): void {
    res.send('hello world');
  }

  @Post('avatar')
  @UseInterceptors(LocalFilesInterceptor(mediaParams('avatar')))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
  })
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
