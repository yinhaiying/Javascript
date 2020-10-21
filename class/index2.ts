// 继承
// Person 和People类有重复的属性,把重复的属性单独拎出来，单独写个类EventEmitter

// class EventEmitter {
//   constructor() { };
//   cache = [];
//   on() { console.log('on方法') }
//   off() { }
//   emit() { }
// }

// class Person2 extends EventEmitter {
//   constructor(public name: string) {
//     super()
//   }
//   showName() { }
// }
// class People extends EventEmitter {
//   constructor(public name: string) {
//     super()
//   }
//   sayHi() { }
// }
// let p1 = new Person2('hello');
// console.log(p1)   // Person2 { cache: [], name: 'hello' }
// p1.on();  // on方法

// 细节：类的继承必须写super,super的功能是调用EventEmitter的constructor函数


// 但是有些属性继承过来并不一定完全可以拿来复用，可能还需要实现自己的功能，这时候就需要重写属性
// 多态：子类重写父类的属性，以实现多态。多态的意思是不同的子类对同一个消息有不同的反应
class EventEmitter {
  constructor() { };
  cache = [];
  on() { console.log('on方法') }
  off() { }
  emit() { }
}

class Person2 extends EventEmitter {
  constructor(public name: string) {
    super()
  }
  on() {
    console.log('这里是重写on方法');
    super.on();  // 同时可以通过super调用继承来的on方法
  }
  showName() { }
}
class People extends EventEmitter {
  constructor(public name: string) {
    super()
  }
  sayHi() { }
}
let p1 = new Person2('hello');
console.log(p1)   // Person2 { cache: [], name: 'hello' }
p1.on();  // 这里是重写on方法

let people1 = new Person2('hello');
people1.on();  // on方法   people对象的on方法和person对象的on方法展示的不一样，这就是多态
