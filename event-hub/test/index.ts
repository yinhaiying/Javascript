
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
    });
})