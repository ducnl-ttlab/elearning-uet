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

export interface IUserReq<T> extends Request {
  user: T;
}

export interface SearchServiceInterface<T> {
  insertIndex(bulkData: T): Promise<T>;

  updateIndex(updateData: T): Promise<T>;

  searchIndex(searchData: T): Promise<T>;

  deleteIndex(indexData: T): Promise<T>;

  deleteDocument(indexData: T): Promise<T>;
}
