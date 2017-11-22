var underscore = require('underscore');
console.log("underscore");

var a = {name:'vishal'};
var b = {lastname:'chouhan'};
underscore.extend(a,b);

console.log("a"+JSON.stringify(a));
console.log("b"+JSON.stringify(b));
