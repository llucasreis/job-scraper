import { CrawlerProviderFactory } from '@infra/factories/providers/CrawlerProviderFactory';
import CrawlerProvider from '@infra/providers/Crawler/ICrawlerProvider';
import MailProvider from '@infra/providers/Mail/IMailProvider';
import { UserDocument } from '../../mongoose/models/User';
import IUsersRepository from '../../repositories/IUsersRepository';
import { SubscribeUserRequestDTO } from './SubscribeUserDTO';

export default class SubscribeUserUseCase {
  crawlerProvider: CrawlerProvider;

  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: MailProvider,
  ) {}

  public async execute(data: SubscribeUserRequestDTO): Promise<UserDocument> {
    const newUser = await this.usersRepository.subscribe(data);
    const { email, platform, name } = data;

    this.crawlerProvider = CrawlerProviderFactory(platform);

    const jobs = await this.crawlerProvider.searchJobs();

    console.log(jobs);

    await this.mailProvider.sendMail({
      from: {
        email: 'jobssearch@email.com',
        name: 'Job Seacher',
      },
      to: {
        email,
        name,
      },
      subject: 'Email with Jobs',
      body: JSON.stringify(jobs),
    });

    return newUser;
  }
}
