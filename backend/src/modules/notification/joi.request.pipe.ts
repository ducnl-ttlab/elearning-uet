import {
  ArgumentMetadata,
  BadRequestException,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ValidationPipe } from 'src/common/pipe/joi.request.pipe';

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

export function courseValidation(...validations: ICourseValidation[]) {
  return validations.map(
    (v) => new ValidationPipe(courseValidationSchemas[v.key], v.type),
  );
}
