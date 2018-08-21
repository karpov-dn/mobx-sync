"use strict";
/*!
 *
 * Copyright 2018 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2018-01-06 12:24:06
 * @version 1.0.0
 * @desc parse-store.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var keys_1 = require("./keys");
var utils_1 = require("./utils");
var parseStore = function (store, data) {
    // if store or data is empty, break it
    if (!store || !data) {
        return;
    }
    var dataVersions = data[keys_1.Keys.Versions] || {};
    var storeVersions = store[keys_1.Keys.Versions] || {};
    var deserializers = store[keys_1.Keys.Format] || {};
    // version control for node
    if ((keys_1.Keys.NodeVersion in dataVersions)
        || (keys_1.Keys.NodeVersion in storeVersions)) {
        if (dataVersions[keys_1.Keys.NodeVersion]
            !== storeVersions[keys_1.Keys.NodeVersion]) {
            return;
        }
    }
    // use data to iterate for avoid store does not set default value, and then
    // the properties will not exist actually. so, the observable
    // map/array/object field must has a default value, when the object is
    // constructed.
    for (var key in data) {
        // skip internal fields
        if (key === keys_1.Keys.Versions) {
            continue;
        }
        if (data.hasOwnProperty(key)) {
            // the version control for a field
            if (storeVersions[key] !== dataVersions[key]) {
                continue;
            }
            // if the new version of the store skipped a field, will
            // not assign stored data to it. this method need to the
            // store init the field with a value.
            var desc = Object.getOwnPropertyDescriptor(store, key);
            if (desc && !desc.enumerable) {
                continue;
            }
            var storeValue = store[key];
            var dataValue = data[key];
            if (deserializers[key] && deserializers[key].deserializer) {
                store[key] = deserializers[key].deserializer(dataValue, storeValue);
            }
            else if (mobx_1.isObservableArray(storeValue)) {
                // mobx array
                store[key] = mobx_1.observable.array(dataValue);
            }
            else if (mobx_1.isObservableMap(storeValue)) {
                // mobx map
                store[key] = mobx_1.observable.map(dataValue);
            }
            else if (utils_1.isPrimitive(dataValue)) {
                // js/mobx primitive objects
                store[key] = dataValue;
            }
            else if (!storeValue) {
                // if store value is empty, assign persisted data to it directly
                store[key] = dataValue;
            }
            else {
                // nested pure js object or mobx observable object
                parseStore(storeValue, dataValue);
            }
        }
    }
};
exports.parseStore = parseStore;
exports.parseStore = parseStore = mobx_1.action(parseStore);
//# sourceMappingURL=parse-store.js.map