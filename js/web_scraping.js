// import puppeteer from "../node_modules";

// const puppeteer = require('puppeteer');

// 没法在前端直接用puppeteer

const getQuotes = async () => {

    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("http://quotes.toscrape.com/", {
      waitUntil: "domcontentloaded",
    });

    // Get page data
    // 'page.evaluate' will execute the function passed as a parameter in the page context
    const quotes = await page.evaluate(() => {
      // Fetch the first element with class "quote"
      const quoteList = document.querySelectorAll(".quote");

      // convert the quoteList to an iterable array 
      // For each quote fetch the text and author
      return Array.from(quoteList).map((quote) =>{
        // Fetch the sub-elements from the previously fetched quote element
        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;
  
        return {text, author};
      })
    });

    console.log(quotes);

    await page.click(".pager > .next > a");

    await browser.close();

};

// Start the scraping
const getQuotesBtn = document.querySelector('#scrape');
getQuotesBtn.addEventListener('click', getQuotes);