export interface MailAddress {
  name: string;
  email: string;
}

export interface SendEmailDTO {
  from: MailAddress;
  to: MailAddress;
  subject: string;
  body: string;
}

export default interface MailProvider {
  sendMail(data: SendEmailDTO): Promise<void>;
}
