"use strict";
/*!
 *
 * Copyright 2018 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2018-02-04 17:27:30
 * @version 1.0.0
 * @desc memory-storage.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage(debug) {
        if (debug === void 0) { debug = false; }
        this.debug = debug;
        this.data = {};
    }
    MemoryStorage.prototype.getItem = function (key) {
        this.debug && process.stderr.write(util.format('storage.get %s: %s\n', key, this.data[key]));
        return this.data.hasOwnProperty(key) ? this.data[key] : null;
    };
    MemoryStorage.prototype.removeItem = function (key) {
        this.debug && process.stderr.write(util.format('storage.remove %s\n', key));
        delete this.data[key];
    };
    MemoryStorage.prototype.setItem = function (key, value) {
        this.debug && process.stderr.write(util.format('storage.set %s: %s\n', key, value));
        this.data[key] = value + '';
    };
    return MemoryStorage;
}());
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=memory-storage.js.map