// let person1 = {
//     name:"hello",
//     age:20,
//     showName(){}
// }
// let person2 = {
//     name:"world",
//     age:24,
//     showName(){}
// }

// 两个对象person1和person2的属性高度重复了，为了简化这种定义，因此定义了类来简写
// class Person{
//     name
//     age
//     showName(){}
// }
// 这表示定义一个Person类，这个类有name,age和showName三个属性
// class Person{
//     name = ""
//     age = ""
//     showName(){}
// }

// let person1 = new Person();
// console.log('person1:',person1);
// console.log('person1.name:',person1);
// let person2 = new Person();
// console.log('person2:',person2);

// 但是通过这个类创建的对象属性都是一样的都是undefined，事实上我们需要支持传递参数，因此有了constructor
// 用来传递初始值
// class Person {
//   name;
//   age;
//   showName() {};
//   constructor(name,age){
//       this.name = name;
//       this.age = age;
//   }
// }

// let person1 = new Person('hello',20);
// console.log("person1:", person1);
// console.log("person1:", person1.name);   把属性挂载到this身上
// let person2 = new Person('world',23);
// console.log("person2:", person2);


// 进一步改写成ts
// class Person{
//     name:string;
//     age:number;
//     showName():void{}
//     constructor( name:string, age:number){
//         this.name = name;
//         this.age = age;
//     }
// }
// ts支持简写
// class Person{
//     showName():void{}
//     constructor(public name:string,public age:number){}
// }
// let person1 = new Person('hello',20);
// console.log("person1:", person1);
// let person2 = new Person('world',23);
// console.log("person2:", person2);
// console.log("..............");
// console.log(person1.showName === person2.showName)   // true

// 既然每个对象共用一个函数，那么可不可以每个对象都拥有自己的函数了

class Person{
    name:string;
    age:number;
    showName(){};                // 这个函数是直接挂载到原型身上的。
    myShowName = () => {}   // 如果是通过==定义的，那么是挂载到this身上
    constructor(name:string,age:number){
        // super();
        this.name = name;
        this.age = age;
        // 使用===等价于在constructor中进行赋值
        
        // this.myShowName = () => {}     // 因此，myShowName函数始终跟this即生成的对象有关
    }
}
let person1 = new Person('hello',20);
console.log("person1:", person1);
let person2 = new Person('world',23);
console.log("person2:", person2);
console.log("..............");
console.log(person1.showName === person2.showName)   // true
console.log(person1.myShowName === person2.myShowName)   // false