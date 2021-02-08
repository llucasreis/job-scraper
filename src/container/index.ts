import { container } from 'tsyringe';

import UsersRepository from '../infra/repositories/IUsersRepository';
import UserMongooseRepository from '../infra/mongoose/repositories/UserMongooseRepository';

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  UserMongooseRepository,
);
