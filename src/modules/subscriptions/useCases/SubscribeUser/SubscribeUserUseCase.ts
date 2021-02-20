import { CrawlPlatformJob } from '@infra/providers/Queue/jobs';
import QueueProvider from '@infra/providers/Queue/contracts/QueueProvider';
import { UserDocument } from '../../mongoose/models/User';
import UsersRepository from '../../contracts/UsersRepository';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

export default class SubscribeUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private queueProvider: QueueProvider,
  ) {}

  public async execute(data: SubscribeUserRequestDTO): Promise<UserDocument> {
    const newUser = await this.usersRepository.subscribe(data);

    await this.queueProvider.addJob({
      name: CrawlPlatformJob.key,
      data,
    });

    return newUser;
  }
}
