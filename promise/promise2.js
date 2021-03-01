// promsie的ES5实现

(function () {
    function Promise(executor) {
        if (typeof executor !== "function") {
            throw new TypeError("Promise resolver " + executor + " is not a function");
        }
        // this指向promsie的实例
        var self = this;
        self.PromiseState = "pending";
        self.PromiseResult = undefined;

        self.onFullfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        var run = function run(state, result) {
            if (state === "pending") return;
            // 立即更改状态
            self.PromiseState = state;
            self.PromiseResult = result;
            var arr = state === 'fulfilled' ? self.onFullfilledCallbacks : self.onRejectedCallbacks;
            // 通知then保存的方法执行；但是实际上不是立即就执行这些方法（异步效果）。
            setTimeout(function(){
                for (var i = 0; i < arr.length; i++) {
                    var itemFunc = arr[i];
                    if (typeof itemFunc === "function") {
                        itemFunc(self.PromiseResult);
                    }
                }
            })
        }

        // 执行 resolve和reject就修改状态和结果
        var resolve = function resolve(value) {
            run("fulfilled",value)
        };
        var reject = function reject(reason) {
            run("rejected",reason);
        }

        // 立即执行executor，如果函数执行报错，则promsie状态也变为失败
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    // 统一处理基于then返回的新实例的成功和失败
    function resolvePromise(promise,x,resolve,reject){
        // 如果onfulfilled或者onrejected返回的值和创建的promise新实例是同一个,那么会陷入死循环，需要避免
      if(x === promise){
          throw new Error("chaining cycle detected for promise #<Promise>");
      }
      // 判断返回值
      if(x !== null && typeof x === "object" || typeof x === "function"){
          // 这里表示是一个promise
          console.log("x:",x)
        try {
          var then = x.then;
          if(typeof then === "function"){
            // 说明返回结果是一个新的promise实例
            x.then(function (y) {
                resolve(x.PromiseResult);
            }, function (r) {
                reject(r.PromiseResult);
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
    Promise.resolve = function resolve(value) {
        return new Promise(function(resolve, reject){
            resolve(value)
        })
    }
    Promise.reject = function reject(value){
        return new Promise(function(resolve,reject){
            reject(value)
        })
    }

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


    Promise.prototype = {
        customize: true, // 标记是否为自定义的promsie
        constructor: Promise,
        then: function (onfulfilled, onrejected) {

            // 处理onfulfilled和onrejected的情况
            if(typeof onfulfilled !== "function"){
                onfulfilled = function onfulfilled(value){
                    return value;
                }
            }
            if(typeof onrejected !== "function"){
                onrejected = function onrejected(reason){
                    throw reason;
                }
            }



            var self = this;
            // promise是then返回的新的promsie实例，resolve和reject控制返回的promise的状态
            // 但是到底执行resolve还是reject取决于onFullfilled和onRejected执行是否报错以及他们的返回
            // 结果是否是新的promsie实例。
            var promise = new Promise(function(resolve,reject){
                if (self.PromiseState === "fulfilled") {
                    setTimeout(function () {
                        try {
                            var x = onfulfilled(self.PromiseResult);
                            resolvePromise(promise,x,resolve,reject);
                        } catch (error) {
                            reject(error);
                        }
                        
                    }, 0)
                } else if (self.PromiseState === "rejected") {
                    setTimeout(function () {
                        try {
                            var x = onrejected(self.PromiseResult);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                        
                    }, 0)
                } else {
                    // 如果不知道状态 state === pending
                    // 向容器中存储匿名函数，后期状态改变时执行匿名函数，在匿名函数中执行onfulfilled
                    // 这样的话，达到了同样的执行onfulfilled函数的目的，但是方便我们对onfulfilled函数
                    // 执行进行操作，比如监听他们是否报错，获取返回值等。
                    self.onFullfilledCallbacks.push(function(PromiseResult){
                        try {
                            var x = onfulfilled(PromiseResult);
                             resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                        
                    });
                    self.onRejectedCallbacks.push(function (PromiseResult) {
                        try {
                             var x = onrejected(PromiseResult);
                             resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                       
                    });
                }
            })
            return promise;
        },
        catch: function (onrejected) {
           // catch相当于then(null,onrejected)
           var self = this;
           return self.then(null,onrejected);
        }
    }
    window.Promise = Promise;
})()


// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("OK");
//     },1000)
// });

// let p2 = p1.then(null, null)

// let p3 = p2.then(value => {
//     console.log("成功2:",value);
//     return Promise.resolve(1000);
// },reason => {
//     console.log("失败2：",reason);
// });

// p3.then(value => {
//     console.log("成功3:",value);
// },reason => {
//     console.log("失败3：",reason);
// })

var p1 = function(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 2000)
    })
}
var p2 = function(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 1000)
    })
}
var p3 = function(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject(-3000)
        },3000)
    })
}

console.log(Promise.race([p1(),p2(),p3()]));