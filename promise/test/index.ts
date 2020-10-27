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
    it('promise.then(success,fail)中的fail会在reject被调用之后执行',(done) => {
      const fail = sinon.fake();
      const promise = new Promise((resolve,reject) => {
          assert.isFalse(fail.called)
          reject();
          setTimeout(() => {
            assert.isTrue(fail.called);
            done(); // 加入done表示我执行完了，你可以去检测我的执行结果了。
          },0)
      })
      // 该函数在reject之后执行;
      //@ts-ignore
      promise.then(null,fail)
    });
    it('2.2.1——then的第一个参数必须是一个函数，如果不是函数必须被忽略',() => {
      const promise = new Promise((resolve) => {
        resolve()  // resolve执行后then中的第一个参数会立即执行
      });
      promise.then(false,null);
      assert(1===1)
    });
    it('2.2.2——then的第一个参数是一个函数,它必须在fulfilled被调用，然后把promise的值作为它的第一个参数',(done) => {
      const succeed = sinon.fake();
      const promise = new Promise(resolve => {
        assert.isFalse(succeed.called);
        resolve(2);
        resolve(333);
        setTimeout(() => {
          assert(promise.state === 'fulfilled');
          assert.isTrue(succeed.calledOnce);
          assert(succeed.calledWith(2));   // calledWith被调用时传入的参数
        },0)
        done();
      });
      promise.then(succeed)
    })
    it('2.2.1.2——then的第二个参数必须是函数，如果不是函数必须被忽略',() => {
      const promise = new Promise((resolve,reject) => {
        reject()  
      });
      promise.then(false,null);
      assert(1===1)
    });
    it('2.2.3——then的第二个参数是一个函数,它必须在rejected被调用，然后把promise的值作为它的第一个参数reason',(done) => {
      const failed = sinon.fake();
      const promise = new Promise((resolve,reject) => {
        assert.isFalse(failed.called);
        reject(2);
        reject(333);
        setTimeout(() => {
          assert(promise.state === 'rejected');
          assert.isTrue(failed.calledOnce);
          assert(failed.calledWith(2));   // calledWith被调用时传入的参数
        },0)
        done();
      });
      promise.then(null,failed)
    });
    it("2.2.4——在我们的代码执行完毕之前，不得调用then后面的两个函数",(done) => {
      const succeed = sinon.fake();
      const promise = new Promise((resolve) => {
        resolve();
      });
      promise.then(succeed);
      console.log('在这里没有执行完毕之前，不得调用then中的succeed方法');
      assert.isFalse(succeed.called);
      setTimeout(() => {
        assert.isTrue(succeed.called);
        done();
      },0)
    })
    it("2.2.4——在我们的代码执行完毕之前，不得调用then后面的两个函数",(done) => {
      const failed = sinon.fake();
      const promise = new Promise((resolve,reject) => {
        reject();
      });
      promise.then(null,failed);
      console.log('在这里没有执行完毕之前，不得调用then中的failed方法');
      assert.isFalse(failed.called);
      setTimeout(() => {
        assert.isTrue(failed.called);
        done();
      },0)
    });
    it('2.2.5——onFulfilled和onRejected必须作为函数调用（即没有this值）',(done) => {
      const promise = new Promise(resolve => {
        resolve();
      });
      promise.then(function(){
        "use strict";
        console.log("................",typeof this)
        assert(this===undefined);
        done();
      })
    });
    it("2.2.6.1——then方法可能在同一次promise中被调用多次",(done) => {
      const promise = new Promise(resolve => {
        resolve();
      });
      const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()];
      promise.then(callbacks[0]);
      promise.then(callbacks[1]);
      promise.then(callbacks[2]);
      setTimeout(() => {
        assert.isTrue(callbacks[0].called);
        assert.isTrue(callbacks[1].called);
        assert.isTrue(callbacks[2].called);
        assert(callbacks[1].calledAfter(callbacks[0]));
        assert(callbacks[2].calledAfter(callbacks[1]));
        done();
      },0)
    })
    it("2.2.6.2——then方法可能在同一次promise中被调用多次",(done) => {
      const promise = new Promise((resolve,reject) => {
        reject();
      });
      const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()];
      promise.then(null,callbacks[0]);
      promise.then(null,callbacks[1]);
      promise.then(null,callbacks[2]);
      setTimeout(() => {
        assert.isTrue(callbacks[0].called);
        assert.isTrue(callbacks[1].called);
        assert.isTrue(callbacks[2].called);
        assert(callbacks[1].calledAfter(callbacks[0]));
        assert(callbacks[2].calledAfter(callbacks[1]));
        done();
      },0)
    })
    
});
