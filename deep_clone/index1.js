/* 
JSON的序列化和反序列化
1. 对象中不能有函数，否则无法序列化

*/
// let obj1 = {
//     a:1,
//     b:[1,2,3],
//     c:{
//         c1:"111",
//         c2:"222"
//     }
// }
// let obj2 = JSON.parse(JSON.stringify(obj1));
// obj1.a = 2;
// console.log(obj2.a);   // 1 


// 一、不支持函数
let obj1 = {
    a:1,
    b:[1,2,3],
    c:{
        c1:"111",
        c2:"222"
    },
    f:function(){
        console.log('函数')
    }
}
let obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj2);   // 函数属性直接被忽略了


// 二、不支持JSON不支持的所有类型，比如undefined

let obj3 = {
    a:undefined
}
let obj4 = JSON.parse(JSON.stringify(obj3));
console.log(obj4);   // 属性值为undefined的属性直接被忽略了

// 三、不支持环状的引用
// let obj5 = {
//     a:1,
// }
// obj5.b = obj5;
// let obj6 = JSON.parse(JSON.stringify(obj5));
// console.log(obj6);  // error: Converting circular structure to JSON


// 总结：事实上JSON只支持 object,array,string,number,true,false,null这几种数据类型，
// 其他的的都不支持，比如正则。JSON遇到不能处理的就直接忽略。
// https://www.json.org/json-en.html

// 四、不支持正则表达式
let obj7 = {
    a:1,
    re:/\d/
}
let obj8 =JSON.parse(JSON.stringify(obj7));
console.log(obj8);  // re属性值为空