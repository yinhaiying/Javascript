

// let p = new Promise((resolve,reject) => {
//     setTimeout(() => {
//       reject("hhhh")
//     },1000)
// })

// p.then((result) => {
//   console.log("then1")  
// }).catch((error) => {
//     console.log("error:"+error)
//     // catch也会返回一个promise
// }).then((result2) => {
//     console.log("result2:"+result2);
// })


// function _instanceof(Ctor,obj){
//     while(obj){
//         if(obj.__proto__ === Ctor.prototype){
//             return true;
//         }else{
//             obj = obj.__proto__;
//         }
//     }
//     return false;
// }

console.log(_instanceof(Array,[]))