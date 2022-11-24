import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, Repository } from 'typeorm';
import { Rating } from '../entity/rating.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async saveRating(rating: Partial<Rating>): Promise<Rating> {
    try {
      return this.ratingRepository.save(rating);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteRating(id: number): Promise<DeleteResult> {
    try {
      return this.ratingRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findOneById(id: number): Promise<Rating> {
    try {
      return this.ratingRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existRating(id: number): Promise<Rating> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found comment');
    }
    return existCourse;
  }
}
