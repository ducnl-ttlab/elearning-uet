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

const validationSchemas = {
  loginSchema,
};

type validationKeyType = keyof typeof validationSchemas;

export function validation(
  ...validations: IValidationKeyType<validationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(validationSchemas[v.key], v.type),
  );
}
