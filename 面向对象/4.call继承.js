function Parent() {
    this.x = 10;
}
Parent.prototype.getX = function () {
    return this.x;
}

function Child() {
    // 在子类构造函数中，把父类当作普通方法执行（没有父类实例，父类原型上的公共属性和方法久没关系）
    // this指向child的实例 this.x = 100，相当于强制给c1这个实例设置一个私有属性x值为100.
    // 相当于子类的实例继承了父类的实例，并且也变成了子类的私有属性。
    Parent.call(this);   
    this.y = 200;
}
Child.prototype.getY = function () {
    return this.y;
}
let c = new Child();

console.log(c);