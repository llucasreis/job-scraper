import puppeteer from '@config/puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://trybe.gupy.io`);

  await page.waitForSelector('div[class=description]');

  const searchResults = await page.$eval('tbody', content => {
    const results = [];

    const tableContent = content.querySelectorAll('tr');

    if (tableContent) {
      tableContent.forEach(row => {
        const { attributes } = row;
        const url = row.querySelector('a')?.href;
        const title = row.querySelector('h4')?.querySelector('span')?.innerText;
        const city = attributes.getNamedItem('data-workplace')?.value;
        const department = attributes.getNamedItem('data-department')?.value;

        const positionData = {
          url,
          title,
          city,
          department,
        };

        results.push(positionData);
      });
    }

    return results;
  });

  searchResults.forEach(result => {
    console.log(result);
  });

  await browser.close();
})();
