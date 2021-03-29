


function handle(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("OK");
        },1000);
    })
}

async function fn1(){
    let result = await handle();  // 等待promise变为成功态，然后获取promsie的值。在此期间后面的代码都不会执行。
    console.log(result);
    let n = await 10;             // 虽然await后面放的是10 ，肯定是成功的，但是下面的代码也不是立即执行。需要等到同步任务执行完毕
    console.log(n);               // await本身是异步的，await后面的代码需要等待。
    let m = await Promise.resolve("HH");
    console.log(m);
}
fn1();

/* 

宏任务
setTimeout(() => {
    resolve("OK");
}, 1000);

OK
10
HH

*/