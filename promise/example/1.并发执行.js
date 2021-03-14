

function limitRequest(url,max,callback){
    let results = new Array(3).fill(null);
    let count = 0;
    while (count < max) {
        ajax(url[count]).then((result) => {
            results[count] = result;
            if (result.filter(item => item !== null).length === max) {
                // 说明执行完毕了
                callback(results)
            }
        }).catch((error) => {
          results[count] = error;
        })
        count++;
    }
}