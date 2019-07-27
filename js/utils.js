"use strict";

console.log('load utils.js');

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}