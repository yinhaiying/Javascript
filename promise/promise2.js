// promsie的ES5实现

(function () {
    function Promise(executor) {
        if (typeof executor !== "function") {
            throw new TypeError("Promise resolver " + executor + " is not a function");
        }
        // this指向promsie的实例
        var self = this;
        self.PromiseState = "pending";
        self.PromsieResult = undefined;

        self.onFullfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        var run = function run(state, result) {
            if (state === "pending") return;
            // 立即更改状态
            self.PromiseState = state;
            self.PromsieResult = result;
            var arr = state === 'fulfilled' ? self.onFullfilledCallbacks : self.onRejectedCallbacks;
            // 通知then保存的方法执行；但是实际上不是立即就执行这些方法（异步效果）。
            setTimeout(function(){
                for (var i = 0; i < arr.length; i++) {
                    var itemFunc = arr[i];
                    if (typeof itemFunc === "function") {
                        itemFunc(self.PromsieResult);
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
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => resolve(value))
    }
    Promise.reject = function(value){
        return new Promise((resolve,reject) => reject(value))
    }
    Promise.prototype = {
        customize: true, // 标记是否为自定义的promsie
        constructor: Promise,
        then: function (onfulfilled, onrejected) {
            var self = this;
            // promise是then返回的新的promsie实例，resolve和reject控制返回的promise的状态
            // 但是到底执行resolve还是reject取决于onFullfilled和onRejected执行是否报错以及他们的返回
            // 结果是否是新的promsie实例。
            var promise = new Promise(function(resolve,reject){
                if (self.PromiseState === "fulfilled") {
                    setTimeout(function () {
                        try {
                            var x = onfulfilled(self.PromsieResult);
                            resolvePromise(promise,x,resolve,reject);
                        } catch (error) {
                            reject(error);
                        }
                        
                    }, 0)
                } else if (self.PromiseState === "rejected") {
                    setTimeout(function () {
                        try {
                            var x = onrejected(self.PromsieResult);
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
                    self.onFullfilledCallbacks.push(function(PromsieResult){
                        try {
                            var x = onfulfilled(PromsieResult);
                             resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                        
                    });
                    self.onRejectedCallbacks.push(function (PromsieResult) {
                        try {
                             var x = onrejected(PromsieResult);
                             resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                       
                    });
                }
            })
            return promise;
        },
        catch: function () { }
    }
    window.Promise = Promise;
})()


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("OK");
        // reject("NO")
    },1000)
});

let p2 = p1.then((value) => {
    console.log("成功1:", value);
    return 100;
}, reason => {
    console.log("失败1:", reason);
    return 0;
})

let p3 = p2.then(value => {
    console.log("成功2:",value);
    return Promise.reject(-100);
},reason => {
    console.log("失败2：",reason);
});

p3.then(value => {
    console.log("成功3:",value);
},reason => {
    console.log("失败3：",reason);
})


console.log(p2); // [[PromiseState]]: "fulfilled"  [PromiseResult]:100