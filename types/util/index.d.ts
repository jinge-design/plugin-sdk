export declare function asyncFind<T = unknown>(arr: T[], fn: (item: T, index: number) => Promise<boolean>): Promise<T>;
export declare function isFunction(v: unknown): boolean;
export declare function isObject(v: unknown): boolean;
export declare function loadScript(url: string): Promise<void>;
export declare function loadStyle(url: string): Promise<void>;
export declare function loopGetTransfers(v: unknown, transfers: Transferable[]): void;
