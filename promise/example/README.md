## Promise并发执行的问题：
promsie并发执行，通常是实现一个带并发限制的异步调度器，保证同时最多运行max个任务。
这种题目的通常思路就是：
1. 建立两个任务队列，一个是执行任务的队列，一个是等待执行的队列
2. 添加时，如果执行任务的队列有空闲位置，那么直接执行。其他的所有操作（比如占据任务队列的位置等）都放到执行函数中完成。
如果任务队列不是空闲状态，那么就放到等待队列中去。
```js
add(promiseMaker) {
    // 如果空闲的时候，就直接执行
    if (this.doingFuncs.length < this.maxFunNum) {
        this.run(promiseMaker);
    } else {
        this.funcs.push(promiseMaker);
    }
}
```
3. 某一个任务执行完毕之后，那么就需要将其从任务队列中清除出去，同时执行等待队列中队守的任务。
```js
run(promiseMaker) {
    this.doingFuncs.push(promiseMaker); // 添加到执行队列中，然后直接执行
    let index = this.doingFuncs.length - 1;  // 刚刚添加进来因此它是最后一个
    promiseMaker().then(() => {
        this.doingFuncs.splice(index, 1);  // 执行完毕之后，从任务队列中删除
        if (this.funcs.length > 0) {   // 判断等待队列中是否有任务需要执行
            this.run(this.funcs.shift());
        }
    })
}
```
最终的实现代码如下所示：
```js
class Scheduler {
    constructor() {
        this.funcs = []; //待执行的任务
        this.doingFuncs = []; //正在执行的任务数
        this.maxFunNum = 2; //最大执行任务数
    }
    add(promiseMaker) {
        // 如果空闲的时候，就直接执行
        if (this.doingFuncs.length < this.maxFunNum) {
            this.run(promiseMaker);
        } else {
            this.funcs.push(promiseMaker);
        }
    }
    // run 执行时,需要先把它放到等待队列中，占据执行的位置
    run(promiseMaker) {
        this.doingFuncs.push(promiseMaker); // 添加到执行队列中，然后直接执行
        let index = this.doingFuncs.length - 1;  // 刚刚添加进来因此它是最后一个
        promiseMaker().then(() => {
            this.doingFuncs.splice(index, 1);  // 执行完毕之后，从任务队列中删除
            if (this.funcs.length > 0) {   // 判断等待队列中是否有任务需要执行
                this.run(this.funcs.shift());
            }
        })
    }
}

const scheduler = new Scheduler();
const addTask = (time, text) => {
    const promiseMaker = () => new Promise(resolve => {
        setTimeout(() => {
            console.log(text);
            resolve();
        }, time);
    });
    scheduler.add(promiseMaker);
};
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
```