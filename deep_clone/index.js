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


let map = new Map();
function deepClone(source){
    if (!(source instanceof Object)){
      return source;
    }
    // 处理循环引用   如果source已经被拷贝过了，那么返回原来保存的拷贝后的对象。
    if(map.get(source)){
      return map.get(source);
    }
    let dist;
    if (source instanceof Array) {
      dist = [];
    } else if (source instanceof Function) {
      dist = function () {
        return source.call(this, ...arguments);
      };
    }else if (source instanceof RegExp) {
      dist = new RegExp(source.source, source.flags);
    }else if (source instanceof Date) {
      console.log('source:',source)
      dist = new Date(source);
    } else {
      dist = {};
    }
    // 每次拷贝之前，先把克隆后的对象保存起来。
    map.set(source, dist);
    for (let key in source) {
      // 只遍历本身的属性
      if(source.hasOwnProperty(key)){
        dist[key] = deepClone(source[key]);
      }
    }
    return dist;
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

  // let a = function(x,y){
  //   return x + y;
  // };
  // a.xxx = {yyy:{zzz:1}};
  // const a2 = deepClone(a);
  // console.log(a !== a2);
  // console.log("....1", a);
  // console.log(".....2:",a2)
  // console.log(a.xxx !== a2.xxx);
  // console.log(a.xxx.yyy !== a2.xxx.yyy);
  // console.log(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
  // console.log(a(1,2) === a2(1,2));

  // 环状引用
            // const a = { name: "小明" };
            // a.self = a;
            // const a2 = deepClone(a);
            // console.log(a !== a2);
            // console.log(a.name === a2.name);
            // console.log(a.self !== a2.self);
            // console.log('a2.self:',a2.self === a2)

            // let a = {
            //   child:null 
            // }
            // let b = a;
            // for(let i = 0;i < 20;i++){
            //   b.child = {
            //     child:null
            //   }
            //   b = b.child;
            // }
            // console.log(a);


    // 克隆正则
    // const a = new RegExp("hi\\d", "ig");
    // a.xxx = { yyy: { zzz: 1 } };
    // const a2 = deepClone(a);
    // console.log(a.source === a2.source);
    // console.log(a.flags === a2.flags);
    // console.log(a !== a2);
    // console.log(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    // console.log(a.xxx !== a2.xxx);

    // 克隆时间
    const a = new Date();
    a.xxx = { yyy: { zzz: 1 } };
    const a2 = deepClone(a);
    console.log("a2:",a2);
    console.log(a !== a2);
    console.log(a.getTime() === a2.getTime());
    console.log(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
    console.log(a.xxx !== a2.xxx);
module.exports = deepClone;
