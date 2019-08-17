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
    //console.log("inp %o", currentCourse.inputType);
    var widget = document.getElementById("answer");
    var replacedChar = 'v';
    var replacement = 'ü';
    var moveCursorBy = replacement.length - replacedChar.length; 

    // event.which == 118 for Safari for ipad
    if(event.key == replacedChar || event.which == 118) {
        event.preventDefault();
        // IE
        if(document.selection){
          // Determines the selected text. If no text selected, the location of the cursor in the text is returned
          var range = document.selection.createRange();
          // Place the replacement on the location of the selection, and remove the data in the selection
          range.text = replacement;
          // Chrome + FF
        } else if(widget.selectionStart || widget.selectionStart == '0') {
          // Determines the start and end of the selection.
          // If no text selected, they are the same and the location of the cursor in the text is returned
          // Don't make it a jQuery obj, because selectionStart and selectionEnd is not known.
          var start = widget.selectionStart;
          var end = widget.selectionEnd;
          // Place the replacement on the location of the selection, and remove the data in the selection
          widget.value = widget.value.substring(0, start) + replacement 
                + widget.value.substring(end, widget.value.length);
          //widget.value = "uhu";
          // Set the cursor back at the correct location in the text
          widget.selectionStart = start + moveCursorBy + 1;
          widget.selectionEnd = start + moveCursorBy + 1;
        } else {
          // if no selection could be determined,
          // place the replacement at the end.
          $("#answer").val($("#answer").val() + replacement);
        }
        return false;
    }
};

PinyinInputProcessor.prototype.processInput = function(event) {
    console.log("PinyinInputProcessor>>processInput");
    var widget = document.getElementById("answer");
    var actualAnswer = widget.value;
    var changedAnswer = actualAnswer.replace(/v/g,"ü");
    if (actualAnswer !== changedAnswer) {
        var selectionStart = widget.selectionStart;
        var selectionEnd = widget.selectionEnd;
        widget.value = changedAnswer;
        // Keep the cursor position
        widget.selectionStart = selectionStart;
        widget.selectionEnd = selectionEnd;
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


