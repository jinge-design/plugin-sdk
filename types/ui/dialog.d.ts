import { LocaleString } from '../core/type';
export declare class UIDialog {
    _id: string;
    constructor(id: string);
    /**
     * 隐藏（但不关闭）对话框，隐藏后的对话框将以最小化图标的形式出现在最左侧。
     */
    hide(): Promise<void>;
    /**
     * 关闭并销毁对话框，同时可以提供该对话框的返回值给 background script。
     * 对话框会被立即销毁，UIDialog.close 函数之后的逻辑都不会被执行，因此该函数也不是异步函数。
     */
    close(data?: unknown): void;
    /**
     * 等待对话框关闭，并获取随关闭逻辑一同返回的数据。
     */
    wait(): Promise<unknown>;
}
export interface UIDialogOptions {
    page: string;
    width: number;
    height: number;
    title?: LocaleString;
    icon?: string;
    left?: number;
    top?: number;
    /**
     * 是否是模态对话框，默认为 false。模态对话框不可以隐藏（最小化），且会有 mask 遮住其它可交互的区域，强制用户做出响应。
     */
    modal?: boolean;
}
/**
 * 打开指定 html 页面的对话框。同一个 html 页面只允许打开一个对话框。
 */
export declare function dialog(options: UIDialogOptions): Promise<UIDialog>;
export declare function getSelfDialog(): UIDialog;
