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
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.write('<!DOCTYPE html>')
        self.write('<html lang="en">')
        self.write('<head>')
        self.write('<meta charset="utf-8">')
        self.write('<title>Dora Flash</title>')
        self.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>')
        self.write('<script src="js/data.js"></script>')
        self.write('<script src="js/functions.js"></script>')
        self.write('<link rel="stylesheet" href="stylesheets/stylesheet.css">')
        self.write('</head>')
        self.write('<body onload="pageLoaded()">')
        self.write('Version 0.4 (4. März 2019)')
        self.write(users.get_current_user())
        self.addSupportButtons()
        self.write('<h1>Hallo, Dora!</h1>')
        self.write('<div class="questionTitle">Beantworte bitte die Frage.</div>')
        self.write('<div id="question" class="question">Hier kommt die Frage hin.</div>')
        self.write('<div class="answerTitle">Gib hier bitte deine Antwort ein.</div>')
        self.write('<input class="answer" type="text" spellcheck="false" onchange="processAnswer()">')
        self.write('<button onclick="shuffleCards()">Alle Fragen mischen</button>')
        self.write('<div class="feedback"></div>')
        self.write('</body>')
        self.write('<html>')

    def addSupportButtons(self):
        if True:
            return             
        self.write('<button onclick="fetchLesson()">Fetch</button>')
        self.write('<button onclick="inspectLesson()">Inspect</button>')
        self.write('<button onclick="saveCardsToLocalStorage()">Save</button>')
        self.write('<button onclick="loadCardsFromLocalStorage()">Load</button>')
        self.write('<button onclick="fillScreen()">Fill</button>')
        self.write('<button onclick="processAnswer()">Answer</button>')
        self.write('<button onclick="inspectFeedback()">Feedback</button>')

    def write(self, aString):
        self.response.write(aString)

app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
