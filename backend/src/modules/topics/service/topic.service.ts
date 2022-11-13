import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../entity/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topic: Repository<Topic>,
  ) {}

  async saveTopic(topic: Partial<Topic>): Promise<Topic> {
    try {
      return this.topic.save(topic);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<Topic> {
    try {
      return this.topic.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existTopic(id: number): Promise<Topic> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found course');
    }
    return existCourse;
  }
}
