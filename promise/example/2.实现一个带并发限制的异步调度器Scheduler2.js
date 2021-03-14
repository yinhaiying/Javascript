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

// 最终打印 2 3 1 4