import { HttpCode, HttpStatus } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';
import { Request } from 'express';
import { Role } from 'database/constant';

export interface IUserJwt {
  role: Role;
  id: string;
  email: string;
  username: string;
}

export type IVerifyUserJwt = Pick<User, 'id' | 'email'>;

export type FilteredUser = Omit<
  User,
  'password' | 'resetToken' | 'expiredTokenTime'
>;

export interface UserResponse {
  user: FilteredUser;
}

export interface IError {
  code: HttpStatus;
  message: string;
  errors: any[];
}

export interface IUserReq extends Request {
  user: IUserJwt;
}
