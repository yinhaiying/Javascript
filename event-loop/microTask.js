/* 

浏览器的event loop:宏任务和微任务
setTimeout :一会儿 宏任务
then(fn):马上  微任务  await 转化为promise来考虑


*/

// setTimeout(_ => console.log(4))

// new Promise(resolve => {
//   resolve()
//   console.log(1)
// }).then(_ => {
//   console.log(3)
// })

// console.log(2)
// 输出结果是：1,2,3,4
// 这里注意一点，new Promise(fn)中的fn是立即执行的。然后执行console.log(2)，然后执行微任务.then
// 最后执行宏任务setTimeout()中的内容。


async function async1(){
  console.log("1");
  await async2();
  console.log(2);
}

async function async2(){
    console.log("3");
}

async1();

new Promise(function(resolve){
    console.log(4);
    resolve();
}).then((function(){
    console.log("5");
}))


/* 
分析思路：

1. async1函数首先执行，会输出1
2. 然后碰到await async2();将await进行改写，改写成promise。 new Promise(async2).then(() => {
      console.log(2);
      // 这里把await下面的语句都放进来。
})。promise中的async2是立即执行的。因此会输出3。然后将then的内容放入微任务队列中

3. 立即执行promise后的fn，输出4。遇到resolve就将then的内容放入到微任务队列中。
4. 这时候没有其他任务需要执行了，因此执行微任务。分别输出2和5.
因此，最终输出的结果是：1,3,4,2,5.

*/