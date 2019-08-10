"use strict";

console.log('keycodes.js - begin');

var feedback = [];

function pageLoaded () {
    console.log('pageLoaded() - begin');
    $("#input").keypress(handler);
    $("#input").keydown(handler);
    $("#input").keyup(handler);
    $("#input").on('input',handler2); 
    console.log('pageLoaded() - end');
}

function handler(event) {
    addEvent(event);
}

function handler2(event) {
  addFeedback(event.type, JSON.stringify(event));
}

function addEvent(event) {
    addFeedback(
        event.type, 
        event.key, 
        event.which,
        event.charCode,
        event.keyCode,
        event.originalEvent.type, 
        event.originalEvent.key, 
        event.originalEvent.location,
        event.originalEvent.which,
        event.originalEvent.charCode,
        event.originalEvent.keyCode);
}



function addFeedback() {
    console.log("addFeedback(%o)", arguments);
    var html = '<tr>';
    for (var i in arguments) {
        html += '<td>';
        html += arguments[i];
        html += '</td>';
    }
    html += '</tr>';
    $("#feedback-table").find("tbody").prepend(html); 
}

console.log('keycodes.js - end');

