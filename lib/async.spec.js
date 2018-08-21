"use strict";
/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-11-28 18:39:59
 * @version 1.0.0
 * @desc example.ts
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var mobx_1 = require("mobx");
var mocha_1 = require("mocha");
var sleep_1 = require("monofile-utilities/lib/sleep");
var async_1 = require("./async");
var decorators_1 = require("./decorators");
var keys_1 = require("./keys");
var memory_storage_1 = require("./memory-storage");
var utils_1 = require("./utils");
var N1 = /** @class */ (function () {
    function N1() {
        this.int = 1;
        this.map = mobx_1.observable.map();
        this.list = mobx_1.observable.array();
        this.vStr = 'vStr';
        this.vMap = mobx_1.observable.map();
        this.vList = mobx_1.observable.array();
    }
    tslib_1.__decorate([
        mobx_1.observable
    ], N1.prototype, "int", void 0);
    tslib_1.__decorate([
        decorators_1.version(1),
        mobx_1.observable
    ], N1.prototype, "vStr", void 0);
    tslib_1.__decorate([
        decorators_1.version(2)
    ], N1.prototype, "vMap", void 0);
    tslib_1.__decorate([
        decorators_1.version(3)
    ], N1.prototype, "vList", void 0);
    N1 = tslib_1.__decorate([
        decorators_1.version(4)
    ], N1);
    return N1;
}());
var N2 = /** @class */ (function () {
    function N2() {
        this.hello = 'world';
        this.ignored = 'ignored';
    }
    tslib_1.__decorate([
        mobx_1.observable
    ], N2.prototype, "hello", void 0);
    tslib_1.__decorate([
        decorators_1.ignore, mobx_1.observable
    ], N2.prototype, "ignored", void 0);
    return N2;
}());
var N3 = /** @class */ (function () {
    function N3() {
        this.none = 'none';
    }
    return N3;
}());
var Nm = /** @class */ (function () {
    function Nm() {
        this.version = 'version';
    }
    tslib_1.__decorate([
        decorators_1.version(4)
    ], Nm.prototype, "version", void 0);
    return Nm;
}());
var Root = /** @class */ (function () {
    function Root() {
        this.n1 = new N1();
        this.n2 = new N2();
        this.n3 = new N3();
        this.nm = new Nm();
    }
    tslib_1.__decorate([
        decorators_1.version(5)
    ], Root.prototype, "n2", void 0);
    tslib_1.__decorate([
        decorators_1.ignore
    ], Root.prototype, "n3", void 0);
    return Root;
}());
var root = new Root();
var storage = new memory_storage_1.MemoryStorage();
var t1 = new async_1.AsyncTrunk(root, { storage: storage });
mocha_1.describe('async trunk', function () {
    mocha_1.it('should be ignored', function () {
        var n2 = new N2();
        assert.deepStrictEqual(utils_1.toJSON(n2), { hello: 'world' });
    });
    mocha_1.it('version control', function () {
        var _a, _b, _c, _d;
        assert.deepStrictEqual(utils_1.toJSON(root), (_a = {
                n1: (_b = {
                        int: 1,
                        map: {},
                        list: [],
                        vStr: 'vStr',
                        vMap: {},
                        vList: []
                    },
                    _b[keys_1.Keys.Versions] = (_c = {},
                        _c[keys_1.Keys.NodeVersion] = 4,
                        _c.vStr = 1,
                        _c.vMap = 2,
                        _c.vList = 3,
                        _c),
                    _b),
                n2: {
                    hello: 'world',
                },
                nm: (_d = {},
                    _d[keys_1.Keys.Versions] = {
                        version: 4,
                    },
                    _d.version = 'version',
                    _d)
            },
            _a[keys_1.Keys.Versions] = {
                n2: 5,
            },
            _a));
    });
    mocha_1.it('init', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var N4, N5, root2, t2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, t1.init()];
                case 1:
                    _a.sent();
                    root.n1.map.set('1', 2);
                    root.n1.list.push(3);
                    root.n1.vList.push(4);
                    root.n2.hello = '5';
                    root.n3.none = '6';
                    root.n1.vMap.set('7', 8);
                    root.nm.version = 'changed version';
                    return [4 /*yield*/, sleep_1.sleep(100)];
                case 2:
                    _a.sent();
                    t1.disposer();
                    N4 = /** @class */ (function (_super) {
                        tslib_1.__extends(N4, _super);
                        function N4() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        N4 = tslib_1.__decorate([
                            decorators_1.version(6)
                        ], N4);
                        return N4;
                    }(N1));
                    N5 = /** @class */ (function (_super) {
                        tslib_1.__extends(N5, _super);
                        function N5() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.version = 'new version';
                            return _this;
                        }
                        tslib_1.__decorate([
                            decorators_1.version(5)
                        ], N5.prototype, "version", void 0);
                        return N5;
                    }(Nm));
                    root2 = new Root();
                    root2.n1 = new N4();
                    root2.nm = new N5();
                    root2.n2.hello = '5';
                    t2 = new async_1.AsyncTrunk(root2, { storage: storage });
                    return [4 /*yield*/, t2.init()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sleep_1.sleep(100)];
                case 4:
                    _a.sent();
                    assert.deepStrictEqual(utils_1.toJSON(root2.n1), utils_1.toJSON(new N4()));
                    assert.deepStrictEqual(utils_1.toJSON(root2.n2), utils_1.toJSON(root.n2));
                    assert.deepStrictEqual(utils_1.toJSON(root2.n3), { none: 'none' });
                    assert.deepStrictEqual(utils_1.toJSON(root2.nm), utils_1.toJSON(new N5()));
                    return [2 /*return*/];
            }
        });
    }); });
    mocha_1.it('should auto run', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var Node, store, storage, trunk;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Node = /** @class */ (function () {
                        function Node() {
                            this.hello = 'world 2';
                        }
                        tslib_1.__decorate([
                            mobx_1.observable
                        ], Node.prototype, "hello", void 0);
                        return Node;
                    }());
                    store = { node: new Node };
                    storage = new memory_storage_1.MemoryStorage(true);
                    trunk = new async_1.AsyncTrunk(store, { storage: storage, storageKey: 'key' });
                    return [4 /*yield*/, trunk.init()];
                case 1:
                    _a.sent();
                    store.node.hello = 'John';
                    return [4 /*yield*/, sleep_1.sleep(100)];
                case 2:
                    _a.sent();
                    store.node.hello = 'John 2';
                    assert.deepStrictEqual(JSON.parse(storage.getItem('key')), { node: { hello: 'John 2' } });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=async.spec.js.map