function func1() {
  console.log('func1 start');
  return new Promise(resolve => {
    resolve('OK');
  });
}

function func2() {
  console.log('func2 start');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('OK');
    }, 10);
  });
}

console.log(1);
setTimeout(async () => {
  console.log(2);
  await func1();
  console.log(3);
}, 20);

for (let i = 0; i < 90000000; i++) { } //循环大约要进行80MS左右

console.log(4);

func1().then(result => {
  console.log(5);
});

func2().then(result => {
  console.log(6);
});

setTimeout(() => {
  console.log(7);
}, 0);

console.log(8);


/*
 => 1
宏任务 20s之后执行
执行了80s，宏任务等待时间已过
 => 4

 => func1 start 创建一个微任务
 => func2 start 创建一个宏任务

 创建一个宏任务 0秒后输出7

 => 8


 1
 4
 func1 start
 func2 start
 8
 5
 2
 func1 start
 3
 7
 6




*/
