import { ApiProperty } from '@nestjs/swagger';
import { CommonListResponse } from 'src/common/helpers/api.response';
import { Quiz } from '../entity/quiz.entity';

export interface CreateQuizDto {
  name: string;
  startTime: string;
  duration: string;
}

export interface IQuizParam {
  topicId: string;
  courseId: string;
}

export interface QuizListResponseDto extends CommonListResponse<Quiz> {}
