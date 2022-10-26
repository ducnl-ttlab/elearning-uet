import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserJwtReq } from '../interfaces';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request: IUserJwtReq = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
});
