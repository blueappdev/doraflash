#!/usr/bin/env python

from google.appengine.api import users
import logging, webapp2
import codecs, json, os, os.path, string
from utils import *
        
class DataHandler(RequestHandler):
    def get(self):        
        self.response.headers['Content-Type'] = 'application/javascript'
        self.writeHeader()
        self.writeContent()
        self.writeFooter()
        
    def writeHeader(self):
        self.write('"use strict";\n')
        self.write('var decompositionTable = {\n')
    
    def writeFooter(self):
        self.write('}\n')
        
    def writeContent(self):
        filename = os.path.join("data/decomposition.u8")
        stream = codecs.open(filename, encoding="utf-8-sig")
        for line in stream.readlines():
            line = line.strip()
            if line == "" or line[0] == "#":
                continue
            record = line.split(":")
            record = map(string.strip, record)
            self.writeRecord(record)
        self.template = stream.read()
        stream.close()
    
    def writeRecord(self, record):
        if len(record) == 1 or record[1] == "":
            return
        key = record[0]    
        value = record[1]
        self.write(
                self.json(key), 
                " : ", 
                self.json(value), 
                ",\n")

app = webapp2.WSGIApplication([
        ('/data/.*', DataHandler)
    ], debug=True)

