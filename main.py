#!/usr/bin/env python

from google.appengine.api import users
import webapp2
import codecs, json, os.path, string

class RequestHandler(webapp2.RequestHandler):
    def write(self, aString):
        self.response.write(aString)

class MainPage(RequestHandler):
    def loadTemplate(self):
        stream = open('html/template.html')
        self.template = stream.read()
        stream.close()
       
    def enrichTemplate(self):
        user = users.get_current_user()
        if user is None:
            username = "Guest"
        else:
            username = user.nickname()
        #user.user_id() to be used with persistent data
        self.template = self.template.replace("%USERNAME%", username) 
    
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.loadTemplate()
        self.enrichTemplate()
        self.write(self.template)
        
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

    def writeHeader(self):
        self.write('"use strict";\n')
        self.write('function ')
        self.write(self.name)
        self.write('() {\n')
        self.write('console.log("')
        self.write(self.name)
        self.write('() - begin");\n')
    
    def writeFooter(self):
        self.write('console.log("')
        self.write(self.name)
        self.write('() - end");\n')
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
        if key == "input-type":
            self.write("self.currentCourse.inputType = ")
            self.write(json.dumps(value, ensure_ascii=False))
            self.write(";\n")
        elif key == "name":
            self.write("self.currentCourse.name = ")
            self.write(json.dumps(value, ensure_ascii=False))
            self.write(";\n")
        else:
            raise Exception("unknown attribute found " + repr(key))

    def writeRecord(self, record):
        if len(record) != 3:
            print record
        question, answers, comment = record
        answers = answers.split("|")
        answers = map(string.strip, answers)
        self.write("addQuestionAnswersComment(")
        self.write(json.dumps(question, ensure_ascii=False))
        self.write(",")
        self.write(json.dumps(answers, ensure_ascii=False))
        self.write(",")
        self.write(json.dumps(comment, ensure_ascii=False))
        self.write(");\n")
        

app = webapp2.WSGIApplication([
        ('/course', CourseHandler),
        ('/', MainPage)
    ], debug=True)

