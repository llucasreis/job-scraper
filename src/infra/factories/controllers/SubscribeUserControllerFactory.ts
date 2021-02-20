import UserMongooseRepository from 'modules/subscriptions/mongoose/repositories/UserMongooseRepository';
import SubscribeUserController from 'modules/subscriptions/useCases/SubscribeUser/SubscribeUserController';
import SubscribeUserUseCase from 'modules/subscriptions/useCases/SubscribeUser/SubscribeUserUseCase';
import QueueProvider from '@infra/providers/Queue/contracts/QueueProvider';
import { QueueProviderFactory } from '../providers/QueueProviderFactory';

export function SubscribeUserControllerFactory() {
  const userMongooseRepository = new UserMongooseRepository();
  const queueProvider: QueueProvider = QueueProviderFactory();
  const subscribeUserUseCase = new SubscribeUserUseCase(
    userMongooseRepository,
    queueProvider,
  );
  const subscribeUserController = new SubscribeUserController(
    subscribeUserUseCase,
  );

  return subscribeUserController;
}
