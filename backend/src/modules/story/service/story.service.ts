import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entity/story.entity';
import { StoryDetailsDto } from '../dto/story.dto';
@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  getDetails(id: number): Promise<StoryDetailsDto> {
    return this.storyRepository.findOne({
      where: { id },
      select: ['name', 'content', 'isHot'],
    });
  }
}
