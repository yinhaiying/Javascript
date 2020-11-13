
const a = "hi";
console.log(a);
class EventHub{
    cache = {};   // {"公寓日报":[fn1,fn2,fn3],"租房日报":[fn4,fn5,fn6]}
    on(eventName,fn){
        if(this.cache[eventName] === undefined){
          this.cache[eventName] = [];
        }
        // 把fn推进数组
        this.cache[eventName].push(fn)
    }
    emit(eventName){
        let eventList = this.cache[eventName];
        if(eventList.length === 0){
           return;
        }else{
            // 把数组中的fn全部执行
            eventList.forEach((fn) => {
              fn();
            })
        }
    }
}

export default EventHub;

