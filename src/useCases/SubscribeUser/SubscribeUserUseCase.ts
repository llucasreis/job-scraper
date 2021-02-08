import { CrawlerProviderFactory } from '@infra/factories/providers/CrawlerProviderFactory';
import { inject, injectable } from 'tsyringe';
import { UserDocument } from '../../infra/mongoose/models/User';
import IUsersRepository from '../../infra/repositories/IUsersRepository';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

@injectable()
export default class SubscribeUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: SubscribeUserRequestDTO): Promise<UserDocument> {
    const newUser = await this.usersRepository.subscribe(data);

    const { platform } = data;

    // chama o crawler e printa alguma informação

    const jobs = await CrawlerProviderFactory(platform).searchJobs();

    console.log(jobs);

    return newUser;
  }
}
