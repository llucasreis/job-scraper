import PuppeteerGupyProvider from '@infra/providers/Crawler/implementations/PuppeteerGupyProvider';
import PuppeteerKenobyProvider from '@infra/providers/Crawler/implementations/PuppeteerKenobyProvider';

export function CrawlerProviderFactory(platform: 'kenoby' | 'gupy') {
  if (platform === 'kenoby') {
    return new PuppeteerKenobyProvider();
  }

  return new PuppeteerGupyProvider();
}
