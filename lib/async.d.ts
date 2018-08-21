/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-11-28 17:31:44
 * @version 1.0.0
 * @desc async.ts
 */
import { IReactionDisposer } from 'mobx';
import { SyncStorage } from './sync';
export interface AsyncStorage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}
export interface AsyncTrunkOptions {
    storage?: AsyncStorage | SyncStorage;
    storageKey?: string;
    delay?: number;
}
export declare class AsyncTrunk {
    disposer: IReactionDisposer;
    private store;
    private storage;
    readonly storageKey: string;
    readonly delay: number;
    constructor(store: any, { storage, storageKey, delay, }?: AsyncTrunkOptions);
    persist(): Promise<void>;
    init(): Promise<void>;
    clear(): Promise<void>;
    updateStore(store: any): Promise<void>;
}
