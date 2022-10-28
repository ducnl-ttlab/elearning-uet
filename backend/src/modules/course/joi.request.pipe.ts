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

const createCourseSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .min(1)
    .message('name should have at least one character'),
  description: Joi.string()
    .required()
    .min(1)
    .message('name should have at least one character'),
  isPublished: Joi.boolean().optional(),
  price: Joi.number().min(1).optional(),
});

const courseValidationSchemas = {
  tokenSchema,
  categoryParamSchema,
  createCourseSchema,
};

type courseValidationKey = keyof typeof courseValidationSchemas;

interface ICourseValidation {
  key: courseValidationKey;
  type: Paramtype;
}

class ValidationPipe implements PipeTransform {
  private schema: Joi.ObjectSchema<any>;
  private paramType: Paramtype;
  constructor(schema: Joi.ObjectSchema<any>, paramType: Paramtype) {
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

export function courseValidation(...validations: ICourseValidation[]) {
  return validations.map(
    (v) => new ValidationPipe(courseValidationSchemas[v.key], v.type),
  );
}
