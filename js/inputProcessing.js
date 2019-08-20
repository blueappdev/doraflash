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
    changedAnswer = changedAnswer.replace(/a1/g,"ā"); 
    if (actualAnswer !== changedAnswer) {
        var start = widget.selectionStart;
        var end = widget.selectionEnd;
        widget.value = changedAnswer;
        // Keep the cursor position
        widget.selectionStart = start;
        widget.selectionEnd = end;
    }
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


