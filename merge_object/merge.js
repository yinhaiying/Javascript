let params = {
    url: "",
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    data: {},
    arr: [10, 20, 30],
    config: {
        xhr: {
            async: true,
            cache: false
        }
    }
}


let params2 = {
    url: "www.baidu.com",
    headers: {
        "X-Token": "ffedh5dfs"
    },
    data: {
        from: "weixin"
    },
    arr: [30, 40],
    config: {
        xhr: {
            cache: false
        }
    }
}




// optiosn 原始对象  params替换对象
/* 
几种情况的分析：
A->options中的key值  b->params中的key值
1. A和B都是原始值类型：B替换A即可
2. A是对象，B是原始值：抛出错误
3. A是原始值，B是对象：B替换A即可
4. A和B都是对象，依次遍历B中的每一项，替换A中的内容
*/

function isObj(value) {
    // 是否为普通对象
    // return _.toType(value) === "object";
    return typeof value === "object";
}

function merge(options, params) {
    if (!isObj(options) || !isObj(params)) {
        throw new Error("params type must be object");
    }
    for (let key in params) {
        let isA = isObj(options[key]);
        let isB = isObj(params[key]);
        if (isA && !isB) {
            throw new TypeError(`${key} in params must be object`);
        } else if (isA && isB) {
            options[key] = merge(options[key], params[key]);
        } else {
            options[key] = params[key];
        }
    }
    return options;
}

/* 
{
    url: 'www.baidu.com',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Token': 'ffedh5dfs'
    },
    data: {
        from: 'weixin'
    },
    arr: [30, 40, 30],
    config: {
        xhr: {
            async: true,
            cache: false
        }
    }
}
*/