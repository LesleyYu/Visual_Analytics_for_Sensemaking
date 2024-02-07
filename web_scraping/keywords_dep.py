# # ###############################################
# # # NLP: Keywords extraction
# # # 

# # # packages
# # from urllib.request import urlopen, Request
# # import urllib
# # from html.parser import HTMLParser
# # import json
# # import collections
# # import json
# # import re   # get rid of weird white spaces

# # # words parser class
# # class WordsParser(HTMLParser):
# #     # tags to search text within
# #     search_tags = ['p', 'div', 'span', 'a']
    
# #     # current tag
# #     current_tag = ''
    
# #     # list of all sentences
# #     all_words = []
    
# #     # handle starting tag
# #     def handle_starttag(self, tag, attr):
# #         # store current tag
# #         self.current_tag = tag        
            
# #     # handle tag's data
# #     def handle_data(self, data):
        
# #       # make sure current tag matches search tags
# #       if self.current_tag in self.search_tags:
# #         if (
# #             (('.' in data) or ('!' in data) or ('?' in data)) and
# #             ('...' not in data)
# #         ):
            
# #             # clean the data
# #             data = re.sub('\s+' ,' ', data)
# #             " ".join(data.split())      # remove duplicate spaces and newline characters
            
# #             # add to the list
# #             self.all_words.append(data)
            


# # # main driver
# # if __name__ == '__main__':
# #   # read all json files to get URLs
# #   URLs = []
# #   cnt = 0
# #   for i in range(1):
# #       with open('data/{}.json'.format(i+1)) as openfile:

# #           json_object = json.load(openfile)

# #           # # the num of webpages every json file visitd
# #           # numPages = len(json_object["data"])
# #           # cnt = numPages + cnt

# #           # append all urls into a list `URLs`
# #           # for j in range(len(json_object["data"])):
# #           for j in range(2):
# #               URLs.append(json_object["data"][j]['url'])

# #   # # if (cnt == len(URLs)): print("true")        # check if all webpages are put into `URLs`

# #   html = ""

# #   # target URL to scrape
# #   for url in URLs:
# #       print(url)
# #       # make HTTP GET request to the target URL
# #       class AppURLopener(urllib.request.FancyURLopener):
# #           version = "Mozilla/5.0"

# #       opener = AppURLopener()
# #       response = opener.open(url)

# #       # extract HTML document from response
# #       html = response.read().decode('utf-8', errors='ignore') + html
# #       print(len(html))

# #   # create words parser instance
# #   words_parser = WordsParser()

# #   # feed HTML to words parser
# #   words_parser.feed(html)

# #   # get all full sentences
# #   sentences = words_parser.all_words

# #   # now that we have got all the sentences webpages user browsed
# #   # save to a txt file for backup
# #   # print(sentences)
# #   with open("web_scraping/sentences.txt", "w") as f:
# #       for sentence in sentences:
# #           f.write(sentence + '\n')
  

# sentences = ['Why Study Public Health?', 'Graduate programs in the Department of Biostatistics at the University of Michigan School of Public Health are among the best in the world. Currently, we are ranked as the No. 4 biostatistics department by US News and World Report. ', 'Alongside our world-renowned faculty, you’ll learn how to develop statistical designs and computational tools for analysis of large scale complex data in medical and health sciences, and work to apply statistical methods to discover groundbreaking scientific findings.', 'The Department of Biostatistics at the University of Michigan is excited to welcome to Ann Arbor its newest cohort of potential future Wolverines to the 2023 Biostatistics Admitted Student Experience (BASE).', ' We are no longer accepting applications for the Fall 2023 semester. Applications for Fall 2024 will open in September 2023.', 'Two-year, 48-credit-hour professional degree with an emphasis on practice experience. ', 'Twenty-month, 48-credit-hour degree for students who plan to go on to pursue a PhD or scientific research and academic careers, including jobs in biostatistics and data science. With the MS we also offer:', ' We offer two MS degrees: MS in Biostatistics and MS in Health Data Science.', "High-level research track with original research as part of a doctoral dissertation. We offer two programs of study: one for students with a relevant master's degree and one for students without a relevant master's degree.", 'We are driven by our collective mission to help people and our resolute passion for problem solving. We are innovators and collaborators; we are thinkers and we are doers.', 'Our graduates have great job opportunities in academia, government, industry, and various other research institutions. Discover what you can accomplish with a degree from the Department of Biostatistics.', 'With more than $50M in funded research annually, Biostatistics faculty and students are conducting cutting-edge biostatistical research. They are involved in a wide range of collaborative research activities with faculty across the University of Michigan campus. Among our research areas:', 'Department of Biostatistics faculty and researchers have achieved national and international reputations for excellence in their field. They bring biostatistical design and analysis expertise to a wide spectrum of health-related issues.', 'Start with our Applications & Deadlines to learn about specific degree application deadlines and requirements. International applicants will find additional information on our International Students page.', 'sph-inquiries@umich.edu', 'If you would like to receive more information about a specific department or program, please join our interest list. You can also request a phone, zoom or in-person appointment.', 'How Do I Apply?', ' if you are not redirected within a few seconds.', 'sph.umich.edu › biostat › programs › masters', 'The MS and MPH programs in Biostatistics and the MS in Health Data Science are designed for completion in four terms (twenty months) with a total of 48 credits.', 'sph.umich.edu › biostat', 'sph.umich.edu › biostat › programs › masters-biostat', 'Is a masters in biostatistics hard?', 'Is MS biostatistics a stem?', 'What is the acceptance rate for data science masters at umich?', 'Is University of Michigan good for Masters?', 'sph.umich.edu › biostat › apply-ms-biostatistics', 'The application for the Master of Science program in Biostatistics is administered by the Horace H. Rackham School of Graduate Studies.', 'sph.umich.edu › biostat › programs › masters-amd', 'sph.umich.edu › biostat › programs', 'sph.umich.edu › biostat › apply-mph-biostat', 'sph.umich.edu › biostat › programs › masters-hds', 'sph.umich.edu › biostat › masters-student-directory', 'sph.umich.edu › biostat › biostatistics-prospective-students', 'MASTER OF SCIENCE in Biostatistics Degree · MASTER OF SCIENCE in health data science Degree · MASTER OF PUBLIC HEALTH Degree · PhD in Biostatistics.']
sentences = ['Why Study Public Health?', 'Graduate programs in the Department of Biostatistics at the University of Michigan School of Public Health are among the best in the world. Currently, we are ranked as the No. 4 biostatistics department by US News and World Report. ']

# ------ Keywords Extraction ------

from keybert import KeyBERT
from rake_nltk import Rake
import yake
import pke
import string

# initiate BERT outside of functions
bert = KeyBERT()

# # 1. RAKE
# def rake_extractor(text):
#     """
#     Uses Rake to extract the top 5 keywords from a text
#     Arguments: text (str)
#     Returns: list of keywords (list)
#     """
#     r = Rake()
#     r.extract_keywords_from_text(text)
#     return r.get_ranked_phrases()[:5]


# # 2. YAKE       # https://liaad.github.io/yake/docs/getting_started
# def yake_extractor(text):
#     """
#     Uses YAKE to extract the top 5 keywords from a text
#     Arguments: text (str)
#     Returns: list of keywords (list)
#     """
#     keywords = yake.KeywordExtractor(lan="en", n=3, windowsSize=3, top=5).extract_keywords(text)
#     results = []
#     for scored_keywords in keywords:
#         for keyword in scored_keywords:
#             if isinstance(keyword, str):
#                 results.append(keyword) 
#     return results 


# # 3. PositionRank
# def position_rank_extractor(text):
#     """
#     Uses PositionRank to extract the top 5 keywords from a text
#     Arguments: text (str)
#     Returns: list of keywords (list)
#     """
#     # define the valid Part-of-Speeches to occur in the graph
#     pos = {'NOUN', 'PROPN', 'ADJ', 'ADV'}
#     extractor = pke.unsupervised.PositionRank()
#     extractor.load_document(text, language='en')
#     extractor.candidate_selection(maximum_word_number=5)
#     # 4. weight the candidates using the sum of their word's scores that are
#     #    computed using random walk biaised with the position of the words
#     #    in the document. In the graph, nodes are words (nouns and
#     #    adjectives only) that are connected if they occur in a window of
#     #    3 words.
#     extractor.candidate_weighting(window=3, pos=pos)
#     # 5. get the 5-highest scored candidates as keyphrases
#     keyphrases = extractor.get_n_best(n=5)
#     results = []
#     for scored_keywords in keyphrases:
#         for keyword in scored_keywords:
#             if isinstance(keyword, str):
#                 results.append(keyword) 
#     return results 


# # 4. SingleRank
# def single_rank_extractor(text):
#     """
#     Uses SingleRank to extract the top 5 keywords from a text
#     Arguments: text (str)
#     Returns: list of keywords (list)
#     """
#     pos = {'NOUN', 'PROPN', 'ADJ', 'ADV'}
#     extractor = pke.unsupervised.SingleRank()
#     extractor.load_document(text, language='en')
#     extractor.candidate_selection(pos=pos)
#     extractor.candidate_weighting(window=3, pos=pos)
#     keyphrases = extractor.get_n_best(n=5)
#     results = []
#     for scored_keywords in keyphrases:
#         for keyword in scored_keywords:
#             if isinstance(keyword, str):
#                 results.append(keyword) 
#     return results 


# # 5. MultipartiteRank
# def multipartite_rank_extractor(text):
#     """
#     Uses MultipartiteRank to extract the top 5 keywords from a text
#     Arguments: text (str)
#     Returns: list of keywords (list)
#     """
#     extractor = pke.unsupervised.MultipartiteRank()
#     extractor.load_document(text, language='en')
#     pos = {'NOUN', 'PROPN', 'ADJ', 'ADV'}
#     extractor.candidate_selection(pos=pos)
#     # 4. build the Multipartite graph and rank candidates using random walk,
#     #    alpha controls the weight adjustment mechanism, see TopicRank for
#     #    threshold/method parameters.
#     extractor.candidate_weighting(alpha=1.1, threshold=0.74, method='average')
#     keyphrases = extractor.get_n_best(n=5)
#     results = []
#     for scored_keywords in keyphrases:
#         for keyword in scored_keywords:
#             if isinstance(keyword, str):
#                 results.append(keyword) 
#     return results


# # 6. TopicRank
def topic_rank_extractor(text):

    # use TopicRank as extractor
    extractor = pke.unsupervised.TopicRank()

    # load content with stopwords and punctuations
    stoplist = list(string.punctuation)         # punctuations:  !"#$%&'()*+, -./:;<=>?@[\]^_`{|}~
    stoplist += pke.lang.stopwords.get('en')
    extractor.load_document(text, language='en', stoplist=stoplist)

    # sentence structure pattern
    # select the longest sequences of nouns and adjectives, that do not contain punctuation marks or stopwords as candidates.
    pos = {'NOUN', 'PROPN', 'ADJ'}   #, 'ADV'
    extractor.candidate_selection(pos=pos)

    # default:
    # build topics by grouping candidates with HAC (average linkage, threshold of 1/4 of shared stems). 
    # Weight the topics using random walk, and select the first occuring candidate from each topic.
    extractor.candidate_weighting()

    # get the 5-highest scored candidates as keyphrases
    keyphrases = extractor.get_n_best(n=5)
    
    results = []
    for scored_keywords in keyphrases:
        for keyword in scored_keywords:
            if isinstance(keyword, str):
                results.append(keyword) 
    return results

# # usage:
article = ''
for sentence in sentences:
    article += sentence
result = topic_rank_extractor(article)
print(result)

# # 7. KeyBERT
def keybert_extractor(text):
    """
    Uses KeyBERT to extract the top 5 one-word-long keywords from a text
    combined with frequency count
    Arguments(str): text
    Returns(dictrionary): list of keywords, with scores add up together
    """
    keywords = bert.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words= None, top_n=5)

    results = {}
    index = 0

    # get keywords in every sentence
    for scored_keywords in keywords:

        index = index + 1
        print("keywords in sentence", index, "is", scored_keywords)

        # loop every keyword in each sentence
        for keyword in scored_keywords:

            try:
                # try to update count of the given keyword if available
                results[keyword[0]] += keyword[1]
                print("try:", keyword[0], keyword[0])
            
            except:
                # store current keyword
                # results_combined.update({keyword: score})
                results[keyword[0]] = keyword[1]
                print("except:", keyword[0])
    
    return results 

# # usage:
# results = keybert_extractor(sentences)
# print(results)

