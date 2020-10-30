
const deepClone = require("../index1");
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
            let a2 = deepClone(a);
            assert(a !== a2);
            assert(a2.name ===a.name);
            assert(a.child !== a2.child);
            assert(a.child.name === a2.child.name)
            a2.name ="world";
            assert(a.name === 'hello');
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
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy !== a2.xxx.yyy);
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
        });
        it("能够拷贝正则表达式",() => {
            // const a = /hi\d/ig;
            const a = new RegExp("hi\\d","ig");
            a.xxx= {yyy:{zzz:1}};
            const a2 = deepClone(a);
            assert(a.source === a2.source); 
            assert(a.flags === a2.flags); 
            assert(a !== a2); 
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx !== a2.xxx);
        });
        it('能够复制日期',() => {
            const a = new Date();
            a.xxx = { yyy: { zzz: 1 } };
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.getTime() === a2.getTime());
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx !== a2.xxx);
        });
        it('自动跳过原型属性',() => {
            const a = Object.create({name:"aaa"});
            a.xxx = {yyy:{zzz:123}};
            const a2 = deepClone(a);
            assert(a !== a2);
            assert.isFalse('name' in a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx !== a2.xxx);
        });
        it("测试一个超级复杂的对象",() => {
          const a = {
            i: Infinity,
            s: "",
            bool: false,
            n: null,
            u: undefined,
            sym: Symbol(),
            obj: {
              i: Infinity,
              s: "",
              bool: false,
              n: null,
              u: undefined,
              sym: Symbol(),
            },
            array: [
              {
                nan: NaN,
                i: Infinity,
                s: "",
                bool: false,
                n: null,
                u: undefined,
                sym: Symbol(),
              },
              123,
            ],
            fn: function () {
              return "fn";
            },
            date: new Date(),
            re: /hi\d/gi,
          };
          let a2 = deepClone(a);
          assert(a2 !== a);
          assert(a2.i === a.i);
          assert(a2.s === a.s);
          assert(a2.bool === a.bool);
          assert(a2.n === a.n);
          assert(a2.u === a.u);
          assert(a2.sym === a.sym);
          assert(a2.obj !== a.obj);
          assert(a2.array !== a.array);
          assert(a2.array[0] !== a.array[0]);
          assert(a2.array[0].i === a.array[0].i);
          assert(a2.array[0].s === a.array[0].s);
          assert(a2.array[0].bool === a.array[0].bool);
          assert(a2.array[0].n === a.array[0].n);
          assert(a2.array[0].u === a.array[0].u);
          assert(a2.array[0].sym === a.array[0].sym);
          assert(a2.array[1] === a.array[1]);
          assert(a2.fn !== a.fn);
          assert(a2.date !== a.date);
          assert(a2.re !== a.re);
        })
    })
})