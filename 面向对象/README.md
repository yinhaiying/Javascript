# 面向对象

## 自定义类

所有的内置类和自定义类都是函数数据类型的值。

```js
function Fn(x, y) {
  let total = x + y;
  this.x = x;
  this.y = y;
  return total;
}
```

如果是作为普通函数执行：

```js
Fn(10, 20);
```

如果想要作为自定义类执行，也就是构造函数执行，那么使用 new 即可。

```js
let f = new Fn(10, 20);
console.log(f);
```

构造函数执行相对于普通函数执行：

1. 构造函数执行也会像普通函数一样，形成一个私有上下文。

- AO
- SCOPE-CHAIN
- 形参赋值
- 变量提升
- 代码执行

2. 不同的地方在于

- 创建完成上下文之后，浏览器默认帮助我们创建了一个对象。
- 创建的实例对象就是这个类的实例。
- 初始化 this 的时候，让 this 指向当前创建的实例对象
- 在代码执行完成，需要返回值的时候。
  - 如果函数没有写 return，或者返回的是一个基本数据类型值，则浏览器默认会把创建的实例对象返回。
  - 如果函数返回的就是一个引用对象，那么还是以返回的引用对象为准。

**new Fn 和 new Fn()的区别**

```js
let p = new Fn();
let p1 = new Fn(10, 20);
console.log(p); // Fn{x:undefined,y:undefined}
console.log(p1); // Fn{x:10,y:20}
```

两者都会执行函数，其区别是

- new Fn()传递了参数，new Fn 没有传递参数。
- 两者的优先级有区别,new Fn()的优先级为 19(有参数列表的 new)，高于 new Fn 的优先级 18(无参数列表的 new)。

### instanceof

instanceof 用于检测实例是否是构造函数的实例。由于构造函数返回时，如果返回引用类型，那么通过 new 之后得到的就不是构造函数的实例了。此时，就可以使用 instanceof 来进行判断。

```js
function Fn(x, y) {
  let total = x + y;
  this.x = x;
  this.y = y;
  return {
    // 返回一个引用类型的值
    name: "hello",
  };
}
let f = new Fn(10, 20);
console.log(f instanceof Fn); // false
```

### hasOwnProperty

实例身上的每一个属性无论是直接类型还是引用类型，都是私有属性。如下所示：

```js
function Fn(x, y) {
  let total = x + y;
  this.x = x;
  this.y = y;
  this.getTotal = function() {
    console.log(total);
  };
}
let f1 = new Fn(10, 20);
let f2 = new Fn();
console.log(f1 === f2); // false 每次new的时候都创建新的实例
console.log(f1.x === f2.x); // false 每次new的时候都创建新的实例
console.log(f1.getTotal === f2.getTotal);
false; // 实例身上的属性也是实例所私有的。
```

我们虽然通过测试，知道各个实例身上的属性是不相等的，但是如何真正去检测一个属性是否为当前对象的成员。JS 中提供了两种方法：
**方法一：属性名 in 对象：不论是公有属性还是私有属性，只要存在就是 true**

```js
console.log("x" in f1); // true
console.log("toString" in f1); // true
console.log("getTotal" in f1); // true
```

**方法二：使用对象.hasOwnProperty(属性名)。只检测私有属性。**

```js
console.log(f1.hasOwnProperty("x")); // true
console.log(f1.hasOwnProperty("toString")); // false toString不是它的私有属性。
console.log(f1.hasOwnProperty("getTotal")); // true
```

### hasPubProperty 扩展一个方法，检测是不是对象公有属性

对象的公有属性就是是对象的属性，但是不是私有属性。

```js
function hasPubProperty(obj, prop) {
  return prop in obj && !obj.hasOwnProperty(prop);
}
```

### for...in 遍历对象

我们可以使用 for .. in 来遍历对象，如下所示：

```js
let obj = {
  name: "hello",
  age: 27,
  0: 11,
  [Symbol("aa")]: 200,
};
Object.prototype.AA = "测试";
for (let key in obj) {
  console.log(key);
}
```

查看打印结果：

```js
0;
name;
age;
AA;
```

但是我们发现使用 for..in 遍历对象，存在以下几个问题：

1. 遍历不一定按照书写顺序，优先遍历数字属性。
2. 无法遍历 Symbol 属性
3. 会遍历原型上的属性(公共属性是可枚举的)。
   第三条弊端，我们可以使用上面的`hasOwnProperty`进行优化，使用 for... in 遍历时，通常需要加上 hasOwnProperty 进行判断。

```js
for (key in obj) {
  if (!obj.hasOwnProperty(key)) break;
}
```

但是如何解决 for...in 无法获取 Symbol 类型值的问题了。js 内置了`Object.getOwnPropertySymbols`方法可以用于获取对象的 Symbol 属性。结果是一个属性。然后可以通过`Object.keys(obj)`获取其他的私有属性，最后进行合并时就可以了。

```js
// Object.keys(obj):获取当前对象所有非Symbol类型的属性
console.log(Object.keys(obj)); // ["0","name","age"]
// Object.getPropertySymbols()：获取当前兑现的Symbol类型的属性
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(aa)]
let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
```

## 原型 prototype 和原型链**proto**

### 函数数据类型和对象数据类型

1. 函数数据类型：

- 普通函数
- 箭头函数
- 生成器函数
- 构造函数/类

对象数据类型:

- 普通对象/数组对象/正则对象/日期对象...
- 实例也是对象数据类型(排除 7 种原始值类型)
- prototype 原型/`__proto__`原型链也是对象

2. 大部分函数(重点是构造函数)都内置一个 prototype(原型或者说显示学会原型)的属性，属性值是一个对象，对象中存储属性和方法是供当前类所属实例调用的公共属性和方法。

- 箭头函数是没有 prototype 的
- 原型对象上有一个内置的属性 constructor（构造器），属性值是当前函数本身。

3. 每一个对象都内置一个`__proto__`(隐式原型)的属性，属性值是当前实例所属的原型 prototype 对象。

- Object.prototype 这个对象的`__proto__` 的值是 null。
  ![原型和原型链](https://ftp.bmp.ovh/imgs/2021/03/c3024fe823d7e647.jpg)

如上图所示：

1. 每一个数组都是 Array 类的实例，所以每一个数组的`__proto__`一定指向 Array.prototype。
2. 每一个对象都是`Object`类的实例，所以`Array.prototype`对象中的`__proto__`属性指向 Object。(ps:如果你不知道这个对象是哪个类实例化的，那么它的`__proto__`基本上就是指向`Object.prototype`)。

数组的实例调用方法，比如 arr.push：

1. 首先查找当前实例对象的私有属性，私有属性中有，就从私有属性中获取。如果私有中没有，就基于`__proto__`找其所属类原型上的公共属性和方法。
2. 如果还找不到，就基于其原型对象上的**proto**继续往下查找，直到找到`Object.prototype`为止。
   **这就是原型链的查找机制。**
   arr.push <=> arr.**proto**.push <=>Array.prototype.push
   找到的方法都是相同的，区别是执行时的 this 不同。
   注意：`__proto__`在 IE 浏览器中无效。

## 重写内置 new

我们知道`new`操作符都经历了哪些步骤，然后就可以照着这个步骤来实现。

1. 创建一个实例对象，让`__proto__`指向类的原型
2. 会把构造函数当作普通函数执行,私有上下文，作用域链，初始化 this,将 this 指向创建的对象
3. 观察函数的返回值，如果没有返回值或者返回基本数据类型的值，返回对象。如果返回的是引用类型的值，那么返回引用类型这个值

```js
function _new(Ctor, ...params) {
  // 1. 创建一个实例对象，让__proto__指向类的原型
  let obj = {};
  obj.__proto__ = Ctor.prototype;
  // 2. 会把构造函数当作普通函数执行  私有上下文，作用域链，初始化this，形参赋值
  let result = Ctor.call(obj, ...params);
  // 3.观察函数的返回值，如果没有返回值或者返回基本数据类型的值，返回对象。如果返回的是引用类型的值，那么返回引用类型这个值
  if (/^(object|function)$/.test(typeof result)) {
    return result;
  }
  return obj;
}
```

上面的方法虽然实现了 new 的功能，但是在 IE 下存在兼容性问题，因为`__proto__`在 IE 下无法使用，因此我们需要做下兼容处理。
**Object.create**的使用：
![Object.create](https://ftp.bmp.ovh/imgs/2021/03/6d41acfa37b6e2a0.jpg)
如上图所示：`Object.create(obj)`是用于：创建一个空对象，同时将它的参数`obj`作为对象的`__proto__`属性的值。因此，可以改造上面的方法：

```js
function _new(Ctor, ...params) {
  // 1. 创建一个实例对象，让__proto__指向类的原型
  let obj = Object.create(Ctor.prototype);
  // 2. 会把构造函数当作普通函数执行  私有上下文，作用域链，初始化this，形参赋值
  let result = Ctor.call(obj, ...params);
  // 3.观察函数的返回值，如果没有返回值或者返回基本数据类型的值，返回对象。如果返回的是引用类型的值，那么返回引用类型这个值
  if (/^(object|function)$/.test(typeof result)) {
    return result;
  }
  return obj;
}
```

但是`Object.create`在一些浏览器下也存在问题，如果我们想要实现完全兼容，应该怎么做了。事实上我们要实现的就是两个功能：

1. 得到一个`__proto__`属性
2. 将`__proto__`属性的值指向类的原型。
   事实上，我们在上面提过，每一个对象包括普通对象，实例对象都存在`__proto__`属性，既然我们无法通过创建普通对象去拿那个属性，那么有没有什么对象是跟`Object.create()`一样是一创建就有原型的，这就是函数的实例。
   事实上，我们在上面提过，每一个对象包括普通对象，实例对象都存在`__proto__`属性，既然我们无法通过创建普通对象去拿那个属性，那么有没有什么对象是跟`Object.create()`一样是一创建就有原型的，这就是函数的实例。函数的实例一创建一定会有一个`__proto__`，因此，我们只需要借助一个中间函数即可(但是这里用到了原来的 new)。

```js
function _new3(Ctor) {
  var params = [].slice.call(arguments, 1);
  // 重写Object.create方法
  Object.create = function(prototype) {
    function Proxy() {}
    Proxy.prototype = prototype;
    var proxy = new Proxy();
    return proxy;
  };
  var obj = Object.create(Ctor.prototype);
  var result = Ctor.apply(obj, params);
  if (/^(object|function)$/.test(typeof result)) {
    return result;
  }
  return obj;
}
```

## ES6 中 Class

1. 用 Class 创建的类不能作为普通函数执行

```js
class Person {}
let m = Person(); // 报错：class.js:6 Uncaught TypeError: Class constructor Person cannot be invoked without 'new'
```

2. ES6 中 constructor 函数用来实现私有属性的定义。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.id = "430521";
  }
}
```

上面的`this.id`是一个固定的值，不需要接收传递参数，因此，在 ES7 中可以直接写在外面。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  id = "430521";
}
```

3. 原型上的公共方法直接以一个函数的形式写在 class 中

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  id = "430521";
  getName() {
    console.log(this.name);
  }
  getAge() {
    console.log(this.age);
  }
}
```

注意：区分原型上的公共方法和实例身上的私有方法。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  id = "430521";
  getAge() {
    // 原型上的公共方法
    console.log(this.age);
  }
  getId = function() {
    // 实例身上的私有属性，属性值是一个函数而已。跟上面定义的id一样。
    console.log(this.id);
  };
}
```

4. 把类当作普通对象设置属性和方法。也就是静态属性和方法

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static sex = "男"; // 静态属性
  static getSex = function() {
    // 静态方法
    console.log(this.sex);
  };
}
```
