import UsersRepository from '../../contracts/UsersRepository';
import { SubscribeUserRequestDTO } from '../../useCases/SubscribeUser/SubscribeUserDTO';
import User, { UserDocument, UserModel } from '../models/User';

export default class UserMongooseRepository implements UsersRepository {
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
