import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { Role } from 'database/constant';
import { remove } from 'lodash';
const tokenSchema = Joi.object().keys({
  param: Joi.string().min(10),
});

const loginBodySchema = Joi.object().keys({
  email: Joi.string().required().min(1).email(),
  password: Joi.string().required().min(10),
});

const verifyCodeSchema = Joi.object().keys({
  email: Joi.string().required().min(1).email(),
  code: Joi.string().required().min(5),
});

const roleSchema = Joi.object().keys({
  role: Joi.string()
    .required()
    .valid(
      ...remove(Object.keys(Role), (c) => {
        return c !== Role.guess && c !== Role.admin;
      }),
    ),
});

export class TokenValidation implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      const { error } = tokenSchema.validate({ param: value });
      if (error) {
        throw new BadRequestException({ errors: error.details });
      }
    }
    return value;
  }
}

export class LoginBodyValidation implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = loginBodySchema.validate(value);
      if (error) {
        throw new BadRequestException({ errors: error.details });
      }
    }
    return value;
  }
}

export class VerifyCodeValidation implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      const { error } = verifyCodeSchema.validate(value);

      if (error) {
        throw new BadRequestException({ errors: error.details });
      }
    }
    return value;
  }
}

export class SelectRoleValidation implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = roleSchema.validate({ role: value });

      if (error) {
        throw new BadRequestException({ errors: error.details });
      }
    }
    return value;
  }
}
