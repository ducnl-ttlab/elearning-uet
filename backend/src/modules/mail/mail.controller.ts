import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async senMail() {
    await this.mailService.sendUserConfirmation(
      '19020153@gmail.com',
      '',
      'duc',
    );
    return 'sent';
  }
}
