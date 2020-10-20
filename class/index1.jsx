import React from "react"
import ReactDOM from "react-dom"
class App extends React.Component{
    name = 'hello';
    age = 24;
    showName(){
        console.log('this:',this);  // 由于showName是共用的，因此不确定这个函数的this一定指向它调用时的this
        console.log(`Hi,my name is ${this.hello}`);
    }
    showAge =  () => {
        console.log('this:',this);   // this  这个this肯定是指向对象自身，因为这个函数是对象独有的。
        console.log(`Hi,my age is ${this.age}`);
    }
    render(){
        return (
          <div>
            <button onClick={this.showName}>展示姓名</button>
            <button onClick={this.showAge}>展示年龄</button>
          </div>
        );
    }
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />,rootElement); 
