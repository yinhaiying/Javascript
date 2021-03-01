



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
```js
    Promise.all = function all(arr){
      return new Promise((resolve,reject) => {
          var index = 0;
          var results = [];
          for(var i = 0;i < arr.length;i++){
              var item = arr[i];
              // 应该按照是否为函数或者对象，以及是否有then，then是否是函数来判断是否是Promise的实例
              if( !(item instanceof Promise)) {
                  index++;
                  results[i] = item;
                  continue
              };
              (function(i){
                item.then(function (result) {
                    index++;
                    results[i] = result;
                    if (index === arr.length) {
                        resolve(results);
                    }
                }).catch((reason) => {
                    // 只要有一个失败，整体就失败
                    reject(reason);
                })
              })(i)
          }
      })
    }

```

### Promise.race的实现
```js
    Promise.race = function race(arr){
      return new Promise((resolve,reject) => {
          for(var i = 0;i < arr.length;i++){
            var item = arr[i];
            (function (i) {
                item.then(function (result) {
                    resolve(result);
                }).catch((reason) => {
                    reject(reason);
                })
            })(i)
          }
      })
    }

```