import puppeteer from '@config/puppeteer';
import JobInfoDTO from '../dtos/JobInfoDTO';
import CrawlerProvider from '../ICrawlerProvider';

export default class PuppeteerGupyProvider implements CrawlerProvider {
  async searchJobs(): Promise<JobInfoDTO[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://trybe.gupy.io`);

    await page.waitForSelector('div[class=description]');

    const searchResults = await page.$eval('tbody', content => {
      const results: JobInfoDTO[] = [];

      const tableContent = content.querySelectorAll('tr');

      if (tableContent) {
        tableContent.forEach(row => {
          const { attributes } = row;
          const url = row.querySelector('a')?.href;
          const title = row.querySelector('h4')?.querySelector('span')
            ?.innerText;
          const city = attributes.getNamedItem('data-workplace')?.value;
          const department = attributes.getNamedItem('data-department')?.value;

          if (url && title && city && department) {
            const positionData = {
              url,
              title,
              city,
              department,
            };

            results.push(positionData);
          }
        });
      }

      return results;
    });

    await browser.close();

    return searchResults;
  }
}
