import pickle
import re
import sys, json
# Miscellaneous
import time
import warnings
warnings.filterwarnings('ignore')

vect = pickle.load(open('transformer.h5', 'rb'))
model = pickle.load(open('best.h5', 'rb'))
def replace_url(comment, replacement):
    comment = str(comment)
    comment = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', replacement, comment)
    comment = re.sub('[/]?watch(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', replacement, comment)
    return comment
def remove_encoding(comment):
    comment = str(comment)
    comment = comment.replace('\ufeff', ' ')
    return comment
class Comment():
  def __init__(self, comment):
    self.comment = comment
  def classification(self):
    comment = self.comment.lower()
    comment = replace_url(comment, 'http')
    comment = remove_encoding(comment)
    comment = comment.split()
    comment = ' '.join(comment)
    X = [comment]
    X_test = vect.transform(X).toarray()
    predict = model.predict(X_test)[0]
    return predict


if __name__ == '__main__':
  data = 'tuyệt vời'
  comment = Comment(comment=data)
  print(comment.classification())

