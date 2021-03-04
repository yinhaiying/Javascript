function Fn(x, y) {
  let total =x + y;
  this.x = x;
  this.y = y;
  this.getTotal = function(){
      console.log(total);
  }
}


let f1 = new Fn(10, 20);
let f2 = new Fn;

// console.log("....................")
// console.log( "x" in f1);  // true
// console.log( "toString" in f1);  // true
// console.log( "getTotal" in f1);  // true


// console.log("...................");
// console.log(f1.hasOwnProperty("x")); // true
// console.log(f1.hasOwnProperty("toString")); // false
// console.log(f1.hasOwnProperty("getTotal")); // true

// console.log("........扩展公有属性........");
// function hasPubProperty(obj,prop){
//     return (prop in obj && !obj.hasOwnProperty(prop));
// }

// let pubProperty = hasPubProperty(f1,'toString');
// console.log("pubProperty", pubProperty);


console.log("......对象的遍历.......")

let obj = {
    name:"hello",
    age:27,
    0:11,
    [Symbol("aa")]:200
}
Object.prototype.AA = "测试";

// Object.keys(obj):获取当前对象所有非Symbol类型的属性
console.log(Object.keys(obj))  // ["0","name","age"]
// Object.getPropertySymbols()：获取当前兑现的Symbol类型的属性
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(aa)]
let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
console.log(keys);