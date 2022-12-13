import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from '../entity/user-answer.entity';

@Injectable()
export class UserAnswerService {
  constructor(
    @InjectRepository(UserAnswer)
    private readonly userAnswer: Repository<UserAnswer>,
  ) {}

  async save(userAnswer: Partial<UserAnswer>): Promise<UserAnswer> {
    try {
      return this.userAnswer.save(userAnswer);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getQuizsByTopicId(topicId: number) {
    try {
      return this.userAnswer.find({
        where: { topicId: topicId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<UserAnswer> {
    try {
      return this.userAnswer.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existAnswer(id: number): Promise<UserAnswer> {
    let existAnswer = await this.findOneById(id);
    if (!existAnswer) {
      throw new NotFoundException('Not found Answer');
    }
    return existAnswer;
  }
}
