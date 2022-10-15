import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordLink(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset password',
      template: './reset_password',
      context: {
        name: email,
        url,
        app_name: process.env.APP_NAME,
      },
    });
  }

  async sendUserEmailConfirmation(
    user: Pick<User, 'email' | 'username'>,
    url: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Welcome to ${process.env.APP_NAME} App! Confirm your Email`,
      template: './confirmation',
      context: {
        name: user.email,
        url,
        app_name: process.env.APP_NAME,
      },
    });
  }
}
