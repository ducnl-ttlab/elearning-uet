import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Headers,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CourseService } from './service/course.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/user.decorator';
import { Auth } from 'src/common/decorator/auth.decorator';
import { courseValidation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryDto, CourseCreateDto, CourseDto } from './dto/course.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post(':categoryId')
  @Auth('instructor')
  @UsePipes(
    ...courseValidation(
      { type: 'body', key: 'createCourseSchema' },
      { type: 'param', key: 'categoryParamSchema' },
    ),
  )
  @Post('avatar')
  @UseInterceptors(LocalFilesInterceptor(imageParams('course')))
  @ApiConsumes('multipart/form-data')
  async createCourse(
    @User() user: IUserJwt,
    @Param() param: CategoryDto,
    @Res() res: Response,
    @Body() data: CourseCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const isExistCategory = await this.categoryService.findOneById(
      param.categoryId,
    );
    if (!isExistCategory) {
      throw new NotFoundException('Not found category');
    }
    let newCourse = {
      ...data,
      instructorId: user.id,
      categoryId: isExistCategory.id,
      isPublished: (data.isPublished as any) === 'true' ?? data?.isPublished,
      image: file.path,
    };
    let course = await this.courseService.saveCourse(newCourse);
    return res.status(HttpStatus.CREATED).json(new SuccessResponse({ course }));
  }

  @Get(':id')
  async getCourse(
    @Param() param: CourseDto,
    @Res() res: Response,
    @Req() req: Request,
    @Headers('host') host: Headers,
  ) {
    const course = await this.courseService.existCourse(param.id);

    const courseRes = {
      ...course,
      image: course.image
        ? `${req.protocol}://${host}/image/${course.image}`
        : '',
    };

    return res.status(HttpStatus.CREATED).json(new SuccessResponse(courseRes));
  }
}
