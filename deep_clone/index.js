/* 
递归节点：
js:7中数据类型：
基本类型：Number,Boolean,String,Null,Undefined,Symbol,
复杂类型：Object  
复杂类型又有多种子类型，比如Array,Function,Date,Reg。因此，object又可以分为：
- 普通object for in  (for in 的bug)
- 数组array
- 函数 function 怎么拷贝，要不要考虑闭包
- 日期 怎么拷贝
- 正则 怎么拷贝
*/


function deepClone(source){
  if(source instanceof Object){
      // key 可能是source的属性，也可能是source原型上的属性
      if(source instanceof Array){
        const dist = [];
        for (let key in source) {
          dist[key] = deepClone(source[key]);
        }
        return dist;
      }else if(source instanceof Function){
          // 如果是一个函数
          const dist = function(){
            // 调用一次原来的函数，实现相同的功能
            return source.call(this,...arguments);
          }
          for (let key in source) {
            dist[key] = deepClone(source[key]);
          }
          return dist;
      }else{
        const dist = {};
        for (let key in source) {
          dist[key] = deepClone(source[key]);
        }
        return dist;
      }
  }else{
    return source;
  }
}
// let obj1 = {
//   name:"hello",
//   child:{
//     name:"小明"
//   }
// }
// let obj2 = deepClone(obj1);
// console.log(obj2 !== obj1);                          // true
// console.log(obj2.name === obj1.name);                // true
// console.log(obj2.child !== obj1.child);             // true
// console.log(obj2.child.name === obj1.child.name);   // true


// 如果是一个数组：

  // const a = [
  //   [11, 12],
  //   [21, 22],
  // ];
  // const a2 = deepClone(a);
  // console.log("........:", a2);



  // 如果是一个函数

            let a = function(x,y){
              return x + y;
            };
            a.xxx = {yyy:{zzz:1}};
            const a2 = deepClone(a);
            console.log(a !== a2);
            console.log("....1", a);
            console.log(".....2:",a2)
            console.log(a.xxx !== a2.xxx);
            console.log(a.xxx.yyy !== a2.xxx.yyy);
            console.log(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            console.log(a(1,2) === a2(1,2));
module.exports = deepClone;
