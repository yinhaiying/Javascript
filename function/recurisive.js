/* 
递归：更加通俗的理解是：递和归。
递：是往数组栈中递（押栈）
归：是从数组中取出（出栈）

理解调用栈：把暂时不需要的进行押栈，保存起来。方便需要时使用。
如果需要押栈或者计算次数的特别多，最终就会导致爆栈。


// 优化：
1. 尾递归优化(迭代式)
2. 所有的递归都可以写成一个循环
*/

// 尾递归   要么直接返回一个新的结果，要么进入新的一次计算。而不需要返回来继续计算。
let f = (n) => f_inner(2,n,1,0);
let f_inner = (start,end,prev1,prev2) => 
        start === end  ? prev1 + prev2
                       : f_inner(start+1,end,prev1+prev2,prev1);
// 尾递归就不需要进行押栈了。ps但是js不存在尾递归优化。


// 循环  循环是把每次的值记录下来了，实际上只是若干次的相加。

let func = (n ) => {
    let arr = [0,1];
    for(let i = 2;i <= n;i++){
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr[arr.length-1];
};

console.log('func:',func(50));


// 记忆化减少重复计算