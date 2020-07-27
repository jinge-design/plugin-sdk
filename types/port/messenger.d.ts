export declare type MsgHandler = (...args: unknown[]) => void;
export declare class Messenger {
    lis: Map<string, MsgHandler[]>;
    constructor();
    on(msg: string, handler: MsgHandler): void;
    off(msg: string, handler: MsgHandler): void;
}
export declare const coreMessenger: Messenger;
