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
  Delete,
  StreamableFile,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CourseService } from './service/course.service';
import { IUserJwt } from 'src/common/interfaces';
import { User } from 'src/common/decorator/custom.decorator';
import { Auth } from 'src/common/decorator/auth.decorator';
import { courseValidation } from './joi.request.pipe';
import { SuccessResponse } from 'src/common/helpers/api.response';
import {
  CategoryDto,
  CourseCreateDto,
  CourseDto,
  CourseListResponse,
  CourseQueryDto,
  CourseSearchQueryDto,
} from './dto/course.dto';
import { CategoryService } from '../category/service/category.service';
import LocalFilesInterceptor, {
  imageParams,
} from 'src/infra/local-file/local-files.interceptor';
import { Course } from './entity/course.entity';
import {
  coursePeriod,
  getPaginatedItems,
  mysqlTimeStamp,
  mysqlToTime,
} from 'src/common/ultils';
import { TableName } from 'database/constant';
import { join } from 'path';
import { createReadStream } from 'fs';
const fs = require('fs');

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
      image: file?.filename,
      ...coursePeriod(data.startCourseTime, data.endCourseTime),
    };
    let course = await this.courseService.saveCourse(newCourse);
    await this.searchService.indexPost<Partial<Course>>(
      course,
      TableName.course,
    );

    return res.status(HttpStatus.CREATED).json(new SuccessResponse({ course }));
  }

  @Get('search')
  @UsePipes(
    ...courseValidation({ type: 'query', key: 'courseSearchQueryListSchema' }),
  )
  async searchCourseList(
    @Res() res: Response,
    @Query() query: CourseSearchQueryDto,
  ) {
    const {
      page = 1,
      pageSize = 8,
      keyword,
      fields = 'description,name',
    } = query;
    const courseSearching = await this.searchService.search(
      keyword,
      TableName.course,
      fields.split(','),
    );

    let response: CourseListResponse = {
      ...getPaginatedItems(courseSearching.items, +page, +pageSize),
      totalItems: courseSearching.totalItems,
    };
    return res.status(HttpStatus.OK).json(new SuccessResponse(response));
  }

  @Get()
  @UsePipes(
    ...courseValidation({ type: 'query', key: 'courseQueryListSchema' }),
  )
  async getCourseList(
    @Res() res: Response,
    @Headers('host') host: Headers,
    @Req() req: Request,
    @Query() query: CourseQueryDto,
  ) {
    const { page, pageSize, keyword, rating } = query;
    const courseList = await this.courseService.findCourseList();

    let coursesResponse = courseList[0].map((course) => {
      const { created_at, image, endCourseTime, startCourseTime, updated_at } =
        course;
      let date = startCourseTime
        ? mysqlToTime(startCourseTime, endCourseTime)
        : {};

      return {
        ...course,
        ...date,
        image: image.startsWith('http')
          ? image
          : `${req.protocol}://${host}/course/image/${image}`,
        created_at: mysqlTimeStamp(created_at),
        updated_at: mysqlTimeStamp(updated_at),
      };
    });

    let response: CourseListResponse = {
      ...getPaginatedItems(coursesResponse, +page, +pageSize),
      totalItems: courseList[1],
    };

    return res.status(HttpStatus.CREATED).json(new SuccessResponse(response));
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

  @Delete(':id')
  @Auth('instructor')
  @UsePipes(
    ...courseValidation({ type: 'param', key: 'deleteCourseParamSchema' }),
  )
  async deleteCourse(@Res() res: Response, @Param() params: { id: string }) {
    const course = await this.courseService.existCourse(+params.id);
    const { id, image } = course;
    try {
      if (image) {
        let path = join(process.cwd(), `/uploads/course/${image}`);
        fs.unlinkSync(path);
      }
      await Promise.all([
        this.courseService.deleteCourse(id),
        this.searchService.removeDataById(id, TableName.course),
      ]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

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
    let path = join(process.cwd(), `/uploads/course/${name}`);

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
