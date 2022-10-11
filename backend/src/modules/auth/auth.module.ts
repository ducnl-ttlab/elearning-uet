import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { GoogleStrategy } from './stategy/google.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constant';
import { JwtStrategy } from './stategy/jwt.strategy';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
