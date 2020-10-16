/* 
高阶函数：

*/
let bind = Function.prototype.bind;
let f1 = function(){
    console.log('this:');
    console.log(this)
    console.log('arguments:');
    console.log(arguments)
    console.log('........')
}
// 所有函数具有bind是因为都来自于原型上的bind
console.log('f1的bind是否等于Function.prototype.bind:',f1.bind=== Function.prototype.bind)
let newF1 = f1.bind({name:'yin'},1,2,3);
// newF1();

// obj.method(a,b,c,d,e)
// obj.method.call(obj,a,b,c,d,e)   //显式地传递this

// 因此将obj替换为f1,method替换为bind，那么：
// 设obj为f1，a为{name:'yin'} b 为1,c为2，d为3
// 代入obj.method.(a,b,c,d)
let newF11 = f1.bind({name:'yin'},1,2,3);
newF11();
let newF12 = f1.bind.call(f1, { name: "yin" }, 1, 2, 3);
newF12();

bind({name:'yin'},1,2,3) = bind.call(f1,{name:'yin'},1,2,3);