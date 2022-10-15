import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendPlainText() {
    await this.mailerService.sendMail({
      to: '19020153@vnu.edu.vn',
      from: process.env.EMAIL_ID,
      subject: 'NestJS MailerApp',
      text: 'That is a plain text',
      html: '<b>That is HTML</b>',
      template: 'mail-body',
      context: {
        code: 'cf1a3f828287',
        username: 'john doe',
      },
    });
    return 'sent';
  }

  async sendUserConfirmation(email: string, url: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_ID,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: name,
        url,
      },
    });
  }

  async sendUserEmailConfirmation(
    user: Pick<User, 'email' | 'username'>,
    app_name: string,
    url: string,
  ) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.email,
        url,
        app_name,
      },
    });
  }
}
