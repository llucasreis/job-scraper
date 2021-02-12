import mailConfig from '@config/mail';

import MailTrapProvider from '@infra/providers/Mail/implementations/MailTrapProvider';

export function MailProviderFactory() {
  const providers = {
    mailtrap: new MailTrapProvider(),
  };

  return providers[mailConfig.driver];
}
