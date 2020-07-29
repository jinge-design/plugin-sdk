import { LocaleString } from '../core/type';
import { rpc } from '../core/rpc';
import { coreArgs } from '../core';

export class UIDialog {
  _id: string;

  constructor(id: string) {
    this._id = id;
  }

  /**
   * 隐藏（但不关闭）对话框，隐藏后的对话框将以最小化图标的形式出现在最左侧。
   */
  hide(): Promise<void> {
    return rpc.cfn('hided', this._id);
  }

  /**
   * 关闭并销毁对话框。
   */
  close(): Promise<void> {
    return rpc.cfn('closd', this._id);
  }
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
export function dialog(options: UIDialogOptions): Promise<UIDialog> {
  return rpc.cfn<string>('opend', options).then(id => {
    return new UIDialog(id);
  });
}

/**
 * 获取当前窗口所属的 Dialog 实例，如果返回 null 则说明当前代码逻辑
 * 没有运行在任何对话框中。
 */
let selfDialog: UIDialog = null;
export function getSelfDialog(): UIDialog {
  if (selfDialog) {
    return selfDialog;
  }
  if (!coreArgs.dialog) {
    return null;
  }
  return (selfDialog = new UIDialog(coreArgs.dialog));
}