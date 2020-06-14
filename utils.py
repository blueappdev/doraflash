#!/usr/bin/env python

from google.appengine.api import users
import logging, webapp2
import codecs, json, os, os.path, string

#logging.debug('This is a debug message')
#logging.info('This is an info message')
#logging.warning('This is a warning message')
#logging.error('This is an error message')
#logging.critical('This is a critical message')

class RequestHandler(webapp2.RequestHandler):
    def write(self, *args):
        for arg in args:
            self.response.write(arg) 
            
    def json(self, obj):
        return json.dumps(obj, ensure_ascii=False)