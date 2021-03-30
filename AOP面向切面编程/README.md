# AOP面向切面编程

APO面向切面编程：主要作用是把一些跟核心业务逻辑模块无关的的功能抽离出来。这些跟业务逻辑无关的功能通常包括**日志统计**、**安全控制**、**异常处理**等。把这些功能抽离出来之后再通过“动态织入”的方式掺入业务逻辑模块中。
示例：
```js
let func = () => {console.log("func")};
func = func.before(() => {
    console.log("before");
}).after(() => {
    console.log("after");
})
func();
```
我们可以定义一个handler方法，通过传入func,before,after方法等来实现这种类似的功能，控制他们的执行先后(这里暂时不考虑异步，只是一个示例)。
```js
function handler(func,before,after){
    before();
    func();
    after();
}
```
但是，上面这种方法，我们在任何地方都需要调用handler，而不能写成`func.before`或者`func.after`这种形式。如果能够在任何函数身上都调用`xxx.before`或者`xxx.after`就好了。我们知道函数能够调用通用方法，比如call,apply,bind等方法都是因为他们定义在`Function.prototype`身上。 那么我们可以将`before`和`after`绑定到`Function`身上即可。
```js
Function.prototype.before =  function (callback) {
    if (typeof callback !== "function") {
        throw new Error("callback must be function");
    }
    let that = this;
    return async function proxy(...params) {
        await callback.call(this, ...params);
        let result = that.call(this, ...params);
        return result;
    }
}
```

