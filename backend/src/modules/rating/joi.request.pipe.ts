import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';


const ratingBodySchema = Joi.object().keys({
  rating: Joi.string()
  .pattern(/^[1-5]{1}/).message('rating should be a string'),
});

const topicQuerySchema = Joi.object().keys({
  topicId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
});
const ratingParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
});

const queryListSchema = Joi.object().keys({
  topicId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
  page: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('page should be a number')
    .optional(),
  pageSize: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('pageSize should be a number')
    .optional(),
});
const deleteCommentParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
  commentId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
});
const validationSchemas = {
   ratingBodySchema,
  ratingParamSchema,
};

type validationKeyType = keyof typeof validationSchemas;

export function validation(
  ...validations: IValidationKeyType<validationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(validationSchemas[v.key], v.type),
  );
}
