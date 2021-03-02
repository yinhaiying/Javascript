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


