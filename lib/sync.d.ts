/*!
 *
 * Copyright 2017 - acrazing
 *
 * @author acrazing joking.young@gmail.com
 * @since 2017-11-28 17:31:44
 * @version 1.0.0
 * @desc sync.ts
 */
import { IReactionDisposer } from 'mobx';
export interface SyncTrunkOptions {
    storage?: Storage;
    storageKey?: string;
    delay?: number;
}
export interface SyncStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
}
export declare class SyncTrunk {
    disposer: IReactionDisposer;
    private store;
    private storage;
    private storageKey;
    private delay;
    constructor(store: any, { storage, storageKey, delay }?: SyncTrunkOptions);
    persist(): void;
    init(): void;
    clear(): void;
    updateStore(store: any): void;
}
