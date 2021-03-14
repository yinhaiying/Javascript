class Scheduler {
    constructor(){
        this.taskList = [];
        this.count = 0;
        this.maxNum = 2;
    }
    add(promiseCreator) {
        return new Promise((resolve,reject) => {
            this.taskList.push(() => {
                return promiseCreator().then(() => resolve())
            });
            if (this.count < this.maxNum) {
                this.run();
            }
        })
    }
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
}

const timeout = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}


const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => {
        console.log(order);
    })
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// 最终打印 2 3 1 4

// 最终打印 2 3 1 4