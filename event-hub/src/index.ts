
const a = "hi";
console.log(a);
class EventHub{
    cache = {};   // {"公寓日报":[fn1,fn2,fn3],"租房日报":[fn4,fn5,fn6]}
    on(eventName,fn){
        this.cache[eventName] = this.cache[eventName] || []
        // 把fn推进数组
        this.cache[eventName].push(fn)
    }
    emit(eventName,data?){
        let eventList = this.cache[eventName] || [];
        eventList.forEach((fn) => {
            fn && fn(data);
        })
    }
    off(eventName,handle){
      this.cache[eventName] = this.cache[eventName] || [];
      let index = this.cache[eventName].indexOf(handle);
      if(index>-1){
          this.cache[eventName].splice(index,1);
      }
    }

    once(eventName,handle){
        this.cache[eventName] = this.cache[eventName] || [];
        let fn = () =>{
            handle();
            this.off(eventName,fn);
        }
        this.on(eventName,fn);
    }
}

export default EventHub;

