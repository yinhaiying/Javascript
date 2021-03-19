/* 
实现ajax的并发请求限制，比如有10个请求，只允许同时请求5个，剩下的必须等其他的请求执行完毕才能返回。
*/


function myPromsieAll(request,maxNum){
    return new Promise((resolve,reject) => {
        
        let len = request.length;
        let results = new Array(len).fill(null);
        let count = 0;
        while(count < maxNum){
            console.log("count:",count)
            next(count);
            count++;
        }
        function next(count){
            request[count].then((result)=> {
                results[count]  = result;
                if(results.filter((item) => item === null).length>0){
                    count++;
                    next(count);
                }else{
                    resolve(results);
                }
            })
        }
    })
}

let task1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("1秒后执行task1");
        resolve("1")
    },1000)
})

let task2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("3秒后执行task2");
        resolve("2")
    }, 3000)
})


let task3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("1秒后执行task3");
        resolve("3")
    }, 3000)
})

let task4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(".5秒后执行task4");
        resolve("4")
    }, 500)
})
myPromsieAll([task1,task2,task3,task4],2).then((res) => {
  console.log("res:",res)
})