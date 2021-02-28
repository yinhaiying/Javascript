# Promise

## Promise 是如何管理异步编程的？

```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

p.then(
  (res) => {
    console.log("成功");
  },
  (error) => {
    console.log("失败");
  }
);
```

1. new Promise 的时候，创建一个 promise 实例的同时会执行 executor 函数，executor 函数中管理异步代码。
2. 后期等异步操作完成，成功或者失败的时候，执行 resolve/reject，以此来控制 promise 实例的状态和结果
3. then 方法执行，将两个函数注入到 then 方法中，注意，此时这两个函数都没有执行。
4. 当异步执行完成，状态和结果发生修改了，就可以根据状态和结果，控制基于 then 的两个方法对应去执行了。
   其中，通知 then 中的方法执行这个部分是异步的，不论 then 是否已经执行，注入了方法，通知它执行都会是异步的。这就是为什么说 promise 是异步的原因。

```js
let p1 = new Promise(function(resolve, reject) {
  resolve(100);
  console.log("1"); // 先输出1
});
p1.then(() => {
  console.log("2"); // 然后输出2
});
```

我们可以看到上面的代码是，先输出 1，然后输出 2。说明 resolve()通知 then 的第一个参数执行是异步的，如果是同步的，那么会先执行 then 中的方法，输出 2，然后再执行输出 1。

## Promise 实例状态和值的分析

第一种情况：new Promsie 出来的实例

- 如果 executor 函数执行无报错，那么 resolve/reject 的执行，控制其状态[[PromiseState]]和[[PromiseResult]]
- 如果 executor 函数报错，那么其状态为：[[PromiseState]] = rejected，[[PromiseResult]=报错信息

第二种情况：.then 返回的实例

- then 注入的方法，不论哪个方法执行，只要执行的方法无报错，返回的实例状态就是 fulfilled，也就是[[PromiseState]] = fulfilled，只要执行报错，返回的实例状态就是 rejected，也就是[[PromiseState]] = rejected。
- 如果方法执行，又返回了新的 promise 实例，则此实例最后的成功和失败，直接决定了.then 返回实例的成功和失败。
