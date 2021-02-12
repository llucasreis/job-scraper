import mailConfig from '@config/mail';
import nodemailer, { Transporter } from 'nodemailer';
import MailProvider, { SendEmailDTO } from '../IMailProvider';

export default class MailTrapProvider implements MailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: mailConfig.auth,
    });
  }

  async sendMail(data: SendEmailDTO): Promise<void> {
    const { from, to, subject, body } = data;
    await this.transporter.sendMail({
      from: {
        name: from.name,
        address: from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: body,
    });
  }
}
