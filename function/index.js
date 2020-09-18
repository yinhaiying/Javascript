
// 函数依赖于定义时的env
// let x = "x";
// let a = "1";
// function fn(x){
//     return x + a;
// }
// {
//     let a = "2";
//     let b = fn('x');
//     console.log(b)
// }

// 依赖于a 

let x = "x";
let a = "1";
function fn(x) {
  return x + a;
}
a = 3;
{
  let a = "2";
  let b = fn("x");
  console.log(b);   // x3
}
a = 4;