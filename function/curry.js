/* 
函数柯里化：
单参数函数（只能接收一个函数的参数），如何接收两个参数。



*/
// 方法一：使用一个对象

const add = ({a,b}) => a+b;
add({a:1,b:2})

// 方法二：使用闭包   这里的b => a + b就是一个闭包，a是函数外部的变量
const add2 = a => b => a+b
add2(1)(2);   // add2(1)  返回一个函数，这个函数接收一个参数

/* 
如何理解这种add(1)(2)的函数。

const add2 = a =>          接收一个a
                b =>       再接收一个b
                   a+b     返回a + b
            


*/


/* 
柯里化一个函数：把多参数的函数变成单参数函数
如何把三参数函数add(1,2,3)变成curriedAdd(1)(2)(3)

const curriedAdd = 
   a => 
     b => 
       c => 
         add(a,b,c)
    可以理解为：先接收a,再接收b，然后接收c最终实现每次只接收一个参数。
    也就是说函数的柯里化就是一个参数的收集过程，我们将每一次传入的参数收集起来，并且在最里层进行处理。
    升级：

    假设add2 接收两个参数
    add3接收三个参数
    add4接收4个参数
    请写出一个currify函数，使得他们分别接收2，3，4次参数，比如：


    函数柯里化：
    柯里化是指这样一个函数(假设叫做createCurry)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数


    函数的柯里化就是一个参数的收集过程，我们将每一次传入的参数收集起来，并且在最里层进行处理。
    也就是说我们实际上最核心的就是判断用户参数是否收集完毕，如果没有继续返回函数，否则返回处理结果。
*/

const addTwo = (a,b) => a+b;
const addThree = (a,b,c) => a+b+c;
const addFour = (a,b,c,d) => a+b+c+d;
// const addFour = (a,b,c,d) => a+b+c+d;
const addSix = (a,b,c,d,e,f) => a+b+c+d+e+f;
const addAny = (...args) => args.reduce((sum,n) => sum+n,0)

const currify = (fn,params = []) => {
    return (p) => {
        params.push(p);
        // 一种情况是再次返回一个函数，还有一种情况是返回一个计算的结果
        if(params.length===fn.length){
            return fn(...params);
        }else{
            return currify(fn,params); 
        }
    }
}

console.log(currify(addTwo)(1)(2));
console.log(currify(addThree)(1)(2)(3));
console.log(currify(addFour)(1)(2)(3)(4));
// console.log(currify(addFour)(1)(3,3)(3)(4));

/* 
要实现接收任意个参数：
currify(fn)(1)(2,3)(4)(5,6,7)
*/
// const currify2 = (fn,params=[]) => {
//     return (...args) => {
//         params = [...params, ...args];
//       if(params.length === fn.length){
//           return fn(...params)
//       }else{
//           return currify2(fn,params)
//       }
//     }
// }
// console.log('...............')
// console.log(currify2(addTwo)(1)(2));
// console.log(currify2(addThree)(1)(2)(3));
// console.log(currify2(addSix)(1)(2)(3,4)(5,6));


// function fn() {
//   return 20;
// }
// console.log(fn + 10);


// 重写toString
function fn() { return 20; }
fn.toString = function() { return 20 }

console.log(fn + 10); // 30

const currify2 = (fn,params=[]) => {
    return (...args) => {
        params = [...params, ...args];
      if(params.length === fn.length){
          return fn(...params)
      }else{
          return currify2(fn,params)
      }
    }
}

console.log('.........................')
function addCurrify() {
    // 第一次执行时定义一个数组专门用来保存参数：
    let params = Array.prototype.slice.call(arguments);
	let fn = (...args) => {
        params = [...params, ...args];
        return addCurrify(...params);   // 只有fn有参数调用时才会继续调用addCurrify，因此如果没有参数了这里不会执行。
    }
    // 改写fn的toString方法
    fn.toString =  () => {
        return params.reduce( (a, b) => {
            return a + b;
        });
    }
    return fn;
}
const result1 = addCurrify(1)(2)(3);   // fnction 6
const result2 = addCurrify(1,2)(3,4)(5);   // fnction 15
console.log(result1 + 4);              // 10
console.log(result2.toString());       // 15