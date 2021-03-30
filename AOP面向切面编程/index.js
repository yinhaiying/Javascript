
/* 
在函数调用之前做一些事情，在函数调用之后做一些事情。
*/
Function.prototype.before = function (callback) {
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

Function.prototype.after = function (callback) {
    if (typeof callback !== "function") {
        throw new Error("callback must be function");
    }
    let that = this;
    return async function proxy(...params) {
        let result = await that.call(this, ...params);
        callback.call(this, ...params);
        return result;
    }
}
let func = () => {console.log("func")};

// func = func.before(() => {
//     setTimeout(() => {
//         console.log("before");
//     },1000)
// })

func = func.before(() => {
    console.log("before");
}).after(() => {
    console.log("after");
})

func();








