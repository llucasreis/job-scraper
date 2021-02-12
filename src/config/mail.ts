export interface MailConfig {
  driver: 'mailtrap';

  host: string;
  port: number;

  auth: {
    user: string;
    pass: string;
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),

  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
} as MailConfig;
