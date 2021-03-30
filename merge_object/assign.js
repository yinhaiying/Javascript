

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


// 基于浅比较实现的对象的合并
let result1 = Object.assign(params,params2);
let result2 = Object.assign({},params,params2);
console.log(result1)

params2.config.xhr.cache =true;
console.log(result1.config.xhr.cache)  // true

/* 
{
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
            cache: false
        }
    }
}
*/




