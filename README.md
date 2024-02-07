# LiujiaIDS

## Installation
1.	Launch Chrome. In the upper-right corner of the browser, click on Extensions.
2.	On the panel that appears, click on Manage Extentions. This will take you to your chrome extension management page.
3.	In the upper-right corner on this page, Click on the Developer mode tab.    	 
4.	After a row of developer choices appear. Click on Load Unpacked.
5.	Unzip CloudChoice, then select the root directory to import as a chrome extension. 
6.	Now that CloudChoice has been imported successfully, click on Extensions tab again. A popup window will appear. 
7.	Click on Launch. Your journey on CloudChoice begins.

## Libraries used

### Javascript Libraries
**localStorageDB**: "https://github.com/knadh/localStorageDB.git", \
**jquery**: version 2.1.1, \
**puppeteer**: "https://github.com/puppeteer/puppeteer.git", \
**wordcloud**: "https://github.com/timdream/wordcloud2.js.git", \
**d3**: versioin 3.4.13, \
**gantt**: https://github.com/DHTMLX/gantt

### Python Libraries
**urllib**: https://docs.python.org/3/library/urllib.html \
**HTMLParser**: https://docs.python.org/3/library/html.parser.html \
**KeyBERT**: https://pypi.org/project/keybert/ \
**Rake**: https://pypi.org/project/rake-nltk/ \
**yake**: https://pypi.org/project/yake/ \
**pke**: https://boudinfl.github.io/pke/build/html/index.html \
**spacy**: https://spacy.io/api/doc

## Development Outline

### real-time puppeteer (failed)
1. use node.js locally. needs a server.
2. use puppeteer-web. deprecated now.
3. use browserify to bundle the puppeteer files. failed.
4. use puppeteer-web kept by ppl on stackoverflow. unable to integrate with chrome extension.

#### word cloud (DONE)
1. use library
2. customize
3. analyze word emotionx      *TODO*

### data storage and interactive table (DONE)
write data into a table, make it interactive

### Data analysis (DONE)
1. frequency count
2. keywords extraction (nlp): run 6 models, benchmark function
a. score normalisation 伪代码

### Data Pre-processing (DONE)
Dealing with raw user data (python)

