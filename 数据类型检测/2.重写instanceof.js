


let obj = {};
// console.log( obj.__proto__ === Object.getPrototypeOf(obj));  // 获取__proto__的另外一种方法

// obj是要检测的实例(不支持原始值类型)
// constructor要检测的类，必须是一个函数
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
var arr = [];
var a = 10;
var flag = true;
console.log(_instanceof(arr, Array));  // true
console.log(_instanceof(a, Number));   // false
console.log(_instanceof(flag, Boolean));   // false