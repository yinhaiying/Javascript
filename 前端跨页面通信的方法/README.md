# 前端的常见跨页面通信



## 同源间的跨页面通信

### BroadCast Channel

在前端，我们经常会使用`postMessage`来实现页面间的通信，但是这种方式更多的是一对一的通信，对于一些需要广播的消息(比如让所有页面摘掉)的消息，用`postMessage`进行传输时就要复杂一些，需要设置所有你想要通信的页面，这比较繁琐。`Broadcast Channel`就是为了解决这这个弊端。Broadcast Channel 会创建一个所有同源页面都可以共享的（广播）频道，因此其中某一个页面发送的消息可以被其他页面监听到。

#### Broadcast Channel的使用
index.html页面
```js
        let bc;

        function broadCast() {
            bc = new BroadcastChannel("alienzhou");

            // 监听其他页面发送的信息
            bc.onmessage = function (e) {
                console.log('index.html接收信息', e);
                const data = e.data;
                const oDiv = document.createElement("div");
                oDiv.textContent = data.from + ":" + data.message;
                document.getElementById('js-container').appendChild(oDiv);
            }
            // 监听错误
            bc.onmessageerror = function (e) {
                console.log(e);
            }
        }
        broadCast();  // 进行广播
        document.getElementById('js-btn').addEventListener('click', function () {
            var msg = document.getElementById('js-input').value;
            // 当前页面发送信息
            bc.postMessage({
                from: 'index',
                msg,
                hahah:"这是测试信息"
            });

            var $div = document.createElement('div');
            $div.textContent = 'me: ' + msg;
            document.getElementById('js-container').appendChild($div);
        });
        // 关闭连接
        document.getElementById('js-close').addEventListener('click', function () {
            bc.close();
        });
        // 打开连接
        document.getElementById('js-open').addEventListener('click', function () {
            broadcast();
        });

```
在另外一个页面`index.html`页面，我们同样创建一个Broadcast实例，然后进行监听即可。同时它也可以发送信息。
```js
    <script>
        var bc;
        function broadcast() {
            bc = new BroadcastChannel('alienzhou');
            bc.onmessage = function (e) {
                console.log('iframe页面接收信息', e);
                var data = e.data;
                var $div = document.createElement('div');
                $div.textContent = data.from + ': ' + data.msg;
                document.getElementById('js-container').appendChild($div);
            };
        }
        broadcast();

        document.getElementById('js-btn').addEventListener('click', function () {
            var msg = document.getElementById('js-input').value;
            bc.postMessage({ from: 'iframe', msg });

            var $div = document.createElement('div');
            $div.textContent = 'me: ' + msg;
            document.getElementById('js-container').appendChild($div);
        });
        document.getElementById('js-close').addEventListener('click', function () {
            bc.close();
        });
        document.getElementById('js-open').addEventListener('click', function () {
            broadcast();
        });
    </script>
    <section id="js-container"></section>

```
### LocalStorage
localstorage通常是作为本地的存储，但是我们一般很少去使用它的事件，事实上，当`LocalStorage`变化时，会触发`storage`事件。利用这个特性，我们可以在发送消息时，把数据写入到某个`LocalStorage`中，然后在各个页面中，通过监听`storage`事件即可收到通知。
`index.html页面`
```html
<body>
    <div>index.html页面</div>
    <script>
        window.addEventListener('storage', function (e) {
            console.log("index页面：",e);
            if (e.key === 'local-storage-method') {
                const data = JSON.parse(e.newValue);
                const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
                console.log('[Storage I] receive message:', text);
            }
        });
    </script>
</body>
```
我们在`index.html`页面中监听了`storage`事件的`local-storage-method`字段，当其他页面修改`localstorage`中的这个字段时，
就会触发监听，从而获取到数据。如下所示，我们在`iframe.html`中修改数据。
```html
<body>
    <div>iframe.html页面</div>
    <script>
        let count = 1;
        let timer = setInterval(() => {
            let msg = `发生了${count}次变化`;
            localStorage.setItem("local-storage-method", JSON.stringify(msg));
            count += 1;
            if(timer > 50){
                clearInterval(timer)
            }
        },500)
    </script>
</body>
```
我们可以发现，在`iframe.html`中修改数据，然后`index.html`中监听到了，这样的话就实现了多个页面之间的通信。同时如果还有其他的页面，他也能够实现数据的监听和获取。实际上：`LocalStorage`也是类似于广播事件，只要做了监听，有一个修改了，那么所有页面都能够获取到。

## 不同源之间的通信

### postMessage
postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档，多窗口、跨域信息传递。
postMessage(data,origin)方法接收两个参数:
1. data：要传递的数据，html5规范中提到该参数可以是javascript的任意基本类型或可复制的对象。然而并不是所有浏览器都做到了这点，部分浏览器只能处理字符串参数，所以我们在传递参数的时候，最好使用JSON.stringify()方法对对象参数序列化。
2. orgin:字符串参数,指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，如果设置为*，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

我们可以看下数据之间的通信：
**主页面中向子页面iframe发送信息：**
```js
let count = 0;
item.addEventListener("click",() => {
        count += 1; 
        window.frames[0].postMessage(count, '*');  // 我们可以看到它是window.frames[0]发送数据
})
```
我们需要注意到，它是`window.frames[0]`发送数据，也就是说虽然是在主页面中，但是发送数据还是通过页面本身，也就是说我们实际上是需要拿到子页面的引用。这样的话才能够接收数据。
**子页面接收数据：**
```js
window.addEventListener('message', function (e) {
    if (e.source != window.parent) return;
    content.innerText  = `计时器：${e.data}`
}, false);
```
我们可以看下，子页面只要使用window监听`message`事件即可，在回调函数中能够拿到主页面发送过来的数据。
**子页面向主页面发送数据：**
子页面向主页面发送数据，同理也需要拿到主页面的引用，而`window.parent`就是主页面的引用。
```js
    container.addEventListener("click",(ev) => {
        const bgColors = ["red","green","blur","pink","DarkMagenta","DarkOrchid","MidnightBlue","DodgerBlue"];
        let index = Math.floor(Math.random()*8);
        console.log("index:",index)
        container.style.backgroundColor = bgColors[index];
        window.parent.postMessage(bgColors[index], '*');   // 向主页面发送数据
    })
```
**主页面接收子页面发送的数据**
```js
window.addEventListener('message', function (e) {
        console.log("index.html页面111：",e)
        var color = e.data;
        document.getElementById('color').style.backgroundColor = color;
}, false);
```
主页面同理，也只需要通过监听`window.message`事件即可。
综上所示，我们可以发现，这种跨页面通信，非常重要的就是拿到你要通信的页面的引用。如此才能够建立连接。