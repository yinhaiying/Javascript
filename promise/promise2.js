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
            self.PromiseState = state;
            self.PromsieResult = result;
            var arr = state === 'fulfilled' ? self.onFullfilledCallbacks : self.onRejectedCallbacks;
            // 通知then保存的方法执行；
            for ( var i = 0; i < arr.length; i++) {
                var itemFunc = arr[i];
                if (typeof itemFunc === "function") {
                    itemFunc(self.PromsieResult);
                }
            }
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
    Promise.prototype = {
        customize: true, // 标记是否为自定义的promsie
        constructor: Promise,
        then: function (onfulfilled, onrejected) {
            var self = this;
            console.log("state:", self.PromiseState)
            // 根据状态不同执行不同的方法
            // 执行then的时候，哪怕已经知道PromsieState的状态了，也不是立即就执行对应的函数
            // 需要把函数的执行设置为异步操作。可以通过定时器简单实现。
            // 如果执行then的时候，还不知道state状态，比如executor中是异步操作，then执行时还没有返回新的状态。
            // 此时我们应该先把基于then传入的onfullfilled和onrejected方法存起来。在以后执行resolve和rejected的时候
            // 通知方法执行。
            if (self.PromiseState === "fulfilled") {
                setTimeout(function () {
                    onfulfilled(self.PromsieResult);
                }, 0)
            } else if (self.PromiseState === "rejected") {
                setTimeout(function () {
                    onrejected(self.PromsieResult);
                }, 0)
            } else {
                // 如果不知道状态 state === pending
                self.onFullfilledCallbacks.push(onfulfilled);
                self.onRejectedCallbacks.push(onrejected);
            }
        },
        catch: function () { }
    }
    window.Promise = Promise;
})()


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("OK")；
        reject("NO")
    },1000)
});

p1.then((value) => {
    console.log("成功:", value);
}, reason => {
    console.log("失败:", reason);
})

console.log("1111");