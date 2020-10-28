
class Promise{
  succeed = null;
  fail = null;
  state = 'pending';
  callbacks = [];
  resolve = (result)=>{
        // then的第一个参数是在resolve执行的情况下执行
        setTimeout(() => {
            if(this.state !== 'pending'){
                return;
            }
            this.state = 'fulfilled';
            this.callbacks.forEach((handle) => {
                if(typeof handle[0] === 'function'){
                    handle[0].call(undefined,result);
                }
            })
        },0)
  }
  reject = (reason)=>{
        // then的第二个参数是在reject执行的情况下执行
        setTimeout(() => {
            if(this.state !== 'pending'){
                return;
            }
            this.state = "rejected";
            this.callbacks.forEach((handle) => {
                if(typeof handle[1] === 'function'){
                    handle[1].call(undefined,reason);
                }
            })
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
    const handle = [null,null];
    if(typeof succeed === 'function'){
        handle[0] = succeed;
    }
    if(typeof fail === 'function'){
       handle[1] = fail;
    }
    this.callbacks.push(handle);
    return new Promise(() => {})
  }
}

export  default Promise