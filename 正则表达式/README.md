# 正则表达式




## test
`re.test(str)`返回的是一个boolean类型。但是这个方法有个问题，那就是它存在一个lastIndex，
如果在全局匹配下，匹配上一个之后，你再次调用它会从匹配完的下一个开始匹配，这样的话可能导致
两次匹配的结果不一致。
```js
let re = /cat/g;
let str = "catc";
console.log(re.test(str));  // true 从str[0]开始匹配的
console.log(re.lastIndex)  // 匹配完上一个，会从后面的开始进行匹配，3
console.log(re.test(str));  // false 由于是从str[3]开始匹配的
```


## exec
`exec`跟`test`一样，是正则用于匹配的方法，只不过它的返回结果不是boolean类型，而是返回一个结果数组或 null。
```js
let re = /cat/g;
let str = "catcatcat";
let arr;
while ((arr = re.exec(str)) !== null) {
    console.log(arr.index)  // 匹配到的字符位于原来字符串的位置
    console.log(`匹配到：${arr[0]}，下一个匹配字符从${re.lastIndex}开始`);
}
```
`exec`每次只会匹配一个，匹配成功后会返回匹配到的内容在一个数组中，这个数组还具有一些参数，比如`index`,`index`参数表示匹配到的字符在原来数组中的位置。如果你想匹配出全部的，需要自己去遍历。同时`exec`也会受到到`lastIndex`的影响。


## String.prototype.match
`match`是字符串的方法，
1. 当使用的是非全局匹配时，返回第一个匹配的字符串内容；
2. 当使用的是全局匹配是，返回的是所有匹配内容的数组。



## 总结
* 如果你需要知道一个字符串是否与一个正则表达式匹配 RegExp ，可使用 RegExp.test() 。
* 如果你只是需要第一个匹配结果，你也可以使用 RegExp.exec() 。
* 如果你想要获得捕获组，并且设置了全局标志，你需要用 RegExp.exec()  或者  String.prototype.matchAll()