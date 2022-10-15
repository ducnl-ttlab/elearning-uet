import { User } from 'src/modules/user/entity/user.entity';
import { FilteredUser } from './interfaces';

export const filterUser = (user: User): FilteredUser => {
  delete user.password;
  delete user.resetToken;
  delete user.expiredTokenTime;
  return user;
};
