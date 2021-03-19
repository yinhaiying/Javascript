let body = document.body;
console.log(body)
body.addEventListener('click', function () {
  Promise.resolve().then(() => {
    console.log(1);
  });
  console.log(2);
});
body.addEventListener('click', function () {
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
});
/*
2
1  执行完同步任务之后，会再去异步任务中查找，先查找微任务中有没有可执行的任务。如果没有，才会去查找宏任务中的任务队列。
4
3
*/
