import {
  Locale
} from '../core/type';
import {
  coreArgs
} from '../core';

export type UITheme = 'dark' | 'light';
export function getTheme(): UITheme {
  return coreArgs.theme as UITheme;
}
export function getLanguage(): Locale {
  return coreArgs.locale as Locale;
}

// export function onLocaleChange(handler: MsgHandler): void {
//   coreMessenger.on('locale-change', handler);
// }

// export function onThemeChange(handler: MsgHandler): void {
//   coreMessenger.on('theme-change', handler);
// }
