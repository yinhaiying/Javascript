# node相关的知识点


## node为什么适合高并发?



## node的异常捕获
由于node.js是非阻塞单进程单线程的，一旦node.js抛出异常，整个服务就会停掉。服务将会变得非常不稳定。
错误异常一半有两种场景的出现：
1. 代码中throw new error没有被捕获。
2. promise的失败回调函数，没有对应的reject回调函数处理。
针对这两种情况,node.jd都有默认的统一处理方式，就是给整个进程process对象监听相应的错误事件。
```js
process.on("uncaughtException",function(err){})  // 监听未捕获的异常

process.on("unHandledRejection",function(err,promise){})  // 监听process没有被处理的异常
```
处理异常的办法：
1. 我们最好使用`try..catch`在可能出现错误的地方对其进行捕获。
2. 像`express`和`koa`这种框架都有自己的错误异常捕获机制。