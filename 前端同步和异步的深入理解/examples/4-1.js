console.log('start');
let intervalId;
Promise.resolve().then(() => {
  console.log('p1');
}).then(() => {
  console.log('p2');
});

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log('p3');
  }).then(() => {
    console.log('p4');
  });
  intervalId = setInterval(() => {
    console.log('interval');
  }, 3000);
  console.log('timeout1');
}, 0);



/* 
start
p1
p2
timeout1
p3
p4
interval













*/