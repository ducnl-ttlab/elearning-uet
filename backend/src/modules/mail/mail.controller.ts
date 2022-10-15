import { Controller, Get } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async senMail() {
    await this.mailService.sendUserEmailConfirmation(
      {
        email: '19020153@vnu.edu.vn',
        username: 'ducnong',
      },
      'Elearning',
      'http://localhost:8080',
    );
    return 'sent';
  }
}
