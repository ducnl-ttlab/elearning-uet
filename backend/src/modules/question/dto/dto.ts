import { ApiProperty } from '@nestjs/swagger';
import { CommonListResponse } from 'src/common/helpers/api.response';
import { Question } from '../entity/question.entity';

export interface CreateQuizDto {
  name: string;
  startTime: string;
  duration: string;
}

export interface IQuizParam {
  quizId: string;
  courseId: string;
}

export interface QuizListResponseDto extends CommonListResponse<Question> {}
