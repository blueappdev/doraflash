#!/usr/bin/env python

from google.appengine.api import users
import logging, webapp2
import codecs, json, os, os.path, string
from domainmodel import *
from utils import *

registeredPresenters = {}

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
        logging.info(self.resource)
        logging.info(self.action)
        logging.info(parameters)
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
        ('/perform', WebDispatcher),
        ('/', MainPage)
    ], debug=True)

