import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'database/constant';
import { JWTAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { RoleGuards } from '../guard/role.guard';
import { JoinCourseGuard } from '../guard/student-course.guard';

type ERole = keyof typeof Role;

export const Roles = (...roles: ERole[]) => SetMetadata('roles', roles);

export function Auth(...roles: ERole[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JWTAuthGuard, RoleGuards),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function JoinCourseAuth() {
  return applyDecorators(
    Roles('student'),
    UseGuards(JWTAuthGuard, RoleGuards, JoinCourseGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
