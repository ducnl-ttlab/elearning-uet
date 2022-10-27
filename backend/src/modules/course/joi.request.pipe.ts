import {
  ArgumentMetadata,
  BadRequestException,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';

const tokenSchema = Joi.object().keys({
  param: Joi.string().min(10),
});

const categoryParamSchema = Joi.object().keys({
  categoryId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('categoryId should be a number'),
});

const courseValidationSchemas = {
  tokenSchema,
  categoryParamSchema,
};

type courseValidationKey = keyof typeof courseValidationSchemas;

class ValidationPipe implements PipeTransform {
  private schema: Joi.ObjectSchema<any>;
  private paramType: string;
  constructor(schema: Joi.ObjectSchema<any>, paramType: string) {
    this.schema = schema;
    this.paramType = paramType;
  }
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === this.paramType) {
      const { error } = this.schema.validate(value);
      if (error) {
        throw new BadRequestException({ errors: error.details });
      }
    }
    return value;
  }
}

export function courseValidation(key: courseValidationKey, type: Paramtype) {
  return new ValidationPipe(courseValidationSchemas[key], type);
}
