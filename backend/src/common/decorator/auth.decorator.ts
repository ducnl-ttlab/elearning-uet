import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'database/constant';
import { JWTAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { RoleGuards } from '../guard/role.guard';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JWTAuthGuard, RoleGuards),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
