// this file connects puppeteer-web

import puppeteer from 'puppeteer-web';

async function run(){

  const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://0.0.0.0:8080`, // <-- connect to a server running somewhere
    ignoreHTTPSErrors: true
  });

  const pagesCount = (await browser.pages()).length;
  const browserWSEndpoint = await browser.wsEndpoint();
  console.log({ browserWSEndpoint, pagesCount });

}