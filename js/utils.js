"use strict";

console.log("utils.js - begin");

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

function perform(resource, action, parameters) {
    console.log("perform() - begin");
    console.log("perform() - end");
}

console.log("utils.js - end");




