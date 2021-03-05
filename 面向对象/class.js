
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  id = "430521";
  getName() {
    console.log(this.name);
  }
  getAge() {
    console.log(this.age)
  }
  getId = function () {
    console.log(this.id);
  }
  static sex = "男";
  static getSex = function () {
    console.log(this.sex);
  }
}
let m = new Person("海鹰", 20);
console.log(m.name);
console.log(m.age);
m.getName();
m.getId();

console.log(Person.sex);
Person.getSex()
