function Fn(){
    this.x = 100;
    this.y = 200;
    this.getX = function(){
        console.log(this.x);
    }
}

Fn.prototype.getX = function(){
    console.log(this.x);
}
Fn.prototype.getY = function(){
    console.log(this.y);
}

let f1 = new Fn;
let f2 = new Fn;

console.log(f1.getX === f2.getX);  // false
console.log(f1.getY === f2.getY);  // true
console.log(f1.__proto__.getY === Fn.prototype.getY);  // true
console.log(f1.__proto__.getX === f2.getX); // false
console.log(f1.getX === Fn.prototype.getX); // fakse
console.log(f1.constructor); // Fn
console.log(Fn.prototype.__proto__.constructor);  // Object
f1.getX();  // 100
f1.__proto__.getX();  // undefined  需要考虑这里的this指向的是 fn.__proro__，里面没有getX属性。
f2.getY(); // 200
Fn.prototype.getY();  // undefined
