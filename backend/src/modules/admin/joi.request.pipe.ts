import { UserCourseStatus } from 'database/constant';
import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

const editCourseChema = Joi.object().keys({
  name: Joi.string().min(1).optional(),
  price: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('price should be a number')
    .optional(),
  isPublished: Joi.string()
    .pattern(/^[0-1]$/)
    .message('isPublished should be 1 or 0')
    .optional(),
});

const validationSchemas = {
  loginSchema,
  editCourseChema,
};

type validationKeyType = keyof typeof validationSchemas;

export function validation(
  ...validations: IValidationKeyType<validationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(validationSchemas[v.key], v.type),
  );
}
