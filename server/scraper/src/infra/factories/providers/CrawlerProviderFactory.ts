import PuppeteerGupyProvider from '@infra/providers/Crawler/implementations/PuppeteerGupyProvider';
import PuppeteerKenobyProvider from '@infra/providers/Crawler/implementations/PuppeteerKenobyProvider';

export function CrawlerProviderFactory(platform: 'kenoby' | 'gupy') {
  const providers = {
    kenoby: new PuppeteerKenobyProvider(),
    gupy: new PuppeteerGupyProvider(),
  };

  return providers[platform];
}
