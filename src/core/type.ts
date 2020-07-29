export type Locale = 'en' | 'zh_cn' | 'zh_tr';
export type LocaleString = string | Record<Locale, string>;
export interface CoreArgs {
  /**
   * current plugin id
   */
  plugin: string;
  /**
   * current theme
   */
  theme: string;
  /**
   * current locale language
   */
  locale: Locale;
  /**
   * current dialog id(if code is run in dialog)
   */
  dialog: string;
}

export interface ApiCallData {
  act: 'call',
  id: string;
  fn: string;
  args?: unknown[];
}
export interface ApiReturnData {
  act: 'rtn' | 'cb';
  id: string;
  ret?: unknown;
  err?: string;
}

export type ApiCallFn = (...args: unknown[]) => unknown | Promise<unknown>;
export type ApiCallFnMap = Record<string, ApiCallFn>;
