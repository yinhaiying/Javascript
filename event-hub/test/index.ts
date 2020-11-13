
import * as chai from "chai";
const assert = chai.assert;
import * as mocha from "mocha";
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);
import EventHub from "../src/index";
describe("EventHub",() => {
    it("是一个类",() => {
      assert.isFunction(EventHub);
      assert.isObject(EventHub.prototype);
    });
    it("emit被触发，那么On监听的对应的函数必须执行",() => {
        const eventHub = new EventHub();
        let fn = sinon.fake();
        eventHub.on("xxx",fn);
        eventHub.emit("xxx");
        assert(fn.called);
        eventHub.emit("xxx");
        assert(fn.called);
    });
    it("emit可以传递参数",() => {
        const eventHub = new EventHub();
        eventHub.on("xxx",function(data){
          assert(data === "hello,world")
        })
        eventHub.emit("xxx","hello,world");
    });

    it("xxx事件被取消后不执行",() => {
        const eventHub = new EventHub();
        let fn = sinon.fake();
        eventHub.on("xxx",fn);
        eventHub.off("xxx",fn);
        eventHub.emit("xxx");
        // console.log(eventHub.cache)
        assert(fn.called === false);
    });
    it("once:只执行一次的事件，执行完毕之后移除",() => {
        const eventHub = new EventHub();
        let fn = sinon.fake();
        eventHub.once("xxx",fn);
        eventHub.emit("xxx");
        eventHub.emit("xxx");
        assert(fn.calledOnce);
    })

})