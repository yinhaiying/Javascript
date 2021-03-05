function Parent() {
    this.x = 10;
}
Parent.prototype.getX = function () {
    return this.x;
}

function Child() {
    Parent.call(this);
    this.y = 200;
}
Child.prototype.__proto = Parent.prototype;
// 可以使用Object.create替代
// Child.prototype = Object.create(Parent.prototype)
// 但是此时重定向了子类的Child.prototype，因此丢失了原来的constructor属性。
// Child.prototype.construcotr =Child;
Child.prototype.getY = function () {
    return this.y;
}
let c = new Child();

console.log(c);