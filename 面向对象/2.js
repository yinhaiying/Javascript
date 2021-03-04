

function Dog(name){
    this.name = name;
}


Dog.prototype.bark = function(){
    console.log("wangwang");
}

Dog.prototype.sayName = function(){
    console.log("my name is" + this.name);
}

function _new(Ctor,...params){

    // 1. 创建一个实例对象，让__proto__指向类的原型
    let obj = {};
    obj.__proto__ = Ctor.prototype;
    // 2. 会把构造函数当作普通函数执行  私有上下文，作用域链，初始化this，形参赋值
    let result = Ctor.call(obj, ...params);
    // 3.观察函数的返回值，如果没有返回值或者返回基本数据类型的值，返回对象。如果返回的是引用类型的值，那么返回引用类型这个值
    if(/^(object|function)$/.test(typeof result)){
       return result;
    }
    return obj;
}
function _new2(Ctor, ...params) {
    // 1. 创建一个实例对象，让__proto__指向类的原型
    let obj = Object.create(Ctor.prototype);
    // 2. 会把构造函数当作普通函数执行  私有上下文，作用域链，初始化this，形参赋值
    let result = Ctor.call(obj, ...params);
    // 3.观察函数的返回值，如果没有返回值或者返回基本数据类型的值，返回对象。如果返回的是引用类型的值，那么返回引用类型这个值
    if (/^(object|function)$/.test(typeof result)) {
        return result;
    }
    return obj;
}
let sanmao = _new2(Dog,"三毛");
sanmao.bark();  // wangwang
sanmao.sayName();  // my name is 三毛
console.log(sanmao instanceof Dog);

