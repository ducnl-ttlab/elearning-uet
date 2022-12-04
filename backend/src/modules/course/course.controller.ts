import { UserService } from 'src/modules/user/service/user.service';
import { RedisCacheService } from './../cache/redis-cache.service';
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
  InstructorListReponse,
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
  removeImageFile,
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
    private readonly redisCacheService: RedisCacheService,
    private readonly userService: UserService,
  ) {}

  @Get('instructor-list')
  async getInstructorList(@Res() res: Response) {
    let instructorListCache = await this.redisCacheService.setOrgetCache(
      'instructor-list',
      () => this.userService.getInstructorList(),
    );

    let reponse: InstructorListReponse = {
      items: instructorListCache,
      totalItems: instructorListCache.length,
    };
    return res.status(HttpStatus.CREATED).json(new SuccessResponse(reponse));
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
      image:
        (course.image &&
          (course.image.startsWith('http')
            ? course.image
            : `${req.protocol}://${host}/course/image/${course.image}`)) ||
        '',
    };

    return res.status(HttpStatus.CREATED).json(new SuccessResponse(courseRes));
  }

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
    const {
      page = 1,
      pageSize = 8,
      keyword,
      rating,
      categoryId,
      instructorIds = '',
    } = query;

    const courseList = await this.courseService.findCourses(
      +categoryId,
      keyword,
      +rating,
      instructorIds,
    );

    let coursesResponse = courseList.map((course) => {
      const { image, startCourse, endCourse } = course;

      return {
        ...course,
        image: image.startsWith('http')
          ? image
          : `${req.protocol}://${host}/course/image/${image}`,
        startCourse: (startCourse && mysqlTimeStamp(startCourse)) || '',
        endCourse: (endCourse && mysqlTimeStamp(endCourse)) || '',
      };
    });

    let response: CourseListResponse = {
      ...getPaginatedItems(coursesResponse, +page, +pageSize),
      totalItems: coursesResponse.length,
    };

    return res.status(HttpStatus.CREATED).json(new SuccessResponse(response));
  }

  @Get('instructor/:instructorId')
  @UsePipes(
    ...courseValidation(
      { type: 'param', key: 'instructorCourseSchema' },
      { type: 'query', key: 'courseQueryListSchema' },
    ),
  )
  async getInstructorCourses(
    @Res() res: Response,
    @Req() req: Request,
    @Headers('host') host: Headers,
    @Query() query: CourseQueryDto,
    @Param() param: { instructorId: string },
  ) {
    let { keyword, page = 1, pageSize = 8 } = query;
    const course = await this.courseService.findInstructorCourse(
      param?.instructorId,
      keyword,
    );

    let coursesResponse = course.map((course) => {
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
      totalItems: course.length,
    };
    return res.status(HttpStatus.CREATED).json(new SuccessResponse(response));
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
        removeImageFile(image, 'course');
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
