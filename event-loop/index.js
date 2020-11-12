
// setTimeout和setImmediate
// const fn = () => {
//     console.log("执行setTimeout")
// }
// const fn2 = () => {
//     console.log("执行setImmediate")
// }
// setTimeout(fn,0)
// setImmediate(fn2);

// setTimeout(() => {
//     setTimeout(fn, 0);
//     setImmediate(fn2);
// },1000)



// setTimeout、setImmediate和nextTick


// nextTick在当前阶段执行完毕之后执行

// setTimeout(() => {
//   setTimeout(fn, 0);
//   setImmediate(fn2);
//   process.nextTick(() => {
//     console.log("nextTick执行");
//   });
// }, 1000);
setTimeout(() => {
    setTimeout(() => {
      console.log("执行setTimeout.....1111");
      process.nextTick(() => {
          console.log("setTimeout中的nextTick")
      })
      console.log("执行setTimeout......222");
    }, 0);
    setImmediate(() => {
        console.log("执行setImmediate");
      }
    );
    process.nextTick(() => {
        console.log("nextTick执行")
    })
},1000)


