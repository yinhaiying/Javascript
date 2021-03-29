

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
微任务：







宏任务：
setTimeout(() => {
    console.log(1);
}, 20);

setTimeout(() => {
    console.log(3);
}, 10);

setTimeout(() => {
    console.log(6);
}, 8);
setTimeout(() => {
    console.log(8);
}, 15);




2
4
5
7
9
3   // 先到达，先执行(哪怕在它前面放进去的也到达时间了)
1
6
8

*/
