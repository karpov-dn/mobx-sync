"use strict";
/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-11-28 17:31:44
 * @version 1.0.0
 * @desc async.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_1 = require("mobx");
var keys_1 = require("./keys");
var parse_store_1 = require("./parse-store");
var utils_1 = require("./utils");
var AsyncTrunk = /** @class */ (function () {
    function AsyncTrunk(store, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.storage, storage = _c === void 0 ? localStorage : _c, _d = _b.storageKey, storageKey = _d === void 0 ? keys_1.Keys.DefaultKey : _d, _e = _b.delay, delay = _e === void 0 ? 0 : _e;
        this.store = store;
        this.storage = storage;
        this.storageKey = storageKey;
        this.delay = delay;
    }
    AsyncTrunk.prototype.persist = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.storage.setItem(this.storageKey, JSON.stringify(this.store))];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        // TODO report error
                        console.error('cycle reference occurred', utils_1.parseCycle(this.store));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AsyncTrunk.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data_1, _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.storage.getItem(this.storageKey)];
                    case 1:
                        data_1 = _b.sent();
                        if (data_1) {
                            mobx_1.runInAction(function () {
                                parse_store_1.parseStore(_this.store, JSON.parse(data_1));
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        // persist before listen change
                        this.persist();
                        this.disposer = mobx_1.autorun(this.persist.bind(this), {
                            name: keys_1.Keys.ActionName,
                            delay: this.delay,
                            onError: function (error) { return console.error(error); },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncTrunk.prototype.clear = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.storage.removeItem(this.storageKey)];
            });
        });
    };
    AsyncTrunk.prototype.updateStore = function (store) {
        this.store = store;
        return this.persist();
    };
    return AsyncTrunk;
}());
exports.AsyncTrunk = AsyncTrunk;
//# sourceMappingURL=async.js.map