
setTimeout(() => {
  console.log('a');
});

Promise.resolve().then(() => {
  console.log('b');
}).then(() => {
  return Promise.resolve('c').then(data => {
    setTimeout(() => {
      console.log('d')
    });
    console.log('f');
    return data;
  });
}).then(data => {
  console.log(data);
});



/* 
b
f
c
a
d

微任务：





宏任务:
() => {
  console.log('a');
}

    () => {
      console.log('d')
    }








*/



