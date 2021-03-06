## 函数
// 函数的所有特点：
####  函数的返回值由什么确定
* **调用时**输入的参数params
* **定义时**的env
```javascript
let x = "x";
let a = "1";
function fn(x){
    return x + a;
}
{
    let a = "2";
    let b = fn('x');
    console.log(b);        // 输出结果为x1
}
```
* 参数顾名思义是函数传进来的参数，因此肯定是调用时进行获取
* env是指函数中除了参数以外的变量，这些都可以称之为env(环境)，它取决于函数定义时的值。

上面的函数fn中的环境a取决于定义时的`let a = "1"`，而不是调用时的`let a = "2"`,因此，最终输出的结果是`x1`而不是`x2`。另外，再试想一下，如果函数中的a同样取决于执行时的a，那么这不是跟函数的参数相同了吗？还不如直接定义成参数，更加方便。
之所以这么设计，就是为了让函数能够依赖于一些环境（比如我们需要函数依赖外部的某些值），从而拓展函数的功能，而不是仅仅依赖于函数的传参。

**注意：**
函数依赖于声明时的环境，这个环境不是固定的。比如上面函数依赖于a，这个a是let a = 1中的a，但是不代表a的值始终为。事实上，函数只是依赖于这个a，如果a在函数调用之前发生变化，那么函数的返回值同样会发生变化。
```javascript
let x = "x";
let a = "1";
function fn(x) {
  return x + a;
}
a = 3;
{
  let a = "2";
  let b = fn("x");
  console.log(b);   // x3
}
```


#### 闭包

通过上面的例子，我们发现所谓的环境实际上就是函数访问外面的变量。这实际上就是闭包。闭包 = 函数 + 它访问的外界变量。


#### this问题讨论


#### 函数柯里化问题

#### 高阶函数
把函数当作参数或者把函数当作返回值的函数。
JS内置的高阶函数
* Function.prototype.bind
* Function.prototype.apply
* Function.prototype.call
* Array.prototype.sort
* Array.prototype.map
* Array.prototype.filter
* Array.prototype.reduce
