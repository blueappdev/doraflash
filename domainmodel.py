#
# domainmodel.py
#

import os, codecs, string
import json

class Course:
    def __init__(self, name):
        self.name = name
        self.title = None
        self.inputType = None
        self.version = None
        self.cards = []
         
    def load(self):
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
            newCard = {}
            newCard["q"] = record[0]
            newCard["a"] = record[1]
            newCard["c"] = record[2]
            self.cards.append(newCard)
        stream.close()        
        return self
        
    def setAttribute(self, key, value):
        if key == "name":
            self.name = value
        elif key == "input-type":
            self.inputType = value
        elif key == "title":
            self.title = value
        elif key == "version":
            self.version = value
        else:
            raise Exception("unknown attribute found " + repr(key))     

if __name__ == "__main__":
    c = Course("greek")
    c.load()
    print c.version, c.name
    obj = c.__dict__d
    print json.dumps(obj)