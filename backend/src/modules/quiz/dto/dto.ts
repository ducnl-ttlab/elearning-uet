import { ApiProperty } from '@nestjs/swagger';
import { CommonListResponse } from 'src/common/helpers/api.response';

export interface CreateQuizDto {
  name: string;
  startTime: string;
  duration: string;
}
