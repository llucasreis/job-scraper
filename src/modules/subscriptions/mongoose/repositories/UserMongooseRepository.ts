import IUsersRepository from '../../repositories/IUsersRepository';
import { SubscribeUserRequestDTO } from '../../useCases/SubscribeUser/SubscribeUserDTO';
import User, { UserDocument, UserModel } from '../models/User';

export default class UserMongooseRepository implements IUsersRepository {
  mongooseRepository: UserModel;

  constructor() {
    this.mongooseRepository = User;
  }

  async subscribe(data: SubscribeUserRequestDTO): Promise<UserDocument> {
    const newUser = User.build(data);

    await newUser.save();

    return newUser;
  }
}
