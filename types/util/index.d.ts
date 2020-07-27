export declare function asyncFind<T = unknown>(arr: T[], fn: (item: T, index: number) => Promise<boolean>): Promise<T>;
export declare function getLocale(): string;
export declare function getTheme(): string;
export declare function isObject(v: unknown): boolean;
