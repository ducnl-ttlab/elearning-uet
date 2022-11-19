import { SearchService } from './../search/search.service';
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
import { Course } from './entity/course.entity';
import { coursePeriod, mysqlToTime } from 'src/common/ultils';
import { TableName } from 'database/constant';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly categoryService: CategoryService,
    private readonly searchService: SearchService,

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

    let newCourse: Partial<Course> = {
      ...data,
      instructorId: user.id,
      categoryId: isExistCategory.id,
      isPublished: (data.isPublished as any) === 'true' ?? data?.isPublished,
      image: file?.path,
      ...coursePeriod(data.startCourseTime, data.endCourseTime),
    };
    let course = await this.courseService.saveCourse(newCourse);
    await this.searchService.indexPost<Partial<Course>>(course, TableName.course)

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

  @Get('')
  async getCourseList(@Res() res: Response) {
    const courseList = await this.courseService.findCourseList();

    let courses = courseList[0];

    let coursesResponse = courses.map((course) => {
      let date = course?.startCourseTime
        ? mysqlToTime(course.startCourseTime, course.endCourseTime)
        : {};

      return {
        ...course,
        ...date,
      };
    });

    return res
      .status(HttpStatus.CREATED)
      .json(new SuccessResponse(coursesResponse));
  }
}
