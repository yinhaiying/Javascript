
const deepClone = require("../index");
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const assert = chai.assert;
describe('deep_clone',() => {
    it('是一个函数',() => {
      assert.isFunction(deepClone);
    });
    it("能够复制基本的数据类型",() => {
        // 数字类型
        let num1 = 12;
        let num2 = deepClone(num1);
        assert(num1 === num2);
        num1 = 13;
        assert(num1 !== num2);
        // 字符串类型
        let str = "123456";
        let str2 = deepClone(str);
        assert(str === str2);
        str ="987654";
        assert(str !== str2);
        // 布尔类型
        let flag = true;
        let flag2 = deepClone(flag);
        assert(flag === flag2);
        // undefined类型
        let u = undefined;
        let u2 = deepClone(u);
        assert(u === u2);
        // null类型
        let n = null;
        let n2 = deepClone(n);
        assert(n === n2);
        // symbol类型
        let sym = Symbol();
        let sym2 = deepClone(sym);
        assert(sym === sym2);
    });
    describe('对象',() => {
        it('能够复制普通对象',() => {
            const a = { name:"hello",child:{name:"小孩"}};
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a2.name ===a.name);
            assert(a.child !== a2.child);
            assert(a.child.name === a2.child.name)
        });
        it("能够复制特殊对象——数组",() => {
            const a = [[11,12],[21,22]];
            const a2 = deepClone(a);
            assert(a[0] !== a2[0]);
            assert(a[1] !== a2[1]);
            assert(a[0] !== a2[0]);
            // 不对比引用，只对比值
            assert.deepEqual(a,a2);
        });
        it("能够复制函数",() => {
            let a = function(x,y){
              return x + y;
            };
            a.xxx = {yyy:{zzz:function(){
                return 123;
            }}};
            const a2 = deepClone(a);
            assert(a !== a2);
            console.log("....", a);
            console.log(".....:",a2)
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            console.log(".............",a.xxx.yyy)
            assert(a.xxx.yyy.zzz !== a2.xxx.yyy.zzz);
            assert(a(1,2) === a2(1,2));
        });
        it("环状对象实现复制",() => {
            const a = {name:"小明"};
            a.self = a;
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.name === a2.name);
            assert(a.self !== a2.self);
        });
        xit("不会爆栈",() => {
            const a = {child:null};
            let b = a;
            for(let i = 0;i < 5000;i++){
               b.child = {
                   child:null
               }
               b = b.child;
            };
            const a2 = deepClone(a);
            assert(a !==a2);
            assert(a.child !== a2.child);
        })
    })
})