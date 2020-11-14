
const a = "hi";
console.log(a);
type cacheType = {
    [key:string]:Array<(data:unknown) => void>
}
class EventHub{
    cache:cacheType = {};   // {"公寓日报":[fn1,fn2,fn3],"租房日报":[fn4,fn5,fn6]}
    on(eventName:string,fn:(data:unknown) => void){
        this.cache[eventName] = this.cache[eventName] || []
        // 把fn推进数组
        this.cache[eventName].push(fn)
    }
    emit(eventName:string,data?:unknown){
        let eventList = this.cache[eventName] || [];
        eventList.forEach((fn) => {
            fn && fn(data);
        })
    }
    off(eventName:string,handle:(data?:unknown) => void){
      this.cache[eventName] = this.cache[eventName] || [];
      let index = this.cache[eventName].indexOf(handle);
      if(index>-1){
          this.cache[eventName].splice(index,1);
      }
    }

    once(eventName:string,handle:(data?:unknown) => void){
        this.cache[eventName] = this.cache[eventName] || [];
        let fn = () =>{
            handle();
            this.off(eventName,fn);
        }
        this.on(eventName,fn);
    }
}

export default EventHub;

