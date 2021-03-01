



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