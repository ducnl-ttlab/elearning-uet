import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { IGoogleUser } from '../../../common/constant';
import { filterUser } from 'src/common/ultils';
import { SignUp } from '../dto/sign-up.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { IUserJwt, IVerifyUserJwt, Role } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    let { id, email, avatar, username, accessToken } = req.user as IGoogleUser;

    let userDb = await this.userService.findGoogleUser(email, accessToken);
    if (!userDb) {
      let newUser = {
        id,
        email,
        avatar,
        username,
        password: accessToken,
        verified: true,
        role: Role.student,
      };
      userDb = await this.userService.saveUser(newUser);
    }

    return {
      user: filterUser(userDb),
    };
  }

  async verifyEmail(token: string): Promise<any> {
    // Validate token. Will throw error if it's not valid.
    let userFromTokenPayload: IVerifyUserJwt;
    try {
      userFromTokenPayload = await this.decodeToken(token);
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
    let user = await this.userService.findOneById(userFromTokenPayload.id);

    if (!user) {
      throw new BadRequestException('User is not registered');
    } else if (user.verified) {
      throw new BadRequestException('User is verified');
    }

    // Update email verification status.
    let verifyUser = await this.userService.updateUser(
      userFromTokenPayload.id,
      {
        verified: true,
      },
    );

    return { user: filterUser(verifyUser) };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async existEmail(email: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    return user;
  }

  async signUserJwt(user: Partial<User>) {
    const payload: IUserJwt = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signVerifyUserJwt(user: IVerifyUserJwt) {
    const payload: IVerifyUserJwt = {
      email: user.email,
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async decodeToken(token: string) {
    return this.jwtService.verify(token);
  }

  async register(signUp: SignUp): Promise<User> {
    const user = await this.userService.saveUser(signUp);
    delete user.password;
    return user;
  }
}
