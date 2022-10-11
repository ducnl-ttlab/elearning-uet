import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { IGoogleUser } from '../../../common/constant';
import { filterUser } from 'src/common/ultils';
import { SignUp } from '../dto/sign-up.dto';
import { User } from 'src/modules/user/entity/user.entity';

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

    let userDb = await this.userService.findOne(email);

    if (!userDb) {
      let newUser = { id, email, avatar, username, password: accessToken };
      userDb = await this.userService.saveUser(newUser);
    }

    return {
      user: filterUser(userDb),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async validateEmail(email: string): Promise<User> {
    const user = await this.userService.findOne(email);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(signUp: SignUp): Promise<User> {
    const user = await this.userService.saveUser(signUp);
    delete user.password;
    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
