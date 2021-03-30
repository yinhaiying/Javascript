# 合并对象的几种方案

给定以下两个对象，实现两个对象的合并。
```js
let params = {
    url:"",
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    },
    data:{},
    arr:[10,20,30],
    config:{
        xhr:{
            async:true,
            cache:false
        }
    }
}


let params2 = {
    url: "www.baidu.com",
    headers: {
        "X-Token": "ffedh5dfs"
    },
    data: {
        from:"weixin"
    },
    arr: [30,40],
    config: {
        xhr: {
            cache: false
        }
    }
}
```

## 使用Object.assign()合并对象
`Object.assign`可以用于合并两个对象，但是这种对象的合并是浅拷贝，同时整体替换的。
比如：
```js
params1.config:{
        xhr:{
            async:true,
            cache:false
        }
    }
```
但是在params2中
```js
params2.config:{
        xhr:{
            async:true,
        }
    }
```
只有一个参数async，它不会进行参数合并，而是直接将xhr这个对象替换了params1中的对象。
示例：
```js
let result1 = Object.assign(params,params2);
result = {
    url: 'www.baidu.com',
    method: '',
    headers: {
        'X-Token': 'ffedh5dfs'
    },
    data: {
        from: 'weixin'
    },
    arr: [30, 40],
    config: {
        xhr: {
            cache: false   // 直接替换
        }
    }
}
```
但是事实上我们合并两个对象，是希望能够将两个对象的数据进行合并，这经常在组件封装时使用，
比如定义一些默认参数然后用户也可以自定义这些参数，这时候我们要求的是合并对象，而不是直接
覆盖原来的对象。因此，我们需要自己实现一个这种对象的合并。

## 自定义merge

既然要实现对象合并，那么就需要确定合并的规则。主要如下：

几种情况的分析：
A->options中的key值  b->params中的key值
1. A和B都是原始值类型：B替换A即可
2. A是对象，B是原始值：抛出错误
3. A是原始值，B是对象：B替换A即可
4. A和B都是对象，依次遍历B中的每一项，替换A中的内容
**注意：这里的对象主要是指普通对象，像是函数，数组，正则之类的都当做原始值进行处理**

```js
// 这个函数判断是否为普通对象
function isObj(value) {
    // 是否为普通对象
    // return _.toType(value) === "object";
    return typeof value === "object";
}

// 合并两个对象
function merge(options, params) {
    if (!isObj(options) || !isObj(params)) {
        throw new Error("params type must be object");
    }
    for (let key in params) {
        let isA = isObj(options[key]);
        let isB = isObj(params[key]);
        if (isA && !isB) {
            // A是对象，B是原始值抛出错误
            throw new TypeError(`${key} in params must be object`);
        } else if (isA && isB) {
            options[key] = merge(options[key], params[key]);
        } else {
            // A和B都是原始值，直接替换
            // A是原始值，B是对象，直接替换
            options[key] = params[key];
        }
    }
    return options;
}
```