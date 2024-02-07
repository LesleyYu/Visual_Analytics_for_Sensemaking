console.log("this is popup.js");

document.addEventListener("DOMContentLoaded", function() {

  // create a new window to launch separately
  const page = "pages/index.html"
  document.getElementById("launch-window").addEventListener("click", function() {
     chrome.windows.create({
      url: chrome.runtime.getURL(page), 
      type: "popup",
      width: 800
    });
  });
});



// // ---------- real-time web-scraping  ------------

// Here I tried three ways to use puppeteer-web in a chrome extension,
// unfortunately, puppeteer-web is now deprecated and there's currently no way
// I can manage to enable web-scraping real-time. 

// ---------- 3 ------------
// https://stackoverflow.com/questions/55184255/can-i-use-puppeteer-inside-chrome-extension


// ---------- 1 ------------
// web-scraping (with puppeteer)
// send a message to background js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.runtime.sendMessage({action: "scrape", url: tabs[0].url});
});

// display the scraped data
// listen for a message with the action displayData and displays the scraped data in the popup.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "scrape") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "displayData", data: request.data});
    });
  }
});

// display the scraped data in the container
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "displayData") {
    document.getElementById("dataContainer").innerHTML = request.data;
  }
});



// // ---------- 2 ------------
// // web scraping (directly, without puppeteer)

// 'use strict';

// // list of urls to navigate
// let urls_list = [
// 	'https://developer.chrome.com/docs/extensions/mv3/service_workers/',
// 	'https://developer.chrome.com/docs/extensions/mv3/user_interface/',
// ];

// // start navigation when #startNavigation button is clicked
// window.onload = function() {
// 	startNavigation = document.querySelector("#startNavigation");
// 	startNavigation.onclick = function(element) {
// 		// query the current tab to find its id
// 		chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
// 			for(let i=0; i<urls_list.length; i++) {
// 				// navigate to next url
// 				await goToPage(urls_list[i], i+1, tabs[0].id);
				
// 				// wait for 5 seconds
// 				await waitSeconds(5);
// 			}

// 			// navigation of all pages is finished
// 			alert('Navigation Completed');
// 		});
// 	};

// 	async function goToPage(url, url_index, tab_id) {
// 		return new Promise(function(resolve, reject) {
// 			// update current tab with new url
// 			chrome.tabs.update({url: url});
			
// 			// fired when tab is updated
// 			chrome.tabs.onUpdated.addListener(function openPage(tabID, changeInfo) {
// 				// tab has finished loading, validate whether it is the same tab
// 				if(tab_id == tabID && changeInfo.status === 'complete') {
// 					// remove tab onUpdate event as it may get duplicated
// 					chrome.tabs.onUpdated.removeListener(openPage);

// 					// fired when content script sends a message
// 					chrome.runtime.onMessage.addListener(function getDOMInfo(message) {
// 						// remove onMessage event as it may get duplicated
// 						chrome.runtime.onMessage.removeListener(getDOMInfo);

// 						// save data from message to a JSON file and download
// 						let json_data = {
// 							title: JSON.parse(message).title,
// 							h1: JSON.parse(message).h1,
// 							url: url
// 						};

// 						let blob = new Blob([JSON.stringify(json_data)], {type: "application/json;charset=utf-8"});
// 						let objectURL = URL.createObjectURL(blob);
// 						chrome.downloads.download({ url: objectURL, filename: ('content/' + url_index + '/data.json'), conflictAction: 'overwrite' });
// 					});

// 					// execute content script
// 					chrome.tabs.executeScript({ file: 'script.js' }, function() {
// 						// resolve Promise after content script has executed
// 						resolve();
// 					});
// 				}
// 			});
// 		});
// 	}

// 	// async function to wait for x seconds 
// 	async function waitSeconds(seconds) {
// 		return new Promise(function(resolve, reject) {
// 			setTimeout(function() {
// 				resolve();
// 			}, seconds*1000);
// 		});
// 	}
// }