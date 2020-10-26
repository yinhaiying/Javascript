/* 
Promise

*/

// 函数作为参数层层嵌套
f1(xxx,function f2(a){
  f3(yyy,function f4(b){
      f5(a + b,function f6(){})
  })
})