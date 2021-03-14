/* 
写一个 mySetInterVal(fn, a, b), 每次间隔 a, a + b, a + 2 b, ......., a + nb的时间，
 然后写一个 myClear， 停止上面的 mySetInterVal；
*/



function mySetInterVal(fn,a,b){
  let timer = setTimeout(() => {
      console.log("a:",a)
    if(a === 3000){
        myClear(timer);
    }else{
        fn(timer, a + b, b)
    }
  },a);
  return timer;
}

function fn(timer,a,b){
  timer = null;
  mySetInterVal(fn,a,b)
}

mySetInterVal(fn,1000,500)
function myClear(timer){
    console.log("清除定时器")
    timer && clearTimeout(timer);
}
