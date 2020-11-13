
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
}

export default EventHub;

