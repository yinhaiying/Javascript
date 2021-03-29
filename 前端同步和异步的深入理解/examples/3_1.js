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
微任务
() => {
  console.log(1);
}
() => {
  console.log(3);
}


2 
4
1
3
*/
