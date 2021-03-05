class Parent{
    constructor(){
        this.x = 100;
    }
    getX(){
        return this.x;
    }
}

class Child extends Parent{
    constructor(){
        super();  // 继承后一定要在constructor第一行加上super
        this.y = y;
    }
    getY(){
        return this.y;
    }
}