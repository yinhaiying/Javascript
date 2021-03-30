

interface Person{
    name:string;
    age:number;
}

interface Person{
    height:number;
}

let person:Person={
    name:"hello",
    age:24,
    height:174
}


// 类继承接口
class People implements Person{
    name:string;
    age:number;
    height: number;
}


// 任意属性
interface Person2 {
    name:string;
    age:number;
    [key:string]:any;
}

let p2:Person2 = {
    name:"hello",
    age:24,
    height:33,
    length:111
}


// 接口继承接口
interface Speakable{
    speak:()=>void;
}

interface SpeakChinese extends Speakable{
    speakChinese:() => void;
}

class Chinese implements SpeakChinese{
    speakChinese: () => void;
    speak: () => void;
}