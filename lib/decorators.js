"use strict";
/*!
 * Copyright 2018 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2018-06-27 00:25:38
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inject_1 = require("./inject");
var keys_1 = require("./keys");
function format(deserializer, serializer) {
    return function (target, propertyKey) {
        inject_1.inject(target, keys_1.Keys.Format);
        target[keys_1.Keys.Format][propertyKey] = { deserializer: deserializer, serializer: serializer };
    };
}
exports.format = format;
exports.date = format(function (value) { return new Date(value); });
exports.regexp = format(function (value) { return new RegExp(value.source, value.flags); }, function (value) { return ({ flags: value.flags, source: value.source }); });
function ignore(target, propertyKey) {
    inject_1.inject(target, keys_1.Keys.Ignores);
    target[keys_1.Keys.Ignores][propertyKey] = true;
}
exports.ignore = ignore;
function version(value) {
    return function (target, key) {
        if (key === void 0) { key = keys_1.Keys.NodeVersion; }
        if (typeof target === 'function') {
            target = target.prototype;
        }
        inject_1.inject(target);
        if (!target.hasOwnProperty(keys_1.Keys.Versions)) {
            target[keys_1.Keys.Versions] = tslib_1.__assign({}, target[keys_1.Keys.Versions] || {});
        }
        target[keys_1.Keys.Versions][key] = value;
    };
}
exports.version = version;
//# sourceMappingURL=decorators.js.map