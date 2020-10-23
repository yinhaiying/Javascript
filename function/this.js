
// 函数的this问题
// 函数的返回值
// 1. 传入的参数  2.定义时的环境
// 普通函数，this属于传入的参数
//

/* 
显式的this:通过call,apply,bind显示地指定this
fn.call(asThis,1,2);
fn.bind(asThis,1,2)();

//隐式的this
fn(1,2)   // 实际上可以写成fn.call(undefined,1,2)
obj.method('hello')      实际上可以写成obj.method.call(obj);
array[0]('hi')        实际上可以写成 array.[0].call(array,'hi')

因此，我们实际上可以显示地指定this。也就是说这个this其实是一个参数。



重点：
1. this其实是一个参数
2. 既然是参数，那么this是什么值需要看函数调用时，而不是定义时。
*/
// let length = 10;    
// function fn(){console.log(this.length)};
// let obj = {
//     length:5,
//     method(fn){
//         fn();
//         arguments[0]()
//     }
// }
// obj.method(fn,1);


// button.onclick = fucntion(e){
//     console.log(e);
// }
// 1. 用户点击时，函数执行  this指向button
// 2. 用户不点击而是直接执行,  button.onclick()  此时相当于button.onclick.call(button)  this还是指向button
// 3. 用户先赋值，然后再执行  var fn = button.onclik  fn()   此时相当于fn.call(undefined)  this指向window

/* 
其他：
1. new重新设计了this
2. 箭头函数不接受this,因此箭头函数的this是环境。


*/


// let foo = function(){
//     console.log(this);
// }
// let obj = {
//     foo:foo
// }

// obj.foo()     // 打印出的this为obj
// let bar = obj.foo;
// bar();        // 打印出的this为window 
// foo.call(obj) // 打印出的this为obj
// // 这道题目很简单，


window.number = 2;
var obj = {
  number: 3,
  db1: (function () {
    console.log(this);
    this.number *= 4;  
    return function () {
      console.log(this);
      this.number *= 5;    
    };
  })()
};
var db1 = obj.db1;