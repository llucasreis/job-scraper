import UserMongooseRepository from '@infra/mongoose/repositories/UserMongooseRepository';
import MailProvider from '@infra/providers/Mail/IMailProvider';
import SubscribeUserController from '@useCases/SubscribeUser/SubscribeUserController';
import SubscribeUserUseCase from '@useCases/SubscribeUser/SubscribeUserUseCase';
import { MailProviderFactory } from '../providers/MailProviderFactory';

export function SubscribeUserControllerFactory() {
  const userMongooseRepository = new UserMongooseRepository();
  const mailProvider: MailProvider = MailProviderFactory();
  const subscribeUserUseCase = new SubscribeUserUseCase(
    userMongooseRepository,
    mailProvider,
  );
  const subscriberUserController = new SubscribeUserController(
    subscribeUserUseCase,
  );

  return subscriberUserController;
}
