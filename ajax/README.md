# ajax请求相关

## Ajax,Axios和fetch的核心区别

### ajax
ajax前后端数据通信(同源，跨域)，
```js

let xhr = new XMLHttpRequest();
xhr.open("get",url);
xhr.onReadyStateChange = function(){
    if(xhr.readyState === 4 ){
      if(xhr.status>= 200 && xhr.status < 300){
          console.log(xhr.responseText)
      }
    }
}
xhr.send();
```
ajax每次进行请求时，都得写这四步，比较繁琐，因此有了jquery中的ajax方法对其进行封装。
**jquery中发送ajax请求：**
```js
$.ajax({
    url:"",
    method:"get",
    success(result){
        console.log(result);
    }
})
```
但是，这种ajax请求方式有个问题，如果我们需要在上一个请求返回的基础上再次发送新的请求，就会出现所谓的“回调地狱”问题。

### axios
`axios`也是对`ajax`的封装，只不过它是基于`promise`来管理请求的，可以解决回调地狱问题。


### Fetch
fetch是ES6中新增的一种通信方案，它不是基于`ajax`的，但是它也是通过promsie来进行管理的。
```js
async function(){
    let result = await fetch(url,{
        method:"post",
        body:Qs.stringify({name:"11"})
    }).then((res) => {
        return res.json();
    })
    result = await fetch(url2).then((response) => {
        return response.json();
    })
}
```
fetch是一个低层次的API，你可以把它理解成原生的XHR，所以使用起来也比较繁琐，需要进行各种处理，因此通常是需要进行二次封装的。

fetch的几个缺点：
1. fetch只对网络请求报错，向能够正常返回的400,500这种都被当做是成功的请求，只有在网络错误导致请求没法完成时，fetch才会被reject。
2. fetch默认是不会携带cookie，需要添加配置项：fetch(url,{credentials:'include'});
3. fetch不支持abort，不支持超时控制。
4. fetch没有办法原生监测请求的进度，而XHR可以。XHR提供了各种请求过程的API，可以监测整个请求过程。


## 基于Promise.all实现ajax的chaun并行

### 串行
请求是异步的，需要等待上一个请求完成，才能执行下一个请求。



### 并行
请求是异步的，但是多个请求同时执行。通常是等待所有请求都成功，我们再去做其他事情。

```js
Promise.all([ajax1,ajax2,ajax3]).then((res) => {
    
})

```


## Promise.all并发限制以及async.poll的应用

## JS异步处理机制：EventQueue和EventLoop

## JS实现ajax并发请求控制的两大解决方案