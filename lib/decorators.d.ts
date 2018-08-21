/*!
 * Copyright 2018 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2018-06-27 00:25:38
 */
export declare function format<I, O = I>(deserializer: (persistedValue: O, currentValue: I) => I, serializer?: (value: I) => O): PropertyDecorator;
export declare const date: PropertyDecorator;
export interface RegExpStore {
    flags: string;
    source: string;
}
export declare const regexp: PropertyDecorator;
export declare function ignore(target: any, propertyKey: string): void;
export declare function version(value: number | string): (target: any, key?: string) => void;
