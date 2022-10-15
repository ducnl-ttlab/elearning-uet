import { HttpCode, HttpStatus } from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';

export enum Role {
  student,
  instructor,
  admin,
}

export interface IUserJwt {
  role: Role;
  id: string;
  username: string;
}

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
