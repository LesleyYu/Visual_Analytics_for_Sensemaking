
// setup context menu for users to select info
chrome.contextMenus.removeAll(function() {
  function setItemValue(info, tab) {
    if (info.menuItemId == "item") {
      console.log("You selected \"" + info.selectionText + "\" as a item.");
      // put info into storage
    }
    else if (info.menuItemId == "value") {
      console.log("You selected \"" + info.selectionText + "\" as an value.");
      // put info into storage
    }
  };
  
  chrome.contextMenus.create({
    id: "item",
    title: "Select as item",
    contexts: ["selection"],
  });
  
  chrome.contextMenus.create({
    id: "value",
    title: "Select as value",
    contexts: ["selection"],
  });
  
  chrome.contextMenus.onClicked.addListener(
    setItemValue
    )
  });
  
  // indicates whether this extension is on
  chrome.action.setBadgeText({text: 'ON'});
  chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
  console.log("this is bg.js");



// // ---------- real-time web-scraping  ------------

// import puppeteer from "https://unpkg.com/puppeteer-web";
// import puppeteer from "../js/node_modules/puppeteer-web";
// const puppeteer = require('puppeteer');

// // ---------- 1 ------------
// web-scraping (with puppeteer)
// listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "scrape") {
    // scraping code here

    // const getQuotes = async () => {
    //   console.log("this is bg.js running getQuotes");
    //   // Start a Puppeteer session
    //   const browser = await puppeteer.launch({
    //     headless: false,
    //     defaultViewport: null,
    //   });

    //   // Open a new page
    //   const page = await browser.newPage();

    //   await page.goto("http://quotes.toscrape.com/", {
    //     waitUntil: "domcontentloaded",
    //   });

    //   // Get page data
    //   // 'page.evaluate' will execute the function passed as a parameter in the page context
    //   const quotes = await page.evaluate(() => {
    //     // Fetch the first element with class "quote"
    //     const quoteList = document.querySelectorAll(".quote");

    //     // convert the quoteList to an iterable array 
    //     // For each quote fetch the text and author
    //     return Array.from(quoteList).map((quote) =>{
    //       // Fetch the sub-elements from the previously fetched quote element
    //       const text = quote.querySelector(".text").innerText;
    //       const author = quote.querySelector(".author").innerText;

    //       return {text, author};
    //     })
    //   });

    //   console.log(quotes);
      
    //   // await page.click(".pager > .next > a");
      
    //   // await browser.close();

    //   // Send the scraped data back to the popup script
    //   await sendResponse({data: quotes});
    // };

    // // Start the scraping
    // getQuotes();

  }
});


// // // ---------- 2 ------------

// 'use strict';

// // activate extension when host is www.website.com
// chrome.runtime.onInstalled.addListener(function() {
// 	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
// 		chrome.declarativeContent.onPageChanged.addRules([{
// 				conditions: [new chrome.declarativeContent.PageStateMatcher({
// 					pageUrl: {hostEquals: 'www.website.com'},
// 				})
// 			],
// 		    actions: [new chrome.declarativeContent.ShowPageAction()]
// 		}]);
// 	});
// });