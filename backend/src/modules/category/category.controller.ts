import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UsePipes,
  Headers,
  Req,
  Param,
  Res,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryListResponse } from 'src/modules/category/dto/api-response.dto';
import { querySchema } from 'src/common/helpers/api.request';
import { CategoryService } from './service/category.service';
import { JoiValidationPipe } from 'src/common/joi.validation.pipe';
import { QueryListDTO } from 'src/common/dto/api.request.dto';
import { CategoryDto } from './dto/category.dto';
import { ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { RedisCacheService } from '../cache/redis-cache.service';
const fs = require('fs');

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cacheManager: RedisCacheService,
  ) {}

  @Get()
  @UsePipes(new JoiValidationPipe(querySchema))
  async getAll(
    @Req() req: Request,
    @Query() query: QueryListDTO,
    @Headers('host') host: Headers,
  ) {
    try {
      let response = (await this.cacheManager.setOrgetCache(
        'category',
        async () => {
          const categoryListService: CategoryListResponse =
            await this.categoryService.findAll(query);
          const categoryListResponse: CategoryDto[] =
            categoryListService.items.map(
              (category: CategoryDto, index: number) => {
                return {
                  id: category.id,
                  name: category.name,
                  image: `${req.protocol}://${host}/category/image/${category.image}`,
                  avgRating: 5,
                  courseTotal: index,
                  studentTotal: index * 2,
                };
              },
            );
          categoryListService.items = categoryListResponse;
          return categoryListService;
        },
      )) as CategoryListResponse;

      return new SuccessResponse(response, 'success');
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  @Get('image/:name')
  @ApiParam({ name: 'name' })
  @ApiResponse({ status: 200, description: 'Found image.' })
  @ApiResponse({ status: 404, description: 'Not Found Image.' })
  Category(
    @Param('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    let path = join(process.cwd(), `/public/${name}.jpeg`);

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
