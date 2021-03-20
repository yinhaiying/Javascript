



## 手写Promsie




then方法的进一步处理：then方法需要返回一个promise，返回的promise的状态取决于是否报错和是否返回新的promsie。如果resolve或者reject执行时有报错，那么返回的promsie状态是rejected。如果没有报错，返回的是一个
普通结果，那么是fulfilled，如果返回的是一个promise那么需要根据promise再进行判断。
```js
then: function (onfulfilled, onrejected) {
    var self = this;
    // promise是then返回的新的promsie实例，resolve和reject控制返回的promise的状态
    // 但是到底执行resolve还是reject取决于onFullfilled和onRejected执行是否报错以及他们的返回
    // 结果是否是新的promsie实例。
    var promsie = new Promise(function(resolve,reject){
        if (self.PromiseState === "fulfilled") {
            setTimeout(function () {
                try {
                    var x = onfulfilled(self.PromsieResult);

                } catch (error) {
                    reject(error);
                }
                
            }, 0)
        } else if (self.PromiseState === "rejected") {
            setTimeout(function () {
                try {
                    var x = onrejected(self.PromsieResult);

                } catch (error) {
                    reject(error);
                }
                
            }, 0)
        } else {
            self.onFullfilledCallbacks.push(function(PromsieResult){
                try {
                    var x = onfulfilled(PromsieResult);
                } catch (error) {
                    reject(error);
                }
                
            });
            self.onRejectedCallbacks.push(function (PromsieResult) {
                try {
                        var x = onrejected(PromsieResult);
                } catch (error) {
                    reject(error)
                }
                
            });
        }
    })
    return promsie;
}
```

### 处理基于then返回的promise的状态
```js
    function resolvePromise(promise,x,resolve,reject){
        // 如果onfulfilled或者onrejected返回的值和创建的promise新实例是同一个,那么会陷入死循环，需要避免
      if(x === promise){
          throw new Error("chaining cycle detected for promise #<Promise>");
      }
      // 判断返回值
      if(x !== null && typeof x === "object" || typeof x === "function"){
          // 这里表示是一个promise
          console.log("x:",x.then)
        try {
          var then = x.then;
          if(typeof then === "function"){
            // 说明返回结果是一个新的promise实例
            x.then(function (y) {
                resolve(x);
            }, function (r) {
                reject(r);
            }); // this就指向x；
          }else{
            resolve(x);
          }
        } catch (error) {
          reject(error);
        }
      }else{
          // 基本类型就直接成功了。
          resolve(x);
      }

    }

```

### Promise.all的实现
Promise.all的原理是如果所有的promise都成功了，那么返回所有promise的值，只要有一个promise执行失败了，那就直接rejected。返回失败的原因。也就说Promise.all的特点是：
1. 判断是否有执行失败的，如果没有必须等所有promise执行完毕
2. 如果有执行失败的，那么返回的就只有失败后的结果，不是一个数组。必须全部执行成功，才会通过数组返回所有成功的结果。


```js
    function _all(arr){
        let results = [];
        let len = arr.length;
        let count = 0;
        return new Promise((resolve,reject) => {
            for(let i = 0;i < arr.length;i++){
                let item = arr[i];
                if(!(item instanceof Promise)){
                    // 如果它不是promise的实例
                    item = Promise.resolve(item);
                }
                item.then((res) => {
                    count++;
                    results[i] = res;
                    if(count === len){
                        resolve(results);
                    }
                }).catch((error) => {
                    reject(error);
                })
            }
        })
    }
```

### Promise.race的实现
`Promise.race`的功能是多个promise，只要有一个状态发生改变了，那么整个状态都发生改变。
```js
    function _race(arr) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (!(item instanceof Promise)) {
                    item = Promise.resolve(item);
                }
                item.then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject(error);
                })
            }
        })
    }
```
### Promise.allSettled的实现
`Promise.allSetteled`的功能是传入一个promise组成的数组,无论每个promise的结果是fulfilled还是rejected。只有所有
的promise都执行完毕才会返回返回结果。返回的结果中包含每个promise的状态和值。也就是说`Promise.allSetteled`包括两大功能：
1. 所有的promise都必须执行完毕
2. 返回的结果中包含每个promise的状态和值。类似于这样：
```js
[{status:"fulfilled",value:"111"},{status:"rejected",value:"错误"},]
```
具体实现：
```js

    function _allSettled(arr){
        let len = arr.length;
        let results = new Array(len);
        let count = 0;
        return new Promise((resolve,reject) => {
            for(let i = 0;i < arr.length;i++){
                let item = arr[i];
                // 判断以下是否不是promise
                if( !(item instanceof Promise)){
                    item = Promise.resolve(item);
                }
                item.then((result) => {
                    let obj = {
                        status: "fulfilled",
                        value:result
                    }
                    results[i] = obj;
                }).catch((error) => {
                    let obj = {
                        status: "rejected",
                        value: error
                    }
                    results[i] = obj;
                }).finally(() => {
                    count += 1;
                    if (count === len) {
                        resolve(results);
                    }
                })
            }
        })
    }
```