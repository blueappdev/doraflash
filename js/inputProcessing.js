"use strict";

console.log('inputProcessing.js - begin');

var registeredInputProcessors = {};

// Class DefaultInputProcessor class
function DefaultInputProcessor() {
    console.log("DefaultInputProcessor");
    this.name = "default";
};

DefaultInputProcessor.prototype.register = function() {
    registeredInputProcessors[this.name] = this;
};

DefaultInputProcessor.prototype.reasonForInvalidPrecheck = function(event, str) {
    return "";
};

DefaultInputProcessor.prototype.getInputPlaceHolder = function() {
    return "";
};

DefaultInputProcessor.prototype.processInput = function(event) {
};

DefaultInputProcessor.prototype.processKeyPressed = function(event) {
};

//console.log((new DefaultInputProcessor()).register());
(new DefaultInputProcessor()).register();

// Class PinyinInputProcessor inherits from DefaultInputProcessor
function PinyinInputProcessor() {
    console.log("PinyinInputProcessor");
    DefaultInputProcessor.call(this);
    this.name = "pinyin";
};
PinyinInputProcessor.prototype = Object.create(DefaultInputProcessor.prototype);
PinyinInputProcessor.prototype.constructor = PinyinInputProcessor;

PinyinInputProcessor.prototype.processKeyPressed = function(event) {
    var target = event.target || event.srcElement;
    var replacedChar = 'v';
    var replacement = 'ü';
    var moveCursorBy = replacement.length - replacedChar.length;

    // event.which == 118 for Safari for ipad
    if (event.key == replacedChar || event.which == 118) {
        event.preventDefault();
        // IE
        if (document.selection) {
            console.log("branch1");
            // Determines the selected text. If no text selected, the location of the cursor in the text is returned
            var range = document.selection.createRange();
            // Place the replacement on the location of the selection, and remove the data in the selection
            range.text = replacement;
            // Chrome + FF
        } else if (target.selectionStart || target.selectionStart == '0') {
            console.log("branch2");
            var start = target.selectionStart;
            var end = target.selectionEnd;
            target.value = target.value.substring(0, start) + replacement
                + target.value.substring(end, target.value.length);
            target.selectionStart = start + moveCursorBy + 1;
            target.selectionEnd = start + moveCursorBy + 1;
        } else {
            target.value = target.value + replacement;
        }
        return false;
    }
};

PinyinInputProcessor.prototype.accentsMapping = [
    'AĀÁǍÀ',
    'aāáǎà',
    'EĒÉĚÈ',
    'eēéěè',
    'IĪÍǏÌ',
    'iīíǐì',
    'OŌÓǑÒ',
    'oōóǒò',
    'UŪÚǓÙ',
    'uūúǔù',
    'ÜǕǗǙǛ',
    'üǖǘǚǜ'
];

PinyinInputProcessor.prototype.isPinyinVowel = function(ch) {
    for (var i = 0; i < this.accentsMapping.length; i++) {
        if (this.accentsMapping[i].indexOf(ch) >= 0) return true;
    }
    return false;
}

PinyinInputProcessor.prototype.findAccentsRow = function(ch) {
    for (var i = 0; i < this.accentsMapping.length; i++) {
        var row = this.accentsMapping[i];
        if (row.indexOf(ch) >= 0) return row;
    }
    return null;
}

PinyinInputProcessor.prototype.removeAccents = function(s) {
    var result = "";
    for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        var row = this.findAccentsRow(ch);
        var withoutAccent = row ? row[0] : ch;
        result += withoutAccent;
    }
    return result;
}

PinyinInputProcessor.prototype.addAccent = function(final, toneNumber) {
    final = this.removeAccents(final);
    var positionOfToneCarrier;
    if (["iu", "ui" ].includes(final.toLowerCase()))
        positionOfToneCarrier = 1;
    else
        positionOfToneCarrier = final.indexOf("a");
        if (positionOfToneCarrier == -1) 
            positionOfToneCarrier = final.indexOf('o');
        if (positionOfToneCarrier == -1) 
            positionOfToneCarrier = final.indexOf('e');
        if (positionOfToneCarrier == -1) 
            positionOfToneCarrier = 0;
    var toneCarrier = final[positionOfToneCarrier];
    var row = this.findAccentsRow(toneCarrier);
    var accentedCharacter = row[toneNumber];
    return (final.substring(0, positionOfToneCarrier) 
        + accentedCharacter 
        + final.substring(positionOfToneCarrier+1));
}

PinyinInputProcessor.prototype.convertToneNumber = function(widget, toneNumber) {
    var s = widget.value;
    var start = widget.selectionStart;
    var end = widget.selectionEnd;
    var positionOfToneNumber = s.indexOf(toneNumber);
    if (positionOfToneNumber == -1) return; 
    console.log("position of tone number %o is %o.", toneNumber, positionOfToneNumber);
    var endOfFinal = positionOfToneNumber - 1;
    if (endOfFinal < 0) return;
    var startOfFinal = endOfFinal;
    if (startOfFinal >= 0 && s[startOfFinal] == "r") startOfFinal--;
    if (startOfFinal >= 0 && s[startOfFinal] == "g") startOfFinal--;
    if (startOfFinal >= 0 && s[startOfFinal] == "n") startOfFinal--;
    while (startOfFinal >= 0 && this.isPinyinVowel(s[startOfFinal])) {
        startOfFinal--;
    }
    startOfFinal++;
    var oldFinal = this.removeAccents(s.substring(startOfFinal, endOfFinal+1));
    console.log("oldFinal %o", oldFinal);
    var newFinal = this.addAccent(oldFinal, toneNumber);
    console.log("newFinal %o", newFinal);

    var newValue = s.substring(0, startOfFinal) 
        + newFinal
        + s.substring(positionOfToneNumber + 1);

    widget.value = newValue;
    widget.selectionEnd = positionOfToneNumber;
}

PinyinInputProcessor.prototype.convertAccents = function(widget) {
    for (var toneNumber = 0; toneNumber <= 4; toneNumber++) {
        this.convertToneNumber(widget, toneNumber);
    }
}

PinyinInputProcessor.prototype.processInput = function(event) {
    console.log("PinyinInputProcessor>>processInput");
    var widget = document.getElementById("answer");
    var actualAnswer = widget.value;
    if (actualAnswer === "") {
        $("#answer").removeClass("wrong");
    }
    var changedAnswer = actualAnswer;
    changedAnswer = changedAnswer.replace(/v/g,"ü");
    changedAnswer = changedAnswer.replace(/V/g,"Ü");
    if (actualAnswer !== changedAnswer) {
        var start = widget.selectionStart;
        var end = widget.selectionEnd;
        widget.value = changedAnswer;
        widget.selectionStart = start;
        widget.selectionEnd = end;
    }
    this.convertAccents(widget);
};

PinyinInputProcessor.prototype.getInputPlaceHolder = function() {
    return "<pinyin>";
};

(new PinyinInputProcessor()).register();

// Class ChineseInputProcessor inherits from DefaultInputProcessor
function ChineseInputProcessor() {
    console.log("ChineseInputProcessor");
    DefaultInputProcessor.call(this);
    this.name = "chinese";
};
ChineseInputProcessor.prototype = Object.create(DefaultInputProcessor.prototype);
ChineseInputProcessor.prototype.constructor = ChineseInputProcessor;

ChineseInputProcessor.prototype.processKeyPressed = function(event, widget) {
};

ChineseInputProcessor.prototype.reasonForInvalidPrecheck = function(str) {
    // should call super
    if (str.match(/[a-z]/i)) return "Eine Pinyin Antwort wurde eingegeben. Bitte Chinesisch eingeben."
    return "";
};

(new ChineseInputProcessor()).register();


console.log('inputProcessing.js - end');
