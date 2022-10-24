import {
  Controller,
  Get,
  Res,
  Param,
  UseInterceptors,
  UploadedFile,
  Post,
  StreamableFile,
} from '@nestjs/common';

import { join } from 'path';
import { Response } from 'express';

import LocalFilesInterceptor, {
  imageParams,
  videoParams,
} from 'src/infra/local-file/local-files.interceptor';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createReadStream } from 'fs';

@Controller()
export class AppController {
  @Get('files/:id')
  getFiles(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const stream = createReadStream(
      join(process.cwd(), `/uploads/avatar/1666434020416-994288424.jpeg`),
    );

    response.set({
      'Content-Disposition': `inline; filename="${id}"`,
      'Content-Type': 'image/jpeg',
    });

    return new StreamableFile(stream);
  }

  @Get('/chunk/:name/:file')
  getChunkFiles(@Param('file') file: string, @Param('name') name: string) {
    let filePath = join(process.cwd(), `/temp/chunks/${name}/${file}`);
    const stream = createReadStream(filePath);

    return new StreamableFile(stream);
  }
  @Get('video')
  getVideo(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const stream = createReadStream(
      join(process.cwd(), `/uploads/video/1666480512759-840256579.mp4`),
    );

    response.set({
      'Content-Disposition': `inline; filename="${id}"`,
      'Content-Type': 'video/mp4',
    });

    return new StreamableFile(stream);
  }
  @Post('avatar')
  @UseInterceptors(LocalFilesInterceptor(imageParams('avatar')))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
  })
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Post('video')
  @UseInterceptors(LocalFilesInterceptor(videoParams))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
  })
  async addVideo(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
