export declare class BaseLayer {
    static create(...args: unknown[]): Promise<BaseLayer>;
    get(...props: unknown[]): Promise<unknown | unknown[]>;
}
