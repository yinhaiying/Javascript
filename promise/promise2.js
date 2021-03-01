// promsie的ES5实现

(function(){
    function Promise(executor){
      if(typeof executor !== "function"){
          throw new TypeError("Promise resolver " + executor + " is not a function");
      }
      // this指向promsie的实例
      var self = this;
      self.PromiseState = "pending";
      self.PromsieResult = undefined;
      // 执行 resolve和reject就修改状态和结果
      var resolve = function resolve(value){
          if(self.PromiseState === "pending"){
            self.PromiseState = "fulfilled";
            self.PromsieResult = value;
          }

      };
      var reject = function reject(reason){
          // 状态一旦从pending被修改，就无法再被修改了。
          if (self.PromiseState === "pending"){
            self.PromiseState = "rejected";
            self.PromsieResult = reason;
          } 
      }

      // 立即执行executor，如果函数执行报错，则promsie状态也变为失败
      try{
        executor(resolve, reject);
      }catch(err){
        reject(err);
      }
    }
    window.Promise = Promise;
})()


let p1 = new Promise((resolve,reject) => {

})