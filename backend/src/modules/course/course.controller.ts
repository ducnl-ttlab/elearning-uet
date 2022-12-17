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
  Put,
  ForbiddenException,
} from '@nestjs/common';
import { ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CourseService } from './service/course.service';
import { IUserJwt } from 'src/common/interfaces';
import { Instructor, User } from 'src/common/decorator/custom.decorator';
import {
  Auth,
  InstructorCourseAuth,
} from 'src/common/decorator/auth.decorator';
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
import { Role, TableName } from 'database/constant';
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

  @Get('instructor')
  @UsePipes(
    ...courseValidation({ type: 'query', key: 'courseQueryListSchema' }),
  )
  @Auth('instructor')
  async getInstructorCourses(
    @User() user: IUserJwt,
    @Res() res: Response,
    @Req() req: Request,
    @Headers('host') host: Headers,
    @Query() query: CourseQueryDto,
  ) {
    const { page = 1, pageSize = 8, keyword, rating, categoryId } = query;

    const courseList = await this.courseService.findCourses(
      +categoryId,
      keyword,
      rating,
      user.id,
    );

    let coursesResponse = courseList.map((course) => {
      const { image, startCourse, endCourse } = course;

      return {
        ...course,
        image: image?.startsWith('http')
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
    // await this.searchService.indexPost<Partial<Course>>(
    //   course,
    //   TableName.course,
    // );

    return res.status(HttpStatus.CREATED).json(new SuccessResponse({ course }));
  }

  @Put(':courseId')
  @Auth('instructor')
  @UseInterceptors(LocalFilesInterceptor(imageParams('course')))
  @UsePipes(
    ...courseValidation(
      { type: 'body', key: 'editCourseSchema' },
      { type: 'param', key: 'deleteCourseParamSchema' },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @InstructorCourseAuth()
  async editCourse(
    @User() user: IUserJwt,
    @Param() param: CategoryDto,
    @Res() res: Response,
    @Body() data: CourseCreateDto,
    @Instructor() course: Course,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const isExistCategory = await this.categoryService.findOneById(
      param.categoryId,
    );
    if (!isExistCategory) {
      throw new NotFoundException('Not found category');
    }

    if (course.image) {
      removeImageFile(course.image, 'course');
    }

    let image;
    image = (!!file?.filename && file?.filename) || undefined;

    let newCourse: Partial<Course> = {
      ...data,
      categoryId: isExistCategory.id,
      isPublished: (data.isPublished as any) === 'true' ?? data?.isPublished,
      image: image,
      ...coursePeriod(data.startCourseTime, data.endCourseTime),
    };
    let result = await this.courseService.updateCourse(course.id, newCourse);

    return res.status(HttpStatus.CREATED).json(new SuccessResponse({ result }));
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
      rating,
      instructorIds,
      true,
    );

    let coursesResponse = courseList.map((course) => {
      const { image, startCourse, endCourse } = course;

      return {
        ...course,
        image: image?.startsWith('http')
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

  @Delete(':courseId')
  @Auth('instructor', 'admin')
  @UsePipes(
    ...courseValidation({ type: 'param', key: 'deleteCourseParamSchema' }),
  )
  async deleteCourse(
    @Res() res: Response,
    @Param() params: { courseId: string },
    @User() user: IUserJwt,
  ) {
    const course = await this.courseService.existCourse(+params.courseId);
    const { id, image } = course;
    if (user.role === Role.instructor) {
      if (course.instructorId !== user.id) {
        throw new ForbiddenException(
          'you do not have right to delete this course',
        );
      }
    }
    try {
      if (image) {
        removeImageFile(image, 'course');
      }
      await Promise.all([
        this.courseService.deleteCourse(id),
        // this.searchService.removeDataById(id, TableName.course),
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
          (course.image?.startsWith('http')
            ? course.image
            : `${req.protocol}://${host}/course/image/${course.image}`)) ||
        '',
    };

    return res.status(HttpStatus.CREATED).json(new SuccessResponse(courseRes));
  }
}
