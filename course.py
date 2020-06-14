#!/usr/bin/env python

from google.appengine.api import users
import logging, webapp2
import codecs, json, os, os.path, string
from utils import *
        
class CourseHandler(RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/javascript'
        self.name = self.request.get('name')
        if not self.name:
            self.write("missing parameter name")
            return
        self.writeHeader()
        self.writeContent()
        self.writeFooter()

    def cleanName(self):
        return filter(lambda ch: ch.isalnum(), self.name)
        
    def writeHeader(self):
        self.write('"use strict";\n')
        self.write('function ', self.cleanName(), '() {\n')
        self.write('console.log("', self.name, '() - begin");\n')
    
    def writeFooter(self):
        self.write('console.log("',self.name, '() - end");\n')
        self.write('}\n')
        
    def writeContent(self):
        filename = os.path.join("courses", self.name + ".txt")
        stream = codecs.open(filename, encoding="utf-8-sig")
        for line in stream.readlines():
            line = line.strip()
            if line == "" or line[0] == "#":
                continue
            if line[0] == "@":
                key, value = line[1:].split("=",1)
                self.setAttribute(key.strip(), value.strip())
                continue
            record = line.split(":", 2)
            record = map(string.strip, record)
            self.writeRecord(record)
        self.template = stream.read()
        stream.close()
    
    def setAttribute(self, key, value):
        if key == "name":
            self.write("self.currentCourse.name = ", self.json(value), ";\n")
        elif key == "input-type":
            self.write("self.currentCourse.inputType = ", self.json(value), ";\n")        
        elif key == "title":
            self.write("self.currentCourse.title = ", self.json(value), ";\n")
        elif key == "version":
            pass
        else:
            raise Exception("unknown attribute found " + repr(key))

    def writeRecord(self, record):
        if len(record) == 2:
            question, answer = record
            answers = [answer]
            comment = answer
            self.write(
                "addQuestionAnswersComment(",
                self.json(question), ",", 
                self.json(answers), ",", 
                self.json(answer), ");\n")
        elif len(record) == 3:    
            question, answers, comment = record
            answers = answers.split("|")
            answers = map(string.strip, answers)
            self.write(
                "addQuestionAnswersComment(",
                self.json(question), ",", 
                self.json(answers), ",", 
                self.json(comment), ");\n")
        else:
            logging.error(repr(record))
            raise Exception, "unsupported size of record"


app = webapp2.WSGIApplication([
        ('/course', CourseHandler)
    ], debug=True)

