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

// 最终打印 2 3 1 4