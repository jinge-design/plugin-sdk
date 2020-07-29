import { LocaleString } from '../core/type';
export declare class UIDialog {
    _id: string;
    constructor(id: string);
    /**
     * 隐藏（但不关闭）对话框，隐藏后的对话框将以最小化图标的形式出现在最左侧。
     */
    hide(): Promise<void>;
    /**
     * 关闭并销毁对话框。
     */
    close(): Promise<void>;
}
export interface UIDialogOptions {
    page: string;
    width: number;
    height: number;
    title?: LocaleString;
    left?: number;
    top?: number;
}
/**
 * 打开指定 html 页面的对话框。同一个 html 页面只允许打开一个对话框。
 */
export declare function dialog(options: UIDialogOptions): Promise<UIDialog>;
export declare function getSelfDialog(): UIDialog;
