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

  async getUserAnswerByQuestionId(questionId: number) {
    try {
      let query = `
      SELECT a.id
      FROM user_answers ua
      JOIN answers a
      ON a.id = ua.answerId
      WHERE a.questionId = ?
      `;
      let answerIds = (
        (await this.userAnswer.query(query, [questionId])) as { id: number }[]
      ).map((item) => item.id);
      return answerIds;
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
