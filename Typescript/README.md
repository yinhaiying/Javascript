# typescript



## interface




### interface可以重名，会自定进行合并
我们可以定义多个接口，这些接口还可以重名，重名的接口会自动进行合并。
```js
interface Person{
    name:string;
    age:number;
}

interface Person{
    height:number
}

let person:Person={
    name:"hello",
    age:24,
    height:174
}
```

### 类可以继承接口
类可以继承接口，但是如果继承了接口，那么就必须实现这个接口的所有属性。
```js
class People implements Person{
    name:string;
    age:number;
    height: number;
}
```

### 任意属性
很多时候我们不知道到底有多少属性需要定义，比如不确定后端接口会返回多少属性。比如：
```js
interface Person2 {
    name:string;
    age:number;
}
let p2:Person2 = {
    name:"hello",
    age:24,
    height:33   // 多了一个interface中没有定义的属性，会报错。
}
```
如上代码所示，我们定义的interface中没有`height`属性，这时候我们在p2中定义使用`height`属性就会报错。如果我们知道确实需要`height`这个属性还好，我们可以直接在interface中进行定义，但是很可能常常是不知道具体的属性名称。这时候就需要使用**任意属性**了。Interface支持任意属性。
```js
interface Person2 {
    name:string;
    age:number;
    [key:string]:any;  // 任意属性
}

let p2:Person2 = {
    name:"hello",
    age:24,
    height:33,
    length:111
}

```

### 接口的继承
接口之间可以实现继承。
```js
interface Speakable{
    speak:()=>void;
}

interface SpeakChinese extends Speakable{   // 继承另外一个接口
    speakChinese:() => void;
}

class Chinese implements SpeakChinese{   // 类实现时就会去实现所有的接口
    speakChinese: () => void;
    speak: () => void;
}
```