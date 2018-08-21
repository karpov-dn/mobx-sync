"use strict";
/*!
 * Copyright 2018 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2018-06-27 00:21:42
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function isPrimitive(value) {
    if (value === void 0 || value === null) {
        return true;
    }
    var type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean';
}
exports.isPrimitive = isPrimitive;
function toJSON(data, recursive) {
    if (recursive === void 0) { recursive = true; }
    if (recursive) {
        var str = JSON.stringify(data);
        if (str === void 0) {
            return void 0;
        }
        return JSON.parse(str);
    }
    if (!data || !('toJSON' in data)) {
        return data;
    }
    return data.toJSON();
}
exports.toJSON = toJSON;
// TODO support es5 browsers
function parseCycle(input, map, prefix) {
    if (map === void 0) { map = new Map(); }
    if (prefix === void 0) { prefix = ''; }
    var e_1, _a;
    if (isPrimitive(input)) {
        return [];
    }
    if (!map.has(input)) {
        map.set(input, [prefix || '.']);
    }
    try {
        for (var _b = tslib_1.__values(Object.entries(input)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var item = _c.value;
            if (isPrimitive(item[1]) || Object.keys(item[1]).length === 0) {
                continue;
            }
            var subPrefix = prefix + '.' + item[0];
            if (!map.has(item[1])) {
                map.set(item[1], [subPrefix]);
                parseCycle(item[1], map, subPrefix);
            }
            else {
                map.get(item[1]).push(subPrefix);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (prefix !== '') {
        return [];
    }
    var output = [];
    map.forEach(function (value, key) {
        if (value.length > 1) {
            output.push([key, value]);
        }
    });
    return output;
}
exports.parseCycle = parseCycle;
//# sourceMappingURL=utils.js.map