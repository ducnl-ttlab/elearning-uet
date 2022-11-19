import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';

const tokenSchema = Joi.object().keys({
  param: Joi.string().min(10),
});

const categoryParamSchema = Joi.object().keys({
  categoryId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('categoryId should be a number'),
});

const deleteCourseParamSchema = Joi.object().keys({
  id: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('courseId should be a number'),
});

const courseQueryListSchema = Joi.object().keys({
  page: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('page should be a number')
    .optional(),
  keyword: Joi.string().optional(),
  rating: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('rating should be a number')
    .optional(),
  pageSize: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('pageSize should be a number')
    .optional(),
});
const courseSearchQueryListSchema = Joi.object().keys({
  page: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('page should be a number')
    .optional(),
  keyword: Joi.string().optional(),
  pageSize: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('pageSize should be a number')
    .optional(),
  fields: Joi.string()
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
  startCourseTime: Joi.string()
    .min(1)
    .message('startCourseTime should have at least one character')
    .optional(),
  endCourseTime: Joi.string()
    .min(1)
    .message('endCourseTime should have at least one character')
    .optional(),
});

const courseValidationSchemas = {
  tokenSchema,
  categoryParamSchema,
  createCourseSchema,
  deleteCourseParamSchema,
  courseQueryListSchema,
  courseSearchQueryListSchema
};

type courseValidationKey = keyof typeof courseValidationSchemas;

export function courseValidation(
  ...validations: IValidationKeyType<courseValidationKey>[]
) {
  return validations.map(
    (v) => new ValidationPipe(courseValidationSchemas[v.key], v.type),
  );
}
