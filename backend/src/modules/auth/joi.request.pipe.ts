import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
export const tokenSchema = Joi.object().keys({
  param: Joi.string().min(10),
});

export class TokenValidation implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      const { error } = tokenSchema.validate({ param: value });
      if (error) {
        throw new BadRequestException({ errors: error.details });
      }
    }
    return value;
  }
}
