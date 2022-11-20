import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly comment: Repository<Comment>,
  ) {}

  async saveComment(comment: Partial<Comment>): Promise<Comment> {
    try {
      return this.comment.save(comment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<Comment> {
    try {
      return this.comment.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existComment(id: number): Promise<Comment> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found course');
    }
    return existCourse;
  }
}
