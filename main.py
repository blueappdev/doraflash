#!/usr/bin/env python

from google.appengine.api import users
import webapp2

class MainPage(webapp2.RequestHandler):
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
        self.loadTemplate()
        self.enrichTemplate()
        self.response.headers['Content-Type'] = 'text/html'
        self.write(self.template)

    def write(self, aString):
        self.response.write(aString)

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)

