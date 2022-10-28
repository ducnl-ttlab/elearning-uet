import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CategoryListResponse } from 'src/modules/category/dto/api-response.dto';
import {
  DEFAULT_ORDER_DIRECTION,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
} from 'src/common/constant';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findOneById(id: number) {
    try {
      return this.categoryRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findAll(query): Promise<CategoryListResponse> {
    const page = query.page || DEFAULT_PAGE;
    const limit = query.limit || DEFAULT_LIMIT;
    const orderBy = query.orderBy || DEFAULT_ORDER_DIRECTION;

    const [items, totalItems] = await this.categoryRepository.findAndCount({
      order: {
        id: orderBy,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      totalItems,
    };
  }
}
