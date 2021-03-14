## Promise并发执行的问题：
promsie并发执行，通常是实现一个带并发限制的异步调度器，保证同时最多运行max个任务。
这种题目的通常思路就是：
1. 建立一个任务队列，把所有的任务添加到这个任务队列中
2. 添加时，如果执行任务的队列有空闲位置，那么直接执行。如果任务队列超过执行的长度，那么就需要等待其他的任务执行完毕，才能执行。
```js
    add(promiseMaker) {
        // 如果空闲的时候，就直接执行
        this.taskList.push(promiseMaker);
        if(this.count<this.maxNum){
            this.run();
        }
    }
```
3. 某一个任务执行完毕之后，那么就需要从队列中队首取出一个任务进行执行。
```js
    run() {
      if(this.taskList.length > 0){
          let task = this.taskList.shift();  // 从队首取出一个任务进行执行
          this.count += 1;
          task().then(() => {
              this.count -= 1;
              this.run(); // 执行完毕之后，执行下一个任务
          })
      }
    }
```
最终的实现代码如下所示：
```js
class Scheduler {
    constructor() {
        this.taskList = []; //正在执行的任务数
        this.maxNum = 2; //最大执行任务数
        this.count = 0;
    }
    add(promiseMaker) {
        // 如果空闲的时候，就直接执行
        this.taskList.push(promiseMaker);
        if(this.count<this.maxNum){
            this.run();
        }
    }
    // run 执行时,需要先把它放到等待队列中，占据执行的位置
    run() {
      if(this.taskList.length > 0){
          let task = this.taskList.shift();
          this.count += 1;
          task().then(() => {
              this.count -= 1;
              this.run();
          })
      }
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

### 另外一个复杂一些的实现并行的问题：
```js
class Scheduler {
    add(promiseCreator) {
        //...
    }
}

const timeout = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve,time);
    })
}


const scheduler = new Scheduler();

const addTask = (time,order) => {
    scheduler.add(() => timeout(time)).then(() => {
        console.log(order);
    })
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
```
分析：我们可以看一下上面的这些代码：
```js
 scheduler.add(() => timeout(time)).then(() => {
        console.log(order);
 })
```
这里跟之前的有所区别，之前的add方法是添加一个任务，然后让你去控制它的输出，因此我们只需要控制它的执行顺序即可。
```js
 scheduler.add(promiseMaker);
```
但是，现在的add方法，添加完成之后还调用了then方法，说明我们需要返回一个promise。也就是说我们必须管理好我们的resolve。
必须等到当前的任务执行完毕之后，才能够resolve。因此，最重要的就是控制我们的resolve，它必须在任务执行完毕之后才能进行resolve。而不能只是简单地添加到待执行的任务队列中。
```js
add(promiseCreator) {
    return new Promise((resolve,reject) => {
        // 添加的任务队列必须是执行完毕之后，然后才能resolve。
        this.taskList.push(() => {
            return promiseCreator().then(() => resolve())  // 不仅仅是添加到任务队列中
        });
        if (this.count < this.maxNum) {
            this.run();
        }
    })
}
```
执行任务的方法还是跟之前一样，只有当前任务执行完毕之后
```js
    run(){
      if(this.count < this.maxNum && this.taskList.length > 0){
        let task = this.taskList.shift();
        this.count+= 1;
        task().then(() => { 
            this.count -= 1;
            this.run();
        })
      }
    }
```
## promsie并行任务队列执行的总结
所有的promsise并行任务队列的执行都分为两步：
1. 添加到任务队列中，如果任务队列空闲，则直接执行
2. 执行任务。执行完毕之后，去任务队列中查看是否有任务需要执行，如果有弹出来执行
唯一的区别是，可能添加到任务队列中，有时候是直接添加一个异步任务，有时候需要控制这个异步任务执行后的返回罢了（如第二个示例）。