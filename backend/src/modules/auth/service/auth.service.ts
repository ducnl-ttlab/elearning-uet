import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { IGoogleUser } from '../../../common/constant';
import { filterUser } from 'src/common/ultils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    let { id, email, avatar, username, accessToken } = req.user as IGoogleUser;

    let userDb = await this.usersService.findOne(email);

    if (!userDb) {
      let newUser = { id, email, avatar, username, password: accessToken };
      userDb = await this.usersService.saveUser(newUser);
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

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
