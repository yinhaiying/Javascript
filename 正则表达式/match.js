

let str = "catcat111catscats222";
let re = /cat(\d+)/g;
let result = str.match(re);
console.log(result); // [ 'cat', 'cat', 'cat', 'cat' ]