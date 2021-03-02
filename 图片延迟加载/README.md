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
