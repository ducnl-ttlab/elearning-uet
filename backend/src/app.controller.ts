import { Controller, Get, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('image')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(@Param('name') name, @Res() res): void {
    res.sendFile(name, { root: 'public' });
  }
}
