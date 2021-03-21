let obj = {
    name: "hello",
    age: 24,
}

function fn(height, weight) {
    let result = "姓名:" + this.name + "年龄:" + this.age + "身高:" + height + "体重:" + weight;
    return result;
}

// 初始话版本
// Function.prototype.call = function call(context, ...rest) {
//     context.xxx = this; // this -> fn 当前要执行的函数
//     let result = context.xxx(...rest); // context -> obj  rest-> 传递的其他参数
//     delete context.xxx; // 删除给obj新增的属性
//     return result;
// }




console.log(fn.call()); // obj.fn(x,y)