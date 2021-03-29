let re = /cat/g;
let str = "catcatcat";
let arr;
while ((arr = re.exec(str)) !== null) {
    console.log(arr.index)  // 匹配到的字符位于原来字符串的位置
    console.log(`匹配到：${arr[0]}，下一个匹配字符从${re.lastIndex}开始`);
}