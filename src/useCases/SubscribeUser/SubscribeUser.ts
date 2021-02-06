import { inject, injectable } from 'tsyringe';
import { UserDocument } from '../../infra/mongoose/models/User';
import IUsersRepository from '../../repositories/IUsersRepository';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

@injectable()
export default class SubscribeUser {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: SubscribeUserRequestDTO): Promise<UserDocument> {
    const newUser = await this.usersRepository.subscribe(data);

    return newUser;
  }
}
