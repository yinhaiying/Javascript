

function deepClone(target, cache = new Map()) {
  if (cache.get(target)) {
    return cache.get(target)
  }
  if (target instanceof Object) {
    let dist;
    if (target instanceof Array) {
      // 拷贝数组
      dist = [];
    } else if (target instanceof Function) {
      // 拷贝函数
      dist = function () {
        return target.call(this, ...arguments);
      };
    } else if (target instanceof RegExp) {
      // 拷贝正则表达式
      dist = new RegExp(target.source, target.flags);
    } else if (target instanceof Date) {
      dist = new Date(target);
    } else {
      // 拷贝普通对象
      dist = {};
    }
    // 将属性和拷贝后的值作为一个map
    cache.set(target, dist);
    for (let key in target) {
      // 过滤掉原型身上的属性
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone(target[key], cache);
      }
    }
    return dist;
  } else {
    return target;
  }
}


// const a = {
//   i: Infinity,
//   s: "",
//   bool: false,
//   n: null,
//   u: undefined,
//   sym: Symbol(),
//   obj: {
//     i: Infinity,
//     s: "",
//     bool: false,
//     n: null,
//     u: undefined,
//     sym: Symbol(),
//   },
//   array: [
//     {
//       nan: NaN,
//       i: Infinity,
//       s: "",
//       bool: false,
//       n: null,
//       u: undefined,
//       sym: Symbol(),
//     },
//     123,
//   ],
//   fn: function () {
//     return "fn";
//   },
//   date: new Date(),
//   re: /hi\d/gi,
// };
// let a2 = deepClone(a);
// console.log(a2 !== a);
// console.log(a2.i === a.i);
// console.log(a2.s === a.s);
// console.log(a2.bool === a.bool);
// console.log(a2.n === a.n);
// console.log(a2.u === a.u);
// console.log(a2.sym === a.sym);
// console.log(a2.obj !== a.obj);
// console.log(a2.array !== a.array);
// console.log(a2.array[0] !== a.array[0]);
// console.log(a2.array[0].i === a.array[0].i);
// console.log(a2.array[0].s === a.array[0].s);
// console.log(a2.array[0].bool === a.array[0].bool);
// console.log(a2.array[0].n === a.array[0].n);
// console.log(a2.array[0].u === a.array[0].u);
// console.log(a2.array[0].sym === a.array[0].sym);
// console.log(a2.array[1] === a.array[1]);
// console.log(a2.fn !== a.fn);
// console.log(a2.date !== a.date);
// console.log(a2.re !== a.re);

let obj = {
  name: 'hello',
  f: () => {
    console.log(this);
    console.log(this.name)
  }
}
obj.f();
module.exports = deepClone;
