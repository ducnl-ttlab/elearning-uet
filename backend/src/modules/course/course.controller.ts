import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ErrorResponse } from 'src/common/helpers/api.response';
import { CourseService } from './service/course.service';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('')
  async hello(@Req() req: Request) {
    return 'req.user';
  }

  @Post(':categoryId')
  async createCourse(
    @Param('categoryId') categoryId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.CONFLICT)
      .json(
        new ErrorResponse(HttpStatus.CONFLICT, 'This email is alrealdy exist'),
      );
  }
}
