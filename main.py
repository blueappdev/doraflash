#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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

