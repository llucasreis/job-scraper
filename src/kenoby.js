const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Connecting to browser...");
  await page.goto(`https://jobs.kenoby.com/bemoldigital`);

  console.log("Entered in page...");

  await page.waitForSelector('div[class=content]');

  const searchResults = await page.$eval('div[id=content]', content => {
    console.log("Found content, starting extraction...");
    const results = [];

    const segments = content.querySelectorAll('div[class=segment]');

    if (segments) {
      segments.forEach(segment => {
        positions = segment.querySelectorAll('a');

        positions.forEach(position => {
          const positionData = {
            url: position.href,
            ...position.dataset            
          }

          results.push(positionData);
        })
      })
    }
    
    return results;
  });

  searchResults.forEach(result => {
    console.log(result);
  })

  console.log("Finished");

  await browser.close();
})();