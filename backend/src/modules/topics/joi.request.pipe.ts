import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';

const courseIdParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('courseId should be a number'),
});

const verifyCourseParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('courseId should be a number'),
});

const categoryParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('categoryId should be a number'),
  code: Joi.string()
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

const topicValidationSchemas = {
  courseIdParamSchema,
  categoryParamSchema,
  createCourseSchema,
  verifyCourseParamSchema,
};

type TopicValidationKeyType = keyof typeof topicValidationSchemas;

export function userCourseValidation(
  ...validations: IValidationKeyType<TopicValidationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(topicValidationSchemas[v.key], v.type),
  );
}
