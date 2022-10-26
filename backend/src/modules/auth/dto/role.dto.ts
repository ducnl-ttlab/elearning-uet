import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'database/constant';

export type RoleExclude = Exclude<Role, Role.admin | Role.guess>;

export class RoleDto {
  @ApiProperty()
  role: RoleExclude;
}
