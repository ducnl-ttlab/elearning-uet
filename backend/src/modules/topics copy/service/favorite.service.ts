import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entity/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favorite: Repository<Favorite>,
  ) {}

  async saveFavorite(Favorite: Partial<Favorite>): Promise<Favorite> {
    try {
      return this.favorite.save(Favorite);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<Favorite> {
    try {
      return this.favorite.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existFavorite(id: number): Promise<Favorite> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found Favorite');
    }
    return existCourse;
  }
}
