import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { IGoogleUser } from 'src/common/constant';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '149883907678-a3hbaav1d513uujomiptve3jm7thh6dg.apps.googleusercontent.com',
      clientSecret: 'z5BYROvv8R6dlnaIt3W50a5m',
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, photos, displayName, id } = profile;

    const user: IGoogleUser = {
      id: id,
      email: emails[0].value,
      username: displayName,
      avatar: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
