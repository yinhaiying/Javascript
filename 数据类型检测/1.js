

// let arr = [1,2];
// console.log(arr instanceof Array);
// console.log(arr instanceof RegExp);
// console.log(arr instanceof Object);

// var arr = [1,2,3];
// console.log(arr instanceof Array);
// console.log(Array[Symbol.hasInstance](arr));

// var obj = {};
// console.log(arr instanceof obj)



// let arr = [];
// console.log(arr.constructor  === Array);  // true
// console.log(arr.constructor  === Object); // false
// console.log(arr.constructor  === RegExp); // false

// function Person(){};

// Person.prototype = Array.prototype;
// let p1 = new Person();
// console.log(p1.constructor === Array);  // 修改原型后，变为true


// let n = 10;
// let m = new Number(10);
// console.log(n.constructor ===   Number);  // true
// console.log(m.constructor ===   Number);  // true


let classtype = {};
console.log(classtype)
let toString = classtype.toString  // 代表的是Object.prototype.toString

console.log(toString.call(10)); //  [object Number]
console.log(toString.call("hello")); //  [object String]
console.log(toString.call(true)); //  [object Boolean]
console.log(toString.call(Symbol(1))); //  [object Symbol]
console.log(toString.call([])); //  [object Array]
console.log(toString.call(()=>{})); //  [object Function]
console.log(toString()); //  [object Object]