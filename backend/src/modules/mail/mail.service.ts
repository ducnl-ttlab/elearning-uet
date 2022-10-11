import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

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

  async sendUserConfirmation() {
    const url = `example.com/auth/confirm?token=`;
    await this.mailerService.sendMail({
      to: '19020153@vnu.edu.vn',
      from: process.env.EMAIL_ID,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: 'user.name',
        url,
      },
    });
  }
}
