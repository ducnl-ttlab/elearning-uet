import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';


const commentBodySchema = Joi.object().keys({
  comment: Joi.string().min(1).message('comment should be a string'),
});

const topicQuerySchema = Joi.object().keys({
  topicId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
});
const commentParamSchema = Joi.object().keys({
  courseId: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('topicId should be a number'),
});
const validationSchemas = {
  topicQuerySchema,
  commentBodySchema,
  commentParamSchema
};

type validationKeyType = keyof typeof validationSchemas;

export function validation(
  ...validations: IValidationKeyType<validationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(validationSchemas[v.key], v.type),
  );
}
