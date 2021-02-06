import pupeeterr from 'puppeteer';

(async () => {
  const browser = await pupeeterr.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://jobs.kenoby.com/eldorado`);

  await page.waitForSelector('div[class=content]');

  const searchResults = await page.$eval('div[id=content]', content => {
    const results = [];
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

          const positionData = {
            url,
            title,
            city,
            department,
          };

          results.push(positionData);
        });
      });
    }

    return results;
  });

  searchResults.forEach(result => {
    console.log(result);
  });

  await browser.close();
})();
