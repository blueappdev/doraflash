var console = {};

console.log = function () {
    print(arguments[0]);
    print(arguments[1]);
    print(arguments[2]);
}

// Polyfill 
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';

    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    } 
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

if(!Array.prototype.includes){
   //or use Object.defineProperty
   Array.prototype.includes = function(search){
    return !!~this.indexOf(search);
  }
}