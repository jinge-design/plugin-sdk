import { MsgHandler } from './messenger';
export declare function onLoad(handler: MsgHandler): void;
export declare function onLocaleChange(handler: MsgHandler): void;
export declare function onThemeChange(handler: MsgHandler): void;
export declare function onCommand(cmd: string, handler: () => Promise<void>): void;
export declare function sendCommandResult(uid: string, err?: string): void;
