# 图片延迟加载
图片延迟加载的意义：由于图片的加载是异步的，需要开辟HTTP网络线程去请求资源，如果页面中图片过多，会占用HTTP网络线程并发数，阻碍其他资源的请求。导致页面加载过慢。真实开发中，**我们一般首次渲染，不去渲染真实的图片，把图片用一个默认的盒子占位（有默认的背景图，给用户一种图片正在加载中的感觉）.**

```html
<div class="lazyImageBox">
    <img src="" alt="" lazy-image = "./imgs/1.png">
</div>
```
图片首次没有加载，但是之后需要加载，因此我们需要使用具有宽高的一个容器占据图片的位置。
```css
.lazyImageBox{
    width:400px;
    height:300px;
    background: url("./imgs/loading.gif") no-repeat center center #eee;
}
.lazyImageBox img{
    width:100%;
    height:100%;
    opacity: 0;  // 设置opacity为0。
    transition:opacity .3s;
}
```
## 图片延迟加载的实现
把能够出现在当前视口中的图片(它所在的盒子出现在视口当中)做加载。

### 单张图片的延迟加载
```js
let lazyImageBox = document.querySelector(".lazyImageBox");
let lazyImage = document.querySelector("img");
const singleLazy = function singleLazy(){
    let trueImg = lazyImage.getAttribute("lazy-image");
    lazyImage.src = trueImg;
    lazyImage.onload = function(){
        // 真实图片加载成功，就让它显示出来。
        lazyImage.style.opacity = 1;
        lazyImage.isLoad = true;
    }
}
const lazyFunc = function lazyFunc(){
    if(!lazyImage.isLoad){
        let A = lazyImageBox.getBoundingClientRect().bottom;
        let B = document.documentElement.clientHeight;  // 可视窗口的高度
        if(A <= B){
            // 完全进入可视区，开始加载图片
            singleLazy();
        }
    }
}
lazyFunc();  // 页面初始化加载
const throttle = function throttle(func, wait) {
    let timeout;
    return function(){
        // 只要定时器还在，说明不能执行，得等待。
        if(!timeout){
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(this,arguments)
            },wait)
        }
    }
}
window.onscroll = throttle(lazyFunc,1000);  // 页面滚动时加载
```
要实现一张图片的延迟加载需要注意几个问题：
1. 需要具有宽高的外部容器占据空间
2. 需要将图片的opacity设置为0，图片的地址通过data-*参数进行设置
3. 需要监听onscroll事件，同时为了避免频繁触发，需要做节流操作
4. 监听图片的onload事件，然后修改src，修改opacity，同时设置加载完毕的标志，避免多次触发加载。
我们可以发现，上面这种方式比较麻烦，需要处理各种情况，事实上我们有现成的API，提供了DOM与视图的交互信息，那就是`IntersectionObserver`。

### IntersectionObserver实现图片懒加载
`IntersectionObserver`这种方式在移动端使用非常多。
```js
let lazyImageBox = document.querySelector(".lazyImageBox");
let lazyImage = document.querySelector("img");
// 使用DOM监听器 IntersectionObserver用于监听一个或者多个DOM元素和可视窗口的交叉信息。
const singleLazy = function singleLazy() {
    let trueImg = lazyImage.getAttribute("lazy-image");
    console.log("trueImg:",trueImg)
    lazyImage.src = trueImg;
    lazyImage.onload = function () {
        // 真实图片加载成功，就让它显示出来。
        lazyImage.style.opacity = 1;
    }
}
let ob = new IntersectionObserver( changes => {
   // changes是一个数组，包含所有监听的DOM元素和视口的交叉信息
   let item = changes[0];
   let {isIntersecting,target} = item;
   if (isIntersecting) {
       // 完全出现在视口当中
     singleLazy();
     ob.unobserve(lazyImageBox); // 加载完成之后移除监听
   }
},{threshold:[1]});  // 1标识完全露出时触发
ob.observe(lazyImageBox);  // 监听一个DOM元素
```