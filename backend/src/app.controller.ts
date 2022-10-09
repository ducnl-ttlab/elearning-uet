import { Controller, Get, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('image')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getImage(@Param('name') name, @Res() res): void {
    res.sendFile(name, { root: 'public' });
  }
  @Get('')
  getHelloWold(@Res() res): void {
    res.send('hello world');
  }
}
