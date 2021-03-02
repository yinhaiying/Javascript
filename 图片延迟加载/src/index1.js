        /* 
        单张图片的加载：
        
        */
        
        
        let lazyImageBox = document.querySelector(".lazyImageBox");
        let lazyImage = document.querySelector("img");
        const singleLazy = function singleLazy() {
            let trueImg = lazyImage.getAttribute("lazy-image");
            lazyImage.src = trueImg;
            lazyImage.onload = function () {
                // 真实图片加载成功，就让它显示出来。
                lazyImage.style.opacity = 1;
                lazyImage.isLoad = true;
            }
        }
        const lazyFunc = function lazyFunc() {
            console.log("执行：")
            if (!lazyImage.isLoad) {
                let A = lazyImageBox.getBoundingClientRect().bottom;
                let B = document.documentElement.clientHeight; // 可视窗口的高度
                console.log("A:", A);
                console.log("B:", B);
                if (A <= B) {
                    // 完全进入可视区，开始加载图片
                    singleLazy();
                }
            }
        }
        lazyFunc(); // 页面初始化加载
        const throttle = function throttle(func, wait) {
            let timeout;
            return function () {
                // 只要定时器还在，说明不能执行，得等待。
                if (!timeout) {
                    timeout = setTimeout(() => {
                        timeout = null;
                        func.apply(this, arguments)
                    }, wait)
                }
            }
        }
        window.onscroll = throttle(lazyFunc, 1000); // 页面滚动时加载