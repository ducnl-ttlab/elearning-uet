import * as Joi from 'joi';
import {
  IValidationKeyType,
  ValidationPipe,
} from 'src/common/pipe/joi.request.pipe';

const userChangePwSchema = Joi.object().keys({
  username: Joi.string().min(1).message('username should be string').optional(),
  address: Joi.string().min(1).message('address should be string').optional(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .message('phone should be a number')
    .optional(),
});

const validationSchemas = {
  userChangePwSchema,
};

type validationKeyType = keyof typeof validationSchemas;

export function validation(
  ...validations: IValidationKeyType<validationKeyType>[]
) {
  return validations.map(
    (v) => new ValidationPipe(validationSchemas[v.key], v.type),
  );
}
