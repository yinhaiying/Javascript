
class Promise{
  succeed = null;
  fail = null;
  state = 'pending';
  resolve = (result)=>{
        // then的第一个参数是在resolve执行的情况下执行
        setTimeout(() => {
            if(this.state !== 'pending'){
                return;
            }
            this.state = 'fulfilled';
            if(typeof this.succeed === 'function'){
                this.succeed(result);
            }
        },0)
  }
  reject = (reason)=>{
        // then的第二个参数是在reject执行的情况下执行
        setTimeout(() => {
            if(this.state !== 'pending'){
                return;
            }
            this.state = "rejected";
            if(typeof this.fail === 'function'){
                this.fail(reason);
            }
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
  then(succeed?,fail?){
    if(typeof succeed === 'function'){
       this.succeed = succeed;
    }
    if(typeof fail === 'function'){
       this.fail = fail;
    }
  }
}

export  default Promise