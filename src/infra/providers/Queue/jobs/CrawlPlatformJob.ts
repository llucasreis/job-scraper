import { CrawlerProviderFactory } from '@infra/factories/providers/CrawlerProviderFactory';
import { MailProviderFactory } from '@infra/factories/providers/MailProviderFactory';
import { Job } from 'bull';
import { SubscribeUserRequestDTO } from 'modules/subscriptions/useCases/SubscribeUser/SubscribeUserDTO';
import mailConfig from '@config/mail';

export interface CrawlPlatformData {
  platform: 'kenoby' | 'gupy';
}

interface CrawlPlatformJobConfig {
  key: string;
  handle(data: Job<SubscribeUserRequestDTO>): Promise<void>;
}

export default {
  key: 'CrawlPlatform',
  async handle(job: Job<SubscribeUserRequestDTO>) {
    console.log('Processing...');
    const { email, name, platform } = job.data;

    const crawlerProvider = CrawlerProviderFactory(platform);

    const jobs = await crawlerProvider.searchJobs();

    console.log('Jobs processed');

    const mailProvider = MailProviderFactory();

    await mailProvider.sendMail({
      from: mailConfig.defaults.from,
      to: {
        email,
        name,
      },
      subject: 'Email with Jobs',
      body: JSON.stringify(jobs),
    });

    console.log('Email sended');
  },
} as CrawlPlatformJobConfig;
