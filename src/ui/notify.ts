import { rpc } from '../core/rpc';

export function message(text: string): void {
  rpc.cfn('uiMessage', text);
}

export function alert(title: string, description?: string): Promise<void> {
  return rpc.cfn('uiAlert', title, description);
}

export function confirm(title: string, description?: string): Promise<boolean> {
  return rpc.cfn('uiConfirm', title, description);
}