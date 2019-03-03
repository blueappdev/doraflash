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

import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.write("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Dora Flash</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="js/functions.js"></script>
<link rel="stylesheet" href="stylesheets/stylesheet.css">
</head>
<body onload="pageLoaded()">
Version 0.1 (1. März 2019)
""")
        self.addButtons()
        self.write("""
<h1>Hallo, Dora!</h1>
<div class="questionTitle">Beantworte bitte die Frage.</div>
<div id="question" class="question">Hier kommt die Frage hin.</div>
<div class="answerTitle">Gib hier bitte deine Antwort ein.</div>
<input class="answer" type="text" spellcheck="false" onchange="processAnswer()">
<div class="feedback"></div>
</body>
<html>
""")

    def addButtons(self):
        if False:
            return 
        self.write("""<button onclick="fetchLesson()">Fetch</button>
<button onclick="inspectLesson()">Inspect</button>
<button onclick="saveCardsToLocalStorage()">Save</button>
<button onclick="loadCardsFromLocalStorage()">Load</button>
<button onclick="fillScreen()">Fill</button>
<button onclick="processAnswer()">Answer</button>
<button onclick="inspectFeedback()">Feedback</button>
""")

    def write(self, aString):
        self.response.write(aString)


app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
