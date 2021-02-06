const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://meliuz.gupy.io`);

  await page.screenshot({path: 'example.png'});

  await page.waitForSelector('div[class=description]');

  const searchResults = await page.$eval('tbody', content => {
    const results = [];

    tableContent = content.querySelectorAll('tr');

    if (tableContent) {
      tableContent.forEach(row => {
        const title = row.querySelector('h4').querySelector('span').innerText;
        const url = row.querySelector('a').href;
        const { workplace: city, department } = {...row.dataset};

        const positionData = {
          url,
          title,
          city,
          department,
        }

        results.push(positionData);
      })
    }

    return results;
  })

  searchResults.forEach(result => {
    console.log(result);
  })

  await browser.close();

})();