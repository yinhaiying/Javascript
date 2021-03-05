
function Parent(){
    this.x = 10;
}

Parent.prototype.getX = function(){
    return this.x;
}

function Child(){
    this.y= 200;
}
Child.prototype = new Parent();  // 原型继承，必须先设置原型，然后才能往原型上添加方法
Child.prototype.getY = function(){
    return this.y;
}


let c = new Child();
console.log(c)