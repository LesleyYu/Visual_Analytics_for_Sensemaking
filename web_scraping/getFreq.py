###############################################
# adapted from:
# https://github.com/maksimKorzh/subscribers_assignments/blob/master/src/most_common_words/most_common.py   (explained in: https://www.youtube.com/watch?v=wDMqP7n7tpY)

# packages
from urllib.request import urlopen, Request
import urllib
from html.parser import HTMLParser
import json
import collections
from tika import parser
import json

# words parser class
class WordsParser(HTMLParser):
    # tags to search text within
    search_tags = ['p', 'div', 'span', 'a', 'h1', 'h2', 'h2', 'h3', 'h4']
    
    # current tag
    current_tag = ''
    
    # common word list
    common_words = {}
    
    # handle starting tag
    def handle_starttag(self, tag, attr):
        # store current tag
        self.current_tag = tag        
            
    # handle tag's data
    def handle_data(self, data):
        # get 500 most common and meaningless words to be filtered out
        filename = 'web_scraping/most_common_words.txt'
        raw = parser.from_file(filename)
        filter_words = raw['content']
        # 100 most common words     # for back up
        # filter_words = ['the', 'and', 'a', 'to', 'in', 'that', 'it', 'of', 'for', 'with', 'on', 'was', 'be', 'as', 'at', 'by', 'this', 'have', 'from', 'not', 'but', 'are', 'or', 'they', 'his', 'an', 'which', 'their', 'if', 'we', 'she', 'had', 'all', 'there', 'been', 'one', 'who', 'would', 'her', 'will', 'can', 'when', 'do', 'no', 'more', 'other', 'out', 'so', 'up', 'said', 'what', 'its', 'about', 'into', 'than', 'them', 'some', 'could', 'him', 'time', 'only', 'new', 'these', 'two', 'may', 'any', 'then', 'like', 'now', 'my', 'such', 'make', 'over', 'our', 'even', 'most', 'me', 'state', 'after', 'also', 'well', 'should', 'must', 'their', 'being', 'many', 'much', 'where', 'through', 'back', 'only', 'even', 'think', 'down', 'still', 'go', 'same', 'too', 'many', 'good']

        # make sure current tag matches search tags
        if self.current_tag in self.search_tags:
            # loop over word list within current tag
            for word in data.strip().split():
                # convert word to lowercase and filter characters
                common_word = word.lower()
                common_word = common_word.replace('.', '')
                common_word = common_word.replace(':', '')
                common_word = common_word.replace(',', '')
                common_word = common_word.replace('"', '')
                
                # filter words
                if (
                       len(common_word) > 2 and
                       common_word not in filter_words and
                       common_word[0].isalpha()
                   ):

                    try:
                        # try to update count of a given word if available
                        self.common_words[common_word] += 1
                    
                    except:
                        # store current common word
                        self.common_words.update({common_word: 1})
    
# main driver
if __name__ == '__main__':
    # read all json files to get URLs
    URLs = []
    cnt = 0
    for i in range(1):
        with open('data/{}.json'.format(i+1)) as openfile:

            json_object = json.load(openfile)

             # the num of webpages every json file visitd
            numPages = len(json_object["data"])
            cnt = numPages + cnt

            # append all urls into a list `URLs`
            # for j in range(len(json_object["data"])):
            for j in range(2):
                URLs.append(json_object["data"][j]['url'])

    if (cnt == len(URLs)): print("true")        # check if all webpages are put into `URLs`

    html = ""

    # target URL to scrape
    for url in URLs:
        print(url)
        # make HTTP GET request to the target URL
        class AppURLopener(urllib.request.FancyURLopener):
            version = "Mozilla/5.0"

        opener = AppURLopener()
        response = opener.open(url)

        # extract HTML document from response
        html = response.read().decode('utf-8', errors='ignore') + html
        print(len(html))

    # create words parser instance
    words_parser = WordsParser()

    # feed HTML to words parser
    words_parser.feed(html)

    # count common words with counter
    words_count = collections.Counter(words_parser.common_words)

    # extract 25 most comon words
    most_common = words_count.most_common(25)

    # loop over most common words
    # write into a json file
    dic = {}
    for word, count in most_common:
        print(word, str(count) + ' times', sep=": ")
        dic[word] = count

    print(dic)
    # Serializing json
    json_object = json.dumps(dic, indent=4)
 
    # Writing to sample.json
    with open("js/wordcloud/wordsFreq.json", "w") as outfile:
        outfile.write(json_object)


