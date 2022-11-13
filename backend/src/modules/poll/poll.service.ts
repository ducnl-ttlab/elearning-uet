import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTService } from '../jwt/jwt.service';



@Injectable()
export class PollService {
  private readonly logger = new Logger(PollService.name);
  constructor(
    private readonly jwtService: JWTService,
  ) {}
  async createPoll() {
    return {
      poll: 1,
      accessToken: "signedString",
    };
  }

  async joinPoll() {

    return {
      poll: "joinedPoll",
      accessToken: "signedString",
    };
  }

}
