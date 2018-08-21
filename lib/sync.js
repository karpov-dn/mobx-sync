"use strict";
/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-11-28 17:31:44
 * @version 1.0.0
 * @desc sync.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var keys_1 = require("./keys");
var parse_store_1 = require("./parse-store");
var utils_1 = require("./utils");
var SyncTrunk = /** @class */ (function () {
    function SyncTrunk(store, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.storage, storage = _c === void 0 ? localStorage : _c, _d = _b.storageKey, storageKey = _d === void 0 ? keys_1.Keys.DefaultKey : _d, _e = _b.delay, delay = _e === void 0 ? 0 : _e;
        this.store = store;
        this.storage = storage;
        this.storageKey = storageKey;
        this.delay = delay;
    }
    SyncTrunk.prototype.persist = function () {
        try {
            this.storage.setItem(this.storageKey, JSON.stringify(this.store));
        }
        catch (_a) {
            // TODO report error
            console.error('cycle reference occurred', utils_1.parseCycle(this.store));
        }
    };
    SyncTrunk.prototype.init = function () {
        var _this = this;
        try {
            var data_1 = this.storage.getItem(this.storageKey);
            if (data_1) {
                mobx_1.runInAction(function () {
                    parse_store_1.parseStore(_this.store, JSON.parse(data_1));
                });
            }
        }
        catch (_a) {
            // DO nothing
        }
        // persist before listen change
        this.persist();
        this.disposer = mobx_1.autorun(this.persist.bind(this), { name: keys_1.Keys.ActionName, delay: this.delay });
    };
    SyncTrunk.prototype.clear = function () {
        this.storage.removeItem(this.storageKey);
    };
    SyncTrunk.prototype.updateStore = function (store) {
        this.store = store;
        this.persist();
    };
    return SyncTrunk;
}());
exports.SyncTrunk = SyncTrunk;
//# sourceMappingURL=sync.js.map