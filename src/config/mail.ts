export interface MailConfig {
  driver: 'mailtrap';

  host: string;
  port: number;

  auth: {
    user: string;
    pass: string;
  };

  defaults: {
    from: {
      email: string;
      name: string;
    };
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

  defaults: {
    from: {
      email: process.env.MAIL_DEFAULT_ADDRESS || 'no-reply@jobsearch.com',
      name: process.env.MAIL_DEFAULT_NAME || 'JobSearch',
    },
  },
} as MailConfig;
