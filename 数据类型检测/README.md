# 数据类型检测的方法
数据类型检测通常有四种方法：
1. typeof 检测数据类型的运算符

2. instanceof
3. constructor
4. Object.prototype.toString.call

## typeof 
  - 返回结果是字符串，字符串中包含了对应的数据类型。
  - number,string,boolean,object,function,symbol,bigint
  - 小的bug:typeof null的值是object。这是因为typeof的原理是按照计算机底层存储的二进制的结果来进行检测的。对象都是以000...存储开始的。
    typeof null => 'object'。null的二进制存储值是000。
    所有对象都是以000开始的，所以基于typeof检测的结果都是"object"，也就是无法区分具体是普通对象还是数组对象。

## instanceof 
instanceof 并不是用来检测数据类型的(打脸充胖子)，是用来检测当前实例是否属于这个类。
用它来检测，一般只应用于普通对象/数组对象/正则对象/日期对象的具体细分。
* instanceof可能检测出多个实例来，比如arr既是Array的实例又是Object的实例。
```js
let arr = [1,2];
console.log(arr instanceof Array);  // true
console.log(arr instanceof RegExp); // false
console.log(arr instanceof Object); // true
```
* instanceof 无法用于原始值类型的检测
```js
var a = 10;
var b = "hello";
console.log(a instanceof Number);  // false
console.log(b instanceof String); // false
```
**instanceof底层的处理机制：**
基于 "实例 instanceof 类"检测的时候，浏览器底层是这样处理的：类[Symbol.hasInstance]。
这个属性是位于Function的原型上，Function.prototype[Symbol.hasInstance] = function [Symbol.hasInstance](){...}。所有的类都是Function的实例，因此都会找到这个属性。
```js
var arr = [1,2,3];
console.log(arr instanceof Array);  
// 等价于:
console.log(Array[Symbol.hasInstance](arr));
```
又比如：
```js
let obj = {};
conosle.log(arr instanceof obj);// 1.js:13 Uncaught TypeError: Right-hand side of 'instanceof' is not callable
```
我们可以发现报错，这是因为obj是一个普通对象，不是类，它不是Function的实例，因此它的身上拿不到`Symbol.hasInstance`属性，导致报错,只有函数Function的实例才能够调用这个属性。

**Symbol.hasInstance方法执行的原理**
根据当前实例的原型链上(__proto__)是否存在这个类的原型(prototype)。因此我们可以解释上面的几个问题：
```js
var a = 10;
console.log(a instanceof Number);  // false
```
这是因为a是基本数据类型，不存在__proto__,因此也就无法通过__proto__去查找这个类了。同时也能解释修改Person.prototype为什么会带来问题。


## constructor：
- constructor原本就是用于获取实例的构造函数(打脸撑胖子)，也是基于这些特点可以充当数据类型检测。
- constructor比instanceof好用一些。
- constructor也不是很准，因为constructor也可以被修改。

1. 在constructor未修改的情况下，constructor是唯一的。
```js
let arr = [];
console.log(arr.constructor  === Array);  // true
console.log(arr.constructor  === Object); // false
console.log(arr.constructor  === RegExp); // false
```

2. 一旦原型对象被修改了，constructor也会被修改，因此就不准了。
```js
function Person(){};

Person.prototype = Array.prototype;
let p1 = new Person();
console.log(p1.constructor === Array);  // 修改原型后，变为true
```

3. 支持基本类型
```js
let n = 10;
let m = new Number(10);
console.log(n.constructor ===   Number);  // true
console.log(m.constructor ===   Number);  // true
```

## Object.prototype.toString.call
`Object.prototype.toString.call`是专门用来检测数据类型，很强大很暴力的检测方法，基本上通用无瑕疵。
Number,String,Symbol,BigInt,Function,Array,RegExp,Date,Object...的原型上都有toString，除了Object.prototype.toString，其他函数的原型上的toString方法都是用于转换字符串，而`Object.prototype.toString`是用来检测数据类型的。
- 检测数据类型主要是看对象身上是否存在Symbol.toStringTag这个字段。根据这个字段确定返回结果。
- 返回结果："[object 对象[Symbol.toStringTag] || 对象的构造函数 || Object]"。
```js
let classtype = {};
let toString = classtype.toString  // 代表的是Object.prototype.toString
console.log(toString.call(10)); //  [object Number]
console.log(toString.call("hello")); //  [object String]
console.log(toString.call(true)); //  [object Boolean]
console.log(toString.call(Symbol(1))); //  [object Symbol]
console.log(toString.call([])); //  [object Array]
console.log(toString.call(()=>{})); //  [object Function]
console.log(toString.call(null)); //  [object Null]
console.log(toString.call(undefined)); //  [object Undefined]
```
使用Object.prototype.toString()可以用于检测对象的类型，但是需要修改this的指向，使用call。
因此，最终的检测方式是：`Object.prototype.toString.call(value)`，修改call以后它会去找到对应的类身上的原型上是否有`Symbol.toStringTag`字段，如果有那么就直接取这个字段，组成`[object 对象[Symbol.toStringTag]`,如果没有就取它的构造函数，如果没有构造函数就返回Object。


### 重写instanceof方法
```js
function _instanceof(obj,constructor){
  if(obj === null || (typeof obj !== 'object' && typeof obj !== "function")){
      return false;
  }
  if(typeof constructor !== "function"){
      throw new TypeError("Right-hand side of 'instanceof' is not callable");
  }
  // obj.__proto__ === Object.getPrototypeOf(obj)
  // let proto = obj.__proto__
  let proto = Object.getPrototypeOf(obj);
  let prototype = constructor.prototype;
  while(proto){  // 找到object.prototype.__proto__
    if(proto === prototype){
        return true;
    }
    // proto = proto.__proto__
    proto = Object.getPrototypeOf(proto);
  };
  return false;
}


```