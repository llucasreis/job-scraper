import puppeteer from '@config/puppeteer';
import JobInfoDTO from '../dtos/JobInfoDTO';
import CrawlerProvider from '../contracts/CrawlerProvider';

export default class PuppeteerKenobyProvider implements CrawlerProvider {
  async searchJobs(): Promise<JobInfoDTO[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://jobs.kenoby.com/eldorado`);

    await page.waitForSelector('div[class=content]');

    const searchResults = await page.$eval('div[id=content]', content => {
      const results: JobInfoDTO[] = [];
      const segments = content.querySelectorAll('div[class=segment]');

      if (segments) {
        segments.forEach(segment => {
          const positions = segment.querySelectorAll('a');

          positions.forEach(position => {
            const { attributes } = position;
            const url = position.href;
            const title = attributes.getNamedItem('data-title')?.value;
            const city = attributes.getNamedItem('data-city')?.value;
            const department = attributes.getNamedItem('data-segment')?.value;

            if (title && city && department) {
              const positionData = {
                url,
                title,
                city,
                department,
              };

              results.push(positionData);
            }
          });
        });
      }

      return results;
    });

    await browser.close();

    return searchResults;
  }
}
