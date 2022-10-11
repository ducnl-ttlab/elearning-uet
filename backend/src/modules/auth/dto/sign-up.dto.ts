import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/modules/user/service/is-user-already-exist.validator';

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class VerifyEmail {
  @IsDefined()
  @IsNotEmpty()
  readonly url: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;
}
