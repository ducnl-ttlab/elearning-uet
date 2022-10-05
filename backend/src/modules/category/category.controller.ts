import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UsePipes,
  Headers,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helpers/api.response';
import { CategoryListResponse } from 'src/modules/category/dto/api-response.dto';
import { querySchema } from 'src/common/helpers/api.request';
import { CategoryService } from './service/category.service';
import { JoiValidationPipe } from 'src/common/joi.validation.pipe';
import { QueryListDTO } from 'src/common/dto/api.request.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(querySchema))
  async getAll(@Query() query: QueryListDTO, @Headers('host') host: Headers) {
    try {
      const categoryListService: CategoryListResponse =
        await this.categoryService.findAll(query);
      const categoryListResponse: CategoryDto[] = categoryListService.items.map(
        (category: CategoryDto) => {
          return {
            id: category.id,
            name: category.name,
            image: `http://${host}/image/${category.image}`,
          };
        },
      );
      categoryListService.items = categoryListResponse;

      return new SuccessResponse(categoryListService, 'success');
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
