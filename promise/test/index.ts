import * as chai from "chai";
const assert = chai.assert;
import * as mocha from "mocha";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);
import Promise from "../promise";
describe('Promise', () => {
    it('是一个类',() => {
    //   assert(typeof Promise === "function");  // ES6中 class的类型也是一个函数
    //   assert(Promise.prototype);              // 类一定存在prototype
    //   assert(Promise.prototype.constructor === Promise)  // prototype.constructor` 指向类本身
      assert.isFunction(Promise);
      assert.isObject(Promise.prototype);
    });
    it("new Promise()的时候必须接收一个函数",() => {
      assert.throw(() => {
          // @ts-ignore
          new Promise();
      })
      assert.throw(() => {
          // @ts-ignore
          new Promise(1);
      })
      assert.throw(() => {
          // @ts-ignore
          new Promise(false);
      })
    //   assert.throw(() => {
    //       // @ts-ignore
    //       new Promise(() => {});
    //   })
    });
    it('new Promise(fn)中的fn必须立即执行',() => {
        let fn = sinon.fake();  // sinon提供一个假的函数
        new Promise(fn);
        assert(fn.called);   // 这个假函数有一个called参数，根据这个参数可以判断函数是否被调用。
    })
    it('new Promise(fn)中的fn必须接收resolve和reject两个函数',(done) => {
        new Promise((resolve,reject) => {
            assert.isFunction(resolve);
            assert.isFunction(reject);
            done();
        });
    })

    it('new Promise(fn)会生成一个对象，对象有then方法',() => {
      const promise = new Promise(() => {});
      assert.isFunction(promise.then);
    })
    // 如果代码中有需要等待的执行，那么需要参数done
    it('promise.then(success)会在resolve被调用之后执行',(done) => {
      const success = sinon.fake();
      const promise = new Promise((resolve,reject) => {
          assert.isFalse(success.called)
          resolve();
          setTimeout(() => {
            assert.isTrue(success.called);
            done(); // 加入done表示我执行完了，你可以去检测我的执行结果了。
          },0)
      })
      // 该函数在resolve之后执行;
      //@ts-ignore
      promise.then(success)
    })
});
