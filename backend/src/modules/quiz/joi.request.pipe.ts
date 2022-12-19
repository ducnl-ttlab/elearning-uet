import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';

const topicIdParamSchema = Joi.object().keys({
  topicId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('courseId should be a number'),
});

const updateQuizParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('courseId should be a number'),
  quizId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('courseId should be a number'),
});

const createQuizSchema = Joi.object().keys({
  name: Joi.string().min(1).required(),
  startTime: Joi.string().min(1).optional(),
  duration: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('duration should be a number'),
});

const editQuizQuerySchema = Joi.object().keys({
  type: Joi.string()
    .valid('question', 'quiz', 'answer', 'addQuestion', 'addAnswer')
    .required(),
  sourceId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('sourceId should be a number')
    .required(),
});

const validationSchemas = {
  topicIdParamSchema,
  createQuizSchema,
  editQuizQuerySchema,
  updateQuizParamSchema,
};

type validationKeyType = keyof typeof validationSchemas;

export function validation(
  ...validations: IValidationKeyType<validationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(validationSchemas[v.key], v.type),
  );
}
