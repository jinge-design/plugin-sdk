import {
  MsgHandler, coreMessenger
} from './messenger';
import { isObject } from '../util';

export function onLoad(handler: MsgHandler): void {
  coreMessenger.on('load', handler);
}

export function onLocaleChange(handler: MsgHandler): void {
  coreMessenger.on('locale-change', handler);
}

export function onThemeChange(handler: MsgHandler): void {
  coreMessenger.on('theme-change', handler);
}

export function onCommand(cmd: string, handler: () => Promise<void>): void {
  coreMessenger.on('command:' + cmd, () => {
    (async () => {
      await handler();
    })().then(() => {
      sendCommandResult(cmd);
    }, (err) => {
      sendCommandResult(cmd, err.message || err.toString());
    });
  })
}

export function sendCommandResult(uid: string, err?: string) {
  
}

window.addEventListener('message', evt => {
  const data = evt.data;
  if (!isObject(data)) return;
});