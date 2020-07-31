import { ApiReturnData } from './type';
export declare const JINGE_DESIGN_ORIGIN = "*";
declare class RPC {
    /**
     * wait
     */
    private _w;
    /**
     * callbacks
     */
    private _c;
    constructor();
    /**
     * onMessage handler, handle rpc function return.
     */
    om(data: ApiReturnData): void;
    private _clear;
    /**
     * call function
     */
    cfn<T = void>(functionName: string, ...args: unknown[]): Promise<T>;
    /**
     * postMessage to remote.
     */
    _p(data: unknown, transfers: Transferable[]): void;
}
export declare function convertRPCArgs(args: unknown[]): unknown[];
/**
 * @internal
 */
export declare const rpc: RPC;
export {};
