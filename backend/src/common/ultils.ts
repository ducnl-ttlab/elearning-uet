import { User } from 'src/modules/user/entity/user.entity';

export const filterUser = (user: User): Partial<User> => {
  delete user.id;
  delete user.password;
  delete user.resetToken;
  delete user.expiredTokenTime;

  return user;
};
