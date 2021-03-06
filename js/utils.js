"use strict";

console.log("utils.js - begin");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function perform(resource, action, parameters, callback) {
    console.log("perform() - begin");
    $.post("perform", {r: resource, a: action, p: JSON.stringify(parameters)})
        .done(function (json) { successHandler(callback, json); })
        .fail(errorHandler);
    console.log("perform() - end");
}

function successHandler(callback, json) {
    console.log("callback() - begin");
    callback(JSON.parse(json));
    console.log("callback() - end");
}

function errorHandler() {
    console.log("errorHandler() - begin");
    console.log("errorHandler() - end");
}

function getConfiguration() {
    var rawValue = localStorage["configuration"];
    if (!rawValue) return null;
    var value = JSON.parse(rawValue);
    for (var i in arguments) {
        value = value[arguments[i]];
    }
    return value;
}

console.log("utils.js - end");




