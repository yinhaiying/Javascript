

setTimeout(() => {
    console.log(1);
},20);
console.log(2);

setTimeout(() => {
    console.log(3);
},10);
console.log(4);

console.time("AA");
for(let i = 0;i < 90000000;i++){
    // do something
}
console.timeEnd("AA"); // AA：执行耗时79ms左右
console.log(5);

setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);

setTimeout(() => {
    console.log(8);
}, 15);
console.log(9);

/* 
2  
4
5
7
9
同步代码执行完毕之后，主线程空闲下来才会去执行异步队列中的任务
3    先到达执行条件的先拿出来执行
1
6
8
*/