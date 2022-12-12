import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entity/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quiz: Repository<Quiz>,
  ) {}

  async saveQuiz(quiz: Partial<Quiz>): Promise<Quiz> {
    try {
      return this.quiz.save(quiz);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getQuizsByTopicId(topicId: number) {
    try {
      return this.quiz.find({
        where: { topicId: topicId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<Quiz> {
    try {
      return this.quiz.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existQuiz(id: number): Promise<Quiz> {
    let existQuiz = await this.findOneById(id);
    if (!existQuiz) {
      throw new NotFoundException('Not found Quiz');
    }
    return existQuiz;
  }
}
