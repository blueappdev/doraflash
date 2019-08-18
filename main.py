#!/usr/bin/env python

from google.appengine.api import users
import logging, webapp2
import codecs, json, os, os.path, string
from domainmodel import *

registeredPresenters = {}

#logging.debug('This is a debug message')
#logging.info('This is an info message')
#logging.warning('This is a warning message')
#logging.error('This is an error message')
#logging.critical('This is a critical message')

class RequestHandler(webapp2.RequestHandler):
    def write(self, *args):
        for arg in args:
            self.response.write(arg)
            
    def log(self, *args):
        for arg in args:
            logging.info(repr(arg) + " ")
            
    def json(self, obj):
        return json.dumps(obj, ensure_ascii=False)

class MainPage(RequestHandler):
    def loadTemplate(self):
        #logging.warning(os.getcwd())
        stream = open('templates/template.html')
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
        self.template = self.template.replace("%ENVIRONMENT_TYPE%", self.getEnvironmentType()) 
    
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.loadTemplate()
        self.enrichTemplate()
        self.write(self.template)
    
    def getEnvironmentType(self):
        #logging.warning("ENVIRONMENT TYPE")
        #logging.warning(os.getenv('SERVER_SOFTWARE', ''))
        if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
            return "production"
        else:
            return "development"

        
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

class Presenter:
    def __init__(self, action, parameters):
        self.action = action
        self.parameters = parameters
        
    def newUseCaseResult(self):
        result = {
            "value": None, 
            "info": [], 
            "errors" : [], 
            "warnings" : [], 
            "isOK" : True}
        return result
    
    def info(self, message, value=None):
        result = self.newUseCaseResult()
        result["value"] = value
        result["info"].append(message)
        return result

    def error(self, message, value=None):
        result = self.newUseCaseResult()
        result["errors"].append(message)
        result["value"] = value
        result["isOK"] = False
        return result

    def warning(self, message, value=None):
        result = self.newUseCaseResult()
        result["warnings"].append(message)
        result["value"] = value
        result["isOK"] = False
        return result
        
    def parameterNamed(self, name):
        return self.parameters.get(name, None)
        
class CoursePresenter(Presenter):
    def __init__(self, action, parameters):
        Presenter.__init__(self, action, parameters)
        
    def perform(self):
        if self.action == "view":
            return self.view()
        if self.action == "version":
            return self.version()
        return self.error("unknown action "+ self.action)
    
    def view(self):
        name = self.parameterNamed("name")
        newCourse = self.loadCourse(name)
        return self.info("course", json.loads(json.dumps(newCourse.__dict__)))  

    def version(self):
        names = self.parameterNamed("names")
        result = []
        for name in names:
            newCourse = self.loadCourse(name)
            version = newCourse.version
            result.append({"name":name, "version":version})
        return self.info("course versions", result)  
    
    def loadCourse(self, name):
        newCourse = Course(name)
        newCourse.load()
        return newCourse
        
class WebDispatcher(RequestHandler):
    def get(self):
        logging.warning("WebDispatcher>>get (not supported)")
        
    def post(self):
        logging.warning("WebDispatcher>>post - begin")
        self.resource = self.request.get('r')
        self.action = self.request.get('a')
        parameters = self.request.get('p')
        self.log(self.resource)
        self.log(self.action)
        self.log(parameters)
        self.parameters = json.loads(parameters)
        result = self.perform()
        self.write(self.json(result))
        logging.warning("WebDispatcher>>post - end")
    
    def perform(self):
        presenterClass = self.getPresenterClass()
        presenter = presenterClass(self.action, self.parameters)
        return presenter.perform()
        
    def getPresenterClass(self):
        if self.resource == 'course':
            return CoursePresenter;
        raise Exception, "unsupported resource ", self.resource

app = webapp2.WSGIApplication([
        ('/course', CourseHandler),
        ('/perform', WebDispatcher),
        ('/', MainPage)
    ], debug=True)

