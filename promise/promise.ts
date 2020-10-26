
class Promise{
  succeed = null;
  fail = null;
  resolve = ()=>{
        // then的第一个参数是在resolve执行的情况下执行
        setTimeout(() => {
            this.succeed();
        },0)
  }
  reject = ()=>{
        // then的第二个参数是在reject执行的情况下执行
        setTimeout(() => {
            this.fail();
        },0)
  }
  constructor(fn){
      // new Promise()的参数必须是一个函数
    if(typeof fn !== 'function'){
        throw new Error('fn必须是一个函数');
    } 
    // new Promise(fn)这里的fn是立即执行的,且接收两个函数作为参数
    fn(this.resolve,this.reject);
  }
  then(succeed,fail){
      this.succeed = succeed;
      this.fail = fail;
  }
}

export  default Promise